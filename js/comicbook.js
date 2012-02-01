  // handy trick for preloaing images
new Image().src = "img/comicbook-sprite.png";
new Image().src = "img/0.jpg";
new Image().src = "img/1.jpg";
new Image().src = "img/2.jpg";
new Image().src = "img/3.jpg";
new Image().src = "img/4.jpg";
new Image().src = "img/5.jpg";
new Image().src = "img/6.jpg";
new Image().src = "img/7.jpg";
new Image().src = "img/8.jpg";
new Image().src = "img/9.jpg";
new Image().src = "img/10.jpg";
new Image().src = "img/11.jpg";
new Image().src = "img/12.jpg";
new Image().src = "img/13.jpg";
new Image().src = "img/14.jpg";
new Image().src = "img/15.jpg";

  (function () {  // self-executing anonymous function for copyright notice
      var Today = new Date();
      $('#thisYear').text(Today.getFullYear());
  })();
  
  var i, pictureNo=0;
  
  spinHead = function(){
	$('#alfred-head').css({'-moz-transform': 'rotate(' + i + 'deg)',
					 '-webkit-transform': 'rotate(' + i + 'deg)'});  	
  	i += 10;
  	if(i < 361){
  		setTimeout('spinHead()', 5);
	}
  }
  
  
  doSpin = function(){
  	i=10;
  	spinHead();
  	setTimeout('doSpin()', 7000);
  }
  
 setTimeout('doSpin()', 7000); 
 
changePicture = function(){
	var x = 'url(img/'+ ++pictureNo +'.jpg)';
		
	$('#heroes').css('background-image', x);
	if (pictureNo > 14)
		pictureNo = -1;

	setTimeout('changePicture()', 5000);
}

	setTimeout('changePicture()', 5000);
  	
