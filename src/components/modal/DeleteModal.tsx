import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '@/libs/common/utils/fetch';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { getErrorMessage } from '@/libs/common/utils/error';
import axios, { AxiosError } from 'axios';
export default function DeleteUserModal({
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
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }),
        toast.success('User deleted successfully'),
        setOpen(false);
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
      setOpen(false);
    },
  });
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setSelectedId('');
        }}
      >
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle color="danger">
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this user?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                mutation.mutate(id), setSelectedId('');
              }}
              startDecorator={<DeleteForever />}
            >
              Delete
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false), setSelectedId('');
              }}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
