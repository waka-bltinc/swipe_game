let startX;
let startY;
let isSwiping = false;
let score = 0;

const OBJECT_PROPS = [
  { imageIndex: 0, name: "お茶", isRecyclable: false },
  { imageIndex: 1, name: "コーラ", isRecyclable: false },
  { imageIndex: 2, name: "お水", isRecyclable: true },
]

const OBJECT_TYPES = OBJECT_PROPS.length;

const GAME_AREA_WIDTH = Math.min(window.innerWidth, 400);
const GAME_AREA_HEIGHT = window.outerHeight;

const SWIPE_AREA = {
  x: window.innerWidth / 2 - GAME_AREA_WIDTH / 2,
  y: 0,
  width: GAME_AREA_WIDTH,
  height: GAME_AREA_HEIGHT,
}; // 特定の領域の定義

const MIN_SWIPE_DISTANCE = 50; // 有効なスワイプと認識する最小の距離

let images = []; // 画像データを保持するための変数
let recycleObjects = [];

function Game() {
  /**
   * 描画領域の設定
   */
  this.setup = function () {
    createCanvas(windowWidth, windowHeight);
    background(255);
    imageMode(CENTER); // 画像の描画基準点を中心に設定
  }

  /**
   * メインループ
   */
  this.draw = function () {
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
    textAlign(CENTER);
    text(`SCORE : ${score}`, window.innerWidth / 2, 50);

    textAlign(LEFT);
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
      this.drawRecycleObject(recycleObjects[i]);
    }

    if (isSwiping) {

    }
  }

  /**
   * マウスが押されたときに発火
   */
  this.mousePressed = function () {
    if (this.isInSWIPE_AREA(mouseX, mouseY)) {
      this.startSwipe(mouseX, mouseY);
    }
  }

  /**
   * スワイプが開始されたときに発火
   */
  this.touchStarted = function () {
    if (touches.length > 0 && isInSWIPE_AREA(touches[0].x, touches[0].y)) {
      this.startSwipe(touches[0].x, touches[0].y);
      return false; // Prevent default
    }
  }

  /**
   * マウスクリックが離れたときに発火
   */
  this.mouseReleased = function () {
    this.endSwipe(mouseX, mouseY);
  }

  /**
   * スワイプが醜虜したときに発火
   */
  this.touchEnded = function () {
    if (touches.length > 0) {
      this.endSwipe(touches[0].x, touches[0].y);
    } else {
      this.endSwipe(mouseX, mouseY);
    }
  }

  /**
   * スワイプ開始
   * 
   * @param {*} x 
   * @param {*} y 
   */
  this.startSwipe = function (x, y) {
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
  this.endSwipe = function (x, y) {
    isSwiping = false;
    if (this.isValidSwipe(x)) {
      this.checkHorizontalSwipe(x);
    }
  }

  /**
   * スワイプの方向を計算
   * 
   * @param {*} endX 
   */
  this.checkHorizontalSwipe = function (endX) {
    const dx = endX - startX;
    const distance = abs(dx);

    background(255); // Clear screen
    textSize(32);
    fill(0);
    textAlign(CENTER, CENTER);
    if (distance > 50) {
      if (dx > 0) {
        text("Right swipe", window.innerWidth / 2, window.innerHeight - 50);
        if (recycleObjects[0].isRecyclable) {
          score += 100;
        } else {
          score -= 50
        }
        this.deleteFirstNodeAndShift(recycleObjects);
      } else {
        text("Left swipe", window.innerWidth / 2, window.innerHeight - 50);
        if (!recycleObjects[0].isRecyclable) {
          score += 100;
        } else {
          score -= 50
        }
        this.deleteFirstNodeAndShift(recycleObjects);
      }
    }
  }

  /**
   * スワイプの長さが有効かどうか
   * 
   * @param {*} endX 
   * @returns 
   */
  this.isValidSwipe = function (endX) {
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
  this.isInSWIPE_AREA = function (x, y) {
    return x > SWIPE_AREA.x && x < SWIPE_AREA.x + SWIPE_AREA.width &&
      y > SWIPE_AREA.y && y < SWIPE_AREA.y + SWIPE_AREA.height;
  }

  /**
   * 受け取ったdrawRecycleObjectを描画する
   * 
   * @param {*} recycleObject 
   */
  this.drawRecycleObject = function (recycleObject) {
    image(recycleObject.image, recycleObject.x, recycleObject.y); // 画像をキャンバスの中心に表示
  }

  /**
   * recycleObjectsの先頭要素を削除しつつ、残りの要素のy座標を更新する
   * 
   * @param {*} recycleObjects 
   */
  this.deleteFirstNodeAndShift = function (recycleObjects) {
    // 最初の要素を配列から削除
    recycleObjects.shift();

    // 残りの各要素の y プロパティを -50 する
    for (let i = 0; i < recycleObjects.length; i++) {
      recycleObjects[i].y += 50;
    }
  }
}