//Require hidden api key
const dotenv = require('dotenv')
dotenv.config()

//Require express to run server and routes
const express = require('express')

//Start up an instance of app
const app = express()

//Dependencies
const path = require('path')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')

const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Cors for cross origin allowance
const cors = require('cors')
const { response } = require('express')
const { triggerAsyncId } = require('async_hooks')
app.use(cors())

// Initialize the main project folder
app.use(express.static('dist'))
console.log(__dirname)

//MeaningCloud credentials for API
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key='
const apiKey = process.env.API_KEY
//console.log(`Your API Key is ${process.env.API_KEY}`)

// Setup server and designate what port the app will listen to for incoming requests
const port = 8081

//Spin up the server
const server = app.listen(port, listening)

//Callback to debug
function listening () {
  console.log('The server is running.')
  console.log(`The server is running on localhost: ${port}.`)
}

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

//GET Request
app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

let objMeaningCloudData = {}

//POST route - the client sends the data (url) to the server and the server accepts the incoming data via this POST route
app.post('/article', async (req, res) => {
  userInput = req.body.formUrl
  const apiData = await fetch(
    `${baseURL}${apiKey}&lang=auto&url=${req.body.formUrl}`,
    {
      method: 'POST'
    }
  )

  try {
    const meaningCloudData = await apiData.json()
    console.log('apiData', meaningCloudData)
    res.send(meaningCloudData)
  } catch (error) {
    console.log('error', error)
  }
})
