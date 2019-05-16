
//Works fine for me with that image and the following code in the latest Firefox and Chrome beta on Mac. (Except the image itself has a few white non-transparent pixels, which you can see by opening on a dark background e.g. in Firefox.)

<!DOCTYPE HTML> 
<html>
<head>
<script type="application/x-javascript">
var canvas, ctx;

function init() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");

  var size=500;
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.fillStyle = 'yellow';
  ctx.moveTo(0,0);
  ctx.lineTo(size,0);
  ctx.lineTo(size,size);
  ctx.lineTo(0,size);
  ctx.lineTo(0,0);
  ctx.stroke();
  ctx.fill();

  var img = document.getElementById("img");
  ctx.drawImage(img, 0, 0);
  ctx.drawImage(img, 5, 5);
  ctx.drawImage(img, 10, 10);
}
</script>


</head>


<body onload="init();">

  <canvas id="canvas" width="500" height="500"></canvas>

  <img id="img" src="http://i44.tinypic.com/25ymq.gif" style="position:absolute; top:500px"></img>

</body>
</html>