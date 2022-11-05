import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Panel = () => {

    const navigate = useNavigate();
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');

    const type = useRef('');
    const difficulty = useRef('');
    const [title, setTitle] = useState();
    const [correct, setCorrect] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios('http://localhost:5000/questions', {
            method: "post",
            data: JSON.stringify({
                title: title,
                difficulty: difficulty.current,
                type: type.current,
                options: [option1, option2, option3, option4],
                correct: correct
            }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            console.log(res.data);
            alert('1 Question added');
        }).catch((err) => {
            console.log(err);
        })
        console.log(type.current, option1, correct);

    }

    return (
        <div className='row relative-top-200px mt-5 justify-content-evenly' style={{ height: '90vh' }}>
            <div className="col-md-5 card bg-light mt-3" >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="row mt-5 mb-3 justify-content-evenly ">
                        <div className='col-sm-3'>
                            <h5>Add Question</h5>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="role" className="col-sm-4 col-form-label">Question Type</label>
                        <div className="col-sm-6">
                            <select className="form-select" onChange={(e) => type.current = e.target.value} id="role" aria-label="Default select example">
                                <option>select</option>
                                <option value="Single">Single</option>
                                <option value="Multiple">Multiple</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="level" className="col-sm-4 col-form-label">Difficulty Level</label>
                        <div className="col-sm-6">
                            <select className="form-select" onChange={(e) => difficulty.current = e.target.value} id="level" aria-label="Default select example">
                                <option>select</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="title" className="col-sm-4 col-form-label">Question Title</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={(e) => setTitle(e.target.value)} className="form-control" id="title" required />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="option1" className="col-sm-4 col-form-label">Option 1</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={(e) => setOption1(e.target.value)} className="form-control" id="option1" required />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="option2" className="col-sm-4 col-form-label">Option 2</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={(e) => setOption2(e.target.value)} className="form-control" id="option1" required />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="option3" className="col-sm-4 col-form-label">Option 3</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={(e) => setOption3(e.target.value)} className="form-control" id="option3" required />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="option4" className="col-sm-4 col-form-label">Option 4</label>
                        <div className="col-sm-6">
                            <input type="text" onChange={(e) => setOption4(e.target.value)} className="form-control" id="option1" required />
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <label htmlFor="correct" className="col-sm-4 col-form-label">Correct Option</label>
                        <div className="col-sm-6">
                            <select className="form-select" onChange={(e) => setCorrect(e.target.value)} id="correct" aria-label="Default select example">
                                <option>select</option>
                                <option value={option1}>Option 1</option>
                                <option value={option2}>Option 2</option>
                                <option value={option3}>Option 3</option>
                                <option value={option4}>Option 4</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3 justify-content-evenly">
                        <div className='col-lg-5'>
                            <button className='btn btn-outline-primary' onClick={() => {
                                localStorage.clear();
                                navigate('/login');
                            }}>Logout</button>
                        </div>
                        <div className='col-lg-4'>
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>

                    </div>
                </form>
            </div>



        </div>
    )
}