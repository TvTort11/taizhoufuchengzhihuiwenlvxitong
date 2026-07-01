let currentPage = 'page-home';
let currentSeason = 'spring';
let mapScale = 1;
let mapX = 0;
let mapY = 0;
let isDragging = false;
let startX = 0;
let startY = 0;
let currentSpot = null;
let currentArea = null;
let currentImageIndex = 1;
let speechSynth = window.speechSynthesis;
let speechUtterance = null;
let isSpeaking = false;
let isVoiceEnabled = false;
let voiceRate = 1;
let mapAutoScrollInterval = null;

// 使用spotsData.js中的数据（如果文件已加载）
const spotData = window.spotsData || {
    '瓮城': { description: '位于古城墙临江诸城门，为半圆形围合空间。清康熙年间修建，兼具军事防御与防洪功能，能有效围剿攻入城门的敌军。', pinyin: 'wengcheng', images: ['Assets/Images/card/wengcheng_1.jpg', 'Assets/Images/card/wengcheng_2.jpg'] },
    '西门街': { description: '东西走向的历史老街，曾是西出府城通往杭州等地的要道。街两旁保留着明清至民国风格的建筑，店铺林立，是品味古城昔日繁华与市井烟火气的绝佳去处。', pinyin: 'ximenjie', images: ['Assets/Images/card/ximenjie_1.jpg', 'Assets/Images/card/ximenjie_2.jpg'] },
    '白云楼': { description: '坐落于北固山东侧，是台州府城墙的最高点。此楼为双层重檐歇山顶建筑，登楼远眺，可北望白云山，南瞰巾子山，将古城与新城的壮丽风光尽收眼底。', pinyin: 'baiyunlou', images: ['Assets/Images/card/baiyunlou_1.jpg', 'Assets/Images/card/baiyunlou_2.jpg'] },
    '天坛': { description: '位于府城墙上，是古时台州府举行祭天、祈谷等重大祭祀典礼的神圣场所，承载着深厚的历史文化底蕴。', pinyin: 'wangtiantai', images: ['Assets/Images/card/wangtiantai_1.jpg', 'Assets/Images/card/wangtiantai_2.jpg'] },
    '揽胜门': { description: '台州府城墙东端的起点。门前有象征性的198级"好汉坡"，登上城楼"顾景楼"回望，可将东湖美景与古城风貌一览无余，是俯瞰全景的绝佳位置。', pinyin: 'lanshengmen', images: ['Assets/Images/card/lanshengmen_1.jpg', 'Assets/Images/card/lanshengmen_2.jpg'] },
    '樵云阁': { description: '矗立于东湖之北，是全湖的最高建筑。登临此阁，四周湖光山色尽收眼底。阁名源于纪念一位为民族气节而投湖的樵夫，为美景增添了一份悲壮的历史传说。', pinyin: 'qiaoyunge', images: ['Assets/Images/card/qiaoyunge_1.jpg', 'Assets/Images/card/qiaoyunge_2.jpg'] },
    '湖心亭': { description: '位于东湖外湖，亭阁飞檐八出，造型空灵大气。亭内悬有清代学者俞樾所题楹联，将此间"好水好山"与西湖美景相提并论，是东湖的标志性景观。', pinyin: 'huxinting', images: ['Assets/Images/card/huxinting_1.jpg', 'Assets/Images/card/huxinting_2.jpg'] }
};

