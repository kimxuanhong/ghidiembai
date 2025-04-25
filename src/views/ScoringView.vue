<script setup>
import {onMounted, onUnmounted, ref, watch} from 'vue';
import {useRouter} from 'vue-router';
import {useGameStore, useUIStore} from '../stores';
import ConfettiContainer from '../components/ConfettiContainer.vue';
import ScoreTable from '../components/ScoreTable.vue';
import ScoreModal from '../components/ScoreModal.vue';
import EndGameModal from '../components/EndGameModal.vue';

const router = useRouter();
const gameStore = useGameStore();
const uiStore = useUIStore();
const showConfetti = ref(false);

// Cập nhật trạng thái confetti dựa vào trạng thái game
function updateConfettiState() {
  // Chỉ hiển thị confetti khi game đã kết thúc và có người thắng
  showConfetti.value = gameStore.isGameEnded && !!gameStore.winnerMessage;
}

onMounted(() => {
  // Khởi tạo game và ẩn confetti ban đầu
  showConfetti.value = false;
  
  const success = gameStore.initGame();
  if (!success) {
    alert('Không tìm thấy thông tin ván bài!');
    router.push('/');
    return;
  }
  
  // Cập nhật trạng thái confetti ban đầu
  updateConfettiState();
});

// Theo dõi thay đổi trạng thái game để cập nhật confetti
watch(() => [gameStore.isGameEnded, gameStore.winnerMessage, gameStore.game?.firebaseId], () => {
  updateConfettiState();
}, { immediate: true });

onUnmounted(() => {
  gameStore.cleanupSubscriptions();
  showConfetti.value = false;
});

function goBack() {
  router.push('/');
}

function showAddScoreModal() {
  gameStore.setEditingRowIndex(null);
  uiStore.showScoreModal();
}

function editRow(index) {
  if (gameStore.isGameEnded) return;

  gameStore.setEditingRowIndex(index);
  uiStore.showScoreModal();
}

async function saveScores(scores) {
  try {
    const success = await gameStore.saveScores(scores);
    if (!success) {
      alert("Có lỗi xảy ra khi lưu điểm. Hệ thống sẽ thử lưu cục bộ.");
    }
    uiStore.hideScoreModal();
  } catch (error) {
    console.error("Lỗi khi lưu điểm:", error);
    alert("Có lỗi xảy ra khi lưu điểm. Hệ thống sẽ thử lưu cục bộ.");
    uiStore.hideScoreModal();
  }
}

async function endGame() {
  try {
    const success = await gameStore.endGame();
    if (!success) {
      alert("Có lỗi xảy ra khi kết thúc ván đấu. Vui lòng thử lại.");
    }
    uiStore.hideEndGameModal();
  } catch (error) {
    console.error("Lỗi khi kết thúc game:", error);
    alert("Có lỗi xảy ra khi kết thúc ván đấu. Vui lòng thử lại.");
  }
}
</script>

<template>
  <div class="container" id="content" v-if="gameStore.game">
    <ConfettiContainer v-if="showConfetti"/>

    <div v-if="gameStore.winnerMessage" class="winner-message">
      {{ gameStore.winnerMessage }}
    </div>

    <div class="header">
      <h1>Ghi Điểm Ván Bài</h1>
      <a @click="goBack" class="back-btn" id="backButton">&larr; Trở về</a>
      <div v-if="gameStore.currentRoom" class="room-badge">
        Phòng: {{ gameStore.currentRoom }}
      </div>
    </div>

    <div id="gameStatus" v-if="gameStore.gameStatus" :style="{'display': gameStore.gameStatus ? 'block' : 'none'}">
      {{ gameStore.gameStatus }}
    </div>

    <div class="score-section" :class="{'game-ended': gameStore.isGameEnded}">
      <div class="table-header" v-if="!gameStore.isGameEnded">
        <button id="endGameBtn" class="danger-btn small-btn" @click="uiStore.showEndGameModal()">
          Kết thúc ván
        </button>
      </div>

      <ScoreTable
          :game="gameStore.game"
          :totalScores="gameStore.totalScores"
          :winnerIndex="gameStore.isGameEnded ? gameStore.winnerIndex : -1"
          @edit-row="editRow"
      />
    </div>

    <button v-if="!gameStore.isGameEnded" id="addScoreBtn" class="primary-btn" @click="showAddScoreModal">
      Thêm điểm mới
    </button>

    <ScoreModal
        v-if="uiStore.scoreModalVisible"
        :show="uiStore.scoreModalVisible"
        :players="gameStore.game.players"
        :editingScores="gameStore.editingRowIndex !== null ? gameStore.game.scores[gameStore.editingRowIndex] : null"
        @close="uiStore.hideScoreModal()"
        @save="saveScores"
    />

    <EndGameModal
        v-if="uiStore.endGameModalVisible"
        :show="uiStore.endGameModalVisible"
        @close="uiStore.hideEndGameModal()"
        @confirm="endGame"
    />
  </div>
</template>