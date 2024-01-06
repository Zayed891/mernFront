import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Appbar from "./components/Appbar";
import Signin from "./components/Signin";
import Addcourse from "./components/Addcourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { Landing } from "./components/Landing.jsx";
import { userState } from "./store/atoms/user.js";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >
      <RecoilRoot>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/addcourse"} element={<Addcourse />} />
            <Route path={"/course/:courseId"} element={<Course />} />
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`https://mernback-1jd7.onrender.com/admin/me`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username,
        });
      } else {
        setUser({
          isLoading: false,
          userEmail: null,
        });
      }
    } catch (e) {
      setUser({
        isLoading: false,
        userEmail: null,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}

export default App;
