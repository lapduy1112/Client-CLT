'use client';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardOverflow from '@mui/joy/CardOverflow';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { useEffect } from 'react';
import { useStore } from '@/providers/ZustandProvider';
import { redirect } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@/libs/common/utils/fetch';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { getErrorMessage } from '@/libs/common/utils/error';
import axios, { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';
import { FormHelperText } from '@mui/joy';
import { PermissionInterface } from '@/libs/common/interfaces/permission.interface';
import { UserInterface } from '@/libs/common/interfaces/user.interface';
const validationSchema = Yup.object({
  username: Yup.string().min(4, 'Username must be at least 4 characters'),
});
export default function MyProfile() {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      console.log('data', data);
      queryClient.setQueryData(['user', { id: 0 }], data);
      const permission: PermissionInterface[] = data.role
        .permission as PermissionInterface[];
      const user: UserInterface = {
        ...data,
        role: data.role.role,
        permission: permission,
      };
      setUser(user);
      toast.success('User Updated successfully');
    },
    onError: (error: Error | AxiosError) => {
      toast.error(getErrorMessage(error));
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });
  const formik = useFormik({
    initialValues: {
      username: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log('values', values);
      if (!user) {
        toast.error('User not found');
        return;
      }
      if (values.username === user.username || !values.username) {
        return;
      }
      mutation.mutate({
        id: user?.id,
        username: values.username,
      });
    },
  });
  useEffect(() => {
    if (!user) {
      redirect('/unauthorized');
    }
  }, [user]);
  return (
    <Box sx={{ flex: 1, width: '100%' }}>
      <Box
        sx={{
          position: 'sticky',
          top: { sm: -100, md: -110 },
          bgcolor: 'background.body',
          zIndex: 9995,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 6 } }}>
          <Breadcrumbs
            size="sm"
            aria-label="breadcrumbs"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link
              underline="none"
              color="neutral"
              href="#some-link"
              aria-label="Home"
            >
              <HomeRoundedIcon />
            </Link>
            <Link
              underline="hover"
              color="neutral"
              href="#some-link"
              sx={{ fontSize: 12, fontWeight: 500 }}
            >
              Users
            </Link>
            <Typography color="primary" sx={{ fontWeight: 500, fontSize: 12 }}>
              My profile
            </Typography>
          </Breadcrumbs>
          <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
            My profile
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Stack
        spacing={4}
        sx={{
          display: 'flex',
          maxWidth: '800px',
          mx: 'auto',
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card>
          <Box sx={{ mb: 1 }}>
            <Typography level="title-md">Personal info</Typography>
            <Typography level="body-sm">
              Customize how your profile information will apper to the networks.
            </Typography>
          </Box>
          <Divider />
          <form onSubmit={formik.handleSubmit} id="updatedUserForm">
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
                      user?.profileImage ||
                      'https://firebasestorage.googleapis.com/v0/b/mern-blog-project-28a14.appspot.com/o/profileImage.jpg?alt=media&token=4b00eeb1-6eb8-4c2d-9ba5-1c5fcf7e3d49'
                    }
                    srcSet={
                      user?.profileImage ||
                      'https://firebasestorage.googleapis.com/v0/b/mern-blog-project-28a14.appspot.com/o/profileImage.jpg?alt=media&token=4b00eeb1-6eb8-4c2d-9ba5-1c5fcf7e3d49'
                    }
                    loading="lazy"
                    alt=""
                  />
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
                <Stack spacing={1}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: 'flex-column', md: 'flex-row' },
                      gap: 2,
                    }}
                  >
                    <Input
                      size="sm"
                      placeholder="Username"
                      id="username"
                      name="username"
                      defaultValue={user?.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.username}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                    />
                    {formik.touched.username &&
                      Boolean(formik.errors.username) && (
                        <FormHelperText>
                          {formik.errors.username}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input size="sm" defaultValue={user?.role} disabled />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
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
          </form>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button
                size="sm"
                variant="outlined"
                color="neutral"
                disabled={mutation.isPending}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="solid"
                form="updatedUserForm"
                type="submit"
                disabled={mutation.isPending}
              >
                Save
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  );
}
