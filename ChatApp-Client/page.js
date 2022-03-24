var message = document.getElementById("mess")
var textbox = document.getElementById("textbox_toSend")
var button = document.getElementByClass("SendButton")

button.addEventListener("click", function(){
    var newMessage = document.createElement("miao");
    newMessage.innerHTML = textbox.value
    message.appendChild(newMessage)
    textbox.value = "";
});