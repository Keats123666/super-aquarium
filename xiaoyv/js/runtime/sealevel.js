import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../render';

const SEALEVEL_IMG = 'images/sealevel.png';
const SEALEVEL_SRC_W = 800;
const SEALEVEL_SRC_H = 27;

/**
 * 海底底面横向滚动
 */
export default class Sealevel {
  constructor() {
    this.img = wx.createImage();
    this.img.src = SEALEVEL_IMG;
    this.w = SEALEVEL_SRC_W;
    this.h = SEALEVEL_SRC_H;
    this.newx = 0;
    this.speed = 2;
  }

  /** 海平面顶部 y（用于与小鱼碰撞） */
  getTopY() {
    return SCREEN_HEIGHT - this.h;
  }

  update(scrolling) {
    if (!scrolling) return;
    this.newx += this.speed;
    if (this.newx > this.w - SCREEN_WIDTH) {
      this.newx = 0;
    }
  }

  render(ctx) {
    if (!this.img.width) return;
    ctx.drawImage(
      this.img,
      0,
      0,
      this.w,
      this.h,
      -this.newx,
      SCREEN_HEIGHT - this.h,
      this.w,
      this.h
    );
  }
}
