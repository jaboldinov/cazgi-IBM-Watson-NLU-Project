const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url
    });

    return naturalLanguageUnderstanding;
}

app.use(express.static('client'));
const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let ibmParams = {
        url: req.query.url,
        features: {
            emotion: {
            }
        }
    };
    getNLUInstance().analyze(ibmParams)
    .then(resSend => {
        return res.send(resSend.result.emotion.document.emotion) 
    })
    .catch(err => {
        return res.send(err.toString());
    });
});

app.get("/url/sentiment", (req,res) => {
    let ibmParams = {
        url: req.query.url,
        features: {
            sentiment: {
            }
        }
    };
    getNLUInstance().analyze(ibmParams)
    .then(resSend => {
        return res.send(resSend.result.sentiment.document.label) 
    })
    .catch(err => {
        return res.send(err.toString());
    });
});

app.get("/text/emotion", (req,res) => {
    let ibmParams = {
        text: req.query.text,
        features: {
            emotion: {
            }
        }
    };
    getNLUInstance().analyze(ibmParams)
    .then(resSend => {
        return res.send(resSend.result.emotion.document.emotion) 
    })
    .catch(err => {
        return res.send(err.toString());
    });
});

app.get("/text/sentiment", (req,res) => {
    let ibmParams = {
        text: req.query.text,
        features: {
            sentiment: {
            }
        }
    };
    getNLUInstance().analyze(ibmParams)
    .then(resSend => {
        return res.send(resSend.result.sentiment.document.label) 
    })
    .catch(err => {
        return res.send(err.toString());
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})