<script setup>
defineProps({
  size: {
    type: String,
    default: '50px'
  },
  color: {
    type: String,
    default: '#4CAF50'
  }
});
</script>

<template>
  <div class="spinner-container">
    <div class="spinner" :style="{ width: size, height: size, borderTopColor: color }"></div>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  flex-direction: column;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  border-top-color: #4CAF50;
  animation: spin 0.8s linear infinite;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.spinner::after {
  content: "";
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: rgba(76, 175, 80, 0.3);
  animation: spin 1.2s linear infinite reverse;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 