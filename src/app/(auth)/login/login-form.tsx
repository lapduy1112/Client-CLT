"use client";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "./login";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";
import { useStore } from "@/providers/ZustandProvider";
import { UserInterface } from "@/libs/common/interfaces/user.interface";
import { PermissionInterface } from "@/libs/common/interfaces/permission.interface";
export default function LoginForm() {
  const setUser = useStore((state) => state.setUser);
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push("/register");
  };
  const handleForgotClick = () => {
    router.push("/forgot");
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      const permission: PermissionInterface[] = data.role
        .permission as PermissionInterface[];
      const user: UserInterface = {
        ...data,
        role: data.role.role,
        permission: permission,
      };
      toast.success("Port created successfully!");
      setUser(user);
      router.push("/");
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
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("Form values", values);
      mutation.mutate({
        email: values.email,
        password: values.password,
      });
      // Replace with your form submission logic (e.g., API call)
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };

  return (
    <div className="max-w-md w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-blue-600 text-center">
        Simple Shipping Management System
      </h1>
      <h1 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
        Sign in to your account
      </h1>

      <div className="my-4 text-sm text-gray-600 text-center">
        <p>With email and password</p>
      </div>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={formik.handleSubmit}>
        <div className="mb-4 w-full">
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "25px" },
            }}
            disabled={mutation.isPending}
          />
        </div>
        <div className="w-full">
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
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
            disabled={mutation.isPending}
          />
        </div>
        <div className="my-4 text-lg text-right w-full">
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={handleForgotClick}>
            Forgot password?
          </a>
        </div>
        <div className="flex items-center justify-center my-4 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={mutation.isPending}>
            Sign In
          </button>
        </div>
      </form>
      <div className="mt-4 text-lg text-gray-600 text-center">
        <p>
          Don&apos;t have account?{" "}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={handleSignUpClick}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
