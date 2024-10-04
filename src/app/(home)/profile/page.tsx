"use client";
import MainLayout from "../MainLayout";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/providers/ZustandProvider";

export default function ProfilePage() {
  const user = useStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); 
    }
  }, [user, router]);

  const handleVerifyEmail = () => {
    toast.success("Send verify to your email success");
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <Card
          sx={{ maxWidth: 600, borderRadius: 2, boxShadow: 3, padding: 4 }}
          className="w-full">
          <CardContent>
            <Box className="flex items-center mb-4">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  marginRight: 2,
                  border: "4px solid #1976d2",
                }}
                src={user?.profileImage}
              />
              <Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {user?.username}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>
            <Typography
              variant="h6"
              component="div"
              gutterBottom
              color="primary"
              textAlign="center">
              Profile Details
            </Typography>

            <Box mt={2} className="space-y-2">
              <Typography
                variant="body1"
                className="font-semibold text-gray-700">
                <strong>Name:</strong> {user?.username}
              </Typography>
              <Typography
                variant="body1"
                className="font-semibold text-gray-700">
                <strong>Email:</strong> {user?.email}
              </Typography>
              <Typography
                variant="body1"
                className="font-semibold text-gray-700">
                <strong>Role:</strong> {user?.role}
              </Typography>
            </Box>

            <Box mt={4} className="flex justify-between">
              <Button
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 2,
                  padding: "10px 20px",
                  flexGrow: 1,
                  marginRight: 1,
                }}
                onClick={handleVerifyEmail}>
                Verify Email
              </Button>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: 2,
                  padding: "10px 20px",
                  flexGrow: 1,
                  marginLeft: 1,
                }}>
                Edit Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      </div>
      <ToastContainer />
    </MainLayout>
  );
}
