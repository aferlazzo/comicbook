

(function () {  // self-executing anonymous function for copyright notice
      var Today = new Date();
      $('#thisYear').text(Today.getFullYear());
})();

var i, pictureNo = -1, spinTimer = null;

// code for spinning Alfred's head

spinHead = function (){
	$('#alfred-head').css({'-moz-transform': 'rotate(' + i + 'deg)',
					 '-webkit-transform': 'rotate(' + i + 'deg)'});
  	i += 25;
  	if(i < 375){
  		spinTimer = setTimeout('spinHead()', 3);
  	} else {
  		spinTimer = null;
	}
};

doSpin = function (){
  	i=10;
  	spinHead();
  	setTimeout('doSpin ()', 200000);  // spin head every 20 seconds
};

setTimeout('doSpin ()', 7000);

$('#alfred-head').click(function(){
	if(spinTimer == null)
		doSpin();
});

//- - - - - - - -

// code for handling the 'Contact' pull-out
$('#contact-tab').toggle(function (){
  	$('#contact').css('left',0);
  }, function (){
  	$('#contact').css('left',-242);
});

var direction='d';
// code for handling the modal box that appears 12 seconds after script starts
/*
$('#dialog-box-close').hover(function (){
 	var x = parseInt($('#dialog-box-close').css('right')), r,
 		y = parseInt($('#dialog-box-close').css('top'));

	r = Math.floor(Math.random() * 4);
	console.log('at start random: '+r+' x:'+x+' y:'+y);
	
	switch (r) {
		case 0:
			direction = 'u';
			if (y < 3)
			 	direction='l';
			break;
		case 1:
			direction = 'd';
 			if (y > 40)
	 			direction='r';
			break;
		case 2:
			direction = 'l';
			if (x < 41)
	 			direction='u';
			break;
		case 3:
			direction = 'r';
			if (x > -6)
	 			direction='d';
			break;
	}	
 	switch (direction) {
 		case 'd':
 			y += 20;
			console.log('random: '+r+' y:'+y);
		 	$('#dialog-box-close').css({'top': y});
		 	break;
 		case 'u':
	 		y -= 20;
			console.log('random: '+r+' y:'+y);
		 	$('#dialog-box-close').css({'top': y});
		 	break;
 		case 'l':
			x -= 20;
			console.log('random: '+r+' x:'+x);
		 	$('#dialog-box-close').css({'right': x});
		 	break;
 		case 'r':
			x += 20;
			console.log('random: '+r+' x:'+x);
		 	$('#dialog-box-close').css({'right': x});
		 	break;
	}
});
*/
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
	
	
	// click on a circle/dot, the star, or on the site thumbnail to stop cycling	
	$('.circleDot, a, #star').click(function (){
		var cDindex = $(this).index();
		clearTimeout(portfolioTimer);
		
		$('.circleDot').each(function (i) {
			$('.contrib:eq('+ i +')').css('display', 'none');
			$('.site-slice:eq('+ i +')').css('display', 'none');
			$('.circleDot:eq(' + i + ')').html('&#9675;');
		});

		$('.contrib:eq('+ cDindex +')').css('display', 'block');
		$('.site-slice:eq('+ cDindex +')').css('display', 'block');
		$('.circleDot:eq(' + cDindex + ')').html('&#9679;');
	});
	
	
	//autostart display cycle
	
	(function() {
		var i, siteNo = 0;
		
		doIt = function(){
			$('.circleDot').each(function (i) {
				$('.contrib:eq('+ i +')').css('display', 'none');
				$('.site-slice:eq('+ i +')').css('display', 'none');
				$('.circleDot' + siteNo).html('&#9675;');
			});
			
			if(++siteNo > 4)
				siteNo = 0;

			$('.contrib:eq('+ siteNo +')').css('display', 'block');
			$('.site-slice:eq('+ siteNo +')').css('display', 'block');
			$('.circleDot' + siteNo).html('&#9679;');
			
			if(isNaN(portfolioTimer) == false)
				portfolioTimer = setTimeout('doIt()', 5000);
		},
		
		
		portfolioTimer = 1;
		doIt();
	})();

	$('#cover, .contrib:eq(1)').css('display', 'block');	

});
