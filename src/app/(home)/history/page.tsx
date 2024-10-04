"use client";

import MainLayout from "@/app/(home)/MainLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useStore } from "@/providers/ZustandProvider";

interface Booking {
  id: string;
  route: {
    startPort: string;
    endPort: string;
    distance: string;
  };
  status: string;
  createdAt: string;
}

export default function HistoryPage() {
  const user = useStore((state) => state.user); // Lấy thông tin người dùng từ Zustand
  const [bookings, setBookings] = useState<Booking[]>([]); // Trạng thái lưu lịch sử đặt chỗ
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const router = useRouter();
  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (!user || !user.id) {
        toast.error("You need to login first.");
        console.log("a");
        router.push("/login");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/route-api/booking/history/${user.id}`, // Gọi API lấy lịch sử đặt chỗ
          {
            headers: {
              Authorization: `Bearer ${user.token}`, // Gửi token JWT trong header
            },
          }
        );
        setBookings(response.data); // Lưu dữ liệu lịch sử đặt chỗ vào state
      } catch (err: any) {
        console.error("Error fetching booking history:", err);
        toast.error("Failed to fetch booking history."); // Thông báo lỗi nếu không thể lấy dữ liệu
      } finally {
        setLoading(false); // Tắt trạng thái loading sau khi hoàn tất
      }
    };

    if (user && user.id) {
      fetchBookingHistory();
    }
  }, [user, router]);

  if (loading) {
    return (
      <MainLayout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh">
          <CircularProgress size={60} />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-6 px-4">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Table stickyHeader aria-label="booking history table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Start Port</TableCell>
                <TableCell>End Port</TableCell>
                <TableCell>Distance</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.route.startPort}</TableCell>
                  <TableCell>{booking.route.endPort}</TableCell>
                  <TableCell>{booking.route.distance}</TableCell>
                  <TableCell>{booking.status}</TableCell>
                  <TableCell>
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </MainLayout>
  );
}
