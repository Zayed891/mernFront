import { useEffect, useState } from "react";
import { Button, Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Courses(){
    const navigate = useNavigate()
    const [courses,setcourses] = useState([]);
   

    useEffect(()=>{
        fetch("https://mernback-1jd7.onrender.com/admin/courses/",{
            method: "GET",
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("token")
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            // console.log(data);
            setcourses(data.courses);
        })
    },[]);
    return (
        <div style={{
            display : "flex",
            flexWrap: "wrap",
            justifyContent: "center"
        }}>
            {courses.map((course) =>{
                return <Course course= {course} />
            })}
        </div>
    )
}

function Course({course}){
    const navigate = useNavigate()
    return <Card style = {{
        border : "2px solid black",
        margin : 12,
        width : 280,
        minHeight : 250,
        

    }}>
        <Typography variant="h5" textAlign={"center"}>{course.title}</Typography>
        <Typography variant="subtitle1" textAlign={"center"}>{course.description}</Typography>
        <img src= {course.imageLink} style={{width: 230}} ></img>
        <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>
        
    </Card>
}

export default Courses;