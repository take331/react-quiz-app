import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data'

const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let optionArray = [Option1, Option2, Option3, Option4];

    const checkAnswer = (e, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setScore(prev => prev+1);
            } else {
                e.target.classList.add("wrong");
                optionArray[question.ans-1].current.classList.add("correct");
            }
            setLock(true);
        }
    }

    const handleNext = () => {
        if (lock === true) {
            if (index === data.length - 1) {
                setResult(true);
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            // mapメソッドには返り値があり、WARNINGが発生するためforEachを使用
            optionArray.forEach((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
            })
        }
    }

    const handleReset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
    }

  return (
    <div className='container'>
        <h1>Quiz App</h1>
        <hr />
        {result? 
        <>
            <h2>You Scored {score} out of {data.length} question.</h2>
            <button onClick={handleReset}>Reset</button>
        </>:
        <>
            <h2>{index + 1}. {question.question}</h2>
            <ul>
                <li ref={Option1} onClick={(e) => checkAnswer(e,1)}>{question.option1}</li>
                <li ref={Option2} onClick={(e) => checkAnswer(e,2)}>{question.option2}</li>
                <li ref={Option3} onClick={(e) => checkAnswer(e,3)}>{question.option3}</li>
                <li ref={Option4} onClick={(e) => checkAnswer(e,4)}>{question.option4}</li>
            </ul>
            <button onClick={handleNext}>Next</button>
            <div className="index">{index+1} of {data.length} question</div>
        </>}
    </div>
  )
}

export default Quiz