const routeData = {
    'A': {
        title: '官方推荐游线A：古城精华游',
        desc: '路线：翁城 → 紫阳街 → 西门街 → 朝天门 → 望天台 → 白云楼 → 揽胜门 → 东湖\n\n该路线串联台州府城墙与古城街区的核心精华段落。\n\n【翁城】位于府城西北大固山下，始建于清康熙年间，兼具御敌与防洪功能。\n\n【紫阳街】全长约1080米，中国历史文化名街，因道教南宗始祖张伯端（紫阳真人）得名，保留北宋里坊制格局。\n\n【西门街】与紫阳街交汇，保留多座明清时期坊墙，原住民生活气息浓厚。\n\n【朝天门】复建于宋代，瓮城始建于清康熙年间，兼具御敌与防洪功能。\n\n【望天台】又称天坛，元末起义领袖方国珍筑台祭天称王之地，采用"三层九循环"的汉白玉结构。\n\n【白云楼】位于北固山东侧，为府城墙最高点，双层重檐歇山顶结构，可远眺白云山与巾山。\n\n【揽胜门】为城墙主要入口之一，需攀登198级台阶（好汉坡）登顶，可俯瞰东湖全景。\n\n【东湖】开凿于北宋熙宁四年（1072年），南北长约500米，有"小西湖"之称，含湖心亭、半勾亭、九曲桥、骆宾王祠等景点。\n\n【温馨提示】\n- 全程建议穿着舒适的鞋子\n- 门票参考：台州府城墙与东湖联票70元，单买城墙60元、东湖15元\n- 该路线也可反向游览，从东湖出发登城后多为下坡，相对省力'
    },
    'B': {
        title: '官方推荐游线B：古城墙西段探秘',
        desc: '路线：翁城 → 紫阳街 → 西门街 → 朝天门 → 平海楼 → 镇宁门\n\n该路线以府城西部城墙与古街巷为主，串联起古城防御体系与市井生活区，全长约4千米，游览时间约2.5小时。\n\n【翁城】位于府城西北大固山下，始建于清康熙年间，瓮城结构兼具军事御敌与灵江防洪双重功能。\n\n【紫阳街】全长约1080米，中国历史文化名街，因道教南宗始祖张伯端（紫阳真人）得名，至今保留北宋里坊制格局，街内有悟真坊、千佛井、中国人民银行台州支行旧址等历史遗迹。\n\n【西门街】与紫阳街交汇，保留永靖坊、清河坊等多座明清坊墙，原住民生活气息浓厚。\n\n【朝天门】复建于宋代，位于府城西北，瓮城始建于清康熙年间，是古城西北方向的重要关隘。\n\n【平海楼】位于府城西南角，古时为瞭望灵江水情、观测海潮的重要设施，兼具军事预警与水文观测功能，是台州府城防洪体系的重要组成部分。\n\n【镇宁门】为台州府城西南方向城门，紧邻灵江，历史上承担着重要的水陆交通与防御功能。\n\n【温馨提示】\n- 该路线以古城墙西段与古街巷探索为主，建议穿着舒适的鞋子\n- 沿途可品尝紫阳街的蛋清羊尾、海苔饼、麦虾等临海特色小吃\n- 门票参考：台州府城墙与东湖联票70元，单买城墙60元\n- 该路线无需进入东湖景区，可单买城墙门票'
    }
};

const seasonMap = {
    'spring': 'Spring_map.png',
    'summer': 'Summer_map.png',
    'autumn': 'Autumn_map.png',
    'winter': 'Winter_map.png'
};

const routeMapA = {
    'spring': 'Spring_Amap.png',
    'summer': 'Summer_Amap.png',
    'autumn': 'Autumn_Amap.png',
    'winter': 'Winter_Amap.png'
};

const routeMapB = {
    'spring': 'Spring_Bmap.png',
    'summer': 'Summer_Bmap.jpg',
    'autumn': 'Autumn_Bmap.jpg',
    'winter': 'Winter_Bmap.png'
};

function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active-page');
    });
    document.getElementById(pageId).classList.add('active-page');
    
    document.querySelectorAll('.bottom-nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (pageId !== 'page-home') {
        const navBtn = document.querySelector(`.bottom-nav button[onclick="navigateTo('${pageId}')"]`);
        if (navBtn) navBtn.classList.add('active');
    }
    
    if (pageId === 'page-home') {
        showIntroAnimation();
    }
    
    if (pageId === 'page-guide') {
        updateGuideMap();
        resetMapPosition();
        startMapAutoScroll();
    } else {
        stopMapAutoScroll();
    }
    
    if (pageId === 'page-plan') {
        loadWeather();
    }
    
    currentPage = pageId;
}

