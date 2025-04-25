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
      <h2>Nhập Tên Người Chơi</h2>
      
      <div class="room-input-group">
        <label for="gameRoom">Mã phòng:</label>
        <input type="text" id="gameRoom" v-model="gameRoom" placeholder="Nhập mã phòng hoặc để trống">
      </div>
      
      <div class="player-name-inputs">
        <div v-for="player in playerNames" :key="player.id" class="input-group">
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
          class="confirm-btn" 
          :class="{ disabled: !isValid() }"
          @click="startGame"
        >
          Bắt Đầu
        </button>
        <button id="cancelNewGame" class="cancel-btn" @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template>