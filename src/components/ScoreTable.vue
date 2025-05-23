<script setup>
import {defineProps, defineEmits, computed} from 'vue';

const props = defineProps({
  game: {
    type: Object,
    required: true
  },
  totalScores: {
    type: Array,
    default: () => [0, 0, 0, 0]
  },
  winnerIndex: {
    type: Number,
    default: -1
  }
});

// Tạo danh sách điểm đảo ngược
const reversedScores = computed(() => {
  return [...(props.game?.scores || [])].reverse();
});

const emit = defineEmits(['edit-row']);

function handleRowClick(index) {
  if (props.game.isEnded) return;
  // Để click vào dòng đảo ngược phản ánh đúng chỉ số trong mảng gốc
  const originalIndex = props.game.scores.length - 1 - index;
  emit('edit-row', originalIndex);
}
</script>

<template>
  <div class="score-table-container">
    <table id="scoreTable">
      <thead>
        <tr>
          <th>Vòng</th>
          <th v-for="(player, index) in game.players" :key="index" :id="`player${index+1}Header`" >
            <div style="display: flex; flex-direction: column; align-items: center;">
              <span>{{ player }}</span>
              <span style="color: #e74c3c; font-weight: bold;">
              ({{ totalScores[index] }})
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody id="scoreTableBody">
        <tr 
          v-for="(round, index) in reversedScores"
          :key="index"
          @click="handleRowClick(index)"
          :style="{ cursor: game.isEnded ? 'default' : 'pointer' }"
        >
          <td style="color: #ffa100">{{ reversedScores.length - index }}</td>
          <td v-for="(score, scoreIndex) in round" :key="scoreIndex">
            {{ score !== undefined ? score : 0 }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr id="totalScores">
          <td>Tổng</td>
          <td 
            v-for="(score, index) in totalScores" 
            :key="index"
            :class="{ 'winner': winnerIndex === index }"
          >
            {{ score }}
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template> 