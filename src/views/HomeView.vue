<script setup>
import {onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import RoomSelector from '../components/RoomSelector.vue';
import GamesList from '../components/GamesList.vue';
import PlayerNamesModal from '../components/PlayerNamesModal.vue';
import {
  createNewGame,
  createNewRoom,
  getCurrentRoom,
  openExistingGame,
  subscribeToGames,
  unsubscribeToGames
} from "@/services/game-serive.js";

// 🌐 Router
const router = useRouter();

// 🔹 State
const currentRoom = ref(getCurrentRoom());
const games = ref([]);
const showPlayerNamesModal = ref(false);

// 🔹 Gọi khi chọn/nhập phòng
async function joinRoom(roomId = 'public') {
  await createNewRoom(roomId);
  subscribeToGames(currentRoom.value = roomId, (gamesArray) => {
    games.value = gamesArray;
  });
}

// 🔹 Tạo modal
function showNewGameModal() {
  showPlayerNamesModal.value = true;
}

// 🔹 Chuyển tới trang game
function handleOpenGame(index) {
  try {
    const game = games.value[index];
    openExistingGame(game);
    router.push('/scoring');
  } catch (error) {
    console.error("Error creating new game:", error);
    alert("Có lỗi khi tạo ván mới. Vui lòng thử lại.");
  }
}

// 🔹 Tạo ván bài mới
async function handleStartGame(gameData) {
  try {
    await createNewGame(gameData);
    showPlayerNamesModal.value = false;
    await router.push('/scoring');
  } catch (error) {
    console.error("Error creating new game:", error);
    alert("Có lỗi khi tạo ván mới. Vui lòng thử lại.");
  }
}

// Load games when mounted
onMounted(() => {
  subscribeToGames(getCurrentRoom(), (gamesArray) => {
    games.value = gamesArray;
  });
});

// Hủy bỏ lắng nghe khi component unmount
onUnmounted(() => {
  unsubscribeToGames();
});
</script>


<template>
  <div class="container">
    <div class="header">
      <h1>Lịch Sử Ván Bài</h1>
      <div v-if="currentRoom" class="room-badge">
        Phòng: {{ currentRoom }}
      </div>
    </div>

    <RoomSelector @join-room="joinRoom"/>

    <GamesList
        :games="games"
        @open-game="handleOpenGame"
    />

    <PlayerNamesModal
        :is-visible="showPlayerNamesModal"
        :current-room="currentRoom"
        @close="showPlayerNamesModal = false"
        @start-game="handleStartGame"
    />

    <button id="newGameBtn" class="primary-btn" @click="showNewGameModal">
      Tạo Ván Mới
    </button>
  </div>
</template>