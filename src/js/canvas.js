var canvas = document.querySelector('canvas.enteractive');
function __Width() {
	return window.innerWidth;
}
function __Height() {
	let canvas3d = document.querySelector('body > canvas')
	return canvas3d.offsetHeight;
}



canvas.width = __Width(); //canvas.offsetWidth; //  //
canvas.height =  __Height() //canvas.offsetHeight; // /

console.log('Canvas-X: ' + canvas.width, ' | Canvas-Y: ' + canvas.height);

var c = canvas.getContext('2d');
var x = 5;
var y = 5;

// Create gradient
// var grd = c.createRadialGradient(75, 50, 5, 1000, 60, 1000);
// grd.addColorStop(0, "#00ff00");
// grd.addColorStop(1, "black");

// Fill with gradient
// c.fillStyle = grd;
// c.fillRect(0, 0, window.innerWidth, window.innerHeight);

// var img = document.getElementById("scream");
//     c.drawImage(img, canvas.width/2 -200, canvas.height/2 -350);
    // c.imageAlign = "center";
// var x, y, width, height,

// var Width = 10;
// var Height = 10;




/*//// LINE *///
// c.beginPath();
// c.moveTo(x, y);
// c.lineTo(250,130);
// c.lineTo(50,55);
// c.lineTo(5,55);
// c.strokeStyle = "red";
// c.stroke();

/*//// SHAPES *///
// c.fillStyle = "rgb(250,0,0)"
// c.fillRect(x, y, Width, Height);
// c.fillStyle = "rgb(0,250,0)"
// c.fillRect(5,50, Width, Height);
// c.fillStyle = "rgb(0,0,250)"
// c.fillRect(50,50, Width, Height);
// c.fillRect(250,130, Width, Height);

// c.beginPath();
// c.arc(x*10, y*20, 25, 0, Math.PI*2, false);
// c.strokeStyle = "blue";
// c.stroke();

// for (var i=0; i < 10; i++) {
// 	const _x = Math.random() * canvas.offsetWidth;
// 	const _y = Math.random() * canvas.offsetHeight;
// 	c.beginPath();
// 	c.arc(_x,_y, 30, 0, Math.PI*2, false);
// 	c.strokeStyle = 'rgba(0,250,0,0.5)';
// 	c.stroke();
// }

// console.log('The object canvas is selected as: ' + canvas);




// c.font = "60px Comic Sans MS";
// c.fillText("Hello World", 10, 50);
// c.fillStyle = "white";
// c.textAlign = "center";
// c.fillText("Hello World", canvas.width/2, canvas.height/2);
var mouse = {
	x: undefined,
	y: undefined,
}
var maxRadius = 40;
var minRadius = 2;

var colorArray = [
	'#93DFCB',
	'#A8EAC0',
	'#CAEFC4',
	'#E9F5CA',
	'#F6FFCA'
];


	canvas.addEventListener('mousemove', function(event) {
		// console.log(event);
		// console.log('mouse move record');
		// const event = mouse.x, mouse.y; // issue
		mouse.x = event.x;
		mouse.y = event.y;		
	});




function Circle (_zx,_zy,_dx, _dy,_radius) {

	this.zx = _zx;
	this.zy = _zy;
	this.dx = _dx;
	this.dy = _dy;
	this.radius = _radius;
	this.minRadius = _radius;
	this.color = colorArray[Math.floor(Math.random()* colorArray.length)];
	var zxm = this.zx; // - (window.innerWidth/4);
	var zym = this.zy; // - (window.innerHeight/4);

	this.draw = function() {
		c.beginPath();
		c.arc(this.zx, this.zy, this.radius, 0, Math.PI*2, false);
		c.strokeStyle = "blue";
		// c.stroke();
		c.fillStyle = this.color;
		c.fill();
	}


	this.update = function() {
		if (this.zx + this.radius > canvas.offsetWidth || this.zx - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.zy + this.radius > canvas.offsetHeight || this.zy - this.radius < 0) {
			this.dy = -this.dy;
		}
		var xt = mouse.x + this.zx + window; 
		this.zx += this.dx;
		this.zy += this.dy;
		// mouse.x = this.
		// Multiverse interactive
		if (mouse.x - this.zx < 25 
			&&
			mouse.x - this.zx > -25
			&& 
			mouse.y - this.zy < 25 
			&&
			mouse.y - this.zy > -25) {
			if (this.radius < maxRadius) {
			this.radius += 1;
		}} else if( this.radius > this.minRadius) {
			this.radius -= 1;
		}

		// console.log('x:' + zx,'| y: ' + zy);
		// console.log(mouse.x, mouse.y);
		this.draw();
	}
}



var circleArray = [];

for ( var i = 0; i < 100; i++) {
	
	var radius = (Math.random() * 3 + 1);
	var zx = Math.random() * (window.innerWidth - radius*2) + radius;
	var zy = Math.random() * (window.innerHeight - radius*2) + radius;
	var dx = (Math.random() - 0.5);
	var dy = (Math.random() - 0.5);


	circleArray.push(new Circle(zx, zy, dx, dy, radius));
}

// console.table(circleArray);

function anim() {
	requestAnimationFrame(anim);
	c.clearRect(0, 0, innerWidth, document.body.scrollHeight);

	for (var i = 0; i < circleArray.length; i++) {
		circleArray[i].update();
	}

}

anim();

