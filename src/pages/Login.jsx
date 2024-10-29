import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import LoginBanner from "../assets/login_image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [email, password]);

  return (
    <div className="flex flex-1 h-screen">
      <div className="flex flex-1 justify-center items-center">
        <div className="h-[600px] md:h-2/3 w-2/3 flex md:flex-row flex-col justify-center rounded-xl shadow-2xl">
          <div className="flex flex-1 justify-center items-center border-b-2 md:border-r-2 border-gray-100">
            <img
              src={LoginBanner}
              className="h-[200px] w-[200px] md:h-[400px] md:w-[400px]"
            />
          </div>
          <div className="flex flex-1 flex-col justify-center gap-5">
            <div className="flex flex-col justify-center gap-4 px-10">
            <h1 className="text-4xl font-bold">Welcome!</h1>
            <p className="text-black-500">To proceed please log in your credentials below</p>
              <TextField
                label="Email Address"
                variant="outlined"
                onChangeCapture={(text) => setEmail(text.target.value)}
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                onChangeCapture={(text) => setPassword(text.target.value)}
              />
            </div>

            <div className="flex flex-row items-center justify-around gap-4 px-10">
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                style={{ color: "gray" }}
              />
              <p className="text-blue-500 cursor-pointer">Forgot password?</p>
            </div>

            <div className="px-10 justify-center items-center flex">
              <Link to={`sidebar`} className="w-full">
                <Button
                  variant="contained"
                  fullWidth
                  disabled={isButtonDisabled}
                >
                  SIGN IN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
