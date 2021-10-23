import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "../style/createStudent.style.css";

export default function Createstudent() {
    const [state, setState] = useState({
        studentname: "",
        studentmailid: "",
        studentphno: "",
        studentbatch: ""
    })
    const handleChange = ({ target: { value, name } }) => {
        setState({ ...state, [name]: value });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ((state.studentname === "") || (state.studentmailid === "") ||
            (state.studentphno === "") || (state.studentbatch === "")) {
            alert("Fill all the fields")
        }
        else {
            try {
                const { studentname, studentmailid, studentphno, studentbatch } = state;
                const { data } = await axios.post("https://assign-mentor-api-01.herokuapp.com/createstudent", {
                    studentname,
                    studentmailid,
                    studentphno,
                    studentbatch
                })
                setState({
                    ...state,
                    studentname: "",
                    studentmailid: "",
                    studentphno: "",
                    studentbatch: ""
                })
                toast.success(data.message);
            }
            catch (err) {
                toast.error(err.response.data.error);
            }
        }


    }
    return (
        <div className="studentDiv">
            <div className="studentHeading">Create Student</div>
            <div>
                <form>
                    <div className="formlabel">
                        <label> Name </label>
                    </div>
                    <div>
                        <input type="text" className="inputbox" name="studentname"
                            value={state.studentname} onChange={handleChange} />
                    </div>

                    <div className="formlabel">
                        <label> Mail Id </label>
                    </div>
                    <div>
                        <input type="email" className="inputbox" name="studentmailid"
                            value={state.studentmailid} onChange={handleChange} />
                    </div>

                    <div className="formlabel">
                        <label> Phone No </label>
                    </div>
                    <div>
                        <input type="number" className="inputbox" name="studentphno"
                            value={state.studentphno} onChange={handleChange} />
                    </div>
                    <div className="formlabel">
                        <label> Batch </label>
                    </div>
                    <div>
                        <input type="text" className="inputbox" name="studentbatch"
                            value={state.studentbatch} onChange={handleChange} />
                    </div>

                    <div><button className="submitBtn" onClick={handleSubmit}>Submit</button></div>
                </form>
            </div>

        </div>
    )
}