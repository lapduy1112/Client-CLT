"use client";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { forgot } from "./forgot"; // Giả sử đây là API call của bạn để gửi email đặt lại mật khẩu
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/libs/common/utils/error";

export default function ForgotForm() {
  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/login");
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const mutation = useMutation({
    mutationFn: forgot,
    onSuccess: (data) => {
      toast.success("Password reset link has been sent to your email.");
      router.push("/login"); 
    },
    onError: (error: Error | AxiosError) => {
      console.log("Error", error);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
        formik.setFieldError("email", getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
        formik.setFieldError("email", getErrorMessage(error));
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form values", values);
      mutation.mutate({
        email: values.email,
      });
    },
  });

  return (
    <div className="max-w-md w-full p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Reset Password
      </h2>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={formik.handleSubmit}>
        <div className="mb-4 w-full">
          <TextField
            fullWidth
            id="email" 
            label="Email"
            type="email" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="outlined"
            error={formik.touched.email && Boolean(formik.errors.email)} 
            helperText={formik.touched.email && formik.errors.email} 
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "25px" },
            }}
          />
        </div>
        <div className="flex items-center justify-center mb-4 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={mutation.isPending} 
          >
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
