<script setup>
import { ref, reactive, onMounted, watch } from 'vue';

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

onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
});

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
  
  const currentScore = scores[selectedInput.value];
  const newScore = parseInt(`${currentScore}${number}`);
  scores[selectedInput.value] = newScore;
}

function handleClear() {
  if (selectedInput.value !== null) {
    scores[selectedInput.value] = -scores[selectedInput.value];
  }
}

function handleBackspace() {
  if (selectedInput.value === null) return;
  
  const currentScore = scores[selectedInput.value].toString();
  if (currentScore.length <= 1) {
    scores[selectedInput.value] = 0;
  } else {
    scores[selectedInput.value] = parseInt(currentScore.slice(0, -1));
  }
}

function handleKeyDown(e) {
  if (!props.show) return;
  
  if (e.key === 'Enter') {
    if (validateInputs()) {
      saveScores();
    }
  } else if (e.key === 'Escape') {
    closeModal();
  } else if (/^\d$/.test(e.key)) {
    // Numeric keys
    if (selectedInput.value !== null) {
      handleNumberClick(e.key);
    }
  } else if (e.key === '-' || e.key === '+') {
    if (selectedInput.value !== null) {
      handleClear();
    }
  } else if (e.key === 'Backspace') {
    if (selectedInput.value !== null) {
      handleBackspace();
    }
  }
}

function validateInputs() {
  // Đảm bảo có ít nhất 1 điểm được nhập
  return scores.some(score => score !== null);
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
      <div class="player-inputs">
        <div 
          v-for="(player, index) in players" 
          :key="index" 
          class="input-group"
        >
          <label :id="`label${index+1}`" :for="`score${index+1}`">{{ player }}:</label>
          <input 
            type="number" 
            :id="`score${index+1}`" 
            v-model="scores[index]"
            @focus="selectInput(index)"
            :class="{ 'selected-input': selectedInput === index }"
          >
        </div>
      </div>
      
      <div class="number-pad">
        <button 
          v-for="num in 9" 
          :key="num" 
          class="num-btn"
          @click="handleNumberClick(num)"
        >
          {{ num }}
        </button>
        <button class="num-btn" @click="handleNumberClick(0)">0</button>
        <button class="clear-btn" @click="handleClear">+/-</button>
        <button class="backspace-btn" @click="handleBackspace">←</button>
      </div>
      
      <div class="modal-buttons">
        <button 
          id="confirmScore" 
          class="confirm-btn" 
          :disabled="!validateInputs()"
          @click="saveScores"
        >
          Xác nhận
        </button>
        <button id="cancelScore" class="secondary-btn" @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template> 