function showIntroAnimation() {
    const intro = document.getElementById('intro-animation');
    intro.style.display = 'block';
    intro.style.animation = 'none';
    intro.offsetHeight;
    intro.style.animation = 'fadeInOut 5s ease-in-out forwards';
}

function toggleMute(videoId) {
    const video = document.getElementById(videoId);
    const btn = document.querySelector(`#${videoId}`).parentElement.querySelector('.mute-btn');
    
    if (video.muted) {
        video.muted = false;
        btn.textContent = '🔊';
    } else {
        video.muted = true;
        btn.textContent = '🔇';
    }
}

function setSeason(season) {
    currentSeason = season;
    document.body.className = `theme-${season}`;
    
    document.querySelectorAll('.season-btn').forEach(btn => {
        btn.style.transform = btn.dataset.season === season ? 'scale(1.2)' : 'scale(1)';
    });
    
    updateGuideMap();
    updateRouteMap();
}

function updateGuideMap() {
    const map = document.getElementById('guide-map');
    if (map) {
        map.src = `Assets/images/map/${seasonMap[currentSeason]}`;
    }
}

function updateRouteMap() {
    const routeMap = document.getElementById('route-map');
    if (!routeMap) return;
    
    const routeInfoEl = document.getElementById('route-info');
    if (!routeInfoEl) return;
    
    const h3 = routeInfoEl.querySelector('h3');
    const currentRoute = h3 && h3.textContent.includes('A') ? 'A' : 'B';
    
    if (currentRoute === 'A') {
        routeMap.src = `Assets/images/roadmap/A/${routeMapA[currentSeason]}`;
    } else {
        routeMap.src = `Assets/images/roadmap/B/${routeMapB[currentSeason]}`;
    }
}

function startMapAutoScroll() {
    stopMapAutoScroll();
    mapAutoScrollInterval = setInterval(() => {
        if (!isDragging) {
            mapX += 0.5;
            mapY += 0.3;
            if (mapX > 200) mapX = 0;
            if (mapY > 100) mapY = 0;
            updateMapTransform();
        }
    }, 50);
}

function stopMapAutoScroll() {
    if (mapAutoScrollInterval) {
        clearInterval(mapAutoScrollInterval);
        mapAutoScrollInterval = null;
    }
}

function initMapInteraction() {
    const container = document.getElementById('map-container');
    if (!container) return;
    
    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX - mapX;
        startY = e.clientY - mapY;
    });
    
    container.addEventListener('mousemove', (e) => {
        if (isDragging) {
            mapX = e.clientX - startX;
            mapY = e.clientY - startY;
            updateMapTransform();
        }
    });
    
    container.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        mapScale = Math.max(0.5, Math.min(3, mapScale * delta));
        updateMapTransform();
    });
    
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchDistance = 0;
    
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            touchStartX = e.touches[0].clientX - mapX;
            touchStartY = e.touches[0].clientY - mapY;
        } else if (e.touches.length === 2) {
            lastTouchDistance = getDistance(e.touches);
        }
    });
    
    container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isDragging) {
            mapX = e.touches[0].clientX - touchStartX;
            mapY = e.touches[0].clientY - touchStartY;
            updateMapTransform();
        } else if (e.touches.length === 2) {
            const distance = getDistance(e.touches);
            const delta = distance / lastTouchDistance;
            mapScale = Math.max(0.5, Math.min(3, mapScale * delta));
            lastTouchDistance = distance;
            updateMapTransform();
        }
    });
    
    container.addEventListener('touchend', () => {
        isDragging = false;
    });
}

function getDistance(touches) {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}

function updateMapTransform() {
    const wrapper = document.getElementById('map-wrapper');
    if (wrapper) {
        wrapper.style.transform = `translate(${mapX}px, ${mapY}px) scale(${mapScale})`;
    }
}

function resetMapPosition() {
    mapX = 0;
    mapY = 0;
    mapScale = 1;
    updateMapTransform();
}

