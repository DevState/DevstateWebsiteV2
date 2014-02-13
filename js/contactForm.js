/**
 * Created by sakri on 13-2-14.
 */
var defaultContactMessageText = "Interested in a workshop? Looking for more information? Get in touch!";

var DSContactFormReadyStateCheckInterval = setInterval( function() {
    if (document.readyState === "complete") {
        clearInterval(DSContactFormReadyStateCheckInterval);
        setDefaultContactMessageText();
    }
}, 10);

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
                if(parseInt(this.response)==1){
                    document.getElementById("messageInput").value = "";
                    alert("Mail sent! Thanks for getting in touch!");
                }else{
                    alert("Oops, seems something went wrong with your message,\n please try again or contact us via Twitter or Facebook.\n\nSorry for the inconvenience");
                }
                document.body.style.cursor = "auto";
                return;
            }
            //console.log("xhRequest.onload()", this.status);
        }
        xhRequest.send( formData );
        document.body.style.cursor = "wait";
    } else {
        alert( "Ooops! '\n"+userMail+"' doesn't seem to be a valid email address.\nPlease double check.\nIf this problem persists, let us know at twitter.com/devst8" );
    }
}