var numberField = $('#numberField');
var textField = $('#textField');
var button = $('#sendButton');
var msg = $('.response');
var socket = io();

Notification.requestPermission().then(function(status) {
    console.log(status); //status will be granted if user accepts 
})


textField.on('keyup', function(err) { 
    if ((err.keyCode || err.charCode) === 13) send();
}, false); //when a user presses a Return key

button.on('click', function() {
    send();
}); //when a user clicks the 'Send' button

function send() {
    var number = numberField.val().replace(/\D/g, ''); //Remove all non-numeric characters /g is for all occurances, \D is non-digit
    var text = textField.val();

    axios({
    url: '/',
    method: 'post',
    headers: {
    'Content-Type': 'application/json'
    },
    data: {
        number: number, 
        text: text
    }
    }).then(function(res) { 
        console.log(res) 
    }).catch(function(error){ 
        console.log(error)
    });
}

socket.on('smsStatus', function(data) {
    displayStatus(`Message ID ${data.id} successfully sent to ${data.number}`);
});

function displayStatus(message) {
    var notification = new Notification('Nexmo', {
        body: message
    });
}