function showArea(btn) {
    const area = btn.dataset.area;
    const x = parseFloat(btn.dataset.x);
    const y = parseFloat(btn.dataset.y);
    const vrUrl = btn.dataset.vr;
    
    currentArea = { area, vrUrl };
    
    animateMapTo(x, y);
    
    setTimeout(() => {
        btn.style.background = '#ffeb3b';
        btn.style.color = '#333';
        const vrButton = document.getElementById('vr-button');
        if (vrButton) vrButton.style.display = 'block';
    }, 500);
    
    setTimeout(() => {
        btn.style.background = 'rgba(255, 107, 107, 0.9)';
        btn.style.color = 'white';
    }, 3000);
}

function animateMapTo(targetX, targetY) {
    const startX = mapX;
    const startY = mapY;
    const endX = (window.innerWidth / 2) - targetX * mapScale;
    const endY = (window.innerHeight / 2) - targetY * mapScale;
    const duration = 500;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        
        mapX = startX + (endX - startX) * eased;
        mapY = startY + (endY - startY) * eased;
        updateMapTransform();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    animate();
}

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function showSpot(btn) {
    const spot = btn.dataset.spot;
    const x = parseFloat(btn.dataset.x);
    const y = parseFloat(btn.dataset.y);
    
    currentSpot = spot;
    currentImageIndex = 1;
    
    animateMapTo(x, y);
    
    setTimeout(() => {
        openSpotModal(spot);
    }, 500);
}

function openSpotModal(spot) {
    const modal = document.getElementById('spot-modal');
    const data = spotData[spot];
    
    if (!modal || !data) return;
    
    document.getElementById('spot-title').textContent = data.name || spot;
    // 使用description字段（新数据结构）或desc字段（旧数据结构）
    const description = data.description || data.desc || '';
    document.getElementById('spot-desc').textContent = description;
    
    // 使用images数组中的路径，如果没有则使用pinyin拼接
    if (data.images && data.images.length >= 2) {
        document.getElementById('spot-img-1').src = data.images[0];
        document.getElementById('spot-img-2').src = data.images[1];
    } else {
        const pinyin = data.pinyin;
        document.getElementById('spot-img-1').src = `Assets/images/card/${pinyin}_1.jpg`;
        document.getElementById('spot-img-2').src = `Assets/images/card/${pinyin}_2.jpg`;
    }
    
    document.getElementById('spot-img-1').style.display = 'block';
    document.getElementById('spot-img-2').style.display = 'none';
    
    document.getElementById('audio-progress-bar').style.width = '0';
    document.getElementById('audio-play-btn').textContent = '▶';
    
    modal.style.display = 'flex';
}

function closeSpotModal() {
    const modal = document.getElementById('spot-modal');
    if (modal) modal.style.display = 'none';
    stopAudio();
}

function prevCarousel() {
    const img1 = document.getElementById('spot-img-1');
    const img2 = document.getElementById('spot-img-2');
    
    if (!img1 || !img2) return;
    
    if (currentImageIndex === 1) {
        img1.style.display = 'none';
        img2.style.display = 'block';
        currentImageIndex = 2;
    } else {
        img2.style.display = 'none';
        img1.style.display = 'block';
        currentImageIndex = 1;
    }
}

function nextCarousel() {
    const img1 = document.getElementById('spot-img-1');
    const img2 = document.getElementById('spot-img-2');
    
    if (!img1 || !img2) return;
    
    if (currentImageIndex === 1) {
        img1.style.display = 'none';
        img2.style.display = 'block';
        currentImageIndex = 2;
    } else {
        img2.style.display = 'none';
        img1.style.display = 'block';
        currentImageIndex = 1;
    }
}

