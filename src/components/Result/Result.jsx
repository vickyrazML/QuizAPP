import { useState } from "react";
import "./Result.scss";
import Home from "../Home/home";

function Result({totalQuestion, result, onTryAgain}) {
    const [isQuizstarted, setisQuizstarted] = useState(true);
    
    const exitQuiz =()=>{
        setisQuizstarted=false;
    }
  return (
    <div>
        <div className="result"> 
                <h3>Result</h3>
                <p>
                    Total Questions: <span>{totalQuestion}</span>
                </p>
                <p>
                    Total Score: <span>{result.score}</span>
                </p>
                <p>
                    Correct Answers: <span>{result.correctAnswers}</span>
                </p>
                <p>
                    Wrong Answers: <span>{result.wrongAnswers}</span>
                </p>

                <button type="button" onClick={onTryAgain}>Try Again</button>

                <button type="button" onClick={exitQuiz}>Exit</button>
        </div>
    </div>
  )
}

export default Result;
