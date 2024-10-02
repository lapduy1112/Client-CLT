"use client";
import MainLayout from "../MainLayout";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const mockUserProfile = {
  name: "Lap Duy",
  email: "lapduy1112@gmail.com",
  role: "User",
  password: "1234567",
  isVerified: true,
  avatarUrl: "/path/to/profile-picture.jpg",
};

export default function ProfilePage() {
  const [isVerified, setIsVerified] = useState(mockUserProfile.isVerified);

  const handleVerificationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsVerified(event.target.checked);
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
        <Card
          sx={{ maxWidth: 600, borderRadius: 2, boxShadow: 3 }}
          className="w-full"
        >
          <CardContent>
            <Box className="flex items-center mb-6">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  marginRight: 2,
                  border: "4px solid #1976d2",
                }}
                src={mockUserProfile.avatarUrl}
              />
              <Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {mockUserProfile.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {mockUserProfile.email}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="h6"
              component="div"
              gutterBottom
              color="primary"
            >
              Profile Details
            </Typography>

            <Box mt={2} className="space-y-2">
              <Typography
                variant="body1"
                className="font-semibold text-gray-700"
              >
                <strong>Name:</strong> {mockUserProfile.name}
              </Typography>
              <Typography
                variant="body1"
                className="font-semibold text-gray-700"
              >
                <strong>Email:</strong> {mockUserProfile.email}
              </Typography>
              <Typography
                variant="body1"
                className="font-semibold text-gray-700"
              >
                <strong>Role:</strong> {mockUserProfile.role}
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 16, textTransform: "none" }}
              sx={{ borderRadius: 2, padding: "8px 16px" }}
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
