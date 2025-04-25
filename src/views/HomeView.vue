<script setup>
import {onMounted, onUnmounted} from 'vue';
import {useRouter} from 'vue-router';
import {useRoomStore, useUIStore} from '../stores';
import RoomSelector from '../components/RoomSelector.vue';
import GamesList from '../components/GamesList.vue';
import PlayerNamesModal from '../components/PlayerNamesModal.vue';

// 🌐 Router và Store
const router = useRouter();
const roomStore = useRoomStore();
const uiStore = useUIStore();

// 🔹 Gọi khi chọn/nhập phòng
async function joinRoom(roomId = 'public') {
  await roomStore.joinRoom(roomId);
}

// 🔹 Tạo modal
function showNewGameModal() {
  uiStore.showPlayerNamesModal();
}

// 🔹 Chuyển tới trang game
async function handleOpenGame(index) {
  try {
    await roomStore.openGame(index);
    router.push('/scoring');
  } catch (error) {
    alert("Có lỗi khi mở ván bài. Vui lòng thử lại.");
  }
}

// 🔹 Tạo ván bài mới
async function handleStartGame(gameData) {
  try {
    await roomStore.createNewGame(gameData);
    uiStore.hidePlayerNamesModal();
    await router.push('/scoring');
  } catch (error) {
    alert("Có lỗi khi tạo ván mới. Vui lòng thử lại.");
  }
}

// Load games when mounted
onMounted(() => {
  roomStore.subscribeToGamesList();
});

// Hủy bỏ lắng nghe khi component unmount
onUnmounted(() => {
  roomStore.unsubscribeFromGamesList();
});
</script>


<template>
  <div class="container">
    <div class="header">
      <h1>Lịch Sử Ván Bài</h1>
      <div v-if="roomStore.currentRoom" class="room-badge">
        Phòng: {{ roomStore.currentRoom }}
      </div>
    </div>

    <RoomSelector @join-room="joinRoom"/>

    <GamesList
        :games="roomStore.games"
        @open-game="handleOpenGame"
    />

    <PlayerNamesModal
        :is-visible="uiStore.playerNamesModalVisible"
        :current-room="roomStore.currentRoom"
        @close="uiStore.hidePlayerNamesModal()"
        @start-game="handleStartGame"
    />

    <button id="newGameBtn" class="primary-btn" @click="showNewGameModal">
      Tạo Ván Mới
    </button>
  </div>
</template>