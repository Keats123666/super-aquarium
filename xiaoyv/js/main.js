import './render';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './render';
import DataBus from './databus';
import Music from './runtime/music';
import Seabed from './runtime/seabed';
import Sealevel from './runtime/sealevel';
import StartButton from './runtime/startbutton';
import Fish from './player/fish';
import NetPair from './npc/netpair';

const ctx = canvas.getContext('2d');
const NET_SPAWN_FRAMES = 95;

GameGlobal.databus = new DataBus();
GameGlobal.musicManager = new Music();

/**
 * 海底大闯关主流程
 */
export default class Main {
  aniId = 0;
  seabed = new Seabed();
  sealevel = new Sealevel();
  startButton = new StartButton();
  fish = new Fish();
  spawnCounter = 0;

  constructor() {
    wx.onTouchStart(this.onTouchStart.bind(this));
    this.loop();
  }

  onTouchStart(e) {
    const { clientX, clientY } = e.touches[0];
    const bus = GameGlobal.databus;

    if (bus.gameState === 'idle' || bus.gameState === 'over') {
      if (this.startButton.hitTest(clientX, clientY)) {
        this.beginRound();
      }
      return;
    }

    if (bus.gameState === 'playing' && !bus.isGameOver) {
      this.fish.flap();
    }
  }

  beginRound() {
    GameGlobal.databus.reset();
    this.fish.init();
    this.sealevel.newx = 0;
    this.spawnCounter = 0;
    GameGlobal.musicManager.playBgm();
  }

  update() {
    const bus = GameGlobal.databus;
    bus.frame++;

    const playing = bus.gameState === 'playing' && !bus.isGameOver;
    this.sealevel.update(playing);

    if (!playing) return;

    this.fish.update();

    const seaTop = this.sealevel.getTopY();
    if (this.fish.y + this.fish.height >= seaTop) {
      this.failRound();
      return;
    }

    this.spawnCounter++;
    if (this.spawnCounter % NET_SPAWN_FRAMES === 0) {
      bus.nets.push(new NetPair(this.sealevel.h));
    }

    for (let i = bus.nets.length - 1; i >= 0; i--) {
      const net = bus.nets[i];
      net.update();

      if (net.collidesWithFish(this.fish)) {
        this.failRound();
        return;
      }

      if (!net.passed && net.x + net.width < this.fish.x) {
        net.passed = true;
        bus.score += 1;
      }

      if (net.isOffscreen()) {
        bus.removeNet(net);
      }
    }
  }

  failRound() {
    if (GameGlobal.databus.isGameOver) return;
    GameGlobal.databus.gameOver();
    GameGlobal.musicManager.stopBgm();
    GameGlobal.musicManager.playExplosion();
    wx.vibrateShort({ type: 'medium' });
  }

  render() {
    const bus = GameGlobal.databus;
    ctx.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

    this.seabed.render(ctx);
    this.sealevel.render(ctx);
    this.fish.render(ctx);

    bus.nets.forEach((n) => n.render(ctx));

    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText(`count: ${bus.score}`, 12, 28);

    if (bus.gameState === 'idle') {
      this.startButton.render(ctx);
    }

    if (bus.gameState === 'over') {
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
      ctx.fillStyle = '#ffffff';
      ctx.font = '22px Arial';
      ctx.fillText('游戏结束', SCREEN_WIDTH / 2 - 48, SCREEN_HEIGHT * 0.36);
      ctx.font = '18px Arial';
      ctx.fillText(`得分: ${bus.score}`, SCREEN_WIDTH / 2 - 40, SCREEN_HEIGHT * 0.42);
      this.startButton.render(ctx);
      ctx.font = '16px Arial';
      ctx.fillText('点击按钮重新开始', SCREEN_WIDTH / 2 - 72, SCREEN_HEIGHT * 0.58);
    }
  }

  loop() {
    this.update();
    this.render();
    this.aniId = requestAnimationFrame(this.loop.bind(this));
  }
}
