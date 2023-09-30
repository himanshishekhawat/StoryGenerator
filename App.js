import "./index.css";
import { useState } from "react"
import { useEffect } from "react";



const App = () => {

  const handleClick = (uniqueTitle)=>{
    setCurrentTitle(uniqueTitle);
    setMessage("");
    setValue("");
  }

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [previousMessage, setPreviousMessage] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");


  const createNew = () => {
    setMessage("");
    setValue("");
    setCurrentTitle("");
  }

  const getMessage = async () =>{
    const options = {
      method: "POST",
      body: JSON.stringify({
        messages: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
        const response = await fetch('http://localhost:8000/completions',options)
        const data = await response.json()
        setMessage(data.choices[0].message)
        

    } catch (error) {
        console.log(error)
    }
  }
  useEffect(() => {
    console.log(currentTitle,value,message);
    if(!currentTitle && value && message) {
      setCurrentTitle(value); 
    }
    if(currentTitle && value && message){

      setPreviousMessage(previousMessage => (
        [...previousMessage, 
          {
            title:currentTitle,
            content:message.content
          }
        ]
      ))
    }
  }, [message, currentTitle])

  console.log(previousMessage)

  const currentStory = previousMessage.filter(previousMessage => previousMessage.title === currentTitle);
  const uniqueTitle = Array.from(new Set(previousMessage.map(previousMessage => previousMessage.title)))
  console.log(uniqueTitle)
  return (
    <div className="App">
      <section className="side-bar">
        <button className="new-story-btn" onClick={createNew}>+ New Story</button>
        <ul className="story-history">
          <li className="history-heading">Previous Stories</li>
          {uniqueTitle?.map((uniqueTitle,index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
      </section>
      <section className="main">
        <div className="current-story">
            <p className="current-story-tips"><span>Points to remember:</span> <br/>
                 - provide detail description atleast more than 9-10 words. <br/>
                 - use delimiters to provide more specific information.<br/>
            </p>
            {currentStory?.map((story, index) => <li key={index}><p>{story.content}</p></li>)}
        </div>
        <div className="footer">
          <input type="text" className="prompt-box" placeholder="Type Description" value={value} onChange={(e) => { setValue(e.target.value)}}/>
          <div id="submit" onClick={getMessage}>➤</div>
        </div>
      </section>
    </div>
  );
}

export default App;
