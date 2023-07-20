const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');
const axios = require('axios');


app.use(bodyParser.json({extended: false}));

app.use(cors());

var weather=[];
app.post('/data', async(req, res)=>{
  try{
  // console.log(req.body);
  const city = req.body.city;
  const noOfCities = city.length;
  
  for(let i=0;i<noOfCities;i++){
    const params = {
      access_key: 'a2413464d3a103408f31f25f21076a63',
      query: city[i]
    }
    const response = await axios.get('http://api.weatherstack.com/current', {params})
    
    const apiResponse = response.data;
    // console.log(response.data);
    weather[i]={
      location: apiResponse.location.name,
      temperature: apiResponse.current.temperature
    }
    console.log(weather[i]);
    console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
  }
  console.log(weather);
  res.status(201).json({weather: weather});
}
catch(err){
  console.log(err);
}
})


app.listen(4000);

 