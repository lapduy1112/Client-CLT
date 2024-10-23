'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/libs/common/utils/error';
import axios, { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { register } from './register';
import { useStore } from '@/providers/ZustandProvider';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
import { abilitiesMap } from '@/providers/ZustandProvider';
import { useEffect } from 'react';
const validationSchema = Yup.object({
  fullName: Yup.string().required('Full Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password'), undefined],
      'Password and Confirm Password must match'
    )
    .required('Confirm Password is required'),
});
export default function RegisterForm() {
  const user = useStore((state) => state.user);
  useEffect(() => {
    if (user) {
      router.push('/home');
    }
  }, [user]);
  const setUser = useStore((state) => state.setUser);
  const setAbilities = useStore((state) => state.setAbilities);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      const permission: PermissionInterface[] = data.role
        .permission as PermissionInterface[];
      const user: UserInterface = {
        ...data,
        role: data.role.role,
        permission: permission,
      };
      toast.success("User register successfully! Please check your email to verify your account.");
      setUser(user);
      const abilities: abilitiesMap = new Map();
      for (let i = 0; i < permission.length; i++) {
        if (permission[i].possession === 'any') {
          const key = `${permission[i].action}:${permission[i].object}`;
          abilities.set(key, true);
        }
      }
      setAbilities(abilities);
      toast.success('User registered successfully!');
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
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values', values);
      mutation.mutate({
        username: values.fullName,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
    },
  });

  const handleSignInClick = () => {
    router.push('/login');
  };

  const handleClickShowPassword = (type: string): void => {
    if (type === 'password') {
      setShowPassword(!showPassword);
    } else if (type === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
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
      <h1 className="text-3xl font-semibold mb-6 text-blue-600 text-center">
        Create new account
      </h1>
      <form
        className="w-full flex flex-col items-center"
        onSubmit={formik.handleSubmit}>
        <div className="mb-4 w-full">
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            label="Full Name"
            variant="outlined"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '25px' },
            }}
            disabled={mutation.isPending}
          />
        </div>
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
        <div className="mb-6 w-full">
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
            disabled={mutation.isPending}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => handleClickShowPassword('password')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="mb-6 w-full">
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{
              '& .MuiOutlinedInput-root': { borderRadius: '25px' },
            }}
            disabled={mutation.isPending}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => handleClickShowPassword('confirm')}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="flex items-center justify-center my-4 w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={mutation.isPending}>
            Sign Up
          </button>
        </div>
      </form>
      <div className="flex items-center justify-center w-full">
        <p className="mr-2 mb-2">
          Already have an account?{' '}
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
