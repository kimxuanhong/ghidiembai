<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  games: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['open-game']);

const hasGames = computed(() => props.games.length > 0);

// Format date
function formatDate(date) {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function openGame(index) {
  emit('open-game', index);
}
</script>

<template>
  <div class="game-history">
    <div v-if="!hasGames" class="no-games">
      Chưa có ván bài nào được ghi nhận
    </div>
    <div v-else class="games-list">
      <div 
        v-for="(game, index) in games" 
        :key="game.id" 
        class="game-item"
        @click="openGame(index)"
      >
        <div class="game-info">
          <div class="game-date">{{ formatDate(game.date) }}</div>
          <div class="game-players">{{ game.players.join(' - ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>