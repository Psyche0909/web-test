<template>
  <div class="guide-page">
    <section class="guide-header">
      <div class="container">
        <h1>智能导览</h1>
        <p>基于高德地图 API 的导览页面，当前已完成地图底图接入和基础控件。</p>
      </div>
    </section>

    <section class="guide-content">
      <div class="container">
        <div class="guide-layout">
          <div class="map-panel">
            <div class="map-toolbar">
              <input
                v-model.trim="searchKeyword"
                class="search-input"
                type="text"
                placeholder="搜索地点，例如：徐州博物馆"
                @keyup.enter="searchPlace"
              />
              <button class="toolbar-btn" @click="searchPlace">搜索</button>
              <button class="toolbar-btn secondary" @click="clearRoute">清空路线</button>
            </div>

            <div ref="mapRef" class="map-canvas"></div>

            <div v-if="activeSite" class="site-card">
              <div class="site-card-header">
                <h3>{{ activeSite.name }}</h3>
                <span class="site-type">{{ activeSite.category }}</span>
              </div>
              <p>{{ activeSite.intro }}</p>
              <div class="site-card-actions">
                <button class="action-btn" @click="playSiteIntro(activeSite)">语音播放</button>
                <button class="action-btn secondary" @click="stopSpeech">停止播报</button>
              </div>
            </div>

            <div v-if="loading" class="map-overlay">
              正在加载高德地图...
            </div>

            <div v-if="loadError" class="map-overlay error">
              <p>{{ loadError }}</p>
              <button class="retry-btn" @click="loadMap">重试加载</button>
            </div>
          </div>

          <aside class="guide-tip">
            <h2>交互导览</h2>

            <div class="route-mode-group">
              <button
                class="mode-btn"
                :class="{ active: routeMode === 'driving' }"
                @click="setRouteMode('driving')"
              >
                驾车路线
              </button>
              <button
                class="mode-btn"
                :class="{ active: routeMode === 'walking' }"
                @click="setRouteMode('walking')"
              >
                步行路线
              </button>
            </div>

            <p class="status-text">{{ routeStatus }}</p>

            <div v-if="searchResults.length" class="search-result-box">
              <h3>搜索结果</h3>
              <ul>
                <li v-for="result in searchResults" :key="result.id || `${result.name}-${result.location}`">
                  <button class="result-item" @click="useSearchResult(result)">
                    <strong>{{ result.name }}</strong>
                    <span>{{ result.address || '徐州市' }}</span>
                  </button>
                </li>
              </ul>
            </div>

            <h2>页面说明</h2>
            <ul>
              <li>点击任意遗产点位会弹出简介，并可直接语音讲解。</li>
              <li>允许定位后，接近遗产点位会自动浮出介绍并触发一次播报。</li>
              <li>当前内置煤矿、铁路、纺织三类示例点位，可继续扩展。</li>
            </ul>

            <p class="status-text">定位状态：{{ locationStatus }}</p>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const mapRef = ref(null);
const loading = ref(true);
const loadError = ref('');
const activeSite = ref(null);
const locationStatus = ref('等待定位授权');
const searchKeyword = ref('');
const searchResults = ref([]);
const routeMode = ref('driving');
const routeStatus = ref('请选择点位或搜索地点后开始路径规划');

const amapKey = '7f5622d472268b1a2ba677556feaacc2';
const amapSecurityJsCode = 'bd38024059fb4b3864a1d6ad5f2a0d69';
const amapScriptId = 'amap-jsapi-loader';

let mapInstance = null;
let amapLoaderPromise = null;
let infoWindow = null;
let locationMarker = null;
let geoWatchId = null;
let userPosition = null;
const markerList = [];
let searchMarker = null;
const autoPlayedSiteIds = new Set();
let placeSearchService = null;
let drivingService = null;
let walkingService = null;

const proximityMeters = 300;

const heritageSites = [
  {
    id: 'coal-museum',
    name: '徐州煤矿博物馆',
    category: '煤矿遗产',
    position: [117.2476, 34.2537],
    intro: '徐州煤矿博物馆是中国煤炭工业历史的重要展示窗口，集中呈现徐州煤炭开采百年发展脉络。'
  },
  {
    id: 'hanqiao-coal-mine',
    name: '韩桥煤矿旧址',
    category: '煤矿遗产',
    position: [117.4978, 34.4392],
    intro: '韩桥煤矿旧址见证了徐州近现代煤矿工业的发展历程，是矿业文化与工人精神的重要承载地。'
  },
  {
    id: 'old-railway-station',
    name: '徐州老火车站',
    category: '铁路遗产',
    position: [117.1964, 34.2713],
    intro: '徐州老火车站是区域铁路交通发展的历史见证，体现了徐州作为铁路枢纽的工业价值。'
  },
  {
    id: 'textile-factory',
    name: '徐州毛纺厂旧址',
    category: '纺织遗产',
    position: [117.2148, 34.2641],
    intro: '徐州毛纺厂旧址记录了地方纺织工业的兴盛与转型，是徐州工业文化的重要组成部分。'
  }
];

