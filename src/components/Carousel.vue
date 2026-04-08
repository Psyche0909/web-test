<template>
  <div class="carousel-container">
    <div class="carousel" ref="carousel">
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="carousel-slide"
        :class="{ active: currentSlide === index }"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
          <button class="btn btn-primary" @click="navigateTo(slide.link)">了解更多</button>
        </div>
      </div>
    </div>
    
    <div class="carousel-controls">
      <button class="carousel-control prev" @click="prevSlide">
        <span class="control-icon">&lt;</span>
      </button>
      <div class="carousel-indicators">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          class="indicator"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
      <button class="carousel-control next" @click="nextSlide">
        <span class="control-icon">&gt;</span>
      </button>
    </div>
    
    <div class="decorative-border"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import coalMuseumImage from '@/pic/煤矿博物馆.png';
import railwayStationImage from '@/pic/徐州老火车站.png';
import pananLakeImage from '@/pic/潘安湖公园.png';
import textileFactoryImage from '@/pic/徐州毛纺厂.png';

const slides = [
  {
    title: '徐州煤矿博物馆',
    description: '见证百年采煤历史，传承红色工业记忆',
    image: coalMuseumImage,
    link: '/heritage/coal-museum'
  },
  {
    title: '徐州老火车站',
    description: '铁路交通发展的历史见证',
    image: railwayStationImage,
    link: '/heritage/railway-station'
  },
  {
    title: '潘安湖矿坑公园',
    description: '工业遗址生态修复的典范',
    image: pananLakeImage,
    link: '/heritage/panhan-lake'
  },
  {
    title: '徐州纺织厂',
    description: '华东地区重要的纺织工业遗产',
    image: textileFactoryImage,
    link: '/heritage/textile-factory'
  }
];

const currentSlide = ref(0);
const carousel = ref(null);
let autoplayInterval = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.length) % slides.length;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const navigateTo = (link) => {
  window.location.href = link;
};

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 5000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
  }
};

onMounted(() => {
  startAutoplay();
  
  if (carousel.value) {
    carousel.value.addEventListener('mouseenter', stopAutoplay);
    carousel.value.addEventListener('mouseleave', startAutoplay);
  }
});

onBeforeUnmount(() => {
  stopAutoplay();
  
  if (carousel.value) {
    carousel.value.removeEventListener('mouseenter', stopAutoplay);
    carousel.value.removeEventListener('mouseleave', startAutoplay);
  }
});
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.carousel {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-slide {
  position: absolute;
  top: -20px;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.carousel-slide.active {
  opacity: 1;
}

.slide-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  color: var(--color-white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  background-color: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 8px;
}

.slide-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.slide-content p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.carousel-controls {
  position: absolute;
  bottom: 2rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.carousel-control {
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--color-white);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel-control:hover {
  background-color: var(--color-primary);
}

.control-icon {
  font-size: 1.2rem;
  font-weight: bold;
}

.carousel-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: var(--color-white);
  transform: scale(1.2);
}

.decorative-border {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background: linear-gradient(90deg, 
    var(--color-primary) 0%, 
    var(--color-accent) 50%, 
    var(--color-primary) 100%
  );
}

@media (max-width: 768px) {
  .carousel-container {
    height: 400px;
  }
  
  .slide-content {
    position: absolute;
    top: auto;
    left: 0;
    right: 0;
    bottom: 80px;
    transform: none;
    width: 80%;
    max-width: none;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .slide-content h2 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  
  .slide-content p {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  .carousel-controls {
    bottom: 1rem;
  }
  
  .carousel-control {
    width: 36px;
    height: 36px;
  }
  
  .control-icon {
    font-size: 1rem;
  }
  
  .indicator {
    width: 10px;
    height: 10px;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}
</style> 