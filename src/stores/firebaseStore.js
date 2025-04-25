import { defineStore } from 'pinia';
import { get, push, ref, serverTimestamp, set, update, onValue } from "firebase/database";
import { db } from "@/firebase/firebase-config.js";

// Constants
const CURRENT_GAME_KEY = 'currentGame';
const CURRENT_ROOM_KEY = 'currentRoom';

// Helper Functions
function getFromStorage(key) {
  return localStorage.getItem(key);
}

function saveToStorage(key, value) {
  localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}

function removeFromStorage(key) {
  localStorage.removeItem(key);
}


// Initialize game scores
function initializeGameScores(gameData, scoreLine) {
  const oldScores = Array.isArray(gameData.scores) ? gameData.scores : [];
  const oldTotalScores = Array.isArray(gameData.totalScores)
    ? gameData.totalScores
    : scoreLine.map(() => 0); // Khởi tạo với 0 nếu chưa có
  return { oldScores, oldTotalScores };
}

export const useFirebaseStore = defineStore('firebase', {
  state: () => ({
    currentRoom: getFromStorage(CURRENT_ROOM_KEY) || 'public',
    unsubGames: null,
    unsubGamesScore: null
  }),

  actions: {
    // Room Management
    getCurrentRoom() {
      return this.currentRoom;
    },

    // Helper function to fetch room data
    async getRoomData(roomId) {
      const roomRef = ref(db, "rooms/" + roomId);
      const roomSnap = await get(roomRef);
      return roomSnap.exists() ? roomSnap.val() : null;
    },

    setCurrentRoom(roomId) {
      removeFromStorage(CURRENT_GAME_KEY);
      this.currentRoom = roomId;
      saveToStorage(CURRENT_ROOM_KEY, roomId);
      return roomId;
    },

    async ensureRoomExists(roomId) {
      if (!roomId?.trim()) roomId = 'public';
      console.log(`Ensuring room exists: ${roomId}`);
      return Promise.resolve(roomId);
    },

    async getOrCreateRoom(roomId) {
      let room = await this.getRoomData(roomId);
      if (!room) {
        // Tạo mới phòng nếu chưa tồn tại
        room = {
          name: `${roomId}`,
          createdAt: serverTimestamp(),
          games: [],
        };
        const roomRef = ref(db, "rooms/" + roomId);
        await set(roomRef, room); // Ghi dữ liệu phòng mới vào Realtime Database
      }
      return room;
    },

    async createNewRoom(roomId) {
      const room = await this.getOrCreateRoom(roomId);
      await this.ensureRoomExists(roomId);
      this.setCurrentRoom(roomId);
      return room;
    },

    // Game Management
    async saveCurrentGame(game) {
      if (!game.id) game.id = Date.now();
      if (!game.room) game.room = this.getCurrentRoom();
      saveToStorage(CURRENT_GAME_KEY, game);
    },

    getCurrentGame() {
      try {
        const raw = getFromStorage(CURRENT_GAME_KEY);
        if (!raw) return null;

        const game = JSON.parse(raw);
        game.scores = game.scores || [];
        game.totalScores = game.totalScores || [0, 0, 0, 0];
        game.room = game.room || this.getCurrentRoom();

        if (game.room !== this.getCurrentRoom()) {
          removeFromStorage(CURRENT_GAME_KEY);
          console.log('Đã xóa game cũ vì không thuộc phòng hiện tại:', this.getCurrentRoom());
          return null;
        }

        return game;
      } catch (error) {
        console.error("Error getting current game:", error);
        return null;
      }
    },

    async createNewGame({ room, players }) {
      try {
        if (!Array.isArray(players) || players.length < 4) {
          throw new Error("Cần có ít nhất 4 người chơi hợp lệ");
        }

        const validPlayers = players.map(p => p?.trim()).filter(p => p);
        const roomId = room?.trim() || this.getCurrentRoom();

        await this.ensureRoomExists(roomId);
        this.setCurrentRoom(roomId);

        const savedGame = await this.createGame(roomId, validPlayers.length ? validPlayers : ['Bot']);
        await this.saveCurrentGame(savedGame);

        return savedGame;
      } catch (error) {
        console.error("Error in createNewGame:", error);
        throw error;
      }
    },

    async createGame(roomId, players) {
      const gamesRef = ref(db, "rooms/" + roomId + "/games");
      const newGameRef = push(gamesRef);
      const game = {
        id: Date.now(),
        date: serverTimestamp(),
        players: players,
        scores: [],
        totalScores: [0, 0, 0, 0],
        room: roomId,
      };
      await set(newGameRef, game);
      return { ...game, firebaseId: newGameRef.key }; // Trả về gameId (key của game)
    },

    async openExistingGame(game) {
      if (!game?.id) {
        throw new Error("Cần có danh sách người chơi hợp lệ");
      }

      if (game.room && game.room !== this.getCurrentRoom()) {
        this.setCurrentRoom(game.room);
      }

      return this.saveCurrentGame(game).then(() => game);
    },

    // Score Management
    async addScore(roomId, gameId, scoreLine) {
      const gameRef = ref(db, `rooms/${roomId}/games/${gameId}`);
      const gameSnap = await get(gameRef);
      if (gameSnap.exists()) {
        const data = gameSnap.val();
        const { oldScores, oldTotalScores } = initializeGameScores(data, scoreLine);
        const newScores = [...oldScores, scoreLine];
        const newResult = oldTotalScores.map((total, idx) => total + scoreLine[idx]);
        await update(gameRef, { scores: newScores, totalScores: newResult });
      }
    },

    async editScore(roomId, gameId, roundIndex, newScoreLine) {
      const gameRef = ref(db, `rooms/${roomId}/games/${gameId}`);
      const gameSnap = await get(gameRef);
      if (gameSnap.exists()) {
        const data = gameSnap.val();
        const oldLine = data.scores[roundIndex];
        const newScores = [...data.scores];
        newScores[roundIndex] = newScoreLine;

        const newResult = data.totalScores.map((val, i) => val - oldLine[i] + newScoreLine[i]);
        await update(gameRef, { scores: newScores, totalScores: newResult });
      }
    },

    async closeScore(roomId, gameId) {
      const gameRef = ref(db, `rooms/${roomId}/games/${gameId}`);
      const gameSnap = await get(gameRef);
      if (gameSnap.exists()) {
        await update(gameRef, { isEnded: true });
      }
    },

    // Subscription Management
    subscribeToGames(roomId, callback) {
      this.unsubscribeToGames(); // Unsubscribe previous listener

      const gamesRef = ref(db, `rooms/${roomId}/games`);
      this.unsubGames = onValue(gamesRef, snapshot => {
        const data = snapshot.val();
        const games = data
          ? Object.entries(data).map(([id, value]) => ({ firebaseId: id, ...value }))
          : [];

        games.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        callback(games);
      });
    },

    unsubscribeToGames() {
      if (this.unsubGames) {
        this.unsubGames();
        this.unsubGames = null;
      }
    },

    subscribeToGamesScore(roomId, gameId, defaultGame, callback) {
      this.unsubscribeToGamesScore(); // Unsubscribe previous listener

      const scoreRef = ref(db, `rooms/${roomId}/games/${gameId}`);
      this.unsubGamesScore = onValue(scoreRef, snapshot => {
        const game = snapshot.val();
        callback(game ? { firebaseId: scoreRef.key, ...game } : defaultGame);
      });
    },

    unsubscribeToGamesScore() {
      if (this.unsubGamesScore) {
        this.unsubGamesScore();
        this.unsubGamesScore = null;
      }
    }
  }
}); 