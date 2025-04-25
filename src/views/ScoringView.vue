<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import ConfettiContainer from '../components/ConfettiContainer.vue';
import ScoreTable from '../components/ScoreTable.vue';
import ScoreModal from '../components/ScoreModal.vue';
import EndGameModal from '../components/EndGameModal.vue';
import {
  getCurrentGame,
  getCurrentRoom, saveCurrentGame,
  subscribeToGamesScore,
  unsubscribeToGamesScore
} from "@/services/game-serive.js";
import {addScore, closeScore, editScore} from "@/firebase/firebase-service.js";

const router = useRouter();
const currentRoom = ref(getCurrentRoom());
const game = ref(null);
const showScoreModal = ref(false);
const showEndGameModal = ref(false);
const editingRowIndex = ref(null);
const gameStatus = ref('');
const winnerMessage = ref('');

// Tính toán các tổng điểm
const totalScores = computed(() => {
  if (!game.value || !game.value.scores) return [0, 0, 0, 0];

  const totals = [0, 0, 0, 0];
  game.value.scores.forEach(scores => {
    if (!scores) return;

    scores.forEach((score, index) => {
      if (typeof score === 'number') {
        totals[index] += score;
      }
    });
  });

  return totals;
});

// Tính toán người chiến thắng
const winnerIndex = computed(() => {
  return totalScores.value.reduce((maxIndex, score, index, array) =>
      score > array[maxIndex] ? index : maxIndex, 0);
});

// Kiểm tra xem game đã kết thúc chưa
const isGameEnded = computed(() => {
  return game.value && game.value.isEnded;
});

onMounted(() => {
  // Tải thông tin game hiện tại
  const currentGame = getCurrentGame();
  if (!currentGame) {
    alert('Không tìm thấy thông tin ván bài!');
    router.push('/');
    return;
  }

  subscribeToGamesScore(getCurrentRoom(), currentGame.firebaseId, currentGame, dbGame => {
    game.value = dbGame;

    // Đảm bảo các thuộc tính cần thiết tồn tại
    if (!game.value.scores) {
      game.value.scores = [];
    }

    if (!game.value.totalScores) {
      game.value.totalScores = [0, 0, 0, 0];
    }

    saveCurrentGame(game.value);

    // Cập nhật trạng thái nếu game đã kết thúc
    if (game.value.isEnded) {
      displayWinner();
    }
  })
});

onUnmounted(() => {
  unsubscribeToGamesScore();
});

function goBack() {
  router.push('/');
}

function showAddScoreModal() {
  editingRowIndex.value = null;
  showScoreModal.value = true;
}

function editRow(index) {
  if (isGameEnded.value) return;

  editingRowIndex.value = index;
  showScoreModal.value = true;
}

function displayWinner() {
  if (!game.value || !game.value.players) return;

  gameStatus.value = 'Game đã kết thúc';
  const winner = game.value.players[winnerIndex.value];
  winnerMessage.value = `${winner} chiến thắng! 🎉`;
}

async function saveScores(scores) {
  try {
    if (editingRowIndex.value !== null) {
      // Cập nhật điểm cho vòng hiện có
      await editScore(getCurrentRoom(), game.value.firebaseId, editingRowIndex.value, scores)
    } else {
      // Thêm điểm mới vào đầu mảng rounds
      await addScore(getCurrentRoom(), game.value.firebaseId, scores)
    }
    showScoreModal.value = false;
    editingRowIndex.value = null;
  } catch (error) {
    console.error("Lỗi khi lưu điểm:", error);
    alert("Có lỗi xảy ra khi lưu điểm. Hệ thống sẽ thử lưu cục bộ.");
    // Still update UI even if save fails
    showScoreModal.value = false;
    editingRowIndex.value = null;
  }
}

async function endGame() {
  try {
    // Đặt trạng thái game là đã kết thúc
    game.value.isEnded = true;
    // Lưu ngày giờ kết thúc
    game.value.endDate = new Date().toISOString();
    // Lưu game
    await closeScore(getCurrentRoom(), game.value.firebaseId);

    // Cập nhật UI
    displayWinner();

    // Đóng modal xác nhận
    showEndGameModal.value = false;

  } catch (error) {
    console.error("Lỗi khi kết thúc game:", error);
    alert("Có lỗi xảy ra khi kết thúc ván đấu. Vui lòng thử lại.");
  }
}
</script>

<template>
  <div class="container" id="content" v-if="game">
    <ConfettiContainer v-if="isGameEnded"/>

    <div v-if="winnerMessage" class="winner-message">
      {{ winnerMessage }}
    </div>

    <div class="header">
      <h1>Ghi Điểm Ván Bài</h1>
      <button class="back-btn" @click="goBack">&larr; Trở về</button>
      <div v-if="currentRoom" class="room-badge">
        Phòng: {{ currentRoom }}
      </div>
    </div>

    <div id="gameStatus" v-if="gameStatus" :style="{'display': gameStatus ? 'block' : 'none'}">
      {{ gameStatus }}
    </div>

    <div class="score-section" :class="{'game-ended': isGameEnded}">
      <div class="table-header" v-if="!isGameEnded">
        <button id="endGameBtn" class="danger-btn small-btn" @click="showEndGameModal = true">
          Kết thúc ván
        </button>
      </div>

      <ScoreTable
          :game="game"
          :totalScores="totalScores"
          :winnerIndex="isGameEnded ? winnerIndex : -1"
          @edit-row="editRow"
      />
    </div>

    <button v-if="!isGameEnded" id="addScoreBtn" class="primary-btn" @click="showAddScoreModal">
      Thêm điểm mới
    </button>

    <ScoreModal
        v-if="showScoreModal"
        :show="showScoreModal"
        :players="game.players"
        :editingScores="editingRowIndex !== null ? game.scores[editingRowIndex] : null"
        @close="showScoreModal = false"
        @save="saveScores"
    />

    <EndGameModal
        v-if="showEndGameModal"
        :show="showEndGameModal"
        @close="showEndGameModal = false"
        @confirm="endGame"
    />
  </div>
</template>