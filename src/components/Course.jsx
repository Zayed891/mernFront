import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@mui/material";
import { Typography, TextField, Button } from "@mui/material";
import { Loading } from "./Loading";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { courseState } from "../store/atoms/course";
import {
  courseTitle,
  coursePrice,
  isCourseLoading,
  courseImage,
} from "../store/selectors/course";

function Course() {
  // const [courses, setcourses] = useState([]);
  let { courseId } = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  console.log("hi from course");

  useEffect(() => {
    fetch(`https://mernback-1jd7.onrender.com/admin/course/${courseId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCourse({isLoading:false, course: data.course });
      }).catch(e =>{
        setCourse({isLoading:false, course:null});
      }); 
  }, []);

  if (courseLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <GrayTopper />
      <Grid container>
        <Grid item lg={8} md={12} sm={12}>
          <UpdateCard />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <CourseCard />
        </Grid>
      </Grid>
    </div>
  );
}

function GrayTopper() {
  const title = useRecoilValue(courseTitle);
  return (
    <div
      style={{
        height: 250,
        background: "black",
        top: 0,
        width: "100vw",
        zIndex: 0,
        marginBottom: -250,
      }}
    >
      <div
        style={{
          height: 250,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Typography
            style={{ color: "white", fontWeight: 600 }}
            variant="h3"
            textAlign={"center"}
          >
            {title}
          </Typography>
        </div>
      </div>
    </div>
  );
}

function UpdateCard() {
  const [courseDetails, setCourse] = useRecoilState(courseState);

  const [title, setTitle] = useState(courseDetails.course.title);
  const [description, setDescription] = useState(
    courseDetails.course.description
  );
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);

  console.log("hi from update card");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card varint="outline" style={{ width: 400, padding: 20, margin: 40 }}>
        <Typography style={{
          padding: 10
        }}>Update Course Details</Typography>
        <div style={{ padding: 10 }}>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />
        </div>
        <div style={{ padding: 10 }}>
          <TextField
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />
        </div>
        <div style={{ padding: 10 }}>
          <TextField
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            fullWidth={true}
            label="Image Link"
            variant="outlined"
          />
        </div>
        <div style={{ padding: 10 }}>
        <TextField
          value={price}
          style={{ marginBottom: 10 }}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          fullWidth={true}
          label="Price"
          variant="outlined"
        />
        </div>

        <div style={{ padding: 10 }}>
          <Button
            size="medium"
            variant="contained"
            onClick={() => {
              fetch(
                "http://localhost:3000/admin/courses/" +
                  courseDetails.course._id,
                {
                  method: "PUT",
                  body: JSON.stringify({
                    title: title,
                    description: description,
                    imageLink: image,
                    published: true,
                    price
                  }),
                  headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  // alert("course updated!");
                  let updatedCourse = {
                    _id: courseDetails.course._id,
                    title: title,
                    description: description,
                    imageLink: image,
                    price
                  };
                  setCourse({ course: updatedCourse, isLoading: false });

                  // localStorage.setItem("token",data.token);
                });
            }}
          >
            Update course
          </Button>
        </div>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
        margin: 10,
        width: 350,
        minHeight: 200,
        borderRadius: 20,
        marginRight: 50,
        paddingBottom: 15,
        zIndex: 2
        }}
      >
        <img src={imageLink} style={{ width: 100 }}></img>
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h5">{title}</Typography>
          <Price />
        </div>
      </Card>
    </div>
  );
}

function Price() {
  const price = useRecoilValue(coursePrice);
  return (
    <>
      <Typography variant="subtitle2" style={{ color: "gray" }}>
       Price
      </Typography>
      <Typography variant="subtitle1">
        <b>Rs {price} </b>
      </Typography>
    </>
  );
}

export default Course;
