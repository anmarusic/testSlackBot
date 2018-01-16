console.log('\x1b[31m','**********************');
console.log('\x1b[33m', '**********************');
console.log('\x1b[32m','**********************');
console.log('\x1b[37m','    Server is high');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 4390;

const app = express();

let request = require('request');
/*
const logger = (res,req,next)=>{
    console.log('Logging...');
    next();
};

app.use(logger);
*/
//View engine
app.set('view-engine','ejs');
app.set('views', path.join(__dirname,'views'));


//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static path
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.render('index.ejs');
});

app.post('/hello',(req,res,next)=>{
    let username = req.body.user_name;
    let city = req.body.text;
    city=city.split(" ");
    let responseText = "I don't know what are you talking about";
    request({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city[1] + "&appid=80b7ca5e5373805a0d817dfe8d21f930",
        method: "POST"
    }, (error, response, body)=>{
        let neki = JSON.parse(response.body);
        if(neki.cod === 200){
            temp=((neki.main['temp']- 32) * 5 / 9).toFixed(2);
            responseText = 'Temperature in '+ city[1] +' is '+ temp +'° C';
        }
        else{
            responseText = 'I have never heard about that city';
        }
        let botPayload = {
            text: responseText
        };
        if(username!=='slackbot'){
            return res.status(200).json(botPayload);
        }else{
            return res.status(200).end();
        }
    });

});

app.listen(port,()=>{
    console.log('      on port '+port);
});


