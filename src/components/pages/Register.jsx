import React, { useState } from "react";
import login from "../../assets/cloud.png";
import { Button, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import AuthServices from "../../services/auth";
// import { getErrorMessage } from "../../util/GetError";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = { firstname, lastname, username, password };
      localStorage.setItem("username",firstname+" "+lastname);
      console.log(data);
      const response = await AuthServices.registerUser(data);
      console.log(response.data);
      setLoading(false);
      message.success("You're Registered Successfully!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      message.error("Issue with login");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center mt-[4%]">
          <div className="w-[90%] md:w-[30%] mx-auto shadow-md p-8 border border-black animate-border rounded-lg flex flex-col items-center">
            <img
              src={login}
              alt="Register illustration"
              className="w-[80px] md:w-[100px] mb-4"
            />
            <h2 className="text-center text-[1.5rem] md:text-[2rem] mb-6">
              Register
            </h2>

            <div className="mb-4 w-full md:w-[80%] flex gap-2">
              <Input
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="mb-4 w-full md:w-[80%]">
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              Existing User?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
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
              Register
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-[10%]">
        <Footer />
      </div>
    </>
  );
}

export default Register;