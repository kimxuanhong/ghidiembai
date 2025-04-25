<script setup>
import { onMounted } from 'vue';

// Màu sắc cho confetti
const colors = ['#FFD700', '#FF6347', '#00FF7F', '#1E90FF', '#FF1493', '#ADFF2F'];

// Tạo hiệu ứng confetti
function createConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  
  // Xóa confetti hiện tại
  container.innerHTML = '';
  
  const pieces = 150;
  
  for (let i = 0; i < pieces; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Ngẫu nhiên thuộc tính confetti
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    confetti.style.width = (Math.random() * 8 + 6) + 'px';
    confetti.style.height = (Math.random() * 8 + 6) + 'px';
    confetti.style.opacity = Math.random() + 0.5;
    
    // Animation với tốc độ và độ trễ ngẫu nhiên
    const duration = Math.random() * 3 + 2;
    confetti.style.animation = `fall ${duration}s linear forwards`;
    confetti.style.animationDelay = Math.random() * 5 + 's';
    
    container.appendChild(confetti);
  }
}

onMounted(() => {
  createConfetti();
});
</script>

<template>
  <div class="confetti-container" id="confettiContainer"></div>
</template> 