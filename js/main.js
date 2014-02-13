
$(document).ready(function()
{

	if( !( "ontouchstart" in window ) )
	{

	    $( ".content" ).windows(
		{
	        snapping: true,
	        snapSpeed: 500,
	        snapInterval: 1000,
	        onScroll: function( scrollPos )
	        {
	        },
		    onSnapComplete: function( $el )
		    {
			    var anchorName = "#" + $el.attr( 'id' );
			    if( location.hash != anchorName )
				{
					location.hash = anchorName;
				}
		    },
		    onWindowEnter: function( $el )
		    {

		    }

	    });

		$( document ).on("mousewheel", function()
		{

		});
	}
	else
	{
		document.body.addEventListener( 'touchmove', function(e){ e.preventDefault(); });//disable scrolling
	}

	window.onresize = onResize;
	onResize();


});

function onResize(e)
{
	var windWidth = $( window ).width();
	var windHeight = $( window ).height();

    var footerHeight = $('#footer').height();
    var headerWidth = $("#header").width();

    $('#footer').css( { top : windHeight - footerHeight ,
	                    display : "block" } );

    $('#header').css( { left: windWidth  - headerWidth,
	                    display : "block" } );

}

function navTo( anchorName )
{

	$( "body" ).animate(
		{
			'scrollTop':   $( anchorName ).offset().top
		},
		{
			duration : 500,

			step : function( t, fx )
			{
			},

			complete : function()
			{
				if( location.hash != anchorName )
				{
					location.hash = anchorName;
				}
			}
		}

	);

}
//got to hash or delay for 5 secs

if( location.hash == "" )
{
	setTimeout( navTo, 5000, "#training" );
}
else
{
	navTo( location.hash );
}


/*
	herr Quasimondo's compact interpolator
    This alternative method uses less local variables and less operators to achieve the same result:
*/
/*
//request Animation Frame or equivalent...
var raf = 	window.requestAnimationFrame		||
			window.webkitRequestAnimationFrame 	||
			window.mozRequestAnimationFrame 	||
			window.msRequestAnimationFrame 		||
			window.oRequestAnimationFrame 		||
			function(func) { setTimeout(func, 1000 / 30 ); };

var colors = [  0x02c4d1,
				0x028E9B,
				0xFFB100,
				0xFD0006 ];

var srcColor = colors[ 0 ];
var destColor = colors[ 1 ];
var currentColor = colors[ 0 ];
var colorTime = 0;

function interpolateColorsCompact( a, b, lerp )
{
  var MASK1 = 0xff00ff;
  var MASK2 = 0x00ff00;

  var f2 = parseInt( 256 * lerp );
  var f1 = 256 - f2;

  return ((((( a & MASK1 ) * f1 ) + ( ( b & MASK1 ) * f2 )) >> 8 ) & MASK1 ) | ((((( a & MASK2 ) * f1 ) + ( ( b & MASK2 ) * f2 )) >> 8 ) & MASK2 );

}
function update()
{
	currentColor = interpolateColorsCompact( srcColor, destColor,  colorTime  );
//	console.log( currentColor );
	colorTime += .01;

	var col = "#" + toHex( currentColor >> 16 & 0xFF ) + toHex( currentColor >> 8 & 0xFF ) + toHex( currentColor & 0xFF );

	$( 'body' ).css( 'background-color' , col );
	raf( update );
}

function toHex(n)
{
	n = parseInt( n, 10 );
	if ( n == 0 || isNaN( n )) return "00";
	n = Math.max( 0, Math.min( n, 255 ) );
	return "0123456789ABCDEF".charAt( ( n - n % 16 ) / 16 ) + "0123456789ABCDEF".charAt( n % 16 );
}

	raf( update );
//*/