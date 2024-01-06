import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user.js";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        Welcome back to Algomaster.Sign In below
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />

          <Button
            size={"large"}
            variant="outlined"
            onClick={ () => {
              fetch(`https://mernback-1jd7.onrender.com/admin/login`,{
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                }
              }).then((res)=>{
                return res.json();
              }).then((data)=>{
                localStorage.setItem("token", data.token);
                // window.location = "/"
                setUser({
                  userEmail: email,
                  isLoading: false,
                });
                navigate("/courses");
              })
            }}
          >
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
