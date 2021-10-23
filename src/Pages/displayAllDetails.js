import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import "../style/displayAllDetails.css";

function DisplayDetails() {
    const [studentDetails,setStudentDetails] = useState([]);

    useEffect(async()=>{
     const {data} = await axios.get("https://assign-mentor-api-01.herokuapp.com/displaydetails");
     setStudentDetails(data);
    },[]);

    return (
        <div className="studentTable">
  <Table striped bordered hover>
        <thead>
            <tr>
            <th>Student Name</th>
            <th>Mentor ID</th>
            </tr>
        </thead>
        <tbody>
            {
                studentDetails.map((item)=>{
                    return(
            <tr>
            <td>{item.studentname}</td>
            <td>{item.mentorId}</td>
            </tr>)
                })
            }
        </tbody>
 </Table>
        </div>
    );
};


export default DisplayDetails;