function toggleAudio() {
    if (!currentSpot) return;
    
    if (isSpeaking) {
        speechSynth.pause();
        isSpeaking = false;
        document.getElementById('audio-play-btn').textContent = '▶';
    } else {
        if (speechSynth.paused) {
            speechSynth.resume();
            isSpeaking = true;
            document.getElementById('audio-play-btn').textContent = '⏸';
        } else {
            const data = spotData[currentSpot];
            if (!data) return;
            
            // 使用description字段（新数据结构）或desc字段（旧数据结构）
            const description = data.description || data.desc || '';
            speechUtterance = new SpeechSynthesisUtterance(description);
            speechUtterance.rate = voiceRate;
            speechUtterance.lang = 'zh-CN';
            
            speechUtterance.onstart = () => {
                isSpeaking = true;
                document.getElementById('audio-play-btn').textContent = '⏸';
            };
            
            speechUtterance.onend = () => {
                isSpeaking = false;
                document.getElementById('audio-play-btn').textContent = '▶';
                document.getElementById('audio-progress-bar').style.width = '100%';
            };
            
            speechUtterance.onerror = () => {
                isSpeaking = false;
                document.getElementById('audio-play-btn').textContent = '▶';
            };
            
            speechSynth.speak(speechUtterance);
            
            updateAudioProgress();
        }
    }
}

function updateAudioProgress() {
    if (!isSpeaking) return;
    
    const progressBar = document.getElementById('audio-progress-bar');
    if (!progressBar) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        if (!isSpeaking) {
            clearInterval(interval);
            return;
        }
        
        progress += 0.5;
        if (progress > 95) progress = 95;
        progressBar.style.width = `${progress}%`;
    }, 100);
}

function stopAudio() {
    speechSynth.cancel();
    isSpeaking = false;
    const playBtn = document.getElementById('audio-play-btn');
    const progressBar = document.getElementById('audio-progress-bar');
    if (playBtn) playBtn.textContent = '▶';
    if (progressBar) progressBar.style.width = '0';
}

function toggleSubtitle() {
    const subtitle = document.getElementById('subtitle-display');
    const btn = document.getElementById('subtitle-toggle');
    
    if (!subtitle || !btn || !currentSpot) return;
    
    const data = spotData[currentSpot];
    const description = data.description || data.desc || '';
    
    if (subtitle.style.display === 'none' || subtitle.style.display === '') {
        subtitle.style.display = 'block';
        subtitle.textContent = description;
        btn.textContent = '隐藏字幕';
    } else {
        subtitle.style.display = 'none';
        btn.textContent = '字幕开关';
    }
}

function openVR() {
    if (!currentArea) return;
    
    const modal = document.getElementById('vr-modal');
    const iframe = document.getElementById('vr-iframe');
    
    if (!modal || !iframe) return;
    
    iframe.src = currentArea.vrUrl;
    modal.style.display = 'flex';
}

function closeVRModal() {
    const modal = document.getElementById('vr-modal');
    const iframe = document.getElementById('vr-iframe');
    const vrButton = document.getElementById('vr-button');
    
    if (modal) modal.style.display = 'none';
    if (iframe) iframe.src = '';
    if (vrButton) vrButton.style.display = 'none';
}

