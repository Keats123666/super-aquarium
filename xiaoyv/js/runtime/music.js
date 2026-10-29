let instance;

/**
 * 统一的音效管理器
 */
export default class Music {
  bgmAudio = wx.createInnerAudioContext();
  shootAudio = wx.createInnerAudioContext();
  boomAudio = wx.createInnerAudioContext();

  constructor() {
    if (instance) return instance;

    instance = this;

    this.bgmAudio.loop = true;
    this.bgmAudio.autoplay = false;
    this.bgmAudio.src = 'audio/bgm.mp3';
    this.shootAudio.src = 'audio/bullet.mp3';
    this.boomAudio.src = 'audio/boom.mp3';
  }

  playShoot() {
    this.shootAudio.currentTime = 0;
    this.shootAudio.play();
  }

  playExplosion() {
    this.boomAudio.currentTime = 0;
    this.boomAudio.play();
  }

  playBgm() {
    this.bgmAudio.stop?.();
    this.bgmAudio.currentTime = 0;
    this.bgmAudio.play();
  }

  stopBgm() {
    this.bgmAudio.stop();
  }
}
