import { buildQueries } from '@testing-library/react';
import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Question = () => {
    const [ques, setQues] = useState({});
    const [blue, setBlue] = useState(false);
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState();
    const difficulty = useRef(5);
    const questionCount = useRef(1);
    const navigate = useNavigate();

    async function fetchQuestions() {
        await axios('http://localhost:5000/questions', {
            method: "get",
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            localStorage.setItem('questions', JSON.stringify([...res.data]));
        })

        getQuestion();
    }
    function handleClick() {
        getAnswer();

    }

    function getAnswer() {
        if (questionCount.current >= 10) {
            return navigate('/score', { state: score });

        }
        else {
            if (ques.correct === answer) {
                if (difficulty.current === 10) {
                    return navigate('/score', { state: score });

                }
                setScore(score + 5);
                difficulty.current = difficulty.current + 1;
            }
            else {
                if (difficulty.current === 1) {
                    return navigate('/score', { state: score });

                }
                setScore(score - 2);
                difficulty.current = difficulty.current - 1;
            }
            getQuestion();
            questionCount.current = questionCount.current + 1;
        }

    }

    // function endExam() {
    //     if (questionCount.current === 10 || difficulty.current === 0 || difficulty.current === 11) {
    //         return true;
    //     }
    //     return false;

    // }
    // function changeColor() {
    //     setBlue((blue) => {
    //         return !blue
    //     })
    // }
    // let btn_class = blue ? "text-primary" : "";

    async function getQuestion() {

        // to make sure that the randomly generated question is of given difficulty
        while (true) {
            let questions = JSON.parse(localStorage.getItem('questions'));
            let i = questions[Math.floor(Math.random() * questions.length)];
            // to make sure that the randomly generated question is of given difficulty
            if (i.difficulty === difficulty.current) {
                setQues(i);
                setOptions(i.options);
                return;
            }
        }

    }

    useEffect(() => {
        fetchQuestions();
    }, [])
    return (
        <div className='row align-items-center justify-content-center mt-5 mb-5'>
            <div className="card" style={{ width: '60rem' }}>
                <h5 className="card-header">Q. No. {questionCount.current} difficulty {ques.difficulty} score {score}</h5>
                <div className="card-body">
                    <h5 className="card-title">{ques.title}</h5>

                    <div className="form-check">
                        <input type="radio" name="address" onClick={(e) => setAnswer(e.target.value)} value={options[0]} />
                        <span>  {options[0]}</span>
                    </div>

                    <div className="form-check">
                        <input type="radio" name="address" onClick={(e) => setAnswer(e.target.value)} value={options[1]} />
                        <span>  {options[1]}</span>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="address" onClick={(e) => setAnswer(e.target.value)} value={options[2]} />
                        <span>  {options[2]}</span>
                    </div>
                    <div className="form-check">
                        <input type="radio" name="address" onClick={(e) => setAnswer(e.target.value)} value={options[3]} />
                        <span>  {options[3]}</span>
                    </div>
                    <button onClick={handleClick} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}
