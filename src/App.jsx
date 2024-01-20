import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Quiz from './components/Quiz/quiz';
import { jsQuizz } from './constant';
import Home from './components/Home/home';



function App() {
  const [isQuizstarted, setisQuizstarted] =useState(false);
  const[questions, setquestions] =useState([]);

  useEffect(()=>{
    getQuestions();
  },[]);

  const getQuestions =async ()=>{
    try {
      const response =await fetch();
      const questionresponse = await response.json("https://644982a3e7eb3378ca4ba471.mockapi.io/questions");
      console.log(questionresponse);
      setquestions(questionresponse);
    } catch(error){
        console.log(error);
    }
  };

  return (
    
    <>
      
      {/* <div>
        <div>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </div>
        <div><h2>Welcome To the Quiz...!</h2></div>
        <Home />
        <Quiz questions={jsQuizz.questions}/>
      </div>  */}
        
        <div>
        {
          isQuizstarted ? (
            <Quiz questions={jsQuizz.questions}/>
          ):(
            <Home startQuiz={() => setisQuizstarted(true)}/>
          )
        }
      </div>
    </>
  );
}

export default App;
