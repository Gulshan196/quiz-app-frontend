import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'

export const Question = () => {
    const [ques, setQues] = useState({});
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState();
    const difficulty = useRef(5);
    const questionCount = useRef(1);

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
            alert('done',score)
            return;
        }
        else {
            if (ques.correct === answer) {
                if (difficulty.current === 10) {
                    alert('done',score)
                    return;
                }
                setScore(score + 5);
                difficulty.current = difficulty.current + 1;
            }
            else {
                if (difficulty.current === 1) {
                    alert('done',score)
                    return;
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
    async function getQuestion() {

        // to make sure that the randomly generated question is of given difficulty
        while (true) {
            let questions = JSON.parse(localStorage.getItem('questions'));
            console.log(questions);
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

                    <div className="form-check">1.
                        <label onClick={(e) => setAnswer(e.target.innerHTML)} className="form-check-label" htmlFor="flexRadioDefault2">
                            {options[0]}
                        </label>
                    </div>

                    <div className="form-check">2.
                        <label onClick={(e) => setAnswer(e.target.innerHTML)} className="form-check-label" htmlFor="flexRadioDefault2">
                            {options[1]}
                        </label>
                    </div>
                    <div className="form-check">3.
                        <label onClick={(e) => setAnswer(e.target.innerHTML)} className="form-check-label" htmlFor="flexRadioDefault2">
                            {options[2]}
                        </label>
                    </div>
                    <div className="form-check">4.
                        <label onClick={(e) => setAnswer(e.target.innerHTML)} className="form-check-label" htmlFor="flexRadioDefault2">
                            {options[3]}
                        </label>
                    </div>
                    <button onClick={handleClick} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    )
}
