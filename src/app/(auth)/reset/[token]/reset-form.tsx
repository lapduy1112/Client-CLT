'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { useRouter, useParams } from 'next/navigation';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { getErrorMessage } from '@/libs/common/utils/error';
import { toast } from 'react-toastify';
import { reset, checkToken } from '@/app/(auth)/reset/[token]/reset';
import LoadingSkeleton from '@/components/LoadingSkeleton';
const validationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  // confirmPassword: Yup.string()
  //   .oneOf(
  //     [Yup.ref("password"), undefined],
  //     "Password and Confirm Password must match"
  //   )
  //   .required("Confirm Password is required"),
});
export default function ResetForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams<{ token: string }>();
  const { isPending, isError, data } = useQuery({
    queryKey: ['checkToken', token],
    queryFn: () => checkToken(token),
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });
  React.useEffect(() => {
    if (isError) {
      router.push('/unauthorized');
    }
  }, [isError, data]);
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
  const handleSignInClick = () => {
    router.push('/login');
  };

  const mutation = useMutation({
    mutationFn: reset,
    onSuccess: () => {
      toast.success('Password reset successful.');
      router.push('/login');
    },
    onError: (error: Error | AxiosError) => {
      console.log('Error', error);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
        formik.setFieldError(
          'password',
          getErrorMessage(error?.response?.data)
        );
        if (error?.response?.data?.status === 404) {
          router.push('/unauthorized');
        }
      } else {
        toast.error(getErrorMessage(error));
        formik.setFieldError('password', getErrorMessage(error));
        if ((error as any).status === 404) {
          router.push('/unauthorized');
        }
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('Form values', values);
      mutation.mutate({
        token: data.token,
        password: values.password,
      });
    },
  });
  return (
    <>
      {isPending || isError ? (
        <LoadingSkeleton />
      ) : (
        <div className="max-w-md w-full p-6">
          <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
            Reset Password
          </h2>
          <form
            className="w-full flex flex-col items-center"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 w-full">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                {...formik.getFieldProps('password')}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            {/* <div className="mb-4 w-full">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            {...formik.getFieldProps("confirmPassword")}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            sx={{
              "& .MuiOutlinedInput-root": { borderRadius: "25px" },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={() => handleClickShowPassword("confirm")}
                    onMouseDown={handleMouseDownPassword}
                    edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div> */}
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
              Already have an account?{' '}
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={handleSignInClick}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
