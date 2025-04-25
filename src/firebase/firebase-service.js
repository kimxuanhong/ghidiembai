import {get, push, ref, serverTimestamp, set, update} from "firebase/database";
import {db} from "@/firebase/firebase-config.js";

// 🔹 Get or Create Room
export async function getOrCreateRoom(roomId) {
    const roomRef = ref(db, "rooms/" + roomId); // Tạo reference tới phòng

    // Lấy dữ liệu phòng từ Realtime Database
    const roomSnap = await get(roomRef);

    if (roomSnap.exists()) {
        return roomSnap.val(); // Trả về dữ liệu phòng nếu phòng tồn tại
    } else {
        // Tạo mới phòng nếu chưa tồn tại
        const newRoom = {
            name: `${roomId}`,
            createdAt: serverTimestamp(),
            games: []
        };

        await set(roomRef, newRoom); // Ghi dữ liệu phòng mới vào Realtime Database
        return newRoom;
    }
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
        room: roomId
    };
    await set(newGameRef, game);
    return {...game, firebaseId: newGameRef.key};  // Trả về gameId (key của game)
}

// 🔹 Add score line to a game
export async function addScore(roomId, gameId, scoreLine) {
    const gameRef = ref(db, "rooms/" + roomId + "/games/" + gameId);
    const gameSnap = await get(gameRef);

    if (gameSnap.exists()) {
        const data = gameSnap.val();

        // Xử lý trường hợp scores hoặc totalScores chưa tồn tại
        const oldScores = Array.isArray(data.scores) ? data.scores : [];
        const oldTotalScores = Array.isArray(data.totalScores) ? data.totalScores : scoreLine.map(() => 0); // khởi tạo với 0 nếu chưa có

        const newScores = [...oldScores, scoreLine];
        const newResult = oldTotalScores.map((total, idx) => total + scoreLine[idx]);

        await update(gameRef, {
            scores: newScores,
            totalScores: newResult
        });
    }
}

// 🔹 Edit score line in a game
export async function editScore(roomId, gameId, roundIndex, newScoreLine) {
    const gameRef = ref(db, "rooms/" + roomId + "/games/" + gameId);
    const gameSnap = await get(gameRef);

    if (gameSnap.exists()) {
        const data = gameSnap.val();
        console.log(data);
        const oldLine = data.scores[roundIndex];
        const newScores = [...data.scores];
        newScores[roundIndex] = newScoreLine;

        const newResult = data.totalScores.map((val, i) =>
            val - oldLine[i] + newScoreLine[i]
        );

        await update(gameRef, {
            scores: newScores,
            totalScores: newResult
        });
    }
}

export async function closeScore(roomId, gameId) {
    const gameRef = ref(db, "rooms/" + roomId + "/games/" + gameId);
    const gameSnap = await get(gameRef);

    if (gameSnap.exists()) {
        const data = gameSnap.val();

        await update(gameRef, {
            isEnded: true
        });
    }
}
