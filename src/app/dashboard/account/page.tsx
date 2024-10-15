"use client";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardOverflow from "@mui/joy/CardOverflow";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useEffect } from "react";
import { useStore } from "@/providers/ZustandProvider";
import { redirect } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormHelperText from "@mui/joy/FormHelperText";
import { useState } from "react";
import IconButton from "@mui/joy/IconButton";
import { useMutation } from "@tanstack/react-query";
import {
  resendVerificationEmail,
  updatePassword,
} from "@/libs/common/utils/fetch";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";
const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Current Password is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password"), undefined],
      "Password and Confirm Password must match"
    )
    .required("Confirm Password is required"),
});
export default function MyProfile(email: string) {
  const [showcurrentPassword, setShowcurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const user = useStore((state) => state.user);
  const mutation = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password Updated successfully");
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });
  useEffect(() => {
    if (!user) {
      redirect("/unauthorized");
    }
  }, [user]);
  console.log(user);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        password: values.currentPassword,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      });
      formik.resetForm();
    },
  });
  const handleVerifyClick = async () => {
    try {
      await resendVerificationEmail();
      console.log("Email confirmation sent successfully!");
    } catch (error) {
      console.error("Failed to send confirmation email:", error);
    }
  };
  const handleClickShowPassword = (type: string): void => {
    if (type === "password") {
      setShowPassword(!showPassword);
    } else if (type === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    } else if (type === "current") {
      setShowcurrentPassword(!showcurrentPassword);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
  };
  // function handleVerify(
  //   event: MouseEvent<HTMLAnchorElement, MouseEvent>
  // ): void {
  //   throw new Error("Function not implemented.");
  // }

  return (
    <Box sx={{ flex: 1, width: "100%" }}>
      <Box
        sx={{
          position: "sticky",
          top: { sm: -100, md: -110 },
          bgcolor: "background.body",
          zIndex: 9995,
        }}>
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="small" />}
            sx={{ pl: 0 }}>
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home">
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              sx={{ fontSize: 12, fontWeight: 500 }}>
              Users
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              Account
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            Account Security
          </Typography>
          <Typography level="body-md">
            Edit your account settings and change your password here.
          </Typography>
        </Box>
      </Box>
      <Stack
        spacing={4}
        sx={{
          display: "flex",
          maxWidth: "800px",
          mx: "auto",
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Email</Typography>
            <Typography level="body-sm">
              Verify your email address to use all features of the platform.
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: "none", md: "flex" }, my: 1 }}>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <Stack spacing={1}>
                <FormControl sx={{ flexGrow: 1 }}>
                  <Input
                    size="sm"
                    type="email"
                    startDecorator={<EmailRoundedIcon />}
                    placeholder="email"
                    defaultValue={user?.email}
                    sx={{ flexGrow: 1 }}
                    disabled
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="solid"
                disabled={user?.isVerified}
                onClick={handleVerifyClick}>
                {user?.isVerified ? "Verified" : "Verify"}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Password</Typography>
            <Typography level="body-sm">
              Edit your password here. Make sure it's at least 8 characters long
            </Typography>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit} id="updatePasswordForm">
            <Stack
              direction="row"
              spacing={3}
              sx={{ display: { xs: "none", md: "flex" }, my: 1 }}>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                    error={
                      formik.touched.currentPassword &&
                      Boolean(formik.errors.currentPassword)
                    }>
                    <Input
                      size="sm"
                      id="currentPassword"
                      name="currentPassword"
                      type={showcurrentPassword ? "text" : "password"}
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter current password"
                      error={
                        formik.touched.currentPassword &&
                        Boolean(formik.errors.currentPassword)
                      }
                      endDecorator={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            handleClickShowPassword("current");
                          }}
                          onMouseDown={handleMouseDownPassword}>
                          {showcurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      }
                    />
                    {formik.touched.currentPassword &&
                      Boolean(formik.errors.currentPassword) && (
                        <FormHelperText>
                          {formik.errors.currentPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormLabel>New Password</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }>
                    <Input
                      size="sm"
                      id="password"
                      name="password"
                      placeholder="Enter new password"
                      type={showPassword ? "text" : "password"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      endDecorator={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            handleClickShowPassword("password");
                          }}
                          onMouseDown={handleMouseDownPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      }
                    />
                    {formik.touched.password &&
                      Boolean(formik.errors.password) && (
                        <FormHelperText>
                          {formik.errors.password}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Stack>
                <Stack spacing={1}>
                  <FormLabel>Confirmed Password</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }>
                    <Input
                      size="sm"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Re-type new password"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      endDecorator={
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => handleClickShowPassword("confirm")}
                          onMouseDown={handleMouseDownPassword}>
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      }
                    />
                    {formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword) && (
                        <FormHelperText>
                          {formik.errors.confirmPassword}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>
          </form>
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                onClick={() => {
                  formik.resetForm();
                }}>
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                type="submit"
                form="updatePasswordForm"
                disabled={mutation.isPending}>
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