function showPlanTab(tab) {
    document.querySelectorAll('.sidebar-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    document.getElementById('official-plan').style.display = tab === 'official' ? 'block' : 'none';
    document.getElementById('smart-plan').style.display = tab === 'smart' ? 'block' : 'none';
}

function showRoute(route) {
    const routeMap = document.getElementById('route-map');
    const routeInfoEl = document.getElementById('route-info');
    
    if (!routeMap || !routeInfoEl) return;
    
    if (route === 'A') {
        routeMap.src = `Assets/images/roadmap/A/${routeMapA[currentSeason]}`;
        routeInfoEl.innerHTML = `<h3>${routeData['A'].title}</h3><p>${routeData['A'].desc.replace(/\n/g, '<br>')}</p>`;
    } else {
        routeMap.src = `Assets/images/roadmap/B/${routeMapB[currentSeason]}`;
        routeInfoEl.innerHTML = `<h3>${routeData['B'].title}</h3><p>${routeData['B'].desc.replace(/\n/g, '<br>')}</p>`;
    }
}

async function loadWeather() {
    const weatherContent = document.getElementById('weather-content');
    if (!weatherContent) return;
    
    try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=28.64&longitude=121.42&current=temperature_2m,weather_code&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia/Shanghai', {
            mode: 'cors'
        });
        
        if (!response.ok) {
            throw new Error('天气数据获取失败');
        }
        
        const data = await response.json();
        
        const weatherCode = data.current.weather_code;
        const temp = Math.round(data.current.temperature_2m);
        
        const weatherMap = {
            0: '晴天',
            1: '晴',
            2: '多云',
            3: '阴',
            45: '雾',
            48: '雾凇',
            51: '小雨',
            53: '中雨',
            55: '大雨',
            61: '小雨',
            63: '中雨',
            65: '大雨',
            71: '小雪',
            73: '中雪',
            75: '大雪',
            80: '阵雨',
            81: '阵雨',
            82: '雷阵雨',
            95: '雷暴',
            96: '雷暴伴有冰雹',
            99: '雷暴伴有冰雹'
        };
        
        let weatherText = weatherMap[weatherCode] || '未知';
        
        let forecastHtml = `<div>当前：${weatherText} ${temp}°C</div>`;
        for (let i = 0; i < 3; i++) {
            const dayCode = data.daily.weather_code[i];
            const maxTemp = Math.round(data.daily.temperature_2m_max[i]);
            const minTemp = Math.round(data.daily.temperature_2m_min[i]);
            const dayNames = ['今天', '明天', '后天'];
            
            forecastHtml += `<div>${dayNames[i]}：${weatherMap[dayCode] || '未知'} ${minTemp}°C ~ ${maxTemp}°C</div>`;
        }
        
        weatherContent.innerHTML = forecastHtml;
        
        window.currentWeather = {
            current: `${weatherText} ${temp}°C`,
            forecast: forecastHtml
        };
        
    } catch (error) {
        console.error('天气加载失败:', error);
        weatherContent.innerHTML = '<div>天气信息暂不可用</div>';
        window.currentWeather = { current: '天气信息暂不可用', forecast: '' };
    }
}

async function generatePlan() {
    const days = document.getElementById('days-select').value;
    const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked')).map(cb => cb.value).join('、');
    const family = document.getElementById('family-select').value;
    
    if (!interests) {
        alert('请至少选择一项兴趣类型');
        return;
    }
    
    const resultDiv = document.getElementById('plan-result');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<div style="text-align: center; padding: 20px;">正在生成行程...</div>';
    
    const weatherContext = window.currentWeather ? window.currentWeather.current : '天气信息暂不可用';
    
    const prompt = `我计划去台州府城文化旅游区游玩${days}天，我的兴趣是${interests}，${family === '是' ? '需要考虑携带老人小孩' : ''}。当前天气：${weatherContext}。请为我规划详细的行程安排，包括每天的景点顺序、游玩时长、交通方式和餐饮推荐。`;
    
    try {
        const response = await fetchAI(prompt);
        resultDiv.innerHTML = response;
    } catch (error) {
        console.error('行程生成失败:', error);
        resultDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: red;">行程生成失败，请稍后重试</div>';
    }
}

async function fetchAI(prompt) {
    const apiKey = 'your_api_key_here';
    
    if (!apiKey || apiKey === 'your_api_key_here') {
        return generateMockPlan(prompt);
    }
    
    try {
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'glm-4',
                messages: [{ role: 'user', content: prompt }],
                stream: false
            })
        });
        
        if (!response.ok) {
            throw new Error('API请求失败');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.warn('AI API调用失败，使用本地模拟:', error);
        return generateMockPlan(prompt);
    }
}

