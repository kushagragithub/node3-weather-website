/*

var request = require('request');

var forecast = (latitude,longitude,callback) =>{
//var url ='http://api.weatherstack.com/current?access_key=c7294463236f0711890153832e2890cc/'+latitude+','+longitude;
var url = 'http://api.weatherstack.com/current?access_key=c7294463236f0711890153832e2890cc&query=latitude,longitude'

request( {url , json:true  }, (error, { body} ) =>{
	if(error){
		callback ('Unable to connect to weather service',undefined)
	}else if(body.error){
		callback ('Unable to find location',undefined)
	}
	else{
		callback (undefined , 'Temperature is '+ body.current.temperature + ' And '  +    body.current.weather_descriptions[0] +' throughout the day.')
	    //var data = JSON.parse(response.body);
	 // console.log(body.current.temperature);
	}
})
}
module.exports = forecast

*/
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=269ae137e1eea7a88df8b75e25e030e8/'+ latitude +','+longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip+ '% chance of rain.')
        }
    })
}

module.exports = forecast