'use client';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { login } from './login';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/libs/common/utils/error';
import axios, { AxiosError } from 'axios';
import { useStore } from '@/providers/ZustandProvider';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { abilitiesMap } from '@/providers/ZustandProvider';
import { BE_API_URL } from '@/libs/common/constants/api';
export default function LoginForm() {
  const user = useStore((state) => state.user);
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);
  const setUser = useStore((state) => state.setUser);
  const setAbilities = useStore((state) => state.setAbilities);
  const router = useRouter();
  const handleSignUpClick = () => {
    router.push('/register');
  };
  const handleForgotClick = () => {
    router.push('/forgot');
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
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
      toast.success('User login successfully!');
      setUser(user);
      const abilities: abilitiesMap = new Map();
      for (let i = 0; i < permission.length; i++) {
        if (permission[i].possession === 'any') {
          const key = `${permission[i].action}:${permission[i].object}`;
          abilities.set(key, true);
        }
      }
      setAbilities(abilities);
      router.push('/');
    },
    onError: (error: Error | AxiosError) => {
      console.log('Error', error);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
        formik.setFieldError('email', getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
        formik.setFieldError('email', getErrorMessage(error));
      }
    },
  });
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('Form values', values);
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
        SSMS
      </h1>
      <h1 className="text-2xl font-semibold mb-6 text-blue-600 text-center">
        Sign in to your account
      </h1>
      <div className="mt-4 flex flex-col lg:flex-row items-center justify-between">
        <div className="w-full mb-2 lg:mb-0">
          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
            onClick={() => router.push(`${BE_API_URL}/auth/google/signin`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-4"
              id="google"
            >
              <path
                fill="#fbbb00"
                d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
              />
              <path
                fill="#518ef8"
                d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
              />
              <path
                fill="#28b446"
                d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
              />
              <path
                fill="#f14336"
                d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
              />
            </svg>{' '}
            Google{' '}
          </button>
        </div>
        {/* <div className="w-full lg:w-1/2 ml-0 lg:ml-2">
          <button
            type="button"
            className="w-full flex justify-center items-center gap-2 bg-white text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              id="facebook"
              className="w-5"
            >
              <linearGradient
                id="Ld6sqrtcxMyckEl6xeDdMa"
                x1="9.993"
                x2="40.615"
                y1="9.993"
                y2="40.615"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stopColor="#2aa4f4" />
                <stop offset="1" stopColor="#007ad9" />
              </linearGradient>
              <path
                fill="url(#Ld6sqrtcxMyckEl6xeDdMa)"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              />
              <path
                fill="#fff"
                d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"
              />
            </svg>
            Facebook
          </button>
        </div> */}
      </div>
      <div className="my-4 text-sm text-gray-600 text-center">
        <p>Or with email and password</p>
      </div>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={formik.handleSubmit}
      >
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
              '& .MuiOutlinedInput-root': { borderRadius: '25px' },
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
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '25px' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
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
            onClick={handleForgotClick}
          >
            Forgot password?
          </a>
        </div>
        <div className="flex items-center justify-center my-4 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={mutation.isPending}
          >
            Sign In
          </button>
        </div>
      </form>
      <div className="mt-4 text-lg text-gray-600 text-center">
        <p>
          Don&apos;t have account?{' '}
          <a
            href="#"
            className="text-blue-500 hover:underline"
            onClick={handleSignUpClick}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
