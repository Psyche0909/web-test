<template>
  <div class="panorama-page">
    <div class="page-header">
      <div class="container">
        <h1>全景展示</h1>
        <p class="subtitle">徐州工业遗产虚拟漫游</p>
      </div>
    </div>
    
    <div class="container">
      <div class="page-content">
        <div class="content-intro">
          <h2>工业遗产全景体验</h2>
          <p>本页为全景地图功能演示版本：左侧地图选点，右侧进入场景并可拖拽环视、滚轮缩放，也可通过热点快速跳转到下一地点。</p>
        </div>
        
        <div class="panorama-container">
          <div class="map-panel">
            <div ref="mapRef" class="map-canvas"></div>
            <div v-if="mapLoadError" class="map-fallback">
              <p>{{ mapLoadError }}</p>
              <button class="btn btn-primary" @click="loadMap">重试地图加载</button>
            </div>
          </div>

          <div class="viewer-panel">
            <div class="viewer-header">
              <h3>{{ activeScene.name }}</h3>
              <span>{{ activeScene.category }}</span>
            </div>

            <div
              class="panorama-viewer"
              @mousedown="startDrag"
              @mousemove="onDrag"
              @mouseup="stopDrag"
              @mouseleave="stopDrag"
              @wheel.prevent="onWheel"
            >
              <div class="viewer-viewport">
                <div class="viewer-track" :style="viewerStyle"></div>

                <button
                  v-for="hotspot in activeScene.hotspots"
                  :key="hotspot.target"
                  class="hotspot"
                  :style="{ left: hotspot.x + '%', top: hotspot.y + '%' }"
                  @click="switchScene(hotspot.target)"
                >
                  {{ hotspot.label }}
                </button>
              </div>
            </div>

            <div class="viewer-control">
              <p>{{ activeScene.description }}</p>
              <div class="control-row">
                <button class="btn" @click="resetView">重置视角</button>
                <span>视角 {{ Math.round(yaw) }}°</span>
                <span>缩放 {{ zoom.toFixed(1) }}x</span>
              </div>
            </div>
          </div>
          
          <div class="panorama-instruction">
            <h3>全景浏览指南</h3>
            <ul>
              <li>点击左侧地图标记点可切换全景场景</li>
              <li>按住画面拖动可左右环视（演示效果）</li>
              <li>滚轮可缩放画面，查看细节</li>
              <li>点击热点按钮可快速跳转到其他遗产点位</li>
            </ul>
          </div>
        </div>
        
        <div class="panorama-locations">
          <h2>全景地点</h2>
          <div class="locations-grid">
            <div class="location-card" v-for="scene in scenes" :key="scene.id">
              <div class="location-image">
                <img :src="scene.image" :alt="scene.name">
              </div>
              <div class="location-info">
                <h3>{{ scene.name }}</h3>
                <p>{{ scene.description }}</p>
                <button class="btn btn-primary" @click="switchScene(scene.id)">进入全景</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

import coalMuseumImage from '@/pic/煤矿博物馆.png';
import railwayImage from '@/pic/徐州老火车站.png';
import textileImage from '@/pic/徐州毛纺厂.png';

const scenes = [
  {
    id: 'coal-museum',
    name: '徐州煤矿博物馆',
    category: '煤矿遗产',
    image: coalMuseumImage,
    position: [117.2476, 34.2537],
    description: '展示徐州煤炭工业发展脉络与采矿历史记忆，是煤矿文化的重要传播窗口。',
    hotspots: [
      { label: '前往老火车站', target: 'old-railway-station', x: 76, y: 45 },
      { label: '前往毛纺厂', target: 'textile-factory', x: 24, y: 60 }
    ]
  },
  {
    id: 'old-railway-station',
    name: '徐州老火车站',
    category: '铁路遗产',
    image: railwayImage,
    position: [117.1964, 34.2713],
    description: '见证徐州铁路枢纽地位形成的历史场景，也是近代工业交通的重要节点。',
    hotspots: [
      { label: '前往煤矿博物馆', target: 'coal-museum', x: 68, y: 43 },
      { label: '前往毛纺厂', target: 'textile-factory', x: 30, y: 66 }
    ]
  },
  {
    id: 'textile-factory',
    name: '徐州毛纺厂旧址',
    category: '纺织遗产',
    image: textileImage,
    position: [117.2148, 34.2641],
    description: '承载地方纺织工业从兴起到转型的历史记忆，体现城市产业结构变迁。',
    hotspots: [
      { label: '前往煤矿博物馆', target: 'coal-museum', x: 72, y: 47 },
      { label: '前往老火车站', target: 'old-railway-station', x: 22, y: 58 }
    ]
  }
];

