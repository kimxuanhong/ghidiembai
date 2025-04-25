<script setup>
import { ref, onMounted } from 'vue';

const emit = defineEmits(['join-room']);
const roomInput = ref('');

function joinRoom() {
  if (roomInput.value.trim()) {
    emit('join-room', roomInput.value.trim());
    roomInput.value = '';
  }
}
</script>

<template>
  <div class="room-selector">
    <input type="text" v-model="roomInput" placeholder="Nhập mã phòng" @keyup.enter="joinRoom">
    <button class="primary-btn" @click="joinRoom">Vào phòng</button>
  </div>
</template>