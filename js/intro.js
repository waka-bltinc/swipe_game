function Intro() {
  this.setup = function () {
    createCanvas(windowWidth, windowHeight);
    background(255);
    imageMode(CENTER); // 画像の描画基準点を中心に設定
    textSize(32);
    text("Press 1 or 2", window.innerWidth / 2, window.innerHeight / 2);
  }

  this.keyPressed = function () {
    if (key == '1' || key == '2') {
      this.sceneManager.showScene(Game);
    }
  }
}