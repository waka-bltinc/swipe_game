
let startX;
let startY;
let endX;
let endY;
let isSwiping = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background("gray");

  textAlign(LEFT, TOP);
  textSize(30);
  noStroke();
}

function draw() {
  /**
   * 定数定義
   */
  const GAME_AREA_WIDTH = min(window.innerWidth, 400);
  const GAME_AREA_HEIGHT = window.innerHeight;

  /**
   * 画面中央にゲーム領域を区別するための矩形を描画
   */
  stroke("black");
  fill(255);
  rect(
    window.innerWidth / 2 - GAME_AREA_WIDTH / 2,
    0,
    GAME_AREA_WIDTH,
    GAME_AREA_HEIGHT
  );
}

/**
 * マウスが押されたときに発火する
 */
function mousePressed() {
  // スワイプ開始位置を記録
  startX = mouseX;
  startY = mouseY;
  isSwiping = true;
}

/**
 * マウスが離れたときに発火する
 */
function mouseReleased() {
  // スワイプ終了位置を記録
  endX = mouseX;
  endY = mouseY;
  isSwiping = false;

  // スワイプの方向を計算
  checkHorizontalSwipe();
}

/**
 * スワイプの方向を計算する
 */
function checkHorizontalSwipe() {
  const dx = endX - startX;
  const distance = abs(dx);

  if (distance > 50) { // スワイプと認識する最小距離
    if (dx > 0) {
      console.log("Right swipe");
    } else {
      console.log("Left swipe");
    }
  }
}