const loadAmapScript = () => {
  if (window.AMap) {
    return Promise.resolve(window.AMap);
  }

  if (!amapLoaderPromise) {
    amapLoaderPromise = new Promise((resolve, reject) => {
      window._AMapSecurityConfig = {
        securityJsCode: amapSecurityJsCode
      };

      const exist = document.getElementById(amapScriptId);
      if (exist) {
        exist.addEventListener('load', () => resolve(window.AMap), { once: true });
        exist.addEventListener('error', () => reject(new Error('高德地图脚本加载失败')), { once: true });
        return;
      }

      const script = document.createElement('script');
      script.id = amapScriptId;
      script.src = `https://webapi.amap.com/maps?v=2.0&key=${amapKey}&plugin=AMap.ToolBar,AMap.Scale,AMap.PlaceSearch,AMap.Driving,AMap.Walking`;
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

const destroyMap = () => {
  stopSpeech();

  if (geoWatchId !== null && navigator.geolocation) {
    navigator.geolocation.clearWatch(geoWatchId);
    geoWatchId = null;
  }

  if (mapInstance) {
    mapInstance.destroy();
    mapInstance = null;
  }

  placeSearchService = null;
  drivingService = null;
  walkingService = null;
  searchMarker = null;
  searchResults.value = [];
};

const stopSpeech = () => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

const closeSiteCard = () => {
  activeSite.value = null;
  stopSpeech();
};

const playSiteIntro = (site) => {
  if (!window.speechSynthesis) {
    return;
  }

  stopSpeech();

  const text = `${site.name}，${site.intro}`;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-CN';
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

const getDistanceMeters = (lng1, lat1, lng2, lat2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const earthRadius = 6378137;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
};

const openSiteInfo = (site, autoSpeak = false) => {
  activeSite.value = site;

  if (infoWindow && mapInstance) {
    infoWindow.setContent(`
      <div style="max-width:260px;line-height:1.6;">
        <strong>${site.name}</strong><br/>
        <span style="color:#8B1A1A;">${site.category}</span><br/>
        <span>${site.intro}</span>
      </div>
    `);
    infoWindow.open(mapInstance, site.position);
  }

  if (autoSpeak) {
    playSiteIntro(site);
  }

  planRouteTo(site.position, site.name);
};

const setRouteMode = (mode) => {
  routeMode.value = mode;
  routeStatus.value = mode === 'driving' ? '已切换为驾车路线' : '已切换为步行路线';
};

const getRouteStart = () => {
  if (userPosition) {
    return [userPosition.lng, userPosition.lat];
  }
  if (locationMarker) {
    const pos = locationMarker.getPosition();
    return [pos.lng, pos.lat];
  }
  if (mapInstance) {
    const center = mapInstance.getCenter();
    return [center.lng, center.lat];
  }
  return [117.184811, 34.261792];
};

const clearRoute = () => {
  if (drivingService) {
    drivingService.clear();
  }
  if (walkingService) {
    walkingService.clear();
  }
  routeStatus.value = '路线已清空';
};

const planRouteTo = (targetPosition, targetName = '目标位置') => {
  if (!mapInstance) {
    return;
  }

  const start = getRouteStart();

  if (routeMode.value === 'driving') {
    if (!drivingService) {
      routeStatus.value = '驾车插件未就绪，请稍后重试';
      return;
    }
    walkingService?.clear();
    drivingService.search(start, targetPosition, (status) => {
      routeStatus.value = status === 'complete' ? `已规划驾车路线：前往 ${targetName}` : '驾车路径规划失败';
    });
    return;
  }

  if (!walkingService) {
    routeStatus.value = '步行插件未就绪，请稍后重试';
    return;
  }
  drivingService?.clear();
  walkingService.search(start, targetPosition, (status) => {
    routeStatus.value = status === 'complete' ? `已规划步行路线：前往 ${targetName}` : '步行路径规划失败';
  });
};

const useSearchResult = (poi) => {
  if (!poi || !poi.location || !mapInstance) {
    return;
  }

  closeSiteCard();

  const target = [poi.location.lng, poi.location.lat];

  if (!searchMarker) {
    searchMarker = new window.AMap.Marker({
      position: target,
      title: poi.name
    });
    mapInstance.add(searchMarker);
  } else {
    searchMarker.setPosition(target);
    searchMarker.setTitle(poi.name);
  }

  mapInstance.setZoomAndCenter(14, target);

  if (infoWindow) {
    infoWindow.setContent(`
      <div style="max-width:260px;line-height:1.6;">
        <strong>${poi.name}</strong><br/>
        <span>${poi.address || '徐州市'}</span>
      </div>
    `);
    infoWindow.open(mapInstance, target);
  }

  planRouteTo(target, poi.name);
};

const searchPlace = () => {
  if (!searchKeyword.value) {
    routeStatus.value = '请先输入要搜索的地点';
    return;
  }

  closeSiteCard();

  if (!placeSearchService) {
    routeStatus.value = '搜索插件未就绪，请稍后重试';
    return;
  }

  routeStatus.value = '正在搜索地点...';

  placeSearchService.search(searchKeyword.value, (status, result) => {
    if (status !== 'complete' || !result?.poiList?.pois?.length) {
      searchResults.value = [];
      routeStatus.value = '未找到相关地点，请尝试其他关键词';
      return;
    }

    searchResults.value = result.poiList.pois.slice(0, 6);
    routeStatus.value = `已找到 ${searchResults.value.length} 个地点，请选择一个规划路线`;
  });
};

const checkNearbySite = () => {
  if (!userPosition) {
    return;
  }

  let nearestSite = null;
  let nearestDistance = Number.POSITIVE_INFINITY;

  for (const site of heritageSites) {
    const distance = getDistanceMeters(userPosition.lng, userPosition.lat, site.position[0], site.position[1]);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestSite = site;
    }
  }

  if (nearestSite && nearestDistance <= proximityMeters) {
    locationStatus.value = `已接近 ${nearestSite.name}（约 ${Math.round(nearestDistance)} 米）`;
    const shouldAutoSpeak = !autoPlayedSiteIds.has(nearestSite.id);
    openSiteInfo(nearestSite, shouldAutoSpeak);
    if (shouldAutoSpeak) {
      autoPlayedSiteIds.add(nearestSite.id);
    }
  } else {
    locationStatus.value = '定位成功，暂未接近遗产点位';
  }
};

const startLocationWatch = () => {
  if (!navigator.geolocation) {
    locationStatus.value = '当前浏览器不支持定位';
    return;
  }

  locationStatus.value = '正在获取定位...';

  geoWatchId = navigator.geolocation.watchPosition(
    (position) => {
      userPosition = {
        lng: position.coords.longitude,
        lat: position.coords.latitude
      };

      if (!locationMarker && mapInstance) {
        locationMarker = new window.AMap.Marker({
          position: [userPosition.lng, userPosition.lat],
          title: '我的位置'
        });
        mapInstance.add(locationMarker);
      } else if (locationMarker) {
        locationMarker.setPosition([userPosition.lng, userPosition.lat]);
      }

      checkNearbySite();
    },
    () => {
      locationStatus.value = '定位失败或未授权，无法触发接近导览';
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 5000
    }
  );
};

const addHeritageMarkers = () => {
  if (!mapInstance) {
    return;
  }

  for (const site of heritageSites) {
    const marker = new window.AMap.Marker({
      position: site.position,
      title: site.name,
      label: {
        content: site.name,
        direction: 'top'
      }
    });

    marker.on('click', () => {
      openSiteInfo(site);
    });

    markerList.push(marker);
  }

  mapInstance.add(markerList);
};

const loadMap = async () => {
  loading.value = true;
  loadError.value = '';

  try {
    await loadAmapScript();
    await loadAmapPlugins(['AMap.ToolBar', 'AMap.Scale', 'AMap.PlaceSearch', 'AMap.Driving', 'AMap.Walking']);
    await nextTick();
    await new Promise((resolve) => requestAnimationFrame(resolve));

    if (!mapRef.value) {
      throw new Error('地图容器未就绪');
    }

    destroyMap();

    mapInstance = new window.AMap.Map(mapRef.value, {
      center: [117.184811, 34.261792],
      zoom: 12,
      viewMode: '2D',
      resizeEnable: true
    });

    mapInstance.addControl(new window.AMap.ToolBar());
    mapInstance.addControl(new window.AMap.Scale());

    placeSearchService = new window.AMap.PlaceSearch({
      city: '徐州',
      citylimit: false,
      pageSize: 10
    });

    drivingService = new window.AMap.Driving({
      map: mapInstance,
      policy: window.AMap.DrivingPolicy.LEAST_TIME
    });

    walkingService = new window.AMap.Walking({
      map: mapInstance
    });

    infoWindow = new window.AMap.InfoWindow({
      offset: new window.AMap.Pixel(0, -30)
    });

    addHeritageMarkers();
    startLocationWatch();
    mapInstance.resize();
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : '地图加载失败';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadMap();
});

onBeforeUnmount(() => {
  destroyMap();
});
</script>

<style scoped>
.guide-page {
  min-height: calc(100vh - 80px);
  background: linear-gradient(180deg, #f8f4e9 0%, #f3ede0 100%);
}

.guide-header {
  background: var(--color-primary);
  color: var(--color-white);
  padding: 2.5rem 0;
}

.guide-header h1 {
  margin: 0 0 0.8rem;
  font-size: 2.2rem;
}

.guide-header p {
  margin: 0;
  opacity: 0.92;
}

.guide-content {
  padding: 2rem 0 3rem;
}

.guide-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(260px, 0.8fr);
  gap: 1.2rem;
}

.map-panel {
  position: relative;
  min-height: 580px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow);
}

.map-toolbar {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  right: 0.9rem;
  z-index: 13;
  display: flex;
  gap: 0.5rem;
}

.search-input {
  flex: 1;
  border: 1px solid #d6cec0;
  border-radius: 6px;
  padding: 0.55rem 0.7rem;
  outline: none;
}

.search-input:focus {
  border-color: var(--color-primary);
}

.toolbar-btn {
  border: none;
  border-radius: 6px;
  padding: 0.55rem 0.8rem;
  background: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
}

.toolbar-btn.secondary {
  background: #4e4e4e;
}

.map-canvas {
  width: 100%;
  height: 580px;
}

.map-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.86);
  color: var(--color-primary);
  font-weight: 700;
  gap: 0.8rem;
  text-align: center;
}

.map-overlay.error {
  color: #8b1a1a;
  padding: 0 1rem;
}

.site-card {
  position: absolute;
  left: 1rem;
  bottom: 1rem;
  width: min(360px, calc(100% - 2rem));
  z-index: 12;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 10px;
  padding: 0.9rem 1rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
}

.site-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
}

