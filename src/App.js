import './App.css';
import React, { useState, useEffect } from "react"
import Loading from './components/Loading';
import { motion } from 'framer-motion';
const OpenAI = require('openai-api');
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const openai = new OpenAI(OPENAI_API_KEY);

function App() {

  let [prompt, setPrompt] = useState()
  let [query, setQuery] = useState()
  let [response, setResponse] = useState("")
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getResponse = async () => {
      if (query) {
        setIsLoading(true)
        let promptText =
          `Please provide the user with a brief explanation, one that a child could easily understand, on topics and questions strictly related to computer science.

          Topic: Web development
          Answer: Web development is the process of creating websites. This includes everything from the design of the website to the coding that makes it work. Web developers use a variety of programming languages to create websites.

          Topic: Ants
          Answer: Sorry, I can't answer that. Please try again with a topic more closely related to programming!

          Topic: Milk
          Answer: Sorry, I can't answer that. Please try again with a topic more closely related to programming!

          Topic: ${query}
          Answer:
          `

        const gptResponse = await openai.complete({
          engine: 'text-davinci-002',
          prompt: promptText,
          maxTokens: 128,
          temperature: 0.1,
          max_tokens: 128,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0.5,
        });

        setResponse(gptResponse.data.choices[0].text)
        // setResponse("OpenAI's API provides access to GPT-3, which performs a wide variety of natural language tasks, and Codex, which translates natural language to code.")
        setIsLoading(false)
      }
    }
    getResponse();
  }, [query])

  return (
    <div className="container">
      <h1 className="website-title">stackopen<sup>(AI)</sup>flow</h1>
      <span>
        <input className="main-input"
          placeholder="ELI5 a CS concept..."
          value={prompt}
          onChange={event => setPrompt(event.target.value)}
        />
        <motion.button className="submit-button"
          whileHover = {{ scale: 1.05 }}
          whileTap = {{ scale: 0.95 }}
          type="submit"
          onClick={() => prompt !== "" && setQuery(prompt)}>
          Submit
        </motion.button>
      </span>
      {isLoading ? <Loading /> : 
      <div className="card">
        {query === undefined ? 
        <>
        <h2 className="query">Sample Query: React</h2>
        <hr></hr>
        <h2 className="answer"><span style={{color: "rgb(0, 115, 255)"}}>Sample Response:</span> React is a programming language that helps developers create user interfaces and websites. It is popular because it makes code easy to read and understand, and it can be used to create complex applications.</h2>
        </> 
        : 
        <>
        <h2 className="query">Query: {query}</h2>
        <hr></hr>
        <h2 className="answer"><span style={{color: "rgb(0, 115, 255)"}}>Response:</span> {response}</h2>
        </>}
      </div>}
    </div>
  );
}

export default App;
