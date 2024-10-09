import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Stack from '@mui/material/Stack';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUserById, updateUser } from '@/libs/common/utils/fetch';
import Option from '@mui/joy/Option';
const validationSchema = Yup.object({
  username: Yup.string().min(4, 'Username must be at least 4 characters'),
  isVerified: Yup.string(),
});
export default function UpdateUserModal({
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
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['user', { id: id }],
    queryFn: () => getUserById(id),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user', { id: data.id }], data),
        toast.success('User Updated successfully'),
        setOpen(false);
    },
    onError: () => {
      toast.error('Error Updating user');
      setOpen(false);
    },
  });
  const formik = useFormik({
    initialValues: {
      username: undefined,
      isVerified: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
          <DialogTitle>Update User</DialogTitle>
          <Divider />
          {isSuccess && data && (
            <form>
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
              >
                <Stack direction="column" spacing={1}>
                  <AspectRatio
                    ratio="1"
                    maxHeight={200}
                    sx={{ flex: 1, minWidth: 120, borderRadius: '100%' }}
                  >
                    <img
                      src={
                        data?.profileImage ||
                        'https://firebasestorage.googleapis.com/v0/b/mern-blog-project-28a14.appspot.com/o/profileImage.jpg?alt=media&token=4b00eeb1-6eb8-4c2d-9ba5-1c5fcf7e3d49'
                      }
                      srcSet={
                        data?.profileImage ||
                        'https://firebasestorage.googleapis.com/v0/b/mern-blog-project-28a14.appspot.com/o/profileImage.jpg?alt=media&token=4b00eeb1-6eb8-4c2d-9ba5-1c5fcf7e3d49'
                      }
                      loading="lazy"
                      alt=""
                    />
                    {/* <Image
                  src={
                    user?.profileImage ||
                    'https://firebasestorage.googleapis.com/v0/b/mern-blog-project-28a14.appspot.com/o/profileImage.jpg?alt=media&token=4b00eeb1-6eb8-4c2d-9ba5-1c5fcf7e3d49'
                  }
                  alt="Profile image"
                  layout="fill"
                  objectFit="contain"
                ></Image> */}
                  </AspectRatio>
                  <IconButton
                    aria-label="upload new picture"
                    size="sm"
                    variant="outlined"
                    color="neutral"
                    sx={{
                      bgcolor: 'background.body',
                      position: 'absolute',
                      zIndex: 2,
                      borderRadius: '50%',
                      left: 100,
                      top: 170,
                      boxShadow: 'sm',
                    }}
                  >
                    <EditRoundedIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Username"
                        defaultValue={data?.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>isVerified</FormLabel>
                      <Select
                        size="sm"
                        placeholder=""
                        defaultValue={data?.isVerified ? 'true' : 'false'}
                        id="isVerified"
                      >
                        <Option value="true">True</Option>
                        <Option value="false">False</Option>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Role</FormLabel>
                      <Input
                        size="sm"
                        defaultValue={data?.role?.role}
                        disabled
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Email</FormLabel>
                      <Input
                        size="sm"
                        type="email"
                        startDecorator={<EmailRoundedIcon />}
                        placeholder="email"
                        defaultValue={data?.email}
                        sx={{ flexGrow: 1 }}
                        disabled
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          )}

          <DialogActions>
            <Button
              sx={{ backgroundColor: '#000000' }}
              variant="solid"
              color="danger"
              onClick={() => {
                setSelectedId('');
              }}
            >
              Update
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
