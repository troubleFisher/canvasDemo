var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var pen = document.getElementById('pen');
var eraser = document.getElementById('eraser');
var clear = document.getElementById('clear');
var download = document.getElementById('download');

autoGetPageSize(canvas);

var lastPoint = {"x":undefined,"y":undefined};
var using = false;
var eraserEnabled = false;

//启用橡皮擦
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add("active");
    pen.classList.remove("active")
};

//启用画笔
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add("active");
    eraser.classList.remove("active")

};

//清空画板
clear.onclick = function () {
    context.clearRect(0,0,canvas.width,canvas.height);
};

//保存画板
download.onclick = function () {
    var url = canvas.toDataURL("image/jpg");
    var pic = document.createElement("a");
    document.body.appendChild(pic);
    pic.href = url;
    pic.download = 'my picture';
    pic.target = "_blank";
    pic.click()
};

// black.onclick = function () {
//     context.fillStyle = "#010401";
//     context.strokeStyle = "#010401";
// }

// golden.onclick = function () {
//     context.fillStyle = "#deec22";
//     context.strokeStyle = "#deec22";
// }
//
// orange.onclick = function () {
//     context.fillStyle = "#ecbe27";
//     context.strokeStyle = "#ecbe27";
// }
//
// red.onclick = function () {
//     context.fillStyle = "#ec3e1c";
//     context.strokeStyle = "#ec3e1c";
// }
//
// pink.onclick = function () {
//     context.fillStyle = "#ec99c9";
//     context.strokeStyle = "#ec99c9";
// }
//
// cyan.onclick = function () {
//     context.fillStyle = "#1fece3";
//     context.strokeStyle = "#1fece3";
// }
//
// purple.onclick = function () {
//     context.fillStyle = "#821fec";
//     context.strokeStyle = "#821fec";
// }
//
// blue.onclick = function () {
//     context.fillStyle = "#1e34ec";
//     context.strokeStyle = "#1e34ec";
// }

//canvax自动获取页面宽度
function autoGetPageSize() {
    getPageSize();

    window.onresize = function () {
        getPageSize();
    };

    function getPageSize(){
        var pageWidth = document.documentElement.clientWidth;
        var pageHeigh = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeigh;
    }
}

//画圈
function drawCircle(x,y,radius) {
    context.beginPath();
    context.arc(x,y,radius,0,Math.PI*2);
    context.fill();
}

//两点之间画线
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}

//特性检测
if (document.body.ontouchmove === undefined){
    //非触屏设备
    canvas.onmousedown = function (a) {
        var x = a.clientX;
        var y = a.clientY;
        using = true;
        if(eraserEnabled){
            context.clearRect(x-10,y-10,20,20)
        } else {
            lastPoint = {"x":x,"y":y};
            drawCircle(x,y,1);
        }
    };

    canvas.onmousemove = function (a) {
        var x = a.clientX;
        var y = a.clientY;
        if(using){
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20)
            } else {
                // drawCircle(x,y,3);
                var newPoint = {"x":x,"y":y};
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }
    };

    canvas.onmouseup = function (a) {
        using = false;
    };
} else {
    //触屏设备
    canvas.ontouchstart = function (b) {
        var x = b.touches[0].clientX;
        var y = b.touches[0].clientY;
        using = true;
        if(eraserEnabled){
            context.clearRect(x-10,y-10,20,20)
        } else {
            lastPoint = {"x":x,"y":y};
            drawCircle(x,y,1);
        }
    };

    canvas.ontouchmove = function (b) {
        var x = b.touches[0].clientX;
        var y = b.touches[0].clientY;
        if(using){
            if(eraserEnabled){
                context.clearRect(x-10,y-10,20,20)
            } else {
                // drawCircle(x,y,3);
                var newPoint = {"x":x,"y":y};
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }
    };

    canvas.ontouchend = function (b) {
        using = false;
    };
}

//获取颜色
var colors = {
    black : "#010401",
    golden : "#deec22",
    orange: "#ecbe27",
    red: "#ec3e1c",
    pink: "#ec99c9",
    cyan: "#1fece3",
    purple: "#821fec",
    blue: "#1e34ec"
};

for (var i in colors) {
    window[i].onclick = clickColor;
}
// black.onclick = click;
// golden.onclick = click;
// orange.onclick = click;
// red.onclick = click;
// pink.onclick = click;
// cyan.onclick = click;
// purple.onclick = click;
// blue.onclick = click;

function clickColor() {
    context.fillStyle = colors[arguments[0].target.id];
    context.strokeStyle = colors[arguments[0].target.id];
}

//获取画笔粗细
var sizes ={
    size1 : 2,
    size2 : 4,
    size3 : 6,
    size4 : 8,
    size5 : 10
};

for (var j in sizes) {
    window[j].onclick = clickSize;
}

function clickSize() {
    context.lineWidth = sizes[arguments[0].target.id];
}


