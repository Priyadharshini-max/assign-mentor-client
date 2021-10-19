import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import "../style/createMentor.style.css";

export default function Creatementor() {
    const [state, setState] = useState({
        mentorname: "",
        mentormailid: "",
        mentorphno: "",
    })
    const handleChange = ({ target: { value, name } }) => {
        setState({ ...state, [name]: value });

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if ((state.mentorname === "") || (state.mentormailid === "") || (state.mentorphno === "")) {
            alert("Fill all the fields")
        }
        else {
            try {
                const { mentorname, mentormailid, mentorphno } = state;
                const { data } = await axios.post("http://localhost:3001/creatementor", {
                    mentorname,
                    mentormailid,
                    mentorphno,
                })
                toast.success(data.message);
                setState({
                    ...state,
                    mentorname: "",
                    mentormailid: "",
                    mentorphno: "",
                })
            }
            catch (err) {
                toast.error(err.response.data.error);
            }
        }


    }
    return (
        <div className="mentorDiv">
            <div className="mentorHeading">Create Mentor</div>
            <div>
                <form>
                    <div className="formlabel">
                        <label> Name </label>
                    </div>
                    <div>
                        <input type="text" className="inputbox" name="mentorname"
                            value={state.mentorname} onChange={handleChange} />
                    </div>

                    <div className="formlabel">
                        <label> Mail Id </label>
                    </div>
                    <div>
                        <input type="email" className="inputbox" name="mentormailid"
                            value={state.mentormailid} onChange={handleChange} />
                    </div>

                    <div className="formlabel">
                        <label> Phone No </label>
                    </div>
                    <div>
                        <input type="number" className="inputbox" name="mentorphno"
                            value={state.mentorphno} onChange={handleChange} />
                    </div>

                    <div><button className="submitBtn" onClick={handleSubmit}>Submit</button></div>
                </form>
            </div>

        </div>
    )
}