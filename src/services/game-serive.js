// Firebase game room service
import { createGame, getOrCreateRoom } from "@/firebase/firebase-service.js";
import { onValue, ref } from "firebase/database";
import { db } from "@/firebase/firebase-config.js";

// Constants
const CURRENT_GAME_KEY = 'currentGame';
const CURRENT_ROOM_KEY = 'currentRoom';

// Internal state
let currentRoom = getFromStorage(CURRENT_ROOM_KEY) || 'public';
let unsubGames = null;
let unsubGamesScore = null;

function getFromStorage(key) {
    return localStorage.getItem(key);
}

function saveToStorage(key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
}

function removeFromStorage(key) {
    localStorage.removeItem(key);
}

// 🔹 Get or Create Room
export async function createNewRoom(roomId) {
    const room = await getOrCreateRoom(roomId);
    await ensureRoomExists(roomId);
    setCurrentRoom(roomId);
    return room;
}

// 🔹 Create a new game
export async function createNewGame({ room, players }) {
    try {
        if (!Array.isArray(players) || players.length < 4) {
            throw new Error("Cần có ít nhất 4 người chơi hợp lệ");
        }

        const validPlayers = players.map(p => p?.trim()).filter(p => p);
        const roomId = room?.trim() || getCurrentRoom();

        await ensureRoomExists(roomId);
        setCurrentRoom(roomId);

        const savedGame = await createGame(roomId, validPlayers.length ? validPlayers : ['Bot']);
        await saveCurrentGame(savedGame);

        return savedGame;
    } catch (error) {
        console.error("Error in createNewGame:", error);
        throw error;
    }
}

// 🔹 Subscribe to all games in a room
export function subscribeToGames(roomId, callback) {
    unsubscribeToGames(); // Unsubscribe previous listener

    const gamesRef = ref(db, `rooms/${roomId}/games`);
    unsubGames = onValue(gamesRef, snapshot => {
        const data = snapshot.val();
        const games = data
            ? Object.entries(data).map(([id, value]) => ({ firebaseId: id, ...value }))
            : [];

        games.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        callback(games);
    });
}

export function unsubscribeToGames() {
    if (unsubGames) {
        unsubGames();
        unsubGames = null;
    }
}

// 🔹 Subscribe to score updates of a specific game
export function subscribeToGamesScore(roomId, gameId, defaultGame, callback) {
    unsubscribeToGamesScore(); // Unsubscribe previous listener

    const scoreRef = ref(db, `rooms/${roomId}/games/${gameId}`);
    unsubGamesScore = onValue(scoreRef, snapshot => {
        const game = snapshot.val();
        callback(game ? { firebaseId: scoreRef.key, ...game } : defaultGame);
    });
}

export function unsubscribeToGamesScore() {
    if (unsubGamesScore) {
        unsubGamesScore();
        unsubGamesScore = null;
    }
}

// 🔹 Room management
export async function ensureRoomExists(roomId) {
    if (!roomId?.trim()) roomId = 'public';
    console.log(`Ensuring room exists: ${roomId}`);
    return Promise.resolve(roomId);
}

export function setCurrentRoom(roomId) {
    removeFromStorage(CURRENT_GAME_KEY);
    currentRoom = roomId;
    saveToStorage(CURRENT_ROOM_KEY, roomId);
    return roomId;
}

export function getCurrentRoom() {
    return currentRoom;
}

// 🔹 Game state
export async function saveCurrentGame(game) {
    if (!game.id) game.id = Date.now();
    if (!game.room) game.room = getCurrentRoom();
    saveToStorage(CURRENT_GAME_KEY, game);
}

export function getCurrentGame() {
    try {
        const raw = getFromStorage(CURRENT_GAME_KEY);
        if (!raw) return null;

        const game = JSON.parse(raw);
        game.scores = game.scores || [];
        game.totalScores = game.totalScores || [0, 0, 0, 0];
        game.room = game.room || getCurrentRoom();

        if (game.room !== getCurrentRoom()) {
            removeFromStorage(CURRENT_GAME_KEY);
            console.log('Đã xóa game cũ vì không thuộc phòng hiện tại:', getCurrentRoom());
            return null;
        }

        return game;
    } catch (error) {
        console.error("Error getting current game:", error);
        return null;
    }
}

// 🔹 Open an existing game
export function openExistingGame(game) {
    if (!game?.id) {
        throw new Error("Cần có danh sách người chơi hợp lệ");
    }

    if (game.room && game.room !== getCurrentRoom()) {
        setCurrentRoom(game.room);
    }

    return saveCurrentGame(game).then(() => game);
}
