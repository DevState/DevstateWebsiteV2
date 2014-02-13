/**
 * Created by sakri on 12-2-14.
 */
//==============::GA::====================================
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44531934-1', 'devstate.net');

if(location.hostname && location.hostname.toLowerCase().indexOf("devstate")>-1){
    ga('send', 'pageview');
}
//==============::GA::====================================


//All outgoing link clicks in the document are captured and logged in GA

var DSAnalyticsReadyStateCheckInterval = setInterval( function() {
    if (document.readyState === "complete") {
        clearInterval(DSAnalyticsReadyStateCheckInterval);
        setUpOutgoingLinkLogging();
    }
}, 10);

//CAPTURE CLICKS FOR GA
function setUpOutgoingLinkLogging(){
    var anchors = document.getElementsByTagName("a");
    var anchor;
    for (var i = 0; i < anchors.length; ++i) {
        anchor=anchors[i];
        if(anchor.href.indexOf("http")==0 && anchor.href.indexOf("devstate.net")==-1 ){
            //console.log("setUpOutgoingLinkLogging()", anchor.href);
            anchor.addEventListener("click",logOutgoingLink);
        }
    }
}

function logOutgoingLink(event){
    var link=event.currentTarget;
    event.preventDefault();

    var name=String(link).replace(/.*?:\/\//g, "");//from http://stackoverflow.com/questions/8206269/javascript-how-to-remove-http-from-url
    if(name.indexOf("www.")==0){
        name=name.split("www.")[1];
    }
    name=name.split(".")[0];
    if(location.hostname && location.hostname.toLowerCase().indexOf("devstate")>-1){
        //console.log("logOutgoingLink()", name);
        ga("send", "event", "outgoingLink", name);
    }
    window.open(link,"_blank");
}

function logNavigationClick(item){
    if(location.hostname && location.hostname.toLowerCase().indexOf("devstate")>-1){
        //console.log("logOutgoingLink()", name);
        ga("send", "event", "navigationClick", item);
    }
}
