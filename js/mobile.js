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

var readyStateCheckInterval = setInterval( function() {
    if (document.readyState === "complete") {
        clearInterval(readyStateCheckInterval);
        setUpSocialMediaLinkClickLogging();
        setDefaultContactMessageText();
    }
}, 10);

//CAPTURE CLICKS FOR GA
function setUpSocialMediaLinkClickLogging(){
    var anchors = document.getElementsByTagName("a");
    var anchor;
    for (var i = 0; i < anchors.length; ++i) {
        anchor=anchors[i];
        if(anchor.href.indexOf("http")==0 && anchor.href.indexOf("devstate.net")==-1 ){
            //console.log("setUpSocialMediaLinkClickLogging()", anchor.href);
            anchor.addEventListener("click",logSocialMediaLinkClick);
        }
    }
}

function logSocialMediaLinkClick(event){
    //console.log("logSocialMediaLinkClick");
    var link=event.currentTarget;
    event.preventDefault();

    var name=String(link).replace(/.*?:\/\//g, "");;//from http://stackoverflow.com/questions/8206269/javascript-how-to-remove-http-from-url
    if(name.indexOf("www.")==0){
        name=name.split("www.")[1];
    }
    name=name.split(".")[0];
    if(location.hostname && location.hostname.toLowerCase().indexOf("devstate")>-1){
        ga("send", "event", "SocialMediaLinks", "Click", name);
    }
    window.open(link,"_blank");
}


//===================::CONTACT FORM RELATED::======================

var defaultContactMessageText = "Interested in a workshop? Looking for more information? Get in touch!";

function setDefaultContactMessageText(){
    document.getElementById("messageInput").value = defaultContactMessageText;
}

function messageInputOnFocusHandler(event){
    var input = document.getElementById("messageInput");
    if(input.value == defaultContactMessageText){
        input.value = "";
    }
}


//copy paste from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function addRequiredContactFormData(formData, name, value){
    if(!value || value=="" || value===defaultContactMessageText){
        alert("It seems you've left the "+name+" field blank, please fill it in and try again.")
        return false;
    }
    formData.append(name, value);
    return true;
}

function submitContactForm(event) {
    console.log("submitContactForm");
    event.preventDefault();
    var userMail = document.getElementById("mailInput").value;
    if ( validateEmail( userMail ) ) {

        var formData = new FormData();
        if( !addRequiredContactFormData(formData, "name", document.getElementById("nameInput").value) ||
            !addRequiredContactFormData(formData, "message", document.getElementById("messageInput").value) ){
            return;
        }
        formData.append( 'email', userMail );
        formData.append( 'phone', document.getElementById("phoneInput").value );

        var xhRequest = new XMLHttpRequest();
        xhRequest.open('POST','./contact.php');
        xhRequest.onload = function() {
            if( this.status == 200 ) {
                /*
                for(var prop in this){
                    console.log("xhRequest.onload(), status==200", prop, this[prop])
                }*/
                document.getElementById("messageInput").value = "";
                //alert("Mail sent! Thanks for getting in touch!\n"+this.response);
                alert("Mail sent! Thanks for getting in touch!");
                return;
            }
            //console.log("xhRequest.onload()", this.status);
        }
        xhRequest.send( formData );
    } else {
        alert( "Ooops! '\n"+userMail+"' doesn't seem to be a valid email address.\nPlease double check.\nIf this problem persists, let us know at twitter.com/devst8" );
    }
}
