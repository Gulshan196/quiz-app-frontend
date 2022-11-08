import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Question = () => {

    const [ques, setQues] = useState({});
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [answer, setAnswer] = useState();
    const difficulty = useRef(5);
    const questionCount = useRef(1);
    const navigate = useNavigate();

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();

    let filterArr = [];
    async function fetchQuestions() {
        await axios('https://quiz-app-gulshan.herokuapp.com/questions', {
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

     const scorelist = () => {
        let temp_array = JSON.parse(localStorage.getItem('scoreBoard') || '[]');
        temp_array.push(score + 5);
        localStorage.setItem('scoreBoard', JSON.stringify(temp_array));
    }
    function getAnswer() {
        if (questionCount.current == 10) {
            // alert('done',score)
            return navigate('/score', { state: score });
        }
        else {
 if (ques.correct === answer) {
                if (difficulty.current === 10) {
                    scorelist();
                    // setScore(score + 5);
                    return navigate('/score', { state: score + 5 });
                }
                setScore(score + 5);
                scorelist();
                difficulty.current = difficulty.current + 1;
            }
            else {
                if (difficulty.current === 1) {
                    scorelist();
                    // setScore(score - 2);
                    return navigate('/score', { state: score - 2 });
                }

                setScore(score - 2);
                scorelist();
                difficulty.current = difficulty.current - 1;
            }
            getQuestion();
            questionCount.current = questionCount.current + 1;
        }

    }

    async function getQuestion() {
        // to make sure that the randomly generated question is of given difficulty
        let questions = JSON.parse(localStorage.getItem('questions'));
        console.log(questions);
        filterArr = questions.filter((e) => e.difficulty === difficulty.current);
        let i = filterArr[Math.floor(Math.random() * filterArr.length)];
        // to make sure that the randomly generated question is of given difficulty
        setQues(i);
        setOptions(i.options);
    }

    let colorArr = [
        ref1,
        ref2,
        ref3,
        ref4
    ]
    const onAnswerSelect = async (e) => {
        colorArr.forEach((e) => {
            e.current.style.color = 'black'
        });
        e.target.style.color = 'blue';
        console.log(e.target.innerHTML);
    }

    useEffect(() => {
        console.log('update');
        ref1.current.style.color = 'black';
        ref2.current.style.color = 'black';
        ref3.current.style.color = 'black';
        ref4.current.style.color = 'black';
    }, [questionCount.current])

    useEffect(() => {
        fetchQuestions();
        console.log('mount');
    }, [])

    return (

        <div className='row row-sm-auto align-items-center justify-content-center mt-5 mb-5'>

            <div className="card" style={{ width: '60rem' }}>
                <div className="card-header row justify-content-between">
                    <h5 className='col-sm-auto col-md-4' >Q. No. {questionCount.current}</h5>
                    <h5 className='col-sm-auto col-md-4'>Difficulty level : {ques.difficulty}</h5>
                </div>

                <div className="card-body"  >
                    <h5 className="card-title">{ques.title}</h5>
                    <div className="form-check">a. &nbsp;
                        <span ref={ref1} style={{ color: 'black' }} onClick={(e) => {
                            setAnswer(e.target.innerHTML);
                            return onAnswerSelect(e);
                        }}>{options[0]}</span>
                    </div>
                    <div className="form-check">b. &nbsp;
                        <span ref={ref2} style={{ color: 'black' }} onClick={(e) => {
                            setAnswer(e.target.innerHTML);
                            return onAnswerSelect(e);
                        }}>{options[1]}</span>
                    </div>
                    <div className="form-check">c. &nbsp;
                        <span ref={ref3} style={{ color: 'black' }} onClick={(e) => {
                            setAnswer(e.target.innerHTML);
                            return onAnswerSelect(e);
                        }}>{options[2]}</span>
                    </div>
                    <div className="form-check">d. &nbsp;
                        <span ref={ref4} style={{ color: 'black' }} onClick={(e) => {
                            setAnswer(e.target.innerHTML);
                            return onAnswerSelect(e);
                        }}>{options[3]}</span>
                    </div>
                    <button onClick={handleClick} className="btn btn-primary mt-2">Submit</button>
                </div>
            </div>

        </div>


    )
}