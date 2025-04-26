<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  players: {
    type: Array,
    default: () => []
  },
  editingScores: {
    type: Array,
    default: null
  }
});

const emit = defineEmits(['close', 'save']);

const scores = reactive([0, 0, 0, 0]);
const selectedInput = ref(null);

// Reset scores khi modal được mở
watch(() => props.show, (isVisible) => {
  if (isVisible) {
    resetInputs();
    if (props.editingScores) {
      // Nếu đang chỉnh sửa, sử dụng điểm có sẵn
      for (let i = 0; i < props.editingScores.length && i < 4; i++) {
        scores[i] = props.editingScores[i];
      }
    }
  }
});

// Watch for changes in editingScores
watch(() => props.editingScores, (newScores) => {
  if (newScores && newScores.length) {
    for (let i = 0; i < newScores.length && i < 4; i++) {
      scores[i] = newScores[i];
    }
  }
}, { immediate: true });

function resetInputs() {
  for (let i = 0; i < 4; i++) {
    scores[i] = 0;
  }
}

function selectInput(index) {
  selectedInput.value = index;
}

function handleNumberClick(number) {
  if (selectedInput.value === null) return;
  
  // Chuyển đổi điểm hiện tại thành string, giữ dấu âm nếu có
  const currentScore = scores[selectedInput.value];
  const isNegative = currentScore < 0;
  const absCurrentScore = Math.abs(currentScore);
  
  // Nối số mới vào cuối
  const newAbsScore = parseInt(`${absCurrentScore}${number}`);
  
  // Áp dụng dấu âm nếu cần
  scores[selectedInput.value] = isNegative ? -newAbsScore : newAbsScore;
}

function handleClear() {
  if (selectedInput.value === null) return;
  
  // Đổi dấu giá trị hiện tại
  scores[selectedInput.value] = -scores[selectedInput.value];
}

function handleBackspace() {
  if (selectedInput.value === null) return;
  
  const currentScore = scores[selectedInput.value];
  const isNegative = currentScore < 0;
  let absCurrentScore = Math.abs(currentScore);
  
  // Chuyển thành string và xóa ký tự cuối
  const scoreStr = absCurrentScore.toString();
  
  if (scoreStr.length <= 1) {
    // Nếu chỉ còn 1 chữ số, reset về 0
    scores[selectedInput.value] = 0;
  } else {
    // Xóa chữ số cuối và giữ dấu
    const newAbsScore = parseInt(scoreStr.slice(0, -1));
    scores[selectedInput.value] = isNegative ? -newAbsScore : newAbsScore;
  }
}

function validateInputs() {
  // Đảm bảo có ít nhất 1 điểm khác 0
  return scores.some(score => score !== 0);
}

function saveScores() {
  emit('save', [...scores]);
}

function closeModal() {
  emit('close');
}
</script>

<template>
  <div id="scoreModal" class="modal" v-if="show">
    <div class="modal-content">
      <h3>Nhập điểm</h3>
      
      <div class="player-cards">
        <div 
          v-for="(player, index) in players" 
          :key="index" 
          class="player-card fly-in"
          :style="{ animationDelay: index * 0.1 + 's' }"
          :class="{ 'selected-player': selectedInput === index }"
          @click="selectInput(index)"
        >
          <div class="player-name">{{ player }}</div>
          <div class="player-score" :class="{ 'negative': scores[index] < 0 }">{{ scores[index] }}</div>
        </div>
      </div>
      
      <div class="current-selection fly-in" :style="{ animationDelay: '0.4s' }" v-if="selectedInput !== null">
        <p>Đang nhập điểm cho: <strong>{{ players[selectedInput] }}</strong></p>
      </div>
      <div class="current-selection fly-in" :style="{ animationDelay: '0.4s' }" v-else>
        <p>Hãy chọn người chơi</p>
      </div>
      
      <div class="number-pad">
        <button 
          v-for="num in 9" 
          :key="num" 
          class="num-btn"
          @click="handleNumberClick(num)"
          :disabled="selectedInput === null"
        >
          {{ num }}
        </button>
        <button class="num-btn" @click="handleNumberClick(0)" :disabled="selectedInput === null">0</button>
        <button class="clear-btn" @click="handleClear" :disabled="selectedInput === null">+/-</button>
        <button class="backspace-btn" @click="handleBackspace" :disabled="selectedInput === null">←</button>
      </div>
      
      <div class="modal-buttons">
        <button 
          id="confirmScore" 
          class="confirm-btn fly-in" 
          :style="{ animationDelay: '0.6s' }"
          :disabled="!validateInputs()"
          @click="saveScores"
        >
          Xác nhận
        </button>
        <button id="cancelScore" class="cancel-btn fly-in" :style="{ animationDelay: '0.65s' }" @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.player-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 15px;
}

.player-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.player-card:hover {
  background-color: #eaeaea;
}

.selected-player {
  border-color: #4CAF50;
  background-color: #e8f5e9;
}

.player-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.player-score {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4CAF50;
}

.player-score.negative {
  color: #f44336;
}

.current-selection {
  text-align: center;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: #666;
}

.number-pad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.num-btn, .clear-btn, .backspace-btn {
  padding: 15px 0;
  font-size: 1.2rem;
  border: none;
  border-radius: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.num-btn:hover:not(:disabled),
.clear-btn:hover:not(:disabled),
.backspace-btn:hover:not(:disabled) {
  background-color: #e0e0e0;
}

.num-btn:disabled,
.clear-btn:disabled,
.backspace-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn {
  background-color: #ffebee;
  color: #d32f2f;
}

.backspace-btn {
  background-color: #e8eaf6;
  color: #3949ab;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.confirm-btn, .cancel-btn {
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-weight: bold;
}

.confirm-btn {
  background-color: #4CAF50;
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #45a049;
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

/* Hiệu ứng bay vào */
.fly-in {
  animation: flyIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateX(-30px);
}

@keyframes flyIn {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style> 