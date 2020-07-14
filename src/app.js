/*

//adding template engine to render dynamic documents 
var geocode =require('./geocode');
var forecast = require('./forecast');
var path = require('path');
var express = require('express');

// directories and paths
// nodemon app.js -e hbs,js
// loading hbs
 
var hbs = require ('hbs');
var app = express() // to add express

//Define paths for express config
var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials')
// setup handlebars engine and view location
app.set('view engine', 'hbs')  //handle bars to be added //dynamic webpage
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath) // setting up partials path to its directory

//setup static directory to use
app.use(express.static(publicDirectoryPath))          //way to customize the server

app.get('' , (req,res) => {   // using the handlerbars here
	
	res.render('index', {
		title : 'Weather Site',
		name  : 'Kushagra Mishra',  
	}) //converts to html ..and then shows it to the browser
})
//no need of semicolon in node js 

//connecting the geocode in the weather
app.get('/weather',(req,res) =>{

	if(!req.query.address){
		return res.send({
         error: "You must provide an address"
		})
	}
 
	geocode(req.query.address, (error ,{ latitude,longitude ,location} ={}) =>{
		if(error){
			return res.send({error})
		}
		forecast(latitude ,longitude ,(error ,forecastData) =>{
			if(error){
				return res.send({error})
			}
			res.send({
				forecast :forecastData,
				//forecast :forecast,
				location,
				address : req.query.address
			})
		})
	})
})

// adding the geocode in the object
// basics of query string 
app.get('/products' , (req,res) => {
	if(!req.query.search) { // using the return so that error of two msg send to the client does not come again
	return	res.send({
			error: "You must provide a search term"
		})
	}
	//console.log(req.query.search);
	else if(req.query.search==='games'){
		res.send({
			products : ['Pubg PC Lite' ,'CSGO']
		})
	}

	else if(req.query.search==='fruits'){
			res.send({
				products : ['Apple' ,'Mango']
			})
	}else{
		res.send({
			Error : ['Wrong Search Item']
		})
	}
	
})

// cannot get / random comes from the express module
app.get('/about' , (req,res) =>{
	res.render('about' ,{
		title : ' About Me',
		name  : 'Kushagra Mishra' ,
	})
})

app.get('/help', (req, res) => {
    res.render('help' ,{
	    name          : 'Kushagra Mishra' ,
		contactNumber :  7894561230,
		contactEmail  : 'email@email.com',
		title :'HelpPage',
		
	});   
})
// to match the request after the forwas=rd slash 
app.get('/help/*' , (req,res) => {
	res.render('404' ,{
		title        : '404',
		name         : 'Kushagra Mishra' ,
		errorMessage : 'Help Page Not Found',
	})
})
 //This has to come last bcoz it will look thru how the application works 
 // if you put this in front then it will disply the 404 error page bcoz it will match anything due to the wildcard
app.get('*', (req,res) => {
	res.render('404' ,{
		title         : '404',
		 name         : 'Kushagra Mishra' ,
		 errorMessage : 'Page Not Found',
	})
})
 // now we start the server
app.listen(3000, () => {  // specified the port
    console.log('Server is up on port 3000.');
})

*/


const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kushagra Mishra'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kushagra Mishra'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Kushagra Mishra'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
// adding the geocode in the object
// basics of query string 
app.get('/products' , (req,res) => {
	if(!req.query.search) { // using the return so that error of two msg send to the client does not come again
	return	res.send({
			error: "You must provide a search term"
		})
	}
	//console.log(req.query.search);
	else if(req.query.search==='games'){
		res.send({
			products : ['Pubg PC Lite' ,'CSGO']
		})
	}

	else if(req.query.search==='fruits'){
			res.send({
				products : ['Apple' ,'Mango']
			})
	}else{
		res.send({
			Error : ['Wrong Search Item']
		})
	}
	
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kushagra Mishra',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Kushagra Mishra',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})