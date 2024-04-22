let startX;
let startY;
let isSwiping = false;
let score = 0;


const OBJECT_PROPS = [
  { imageIndex: 0, name: "お茶", isRecyclable: false },
  { imageIndex: 1, name: "コーラ", isRecyclable: true },
  { imageIndex: 2, name: "お水", isRecyclable: true },
]

const OBJECT_TYPES = OBJECT_PROPS.length;

const GAME_AREA_WIDTH = Math.min(window.innerWidth, 400);
const GAME_AREA_HEIGHT = window.innerHeight;

const SWIPE_AREA = {
  x: window.innerWidth / 2 - GAME_AREA_WIDTH / 2,
  y: 0,
  width: GAME_AREA_WIDTH,
  height: GAME_AREA_HEIGHT,
}; // 特定の領域の定義

const MIN_SWIPE_DISTANCE = 50; // 有効なスワイプと認識する最小の距離

let images = []; // 画像データを保持するための変数
let recycleObjects = [];

function preload() {
  // 画像をプリロードする
  images.push(loadImage("./image/tea.png"));
  images.push(loadImage("./image/cola.png"));
  images.push(loadImage("./image/water.png"));
}

/**
 * 描画領域の設定
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  imageMode(CENTER); // 画像の描画基準点を中心に設定
}

/**
 * メインループ
 */
function draw() {
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
  textSize(24);
  text(`SCORE : ${score}`, window.innerWidth / 2 - GAME_AREA_WIDTH / 2 + 50, 50);

  text("お水", window.innerWidth / 2 + GAME_AREA_WIDTH / 2 - 100, window.innerHeight / 2);
  text("お茶", window.innerWidth / 2 - GAME_AREA_WIDTH / 2 + 50, window.innerHeight / 2);
  text("コーラ", window.innerWidth / 2 - GAME_AREA_WIDTH / 2 + 50, window.innerHeight / 2 + 50);

  /**
   * オブジェクトの生成
   */
  for (let i = 4; i >= 0; i--) {
    if (!recycleObjects[i]) {
      const objectTypeIndex = Math.floor(Math.random() * OBJECT_TYPES); // どのオブジェクトにするか決める
      recycleObjects[i] = new RecycleObject(
        window.innerWidth / 2,
        GAME_AREA_HEIGHT / 2 - 50 * i,
        OBJECT_PROPS[objectTypeIndex].name,
        images[OBJECT_PROPS[objectTypeIndex].imageIndex],
        OBJECT_PROPS[objectTypeIndex].isRecyclable,
      );
    }
  }

  for (let i = 4; i >= 0; i--) {
    drawRecycleObject(recycleObjects[i]);
  }

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
      text("Right swipe", window.innerWidth / 2, window.innerHeight - 50);
      deleteFirstNodeAndShift(recycleObjects);
    } else {
      text("Left swipe", window.innerWidth / 2, window.innerHeight - 50);
      deleteFirstNodeAndShift(recycleObjects);
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

/**
 * 受け取ったdrawRecycleObjectを描画する
 * 
 * @param {*} recycleObject 
 */
function drawRecycleObject(recycleObject) {
  image(recycleObject.image, recycleObject.x, recycleObject.y); // 画像をキャンバスの中心に表示
}

/**
 * recycleObjectsの先頭要素を削除しつつ、残りの要素のy座標を更新する
 * 
 * @param {*} recycleObjects 
 */
function deleteFirstNodeAndShift(recycleObjects) {
  // 最初の要素を配列から削除
  recycleObjects.shift();

  // 残りの各要素の y プロパティを -50 する
  for (let i = 0; i < recycleObjects.length; i++) {
    recycleObjects[i].y += 50;
  }
}