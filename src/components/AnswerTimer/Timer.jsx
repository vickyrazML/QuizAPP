import "./Timer.scss";
import { useEffect, useState, useRef } from "react";

function AnswerTimer({ duration, onTimeUp }) {
    const [counter, setcounter] = useState(0);
    const intervalref = useRef();
    const [progressloaded, setprogressloaded] = useState(0);

    useEffect(() => {
        intervalref.current = setInterval(() => {
            setcounter((cur) => cur + 1);
        }, 1000);
        return () => clearInterval(intervalref.current);
    }, []);


    useEffect(() => {
        setprogressloaded(100 * (counter / duration));

        if (counter ===  duration ) {
            clearInterval(intervalref.current);

            setTimeout(() => {
                onTimeUp();
            }, 1000);

        }
    }, [counter]);


    return (
        <div className="answer-timer-container">
            <div
                style={{
                    width: `${progressloaded}%`,
                    backgroundColor: `${
                        progressloaded < 50
                            ? "green"
                        : progressloaded < 80
                            ? "orange"
                        : "red"
                    }`,
                }}
                 className="progress"
                >
                </div>

        </div>
    );
}

export default AnswerTimer;
