const PORT = 8000;
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const API_KEY  = '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'

app.post('/completions', async (req,res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `Generate a story of not more then 200 words on ${req.body.messages} with a meaningful ending`}],
            max_tokens: 400,  
        })

    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        res.send(data)
    } catch(error) {
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running at ' + PORT))