.site-card-header h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.05rem;
}

.site-type {
  font-size: 0.8rem;
  color: #8b1a1a;
  background: rgba(139, 26, 26, 0.12);
  border-radius: 999px;
  padding: 0.2rem 0.55rem;
}

.site-card p {
  margin: 0.6rem 0 0;
  line-height: 1.7;
  font-size: 0.92rem;
}

.site-card-actions {
  margin-top: 0.7rem;
  display: flex;
  gap: 0.55rem;
}

.action-btn {
  border: none;
  border-radius: 4px;
  padding: 0.45rem 0.7rem;
  background: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
  font-size: 0.85rem;
}

.action-btn.secondary {
  background: #555;
}

.retry-btn {
  border: none;
  border-radius: 4px;
  padding: 0.6rem 1rem;
  background: var(--color-primary);
  color: var(--color-white);
  cursor: pointer;
}

.guide-tip {
  background: var(--color-white);
  border-radius: 10px;
  box-shadow: var(--shadow);
  padding: 1.2rem;
}

.guide-tip h2 {
  margin: 0 0 0.8rem;
  color: var(--color-primary);
  font-size: 1.3rem;
}

.route-mode-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.mode-btn {
  border: 1px solid #c8b8a0;
  border-radius: 6px;
  padding: 0.4rem 0.65rem;
  background: #fff;
  color: #5d5348;
  cursor: pointer;
}

.mode-btn.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.search-result-box {
  margin: 0.8rem 0 1rem;
  border: 1px solid #e5dfd4;
  border-radius: 8px;
  padding: 0.65rem;
}

.search-result-box h3 {
  margin: 0 0 0.6rem;
  color: #5d5348;
  font-size: 1rem;
}

.search-result-box ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.45rem;
}

.result-item {
  width: 100%;
  text-align: left;
  border: 1px solid #e2d7c7;
  border-radius: 6px;
  background: #fff;
  padding: 0.5rem;
  cursor: pointer;
  display: grid;
  gap: 0.2rem;
}

.result-item span {
  color: #6d6256;
  font-size: 0.82rem;
}

.guide-tip ul {
  margin: 0;
  padding-left: 1.1rem;
}

.guide-tip li {
  margin-bottom: 0.7rem;
  line-height: 1.7;
}

.status-text {
  margin: 0.6rem 0 0;
  font-size: 0.92rem;
  color: #5b5146;
}

@media (max-width: 900px) {
  .guide-layout {
    grid-template-columns: 1fr;
  }

  .map-panel,
  .map-canvas {
    min-height: 420px;
    height: 420px;
  }
}
</style>