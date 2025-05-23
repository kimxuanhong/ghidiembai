<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },
  currentRoom: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close', 'start-game']);

const gameRoom = ref(props.currentRoom || '');
const playerNames = reactive([
  { id: 1, name: '' },
  { id: 2, name: '' },
  { id: 3, name: '' },
  { id: 4, name: '' }
]);

// Theo dõi khi currentRoom thay đổi từ props
watch(() => props.currentRoom, (newRoom) => {
  gameRoom.value = newRoom || '';
});

// Kiểm tra xem các trường đã được điền đầy đủ chưa
const isValid = () => {
  // Kiểm tra xem ít nhất 2 người chơi đã được điền tên
  const validPlayersCount = playerNames.filter(player => player.name.trim() !== '').length;
  return validPlayersCount >= 2;
};

function startGame() {
  if (isValid()) {
    emit('start-game', {
      room: gameRoom.value,
      players: playerNames.map(player => player.name.trim() || 'Người chơi')
    });
  }
}

function closeModal() {
  resetForm();
  emit('close');
}

function resetForm() {
  gameRoom.value = props.currentRoom || '';
  playerNames.forEach(player => player.name = '');
}

// Đóng modal khi click bên ngoài
function handleOutsideClick(e) {
  if (e.target.classList.contains('modal')) {
    closeModal();
  }
}
</script>

<template>
  <div v-if="isVisible" class="modal" @click="handleOutsideClick">
    <div class="modal-content">
      <h3>Nhập Tên Người Chơi</h3>
      
      <div class="room-input-group fly-in">
        <label for="gameRoom">Mã phòng:</label>
        <input type="text" id="gameRoom" v-model="gameRoom" placeholder="Nhập mã phòng hoặc để trống">
      </div>
      
      <div class="player-name-inputs">
        <div v-for="(player, index) in playerNames" :key="player.id" class="input-group fly-in" :style="{ animationDelay: index * 0.1 + 's' }">
          <label :for="'playerName' + player.id">Người chơi {{ player.id }}:</label>
          <input 
            type="text" 
            :id="'playerName' + player.id" 
            v-model="player.name" 
            placeholder="Nhập tên"
          >
        </div>
      </div>
      
      <div class="modal-buttons">
        <button 
          id="startGameBtn" 
          class="confirm-btn fly-in" 
          :style="{ animationDelay: '0.5s' }"
          :disabled="!isValid()"
          @click="startGame"
        >
          Bắt Đầu
        </button>
        <button id="cancelNewGame" class="cancel-btn fly-in" :style="{ animationDelay: '0.6s' }" @click="closeModal">Hủy</button>
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
  color: #2E7D32;
  font-size: 1.5rem;
}

.room-input-group {
  margin-bottom: 20px;
}

.room-input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1976D2;
}

.room-input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  color: #37474F;
}

.room-input-group input:focus {
  border-color: #1976D2;
  outline: none;
}

.player-name-inputs {
  margin-bottom: 20px;
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #1976D2;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;
  color: #37474F;
}

.input-group input:focus {
  border-color: #1976D2;
  outline: none;
  background-color: #E3F2FD;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
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
  background-color: #1976D2;
  color: white;
}

.confirm-btn:hover:not(:disabled) {
  background-color: #1565C0;
}

.confirm-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: #f5f5f5;
  color: #424242;
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