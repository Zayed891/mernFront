import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function Addcourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card varint="outline" style={{ width: 400, padding: 20, margin: 40 }}>
        <div style={{ padding: 10 }}>
          <TextField
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
            size="large"
            variant="contained"
            onClick={() => {
              fetch("https://mernback-1jd7.onrender.com/admin/courses", {
                method: "POST",
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
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  alert("course added!");
                  // localStorage.setItem("token",data.token);
                });
            }}
          >
            Add course
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Addcourse;
