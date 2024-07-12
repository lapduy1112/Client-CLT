"use client";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
export default function ForgotForm() {
  const router = useRouter();
  const handleSignInClick = () => {
    router.push("/login");
  };
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
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
        <div className="flex items-center justify-center mb-4 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[300px]"
            type="button">
            Send
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center w-full">
        <p className="mr-2 mb-2">
          Already have an account?{" "}
          <button
            className="text-blue-500 hover:text-blue-700 focus:outline-none"
            onClick={handleSignInClick}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