function generateMockPlan(prompt) {
    const days = prompt.match(/(\d+)天/) ? prompt.match(/(\d+)天/)[1] : '1';
    const interests = prompt.match(/兴趣是(.+?)，/) ? prompt.match(/兴趣是(.+?)，/)[1] : '历史文化';
    const hasFamily = prompt.includes('老人小孩');
    
    let plan = `基于您的需求，为您生成${days}天台州府城旅游行程：\n\n`;
    
    for (let i = 1; i <= parseInt(days); i++) {
        plan += `第${i}天：\n`;
        
        if (i === 1) {
            plan += `  上午：台州府城墙（游览约1.5小时）→ 揽胜门 → 天坛\n`;
            plan += `  中午：紫阳街品尝美食（推荐：蛋清羊尾、海苔饼、姜汤面）\n`;
            plan += `  下午：东湖公园（游览约2小时）→ 湖心亭\n`;
            if (!hasFamily) {
                plan += `  晚上：西门街夜景，可体验当地特色酒吧\n`;
            } else {
                plan += `  晚上：古城漫步，欣赏夜景后早点休息\n`;
            }
        } else if (i === 2) {
            plan += `  上午：白云楼（登高望远，游览约1小时）\n`;
            plan += `  中午：府城特色餐厅用餐\n`;
            plan += `  下午：樵云阁 → 紫阳街深度游（购物、体验非遗文化）\n`;
            plan += `  晚上：品尝台州海鲜美食\n`;
        } else {
            plan += `  上午：瓮城（了解古代军事防御）→ 西门街\n`;
            plan += `  中午：当地小吃体验\n`;
            plan += `  下午：自由活动或周边景点游览\n`;
        }
        
        plan += `\n`;
    }
    
    plan += `交通建议：\n`;
    plan += `- 景区内步行即可，建议穿舒适的步行鞋\n`;
    plan += `- 东湖可乘坐游船（约30元/人）\n`;
    
    plan += `\n餐饮推荐：\n`;
    plan += `- 特色小吃：蛋清羊尾、海苔饼、姜汤面、嵌糕\n`;
    plan += `- 推荐餐厅：紫阳街上的老字号店铺\n`;
    
    if (hasFamily) {
        plan += `\n温馨提示：\n`;
        plan += `- 城墙台阶较多，建议乘坐观光车\n`;
        plan += `- 东湖有儿童游乐设施\n`;
        plan += `- 建议携带便携座椅和饮用水\n`;
    }
    
    return plan;
}

function submitQA() {
    const input = document.getElementById('qa-input');
    const question = input.value.trim();
    
    if (!question) return;
    
    const resultDiv = document.getElementById('qa-result');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<div style="text-align: center; padding: 20px;">AI正在思考中...</div>';
    
    input.value = '';
    
    callAI(question, resultDiv);
}

function handleQAKeyPress(event) {
    if (event.key === 'Enter') {
        submitQA();
    }
}

async function callAI(question, resultDiv) {
    try {
        const response = await fetchAI(question);
        resultDiv.innerHTML = response;
        
        if (isVoiceEnabled) {
            speakText(response);
        }
    } catch (error) {
        console.error('AI调用失败:', error);
        resultDiv.innerHTML = '<div style="text-align: center; padding: 20px; color: red;">AI服务暂时不可用，请稍后重试</div>';
    }
}

function speakText(text) {
    if (speechSynth.speaking) {
        speechSynth.cancel();
    }
    
    speechUtterance = new SpeechSynthesisUtterance(text);
    speechUtterance.rate = voiceRate;
    speechUtterance.lang = 'zh-CN';
    
    speechUtterance.onerror = (e) => {
        console.error('语音合成失败:', e);
    };
    
    speechSynth.speak(speechUtterance);
}

function toggleVoice() {
    const btn = document.getElementById('voice-toggle');
    if (!btn) return;
    
    if (isVoiceEnabled) {
        isVoiceEnabled = false;
        btn.textContent = '语音关闭';
        speechSynth.cancel();
    } else {
        isVoiceEnabled = true;
        btn.textContent = '语音开启';
    }
}

function initVoiceRateSlider() {
    const slider = document.getElementById('rate-slider');
    if (!slider) return;
    
    slider.addEventListener('input', (e) => {
        voiceRate = parseFloat(e.target.value);
        if (speechUtterance && speechSynth.speaking) {
            speechSynth.cancel();
            speechUtterance.rate = voiceRate;
            speechSynth.speak(speechUtterance);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMapInteraction();
    initVoiceRateSlider();
    
    if (currentPage === 'page-home') {
        showIntroAnimation();
    }
    
    document.querySelectorAll('.qa-card .card-content').forEach((content, index) => {
        content.style.animationDelay = `${index * 1.5}s`;
    });
    
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});