const mapRef = ref(null);
const mapLoadError = ref('');
const activeSceneId = ref(scenes[0].id);
const yaw = ref(0);
const zoom = ref(1.1);
const isDragging = ref(false);

let startX = 0;
let startYaw = 0;
let mapInstance = null;
let markers = [];
let infoWindow = null;
let amapLoaderPromise = null;

const amapKey = '7f5622d472268b1a2ba677556feaacc2';
const amapSecurityJsCode = 'bd38024059fb4b3864a1d6ad5f2a0d69';
const amapScriptId = 'amap-jsapi-loader';

const activeScene = computed(() => {
  const found = scenes.find((scene) => scene.id === activeSceneId.value);
  return found || scenes[0];
});

const viewerStyle = computed(() => {
  const normalizedYaw = ((yaw.value % 360) + 360) % 360;
  const position = (normalizedYaw / 360) * 100;
  const scale = 100 + zoom.value * 55;

  return {
    backgroundImage: `url(${activeScene.value.image})`,
    backgroundPosition: `${position}% center`,
    backgroundSize: `${scale}% auto`
  };
});

const loadAmapScript = () => {
  if (window.AMap) {
    return Promise.resolve(window.AMap);
  }

  if (!amapLoaderPromise) {
    amapLoaderPromise = new Promise((resolve, reject) => {
      window._AMapSecurityConfig = {
        securityJsCode: amapSecurityJsCode
      };

      const existing = document.getElementById(amapScriptId);
      if (existing) {
        existing.addEventListener('load', () => resolve(window.AMap), { once: true });
        existing.addEventListener('error', () => reject(new Error('高德地图脚本加载失败')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = amapScriptId;
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${amapKey}&plugin=AMap.ToolBar,AMap.Scale`;
      script.async = true;
      script.onload = () => resolve(window.AMap);
      script.onerror = () => reject(new Error('高德地图脚本加载失败'));
      document.head.appendChild(script);
    });
  }

  return amapLoaderPromise;
};

const loadAmapPlugins = (plugins) => new Promise((resolve) => {
  window.AMap.plugin(plugins, () => {
    resolve(window.AMap);
  });
});

const openSceneInfo = (scene) => {
  if (!infoWindow || !mapInstance) {
    return;
  }

  infoWindow.setContent(`
    <div style="max-width:240px;line-height:1.6;">
      <strong>${scene.name}</strong><br/>
      <span style="color:#8B1A1A;">${scene.category}</span><br/>
      <span>${scene.description}</span>
    </div>
  `);
  infoWindow.open(mapInstance, scene.position);
};

const setActiveSceneById = (sceneId, fromMap = false) => {
  const scene = scenes.find((item) => item.id === sceneId);
  if (!scene) {
    return;
  }

  activeSceneId.value = scene.id;
  resetView();

  if (mapInstance && !fromMap) {
    mapInstance.setZoomAndCenter(13, scene.position);
    openSceneInfo(scene);
  }
};

const switchScene = (sceneId) => {
  setActiveSceneById(sceneId);
};

const buildMarkers = () => {
  if (!mapInstance || !window.AMap) {
    return;
  }

  markers.forEach((marker) => marker.setMap(null));
  markers = scenes.map((scene) => {
    const marker = new window.AMap.Marker({
      position: scene.position,
      title: scene.name
    });

    marker.on('click', () => {
      setActiveSceneById(scene.id, true);
      openSceneInfo(scene);
    });

    mapInstance.add(marker);
    return marker;
  });
};

const loadMap = async () => {
  mapLoadError.value = '';

  try {
    await loadAmapScript();
    await loadAmapPlugins(['AMap.ToolBar', 'AMap.Scale']);
    await nextTick();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    if (!mapRef.value) {
      return;
    }

    if (mapInstance) {
      mapInstance.destroy();
      mapInstance = null;
    }

    mapInstance = new window.AMap.Map(mapRef.value, {
      zoom: 11,
      center: [117.184811, 34.261792]
    });

    mapInstance.addControl(new window.AMap.ToolBar());
    mapInstance.addControl(new window.AMap.Scale());

    infoWindow = new window.AMap.InfoWindow({
      offset: new window.AMap.Pixel(0, -24)
    });

    buildMarkers();
    const initialScene = scenes.find((scene) => scene.id === activeSceneId.value) || scenes[0];
    mapInstance.setZoomAndCenter(13, initialScene.position);
    openSceneInfo(initialScene);
    mapInstance.resize();
  } catch (error) {
    mapLoadError.value = error instanceof Error ? error.message : '地图加载失败，请稍后再试';
  }
};

const startDrag = (event) => {
  isDragging.value = true;
  startX = event.clientX;
  startYaw = yaw.value;
};

const onDrag = (event) => {
  if (!isDragging.value) {
    return;
  }

  const delta = event.clientX - startX;
  yaw.value = startYaw - delta * 0.25;
};

const stopDrag = () => {
  isDragging.value = false;
};

const onWheel = (event) => {
  const delta = event.deltaY > 0 ? -0.08 : 0.08;
  zoom.value = Math.min(2.2, Math.max(1, zoom.value + delta));
};

const resetView = () => {
  yaw.value = 0;
  zoom.value = 1.1;
};

onMounted(() => {
  loadMap();
});

onBeforeUnmount(() => {
  if (mapInstance) {
    mapInstance.destroy();
    mapInstance = null;
  }
  markers = [];
});
</script>

<style scoped>
.panorama-page {
  margin-top: 80px;
}

.page-header {
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 3rem 0;
  text-align: center;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.page-content {
  padding: 3rem 0;
}

.content-intro {
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
}

.content-intro p {
  margin-bottom: 1rem;
  line-height: 1.8;
}

h2 {
  color: var(--color-primary);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  position: relative;
  padding-bottom: 1rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--color-accent);
}

.panorama-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.25rem;
  margin-bottom: 4rem;
}

.map-panel {
  min-height: 420px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
  position: relative;
}

.map-canvas {
  width: 100%;
  height: 100%;
  min-height: 420px;
}

.map-fallback {
  position: absolute;
  inset: 0;
  background: rgba(139, 26, 26, 0.92);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  text-align: center;
}

.viewer-panel {
  background: var(--color-white);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
}

.viewer-header h3 {
  color: var(--color-primary);
  margin-bottom: 0;
}

.viewer-header span {
  color: var(--color-secondary);
  font-size: 0.92rem;
}

.panorama-viewer {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #1f1f1f;
  cursor: grab;
}

.panorama-viewer:active {
  cursor: grabbing;
}

.viewer-viewport {
  position: relative;
  height: 300px;
}

.viewer-track {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  transition: background-size 0.2s ease;
}

.hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  background: rgba(212, 175, 55, 0.92);
  color: #2f2f2f;
  font-weight: 700;
  font-size: 0.82rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hotspot:hover {
  background: #f2d46f;
}

.viewer-control {
  display: grid;
  gap: 0.75rem;
}

.viewer-control p {
  line-height: 1.6;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.control-row .btn {
  padding: 0.4rem 0.8rem;
}

.panorama-instruction {
  grid-column: 1 / -1;
  background-color: var(--color-white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
}

.panorama-instruction h3 {
  color: var(--color-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.panorama-instruction ul {
  padding-left: 1.5rem;
}

.panorama-instruction li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.locations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.location-card {
  background-color: var(--color-white);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.location-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.location-info {
  padding: 1.5rem;
}

.location-info h3 {
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.location-info p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #a52a2a;
}

@media (max-width: 768px) {
  .panorama-container {
    grid-template-columns: 1fr;
  }

  .viewer-viewport,
  .map-canvas,
  .map-panel {
    min-height: 280px;
    height: 280px;
  }

  .locations-grid {
    grid-template-columns: 1fr;
  }
}
</style> 