<script setup>
import { ref, computed } from 'vue';
import { useUIStore } from '../stores';
import LoadingSpinner from './LoadingSpinner.vue';

const props = defineProps({
  games: {
    type: Array,
    default: () => []
  }
});

const uiStore = useUIStore();

const reversedScores = computed(() => {
  return [...(props.games || [])].reverse();
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
  const originalIndex = props.games.length - 1 - index;
  emit('open-game', originalIndex);
}
</script>

<template>
  <div class="game-history">
    <LoadingSpinner v-if="uiStore.isLoading" />
    
    <div v-else-if="!hasGames" class="no-games">
      Chưa có ván bài nào được ghi nhận
    </div>
    
    <div v-else class="games-list">
      <div 
        v-for="(game, index) in reversedScores"
        :key="game.id" 
        class="game-item fly-in"
        :style="{ animationDelay: index * 0.1 + 's' }"
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

<style scoped>
.games-list {
  overflow: hidden;
}

.game-item {
  animation: flyIn 0.6s ease-out forwards;
  opacity: 0;
  transform: translateX(-50px);
}

@keyframes flyIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>