/*** Created by danny on 2018/2/22.*/

var Context ={
    canvas : null,
    context : null,
    create: function(canvas_tag_id) {
        this.canvas = document.getElementById(canvas_tag_id);
        this.context = this.canvas.getContext('2d');
        return this.context;
    }
};

var Offset = {
    off: function(){
        this.canvasOffset = $("#canvas").offset();
        this.offsetX = this.canvasOffset.left;
        this.offsetY = this.canvasOffset.top;
    }
};

var initial ={
    currentX: 30,
    currentY: 40,
    frameCount: 500,
    currentFrame: 0,
    objX : 100,
    objY :100,
    timer:null,
    waitMe: true

};


function Sprite (options){
    var that= {};
    that.width  = options.width || null;
    that.height = options.height || null;
    that.image  = options.image;
    that.x      = options.x;
    that.y      = options.y;

    if (that.width!=null && that.height!=null){
        that.draw = function(xx,yy) {
            if (xx==null && yy==null){
                //Context.context.clearRect(0, 0, Context.canvas.width, Context.canvas.height);
                Context.context.drawImage(that.image, that.x, that.y, that.width, that.width);
            }
            else{
                // Context.context.clearRect(0, 0, Context.canvas.width, Context.canvas.height);
                Context.context.drawImage(that.image,xx, yy, that.width, that.width)
            }
        }
    }
    else{
        console.log("%o : height,width empty",that.image);
        that.draw = function(xx,yy) {
            if (xx==null && yy==null) {
                Context.context.clearRect(0, 0, Context.canvas.width, Context.canvas.height);
                Context.context.drawImage(that.image, that.x, that.y);
            }
            else{
                // Context.context.clearRect(0, 0, Context.canvas.width, Context.canvas.height);
                initial.objX = xx;
                initial.objY = yy;
                Context.context.drawImage(that.image,xx,yy)
            }
        }
    }

    return that;
}


function handleMouseDown(e) {

            var f = new Offset.off();
            // console.log(f.offsetX);
            mouseX = parseInt(e.clientX - f.offsetX );
            mouseY = parseInt(e.clientY - f.offsetY );
            $("#downlog").html("Coordinate: " + mouseX + " / " + mouseY);

            // points = frame_move(initial.currentX , initial.currentY, mouseX, mouseY, initial.frameCount);
            points = frame_move(initial.objX , initial.objY, mouseX, mouseY, initial.frameCount);
            initial.currentFrame = 0;
            initial.currentX  = mouseX ;
            initial.currentY = mouseY ;
            animate();
}

function frame_move(x1, y1, x2, y2, frames) {  // frames =frameCount
    var dx = x2 - x1;
    var dy = y2 - y1;
    //var length = Math.sqrt(dx * dx + dy * dy);
    var incrementX = dx / frames;
    var incrementY = dy / frames;
    var a = [];
    a.push({
        x: x1,
        y: y1
    });
    for (var frame = 0; frame < frames - 1; frame++) {
        a.push({
            x: x1 + (incrementX * frame),
            y: y1 + (incrementY * frame)
        });
    }
    a.push({
        x: x2,
        y: y2
    });
    return (a);
}

function animate() {
    var point = points[initial.currentFrame++];
    // 更新圖：
    map_sprite.draw();
    leon_sprite.draw(point.x-30 , point.y -40);

    // refire the timer until out-of-points
    if (initial.currentFrame < points.length) {
        initial.timer = setTimeout(animate, 0.0001);
    }
    else{
        console.log("x:%s , y:%s , frameSize: , timer:" ,point.x-30,point.y-30,points.length,initial.timer);
        clearTimeout(initial.timer);

    }
}


var delay = function(s){
  return new Promise(function(resolve,reject){
   setTimeout(resolve,s);
  });
};












var Calling =function (){
    //載入有先後順序：
    map_sprite.draw();
    leon_sprite.draw(0,0);


};




$(document).ready(function() {

    Context.create("canvas");
    Context.context.vertialBoundaryStart = 0;
    Context.context.vertialBoundaryEnd = 1000;
    Context.context.horizontalBoundaryStart = 0;
    Context.context.horizontalBoundaryEnd = 800+120;



    var leon = new Image(); // new 就是實體化
    var map  = new Image();
    leon.src = "./img/Leon.png";
    map.src  = "./img/map.png";

    map_sprite = Sprite({
        image:map,
        x:0,
        y:0,
        width: 1000,
        height: 1000

    });

    leon_sprite = Sprite({
        image:leon,
        x:0,
        y:0
    });

    map.addEventListener("load",Calling);


    $("#canvas").mousedown(function (e) {
            handleMouseDown(e);

    });





});
