import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {useSetRecoilState} from "recoil";
import {userState} from "../store/atoms/user.js"

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
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
        Welcome to Algomaster.Sign Up below
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card varint="outline" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
            type="outlined-basic"
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
            size="large"
            variant="contained"
            onClick={() => {

              fetch("https://mernback-1jd7.onrender.com/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email,
                  password: password,
                }),
                headers: {
                  "Content-type": "application/json",
                },
              }).then((res)=>{
                return res.json();
              }).then((data)=>{
                console.log(data);
                localStorage.setItem("token",data.token);
                setUser({userEmail: email, isLoading: false})
                navigate("/courses")
              })
            }} 
          >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
