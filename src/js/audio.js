// 音频管理
let sounds = {};
let soundsEnabled = true;

export function initializeAudio() {
  // 预加载音效
  sounds = {
    eat: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3'),
    gameOver: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-retro-arcade-game-over-470.mp3'),
    start: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3'),
    pause: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3'),
    resume: new Audio('https://assets.mixkit.co/sfx/preview/mixkit-positive-interface-beep-221.mp3')
  };
  
  // 设置音量
  Object.values(sounds).forEach(sound => {
    sound.volume = 0.3;
  });
  
  // 添加音效开关按钮
  const gameControls = document.querySelector('.game-controls');
  const soundToggle = document.createElement('div');
  soundToggle.className = 'sound-toggle';
  soundToggle.innerHTML = `
    <span>音效: </span>
    <button id="soundToggleBtn" class="active">开</button>
  `;
  gameControls.appendChild(soundToggle);
  
  // 音效开关功能
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  soundToggleBtn.addEventListener('click', () => {
    soundsEnabled = !soundsEnabled;
    soundToggleBtn.textContent = soundsEnabled ? '开' : '关';
    soundToggleBtn.classList.toggle('active', soundsEnabled);
  });
}

export function playSound(soundName) {
  if (!soundsEnabled || !sounds[soundName]) return;
  
  // 克隆音频以允许重叠播放
  const sound = sounds[soundName].cloneNode();
  sound.play().catch(e => console.log('音频播放失败:', e));
}
