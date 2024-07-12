"use client";
import { useState, MouseEvent } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (): void => setShowPassword(!showPassword);
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push("/register");
  };
  const handleForgotClick = () => {
    router.push("/forgot");
  };
  const handleMouseDownPassword = (
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">Sign in to SSMS</h2>
      <form className="w-full flex flex-col items-center">
        <div className="mb-4">
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": { borderRadius: "25px" },
            }}
          />
        </div>
        <div className="mb-6">
          <TextField
            id="outlined-password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            sx={{
              width: "300px",
              "& .MuiOutlinedInput-root": { borderRadius: "25px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex items-center justify-center mb-4 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[300px]"
            type="button">
            Sign In
          </button>
        </div>
      </form>
      <div className="text-center mt-4">Or login with</div>
      <div className="flex justify-center mt-2 w-full">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex items-center w-300"
          type="button">
          <GoogleIcon className="mr-2" />
          Google
        </button>
      </div>
      <div className="flex justify-between mt-4 w-full px-10">
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          type="button"
          onClick={handleSignUpClick}>
          Sign up
        </button>
        <button
          className="text-blue-500 hover:underline focus:outline-none"
          type="button"
          onClick={handleForgotClick}>
          Forgot password?
        </button>
      </div>
    </div>
  );
}
