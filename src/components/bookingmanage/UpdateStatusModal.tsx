import * as React from "react";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DeleteForever from "@mui/icons-material/DeleteForever";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useMutation } from "@tanstack/react-query";
import { updateBookingStatus } from "@/libs/common/utils/fetchRoute";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { RouteUpdateStatusInterface } from "@/libs/common/interfaces/update-route.interface";
export default function UpdateBookingStatusModal({
  open,
  setOpen,
  id,
  setSelectedId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      return await updateBookingStatus(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking"] }),
        toast.success("Booking status updated successfully"),
        setOpen(false);
    },
    onError: () => {
      toast.error("Error updating booking status");
      setOpen(false);
    },
  });

  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setSelectedId("");
        }}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle color="danger">
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to update this booking?
          </DialogContent>
          <DialogActions>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false), setSelectedId("");
              }}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="success"
              onClick={() => {
                mutation.mutate(id); // Gửi id của route
                setSelectedId("");
              }}>
              Update
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
