import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "../style/assignParticularStudent.css"

export default function AssignParticularStudent() {
    const [state, setState] = useState({
        mentor: [],
        student: [],
        mentorid: "",
        studentid: ""
    })

    const getMentorName = async () => {
        const { data } = await axios.get("https://assign-mentor-api-01.herokuapp.com/getmentors");
        return data;
    }

    const getStudentName = async () => {
        const { data } = await axios.get("https://assign-mentor-api-01.herokuapp.com/getallstudents");
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
        setState({ ...state, studentid: event.target.value });
    }
    const handleSubmit = async () => {
        try {
            const { studentid, mentorid } = state;
            const { data } = await axios.post("https://assign-mentor-api-01.herokuapp.com/assignonementor", {
                studentid,
                mentorid
            })
            toast.success(data.message)
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <div className="mainDiv">
            <div className="mainHeading">Assign or Change Mentor</div>
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
                    <div>
                        <select onClick={getStudentId} className="selectOption">
                            {
                                state.student.map((item) => {
                                    return (
                                        <option key={item._id} value={item._id} >{item.studentname}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <button type="submit" onClick={handleSubmit} className="submitBtn">Submit</button>
        </div>
    )
}