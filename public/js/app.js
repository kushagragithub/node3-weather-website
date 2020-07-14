 console.log('client side java script file to be loaded');

  //a javascript representation will come out of this
 var weatherForm=document.querySelector('form')
var search = document.querySelector('input')
var messageOne = document.querySelector('#message-1')
var messageTwo= document.querySelector('#message-2')

 //creating the event with 2 arguments
weatherForm.addEventListener('submit' ,(e) =>{
   e.preventDefault()  //prevents the default refresh of the web browser
   var location = search.value
   
   messageOne.textContent = 'Loading . . .'
   messageTwo.textContent = ' '
 // using the fetch API . . 
   fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) =>{

        if(data.error){
           messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
       //dumping the json
    })
 })
})