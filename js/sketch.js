let startX;
let startY;
let isSwiping = false;

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
  if (isSwiping) {

  }
}

/**
 * マウスが押されたときに発火
 */
function mousePressed() {
  startSwipe(mouseX, mouseY);
}

/**
 * スワイプが開始されたときに発火
 */
function touchStarted() {
  if (touches.length > 0) {
    startSwipe(touches[0].x, touches[0].y);
  }
  return false; // Prevent default
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
  checkHorizontalSwipe(x);
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
