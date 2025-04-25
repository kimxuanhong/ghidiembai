import { get, push, ref, serverTimestamp, set, update } from "firebase/database";
import { db } from "@/firebase/firebase-config.js";

// 🔹 Helper function to fetch room data
async function getRoomData(roomId) {
    const roomRef = ref(db, "rooms/" + roomId);
    const roomSnap = await get(roomRef);
    return roomSnap.exists() ? roomSnap.val() : null;
}

// 🔹 Ensure that scores and totalScores exist and are initialized
function initializeGameScores(gameData, scoreLine) {
    const oldScores = Array.isArray(gameData.scores) ? gameData.scores : [];
    const oldTotalScores = Array.isArray(gameData.totalScores)
        ? gameData.totalScores
        : scoreLine.map(() => 0); // Khởi tạo với 0 nếu chưa có
    return { oldScores, oldTotalScores };
}

// 🔹 Get or Create Room
export async function getOrCreateRoom(roomId) {
    let room = await getRoomData(roomId);
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
}

// 🔹 Create a new Game
export async function createGame(roomId, players) {
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
}

// 🔹 Add score line to a game
export async function addScore(roomId, gameId, scoreLine) {
    const gameRef = ref(db, `rooms/${roomId}/games/${gameId}`);
    const gameSnap = await get(gameRef);
    if (gameSnap.exists()) {
        const data = gameSnap.val();
        const { oldScores, oldTotalScores } = initializeGameScores(data, scoreLine);
        const newScores = [...oldScores, scoreLine];
        const newResult = oldTotalScores.map((total, idx) => total + scoreLine[idx]);
        await update(gameRef, { scores: newScores, totalScores: newResult });
    }
}

// 🔹 Edit score line in a game
export async function editScore(roomId, gameId, roundIndex, newScoreLine) {
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
}

// 🔹 Close game (end game)
export async function closeScore(roomId, gameId) {
    const gameRef = ref(db, `rooms/${roomId}/games/${gameId}`);
    const gameSnap = await get(gameRef);
    if (gameSnap.exists()) {
        await update(gameRef, { isEnded: true });
    }
}
