import React from "react"
import { useState, useEffect } from "react"
const OpenAI = require('openai-api');
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

export default function OpenAIAnswer(props) {

    let [response, setResponse] = useState("Placeholder")

    async function getResponse() {
        let promptText = 
        `Provide the user with a simple explanation that a child could understand on a chosen topic.
    
        I WISH TO LEARN MORE ABOUT:
        =========
        ${props.query}
        
        Please provide a good explanation of the topic that a child could easily understand:`
    
        const gptResponse = await openai.complete({
            engine: 'text-davinci-002',
            prompt: promptText,
            maxTokens: 200,
            temperature: 0.8,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false
        });
    
        setResponse(gptResponse.data.choices[0].text)
    }

    useEffect(() => {
        getResponse()
    }, [props])

    return (
        <div>
            <h2 className="openAPIresponse">{response}</h2>
        </div>
    )
}