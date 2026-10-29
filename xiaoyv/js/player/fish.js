import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../render';

const FISH_IMG = 'images/fish1.png';
const FISH_W = 48;
const FISH_H = 32;
const GRAVITY = 0.35;
const FLAP_VY = -6.5;

/**
 * 小鱼：重力下落，点击上飞
 */
export default class Fish {
  constructor() {
    this.img = wx.createImage();
    this.img.src = FISH_IMG;
    this.width = FISH_W;
    this.height = FISH_H;
    this.init();
  }

  init() {
    this.x = SCREEN_WIDTH * 0.22;
    this.y = SCREEN_HEIGHT * 0.42;
    this.vy = 0;
    this.visible = true;
    this.isActive = true;
  }

  flap() {
    this.vy = FLAP_VY;
  }

  update() {
    this.vy += GRAVITY;
    this.y += this.vy;
    if (this.y < 0) {
      this.y = 0;
      this.vy = 0;
    }
  }

  render(ctx) {
    if (!this.visible || !this.img.width) return;
    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  /** 轴对齐矩形是否与另一矩形相交 */
  intersectsRect(rx, ry, rw, rh) {
    return (
      this.x < rx + rw &&
      this.x + this.width > rx &&
      this.y < ry + rh &&
      this.y + this.height > ry
    );
  }
}
