let startX;
let startY;
let isSwiping = false;

const GAME_AREA_WIDTH = Math.min(window.innerWidth, 400);
const GAME_AREA_HEIGHT = window.innerHeight;

const SWIPE_AREA = {
  x: window.innerWidth / 2 - GAME_AREA_WIDTH / 2,
  y: 0,
  width: GAME_AREA_WIDTH,
  height: GAME_AREA_HEIGHT,
}; // 特定の領域の定義

const MIN_SWIPE_DISTANCE = 50; // 有効なスワイプと認識する最小の距離

/**
 * 描画領域の設定
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
}

/**
 * メインループ
 */
function draw() {
  /**
   * 定数定義
   */

  /**
   * 画面中央にゲーム領域を区別するための矩形を描画
   */
  stroke("black");
  noFill();
  rect(
    SWIPE_AREA.x,
    SWIPE_AREA.y,
    SWIPE_AREA.width,
    SWIPE_AREA.height,
  );

  if (isSwiping) {

  }
}

/**
 * マウスが押されたときに発火
 */
function mousePressed() {
  if (isInSWIPE_AREA(mouseX, mouseY)) {
    startSwipe(mouseX, mouseY);
  }
}

/**
 * スワイプが開始されたときに発火
 */
function touchStarted() {
  if (touches.length > 0 && isInSWIPE_AREA(touches[0].x, touches[0].y)) {
    startSwipe(touches[0].x, touches[0].y);
    return false; // Prevent default
  }
}

/**
 * マウスクリックが離れたときに発火
 */
function mouseReleased() {
  endSwipe(mouseX, mouseY);
}

/**
 * スワイプが醜虜したときに発火
 */
function touchEnded() {
  if (touches.length > 0) {
    endSwipe(touches[0].x, touches[0].y);
  } else {
    endSwipe(mouseX, mouseY);
  }
}

/**
 * スワイプ開始
 * 
 * @param {*} x 
 * @param {*} y 
 */
function startSwipe(x, y) {
  startX = x;
  startY = y;
  isSwiping = true;
}

/**
 * スワイプ終了
 * 
 * @param {*} x 
 * @param {*} y 
 */
function endSwipe(x, y) {
  isSwiping = false;
  if (isValidSwipe(x)) {
    checkHorizontalSwipe(x);
  }
}

/**
 * スワイプの方向を計算
 * 
 * @param {*} endX 
 */
function checkHorizontalSwipe(endX) {
  const dx = endX - startX;
  const distance = abs(dx);

  background(255); // Clear screen
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  if (distance > 50) {
    if (dx > 0) {
      text("Right swipe", width / 2, height / 2);
    } else {
      text("Left swipe", width / 2, height / 2);
    }
  }
}

/**
 * スワイプの長さが有効かどうか
 * 
 * @param {*} endX 
 * @returns 
 */
function isValidSwipe(endX) {
  const dx = endX - startX;
  return Math.abs(dx) > MIN_SWIPE_DISTANCE; // 最小距離を超えているか
}

/**
 * スワイプ領域内のスワイプかどうか
 * 
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function isInSWIPE_AREA(x, y) {
  return x > SWIPE_AREA.x && x < SWIPE_AREA.x + SWIPE_AREA.width &&
    y > SWIPE_AREA.y && y < SWIPE_AREA.y + SWIPE_AREA.height;
}