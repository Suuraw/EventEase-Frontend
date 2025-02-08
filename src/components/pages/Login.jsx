import React, { useState } from "react";
import login from "../../assets/cloud.png";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth.js";
// import { getErrorMessage } from "../../util/GetError";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      let data = {
        username,
        password,
      };
      const response = await AuthServices.loginUser(data);
      console.log(response.data.id);
      const id = response.data.id;
      // localStorage.setItem("toDoAppUser", JSON.stringify(response.data));
      localStorage.setItem("userId", id);
      const name = localStorage.getItem("username");
      if (!name) {
        localStorage.setItem("username", data.username);
      }
      // localStorage.setItem("assigner", username);
      message.success("Logged in Successfully!");
      navigate("/dashboard");
      setLoading(false);
    } catch (err) {
      console.log(err);
      message.error(getErrorMessage(err));
      setLoading(false);
    }
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <div className="w-[90%] md:w-[30%] mx-auto mt-[30%] md:mt-[12%] shadow-md p-8 border border-black animate-border rounded-lg flex flex-col items-center">
            <img
              src={login}
              alt="Login illustration"
              className="w-[80px] md:w-[100px] mb-4"
            />
            <h2 className="text-center text-[1.5rem] md:text-[2rem] mb-6">
              Login
            </h2>

            <div className="mb-4 w-full md:w-[80%] focus:outline-none">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus:outline-none"
              />
            </div>

            <div className="mb-4 w-full md:w-[80%]">
              <Input.Password
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="text-center text-xs md:text-[13px] text-gray-500 mb-4">
              New User?{" "}
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>

            <Button
              loading={loading}
              type="primary"
              size="large"
              disabled={!username || !password}
              onClick={handleSubmit}
              className="w-full md:w-auto"
            >
              Login
            </Button>
          </div>
        </div>

        {/* Fixed Footer */}
      </div>
      <div className="mt-[10%]">
        <Footer />
      </div>
    </>
  );
}

export default Login;
