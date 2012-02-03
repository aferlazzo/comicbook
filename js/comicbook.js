

(function () {  // self-executing anonymous function for copyright notice
      var Today = new Date();
      $('#thisYear').text(Today.getFullYear());
})();

var i, pictureNo = 0;

// code for spinning Alfred's head

spinHead = function (){
	$('#alfred-head').css({'-moz-transform': 'rotate(' + i + 'deg)',
					 '-webkit-transform': 'rotate(' + i + 'deg)'});
  	i += 20;
  	if(i < 361){
  		setTimeout('spinHead()', 3);
	}
};

doSpin = function (){
  	i=10;
  	spinHead();
  	setTimeout('doSpin ()', 200000);  // spin head every 20 seconds
};

setTimeout('doSpin ()', 7000);

//- - - - - - - -

// code for handling the 'Contact' pull-out
$('#contact-tab').toggle(function (){
  	$('#contact').css('left',0);
  }, function (){
  	$('#contact').css('left',-242);
});


// code for handling the modal box that appears 12 seconds after script starts
$('#dialog-box-close').click(function (){
 	$('#dialog-box').css({'display': 'none'});
});

introDialog = function (){
  	$('#dialog-box').slideDown('fast', 'easeOutBounce');
};

setTimeout('introDialog()', 12000);


// code for cycling through comicbook hero portraits behind Alfred

changePicture = function (){
	var x = 'url(img/'+ ++pictureNo +'.jpg)';

	$('#heroes').css('background-image', x);
	if (pictureNo > 14)
		pictureNo = -1;

	setTimeout('changePicture()', 5000);
};

setTimeout('changePicture()', 5000);

$('document').ready(function (){
	var i, portfolioTimer = null;
	
	$('td, a').click(function (){
		var index = $(this).index();
		clearTimeout(portfolioTimer);
		
		$('td').each(function (i) {
			$('.contrib:eq('+ i +')').css('display', 'none');
			$('.site-slice:eq('+ i +')').css('display', 'none');
			$('td:eq(' + i + ')').html('&#9675;');
		});

		$('.contrib:eq('+ index +')').css('display', 'block');
		$('.site-slice:eq('+ index +')').css('display', 'block');
		$('td:eq(' + index + ')').html('&#9679;');
	});
	
	
	//autostart display cycle
	
	(function() {
		var i, siteNo = 0;
		
		doIt = function(){
			$('td').each(function (i) {
				$('.contrib:eq('+ i +')').css('display', 'none');
				$('.site-slice:eq('+ i +')').css('display', 'none');
				$('td:eq(' + i + ')').html('&#9675;');
			});
			
			$('.contrib:eq('+ siteNo +')').css('display', 'block');
			$('.site-slice:eq('+ siteNo +')').css('display', 'block');
			$('td:eq(' + siteNo + ')').html('&#9679;');
			
			if(++siteNo > 4)
				siteNo = 0;
				
			if(isNaN(portfolioTimer) == false)
				portfolioTimer = setTimeout('doIt()', 5000);
		},
		
		
		portfolioTimer = 1;
		doIt();
	})();

	$('#cover, .contrib:eq(0)').css('display', 'block');	

});









/*
 * This is a little bonus I dreamed up for the portfolio navagation:
 * A div in the shape of a square with its border radius set to 50%
 * turns it into a circle. Nothing overly special there but when we
 * move a 4x4 div along the edge of the square it appears to be a circling
 * div. Pretty special, huh?
 *
 *
 * It sure would be nice if the coordinates withn the square nav box
 * would follow the curve of the border radius.We are not that lucky, so
 * we need do a little math using 2 formulas, abbreviated soh and cah.
 *
 * soh stands for sine = opposite / hypotenus = y coorninate
 * cah stands for cosine = adjacent / hypotenus = x coordinate
 *
 * For a circle having a radius of 1 we can map the (x,y) coordinates of
 * the circle just by using the built-in sin and cos methods of the Math
 * object.
 *
 * There are 360 degrees in a circle and if we want to know the coordinates
 * of each degree then we can start by dividing a circle into 4 quadrants,
 * each having 90 degrees.
 *
 * So the a or adjacent value will be between 1 and 0.01, divided into 90 equal
 * parts. This a value corresponds to the x axis or x coordinate. We know
 * the radius equals 1 for our imaginary circle, and using the cos formula
 * we know if x = 1 then y = the cosine of 1/1.

 */

var xCoord = [], yCoord = [];

getCoordinates = function (){
	for (var i = 0; i < 90; i++){
 		xCoord [i] = Math.cos(i);
 		yCoord [i] = Math.sin(i);
 		console.log("Angle 'A' = " + i + " degrees");
 		console.log("Sin(A) = " + yCoord[i]);
 		console.log("Cos(A) = " + xCoord[i]);
	}
}

//getCoordinates();

//-----
/*

function greenWave(x) {return Math.sin(x); }

function blueWave(x) {
	console.log('x: ' + x + ' y: ' + Math.cos(x));
	return Math.cos(x);
}

function funGraph (ctx,axes,func,color,thick) {
 var i, xx, yy, dx=4, x0=axes.x0, y0=axes.y0, scale=axes.scale;
 var iMax = Math.round((ctx.canvas.width-x0)/dx);
 var iMin = axes.doNegativeX ? Math.round(-x0/dx) : 0;
 ctx.beginPath();				// start defining a new logical shape
 ctx.lineWidth = thick;			// set the logical pen's thinkness
 ctx.strokeStyle = color;		// set the pen's color

 for (i=iMin;i<=iMax;i++) {
  xx = dx*i;
  yy = scale*func(xx/scale);

  if (i==iMin)
  	ctx.moveTo(x0+xx,y0-yy);	// moveTo lifts the logical pen and moves it to the next
  else							// coordinates for the shape being drawn.
    ctx.lineTo(x0+xx,y0-yy);	// lineTo causes logical pen to "press on" paper and
  								// move to these passed coordinates to further define the shape
 }

 ctx.stroke();					// now draw the previously defined shape
}

function showAxes(ctx,axes) {
 var x0=axes.x0, w=ctx.canvas.width;
 var y0=axes.y0, h=ctx.canvas.height;
 var xmin = axes.doNegativeX ? 0 : x0;
 ctx.beginPath();
 ctx.strokeStyle = "rgb(128,128,128)";
 ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X axis
 ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y axis
 ctx.stroke();
}

function draw() {
 var canvas = document.getElementById("canvas"),
 	 axes={}, ctx = canvas.getContext("2d");

 if !!(canvas.getContext && canvas.getContext("2d")) {
	alert('ERROR: HTML5 canvas not supported')
 	return;
 }
 alert('HTML5 canvas is supported')


 axes.x0 = .5 + .5*canvas.width;  // x0 pixels from left to x=0
 axes.y0 = .5 + .5*canvas.height; // y0 pixels from top to y=0
 axes.scale = 40;                 // 40 pixels from x=0 to x=1 (radius)
 axes.doNegativeX = true;

 showAxes(ctx,axes);
 funGraph(ctx,axes,greenWave,"rgb(11,153,11)",1);	// green sine wave
 funGraph(ctx,axes,blueWave,"rgb(66,44,255)",2);	// blue cosine wave
}


$('document').ready(function (){
	draw(); // don't start drawing until the document is fully loaded
});
*/





