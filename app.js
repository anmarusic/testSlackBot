console.log('\x1b[31m','**********************');
console.log('\x1b[33m', '**********************');
console.log('\x1b[32m','**********************');
console.log('\x1b[37m','    Server is high');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.PORT || 4390;

const app = express();
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
    let botPayload = {
        text: 'Hello '+username
    };
    if(username!=='slackbot'){
        return res.status(200).json(botPayload);
    }else{
        return res.status(200).end();
    }

});

app.listen(port,()=>{
    console.log('      on port '+port);
});


