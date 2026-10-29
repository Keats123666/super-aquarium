import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../render';

const NET_W = 72;
const SPEED = 3;
const GAP_H = 150;

/**
 * 一对渔网（上 pi_up / 下 pi_down），从右向左移动
 */
export default class NetPair {
  constructor(sealevelH) {
    this.x = SCREEN_WIDTH + 10;
    this.speed = SPEED;
    this.passed = false;
    this.sealevelH = sealevelH;

    this.imgUp = wx.createImage();
    this.imgUp.src = 'images/pi_up.png';
    this.imgDown = wx.createImage();
    this.imgDown.src = 'images/pi_down.png';

    const gapYMin = 70;
    const gapYMax = SCREEN_HEIGHT - sealevelH - GAP_H - 60;
    const span = Math.max(1, gapYMax - gapYMin);
    this.gapY = gapYMin + Math.random() * span;
    this.gapHeight = GAP_H;

    this.width = NET_W;
    this.topH = this.gapY;
    this.bottomY = this.gapY + this.gapHeight;
    this.bottomH = Math.max(
      20,
      SCREEN_HEIGHT - sealevelH - this.bottomY
    );
  }

  update() {
    this.x -= this.speed;
  }

  isOffscreen() {
    return this.x + this.width < -20;
  }

  render(ctx) {
    if (this.imgUp.width) {
      ctx.drawImage(
        this.imgUp,
        0,
        0,
        this.imgUp.width,
        this.imgUp.height,
        this.x,
        0,
        this.width,
        this.topH
      );
    }
    if (this.imgDown.width) {
      ctx.drawImage(
        this.imgDown,
        0,
        0,
        this.imgDown.width,
        this.imgDown.height,
        this.x,
        this.bottomY,
        this.width,
        this.bottomH
      );
    }
  }

  /** 与小鱼 AABB 碰撞（略缩进，减少误伤） */
  collidesWithFish(fish) {
    const pad = 8;
    const fx = fish.x + pad;
    const fy = fish.y + pad;
    const fw = fish.width - pad * 2;
    const fh = fish.height - pad * 2;
    const hitTop =
      fx < this.x + this.width &&
      fx + fw > this.x &&
      fy < this.topH &&
      fy + fh > 0;
    const hitBottom =
      fx < this.x + this.width &&
      fx + fw > this.x &&
      fy < this.bottomY + this.bottomH &&
      fy + fh > this.bottomY;
    return hitTop || hitBottom;
  }
}
