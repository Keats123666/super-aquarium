let instance;

/**
 * 全局状态管理器（单例）
 * 海底大闯关：分数、渔网、游戏阶段
 */
export default class DataBus {
  nets = [];
  frame = 0;
  score = 0;
  /** idle: 待开始, playing: 进行中, over: 结束 */
  gameState = 'idle';
  isGameOver = false;

  constructor() {
    if (instance) return instance;
    instance = this;
  }

  reset() {
    this.frame = 0;
    this.score = 0;
    this.nets = [];
    this.isGameOver = false;
    this.gameState = 'playing';
  }

  gameOver() {
    this.isGameOver = true;
    this.gameState = 'over';
  }

  removeNet(net) {
    const i = this.nets.indexOf(net);
    if (i !== -1) this.nets.splice(i, 1);
  }
}
