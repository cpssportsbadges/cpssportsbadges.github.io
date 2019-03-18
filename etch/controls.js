let canvas = document.getElementById("screen");
let ctx = canvas.getContext("2d");
let canvasContainer = document.getElementById("cc");
let xCoord1 = 0;
let yCoord1 = 0;
let deltaX = 0;
let deltaY = 0;



let upBtn = document.getElementById("upBtn");
let downBtn = document.getElementById("downBtn");
let leftBtn = document.getElementById("leftBtn");
let rightBtn = document.getElementById("rightBtn");

	canvas.style.height = canvasContainer.style.height //.clientHeight;
	canvas.style.width = canvasContainer.style.width;//clientWidth;


document.addEventListener("resize", () => {
	canvas.style.height = "400px";// canvasContainer.clientHeight;
	canvas.style.width = "600px"; //canvasContainer.clientWidth;
})
upBtn.addEventListener("mousedown", () => {
	deltaY -= 10;//0.001;
});

downBtn.addEventListener("mousedown", () => {
	deltaY += 10;

});

leftBtn.addEventListener("mousedown", () => {
	deltaX -= 10;

});

rightBtn.addEventListener("mousedown", () => {
	deltaX += 10;
});

upBtn.addEventListener("mouseup", () => {
	draw(xCoord1, yCoord1, deltaX, deltaY);
});
downBtn.addEventListener("mouseup", () => {
	draw(xCoord1, yCoord1, deltaX, deltaY);
});

leftBtn.addEventListener("mouseup", () => {
	draw(xCoord1, yCoord1, deltaX, deltaY);
});
rightBtn.addEventListener("mouseup", () => {
	draw(xCoord1, yCoord1, deltaX, deltaY);
})


let draw = (x1, y1, dx, dy) => {
	ctx.beginPath(x1, y1);
	ctx.moveTo(x1, y1);
	ctx.lineTo(x1 + dx, y1 + dy);
	ctx.strokeStyle = "black";
	ctx.stroke();
	resetCoord();
}

let resetCoord = () => {
	xCoord1 += deltaX;
	yCoord1 += deltaY;
	deltaX = 0;
	deltaY = 0;
}

