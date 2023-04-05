const OpenAI = require("openai");
const {Configuration, OpenAIApi} = OpenAI;
require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-PVQPPjlCuwAELDgpIxlaZsHr",
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());


app.post('/', async (req,res) => {
  const { message } = req.body;
  console.log(message);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 70,
    temperature: 1,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    });
      
    if(response.data.choices[0].text){
      res.json({
        message: response.data.choices[0].text
      });
    }
});

app.listen(port, ()=> {
  console.log('Example app listening');
});
