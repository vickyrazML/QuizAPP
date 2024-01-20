import { useState } from "react";
import { resultInitialState } from "../../constant";
import AnswerTimer from "../AnswerTimer/Timer";
import "./Quiz.scss";
import Result from "../Result/Result";

const Quiz= ({ questions }) => {
    const [currentquestion, setcurrentquestion] =useState(0); 
    const {question, choices, correctAnswer, type} =questions[currentquestion];
    const[answeridx,setansweridx]= useState(null);
    const[answer,setanswer]= useState(null);
    const[result,setresult]= useState(resultInitialState);
    const[showresult,setshowresult]= useState(false);
    const[showAnswerTimer,setshowAnswerTimer]= useState(true);
    const[inputAnswer,setinputAnswer]= useState('');
 
    //function 
    const onAnswerclick =(answer, index) => {
        setansweridx(index);
        if (answer===correctAnswer){
            setanswer(true);
        }
        else{
            setanswer(false);
        }
    };

    const onclickNext =(finalAnswer) =>{
        setansweridx(null);
        setshowAnswerTimer(false);
        setresult((prev) =>
        finalAnswer 
                ? {
                    ...prev,
                    score:prev.score + 1,
                    correctAnswers:prev.correctAnswers + 1,
                }:{
                    ...prev,
                    wrongAnswers:prev.wrongAnswers +1,
                }
        );

        if (currentquestion !==questions.length - 1){
            setcurrentquestion((prev) =>prev + 1);
        } else{
            setcurrentquestion(0);
            setshowresult(true);
        }

        setTimeout(() =>{
            setshowAnswerTimer(true);
        });
    };
    
    const onTryAgain =() =>{
        setresult(resultInitialState);
        setshowresult(false);
    };

    const handleTimeUp =() =>{
       // alert("Time is up!");
        setanswer(false);
        onclickNext(false);
    }

    const handleInputChange =(event) =>{
        setinputAnswer(event.target.value);

        if(event.target.value ===correctAnswer){
            setanswer(true);
        } else{
            setanswer(false);
        }
    }

    const getAnswerUI =() =>{
        if (type==='FIB'){
            return <input type="text" value={inputAnswer} onChange={handleInputChange}/>
        }
        return(
            <ol>
                {
                    choices.map((answer, index) => (
                        <li onClick={() => onAnswerclick(answer,index)} 
                            key={answer}
                            className={answeridx===index? "selected-answer": null}
                            >
                            {answer}
                        </li>
                    ))
                }      
            </ol>
        );
    }

    return (
    <div className="quiz-container">
        {!showresult ? (
            <>
            
            {showAnswerTimer && <AnswerTimer duration={10} onTimeUp={handleTimeUp}/>
            }
            <span className="active-question-no">{currentquestion+1}</span>
            <span className="total-question">/{questions.length}</span>
            <h2><span>{currentquestion+1} : </span>{question}</h2>
            {getAnswerUI()}
            {/* <ol>
                {
                    choices.map((answer, index) => (
                        <li onClick={() => onAnswerclick(answer,index)} 
                            key={answer}
                            className={answeridx===index? "selected-answer": null}
                            >
                            {answer}
                        </li>
                    ))
                }      
            </ol> */}
            <div className="footer">
                <button 
                    onClick={() =>onclickNext(answer)} 
                    disabled={answeridx===null && !inputAnswer}>
                        {currentquestion===questions.length-1 ? "Finished" : "Next"}
                </button>
            </div>
        </>
        ) : (
            <Result result={result} onTryAgain={onTryAgain} totalQuestion={questions.length}/>
        )}
        
    </div>
    );   
};

export default Quiz;


