import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../render';

const SEABED_IMG = 'images/background.png';

/**
 * 海底背景（全屏绘制）
 */
export default class Seabed {
  constructor() {
    this.img = wx.createImage();
    this.img.src = SEABED_IMG;
  }

  render(ctx) {
    if (!this.img.width) return;
    ctx.drawImage(
      this.img,
      0,
      0,
      this.img.width,
      this.img.height,
      0,
      0,
      SCREEN_WIDTH,
      SCREEN_HEIGHT
    );
  }
}
