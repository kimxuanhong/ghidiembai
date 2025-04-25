<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'confirm']);

function confirmEndGame() {
  emit('confirm');
}

function closeModal() {
  emit('close');
}
</script>

<template>
  <div id="endGameModal" class="modal" v-if="show">
    <div class="modal-content">
      <h2>Xác nhận kết thúc</h2>
      <p class="modal-message">
        Bạn có chắc chắn muốn kết thúc ván bài này? Sau khi kết thúc sẽ không thể chỉnh sửa điểm.
      </p>
      <div class="modal-buttons">
        <button id="confirmEndGame" class="danger-btn" @click="confirmEndGame">Kết thúc</button>
        <button id="cancelEndGame" class="secondary-btn" @click="closeModal">Hủy</button>
      </div>
    </div>
  </div>
</template> 