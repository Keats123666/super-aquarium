import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../render';

const BTN_IMG = 'images/start_button.png';
const BTN_W = 64;
const BTN_H = 64;

/**
 * 开始按钮（画布居中）
 */
export default class StartButton {
  constructor() {
    this.img = wx.createImage();
    this.img.src = BTN_IMG;
    this.w = BTN_W;
    this.h = BTN_H;
  }

  getDrawRect() {
    const dx = (SCREEN_WIDTH - this.w) / 2;
    const dy = (SCREEN_HEIGHT - this.h) / 2;
    return { x: dx, y: dy, w: this.w, h: this.h };
  }

  /** 触摸点是否在按钮上 */
  hitTest(clientX, clientY) {
    const { x, y, w, h } = this.getDrawRect();
    return clientX >= x && clientX <= x + w && clientY >= y && clientY <= y + h;
  }

  render(ctx) {
    if (!this.img.width) return;
    const { x, y, w, h } = this.getDrawRect();
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height, x, y, w, h);
  }
}
