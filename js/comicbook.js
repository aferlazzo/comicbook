  // handy trick for preloaing images
new Image().src = "img/comicbook-sprite.png";

  (function () {  // self-executing anonymous function for copyright notice
      var Today = new Date();
      $('#thisYear').text(Today.getFullYear());
  })();
  
  var i;
  
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
  }
  
 setTimeout('doSpin()', 7000); 