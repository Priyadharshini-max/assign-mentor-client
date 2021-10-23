import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "../style/assignmentor.style.css"

export default function Assignmentor() {
    const [state, setState] = useState(
        {
            mentor: [],
            student: [],
            mentorid: "",
        }
    )

    const [studentid, setStudentid] = useState([])
    const getMentorName = async () => {
        const { data } = await axios.get("https://assign-mentor-api-01.herokuapp.com/getmentors");
        return data;
    }

    const getStudentName = async () => {
        const { data } = await axios.get("https://assign-mentor-api-01.herokuapp.com/getstudents");
        return data;
    }

    useEffect(async () => {
        const mentordata = await getMentorName();
        const studentdata = await getStudentName();
        setState({ ...state, mentor: mentordata, student: studentdata });
    }, []);

    const getMentorId = (event) => {
        setState({ ...state, mentorid: event.target.value });
    }

    const getStudentId = (event) => {
        if (event.target.checked) {
            setStudentid([...studentid, event.target.value]);
        }
        else {
            const newStudentid = studentid.filter(value => value !== event.target.value)
            setStudentid(newStudentid)
        }

    }
    const submitAllId = async (event) => {
        event.preventDefault();
        try {
            if (state.mentorid === "" || studentid.length === 0) {
                toast.error(" Invalid, Please Check ");
            } else {
                const { data } = await axios.post("http://localhost:3001/assignmentor", {
                    mentorid: state.mentorid,
                    studentid
                })
                toast.success(data.message);
                const mentordata = await getMentorName();
                const studentdata = await getStudentName();
                setState({ ...state, mentor: mentordata, student: studentdata });
            }

        } catch (err) {
            toast.error(err.response.data.error);
        }
    }

    return (
        <div className="assignmentorDiv">
            <div className="assignmentorHeading">Assign Mentor</div>
            <div className="subDiv">
                <div>
                    <div className="subHeading">Select Mentor</div>
                    <div>
                        <select onClick={getMentorId} className="selectOption">
                            {
                                state.mentor.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id} >{item.mentorname}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
                <div>
                    <div className="subHeading">Select Student</div>
                    {state.student.length === 0 ? <h5 className="studentspan">No Student</h5> :
                        <div>
                            {
                                state.student.map((item) => {
                                    return (
                                        <div className="checkboxDiv" key={item._id}>
                                            <input type="checkbox" name="studentname" value={item._id} onChange={getStudentId} />
                                            <label className="checkboxLabel"> {item.studentname}</label><br></br>
                                        </div>
                                    )
                                })
                            }
                        </div>}
                </div>
            </div>
            <div>
                <button type="submit" onClick={submitAllId} className="submitBtn">Submit</button>
            </div>

        </div>
    )
}