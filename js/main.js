
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

    if(logNavigationClick){
        logNavigationClick(anchorName);
    }

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