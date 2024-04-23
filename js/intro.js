function Intro() {
  this.setup = function () {
    createCanvas(windowWidth, windowHeight);
    background(255);
    textAlign(CENTER); // 画像の描画基準点を中心に設定
    textSize(32);
    text("touch to start", window.innerWidth / 2, window.innerHeight / 2);
  }

  this.keyPressed = function () {
    if (key == '1' || key == '2') {
      this.sceneManager.showScene(Game);
    }
  }

  /**
   * マウスが押されたときに発火
   */
  this.mousePressed = function () {
    this.sceneManager.showScene(Game);
  }

  /**
   * スワイプが開始されたときに発火
   */
  this.touchStarted = function () {
    this.sceneManager.showScene(Game);
    return false;
  }
}