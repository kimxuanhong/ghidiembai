<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  players: {
    type: Array,
    default: () => []
  },
  totalRounds: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['close', 'newGame']);

const winner = computed(() => {
  if (!props.players || props.players.length === 0) return null;
  
  // Sort players by score in descending order
  const sortedPlayers = [...props.players].sort((a, b) => b.score - a.score);
  
  // Return the player with highest score
  return sortedPlayers[0];
});

const otherPlayers = computed(() => {
  if (!props.players || props.players.length <= 1) return [];
  
  // Sort players by score in descending order (excluding winner)
  const sortedPlayers = [...props.players]
    .sort((a, b) => b.score - a.score)
    .slice(1);
  
  return sortedPlayers;
});

function startNewGame() {
  emit('newGame');
}

function closeModal() {
  emit('close');
}
</script>

<template>
  <div id="gameFinishedModal" class="modal" v-if="show">
    <div class="modal-content">
      <h2>Trò chơi kết thúc!</h2>
      
      <div v-if="winner" class="winner-section">
        <h3>Người chiến thắng</h3>
        <div class="winner">
          <div class="player-name">{{ winner.name }}</div>
          <div class="player-score">{{ winner.score }} điểm</div>
        </div>
      </div>
      
      <div v-if="otherPlayers.length > 0" class="other-players">
        <h3>Thứ hạng</h3>
        <div v-for="(player, index) in otherPlayers" :key="index" class="player-result">
          <div class="player-name">{{ player.name }}</div>
          <div class="player-score">{{ player.score }} điểm</div>
        </div>
      </div>
      
      <div class="game-stats">
        <p>Số vòng đã chơi: {{ totalRounds }}</p>
      </div>
      
      <div class="modal-buttons">
        <button id="newGameBtn" class="primary-btn" @click="startNewGame">Trò chơi mới</button>
        <button id="closeGameBtn" class="secondary-btn" @click="closeModal">Đóng</button>
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
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.8rem;
}

h3 {
  color: #555;
  margin: 15px 0 10px;
  font-size: 1.4rem;
}

.winner-section {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  border-left: 4px solid gold;
}

.winner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.player-result {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.player-name {
  font-weight: 500;
}

.player-score {
  font-weight: bold;
}

.other-players {
  margin-bottom: 20px;
}

.game-stats {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 10px 15px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

.primary-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.primary-btn:hover {
  background-color: #45a049;
}

.secondary-btn {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ddd;
}

.secondary-btn:hover {
  background-color: #e9ecef;
}
</style> 