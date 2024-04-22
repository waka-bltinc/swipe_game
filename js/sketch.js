
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


  // window.addEventListener('load', function () {
  //   // スワイプ／フリック
  //   // document.getElementById("content1").addEventListener('touchmove', logTouch);
  // });

  // function logTouch(event) {
  //   console.log("X:" + event.touches[0].pageX);
  //   console.log("Y:" + event.touches[0].pageY);
  // }

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


