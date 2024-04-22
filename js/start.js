let mgr;

function preload() {
  // 画像をプリロードする
  images.push(loadImage("./image/tea.png"));
  images.push(loadImage("./image/cola.png"));
  images.push(loadImage("./image/water.png"));
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(Intro);
}