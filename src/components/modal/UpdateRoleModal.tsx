import * as React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import FormHelperText from '@mui/joy/FormHelperText';
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { toast } from 'react-toastify';
import {
  updateRole,
  searchPermission,
  getOneRole,
} from '@/libs/common/utils/fetch';
import { getErrorMessage } from '@/libs/common/utils/error';
import axios, { AxiosError } from 'axios';
import { Box } from '@mui/joy';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
const validationSchema = Yup.object({
  rolename: Yup.string()
    .min(4, 'Rolename must be at least 4 characters')
    .required('Name is required'),
});
type MapState = Map<string, string>;
export default function UpdateRoleModal({
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
  const sort = undefined;
  const possession = undefined;
  const object = undefined;
  const action = undefined;
  const searchTerm = undefined;
  const [curPage, setCurPage] = React.useState('1');
  const [inputPage, setInputPage] = React.useState(curPage);
  const [permissionMap, setPermissionMap] = React.useState<MapState>(new Map());
  const addItem = (key: string, value: string) => {
    setPermissionMap((prev) => new Map(prev.set(key, value)));
  };
  const removeItem = (key: string) => {
    const newMap = new Map(permissionMap);
    newMap.delete(key);
    setPermissionMap(newMap);
  };
  const renderButtonItems = () => {
    return Array.from(permissionMap.entries()).map(([key, value]) => (
      <Button
        key={key}
        size="sm"
        fullWidth={false}
        sx={{ textOverflow: 'ellipsis' }}
        onClick={() => removeItem(key)}
      >
        {value}
      </Button>
    ));
  };
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: [
      'permissions',
      {
        sort,
        object,
        action,
        searchTerm,
        curPage,
        possession,
      },
    ],
    queryFn: () =>
      searchPermission({
        searchTerm: searchTerm || undefined,
        sort: sort || undefined,
        object: object || undefined,
        action: action || undefined,
        possession: possession || undefined,
        page: Number(curPage) || undefined,
      }),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: open && !!id,
  });
  const fetchRole = useQuery({
    queryKey: ['role', { id }],
    queryFn: () => getOneRole(id),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!id && open,
  });
  React.useEffect(() => {
    if (fetchRole.isSuccess) {
      console.log('fetchRole', fetchRole.data.role);
      formik.setFieldValue('rolename', fetchRole.data.role);
      const permissionMap = new Map();
      for (const p of fetchRole.data.permission) {
        permissionMap.set(p.id, p.permission);
      }
      setPermissionMap(permissionMap);
    }
  }, [fetchRole.isSuccess, fetchRole.data]);
  const mutation = useMutation({
    mutationFn: updateRole,
    onSuccess: (data) => {
      queryClient.setQueryData(['role', { id: data.id }], data),
        queryClient.invalidateQueries({
          queryKey: ['roles'],
        }),
        toast.success('Update Role successfully');
    },
    onError: (error: Error | AxiosError) => {
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });
  const formik = useFormik({
    initialValues: {
      rolename: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        id,
        role: values.rolename,
        permissionId: Array.from(permissionMap.keys()),
      });
      setSelectedId('');
      setOpen(false);
      setSelectedId('');
      setOpen(false);
    },
  });
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setPermissionMap(new Map());
          setSelectedId('');
          setCurPage('1');
          setInputPage('1');
        }}
      >
        <ModalDialog
          variant="outlined"
          role="alertdialog"
          sx={{ overflow: 'auto' }}
        >
          <DialogTitle>Update Role</DialogTitle>
          <Divider />
          <Stack
            direction="row"
            spacing={3}
            sx={{ display: { xs: 'none', md: 'flex' }, my: 1 }}
          >
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <FormControl>
                <form onSubmit={formik.handleSubmit} id="createRole">
                  <FormLabel>Role Name</FormLabel>
                  <Input
                    size="sm"
                    placeholder="rolename"
                    id="rolename"
                    name="rolename"
                    onChange={formik.handleChange('rolename')}
                    onBlur={formik.handleBlur('rolename')}
                    value={formik.values.rolename}
                    disabled={
                      mutation.isPending || isPending || fetchRole.isPending
                    }
                    error={
                      formik.touched.rolename && Boolean(formik.errors.rolename)
                    }
                  />
                  {formik.touched.rolename &&
                    Boolean(formik.errors.rolename) && (
                      <FormHelperText>{formik.errors.rolename}</FormHelperText>
                    )}
                </form>
              </FormControl>
              <Typography level="body-xs">Permissions</Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                  gap: 1,
                  overflow: 'auto',
                  maxHeight: 360,
                }}
              >
                {renderButtonItems()}
              </Box>
            </Stack>
            <Stack direction="column" sx={{ maxWidth: '65%' }}>
              <Sheet
                className="OrderTableContainer"
                variant="outlined"
                sx={{
                  display: { xs: 'none', sm: 'initial' },
                  width: '100%',
                  borderRadius: 'sm',
                  flexShrink: 1,
                  overflow: 'auto',
                  minHeight: 0,
                }}
              >
                {isSuccess && (
                  <Table
                    aria-labelledby="tableTitle"
                    stickyHeader
                    hoverRow
                    sx={{
                      '--TableCell-headBackground':
                        'var(--joy-palette-background-level1)',
                      '--Table-headerUnderlineThickness': '1px',
                      '--TableRow-hoverBackground':
                        'var(--joy-palette-background-level1)',
                      '--TableCell-paddingY': '4px',
                      '--TableCell-paddingX': '8px',
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            width: 24,
                            textAlign: 'center',
                            padding: '12px 6px',
                          }}
                        ></th>
                        <th style={{ width: 80 }}>
                          <Stack
                            direction="row"
                            sx={{
                              alignItems: 'center',
                            }}
                          >
                            Name
                          </Stack>
                        </th>
                        <th style={{ width: 80 }}>
                          <Stack
                            direction="row"
                            sx={{
                              alignItems: 'center',
                              margin: 'auto',
                            }}
                          >
                            Action
                          </Stack>
                        </th>
                        <th style={{ width: 80 }}>
                          {' '}
                          <Stack
                            direction="row"
                            sx={{
                              alignItems: 'center',
                            }}
                          >
                            Object
                          </Stack>
                        </th>
                        <th style={{ width: 80 }}>
                          <Stack
                            direction="row"
                            sx={{
                              alignItems: 'center',
                            }}
                          >
                            Possession
                          </Stack>
                        </th>
                        <th style={{ width: 20 }}> </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...data.permissions].map((row) => (
                        <tr
                          key={row.id}
                          onClick={() => addItem(row.id, row.permission)}
                        >
                          <td style={{ textAlign: 'center', width: 120 }}></td>
                          <td>
                            <Typography level="body-xs">
                              {row.permission}
                            </Typography>
                          </td>
                          <td>
                            <Typography level="body-xs">
                              {row.action}
                            </Typography>
                          </td>
                          <td>
                            <Typography level="body-xs">
                              {row.object}
                            </Typography>
                          </td>
                          <td>
                            <Typography level="body-xs">
                              {row.possession}
                            </Typography>
                          </td>
                          <td>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 2,
                                alignItems: 'center',
                              }}
                            ></Box>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Sheet>
              <Box
                className="Pagination-laptopUp"
                sx={{
                  pt: 2,
                  gap: 1,
                  [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
                  display: {
                    xs: 'none',
                    md: 'flex',
                  },
                }}
              >
                <Button
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  startDecorator={<KeyboardArrowLeftIcon />}
                  disabled={Number(curPage) === 1}
                  onClick={() => {
                    setCurPage((prev) => String(Number(prev) - 1));
                    setInputPage((prev) => String(Number(prev) - 1));
                  }}
                >
                  Previous
                </Button>
                <Box
                  sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      if (
                        inputPage === '' ||
                        curPage === inputPage ||
                        Number(inputPage) >
                          Math.ceil(data.totalCount / data.pageSize)
                      ) {
                        setInputPage(curPage);
                        return;
                      } else {
                        setCurPage(inputPage);
                      }
                    }}
                  >
                    <Input
                      className="max-w-20"
                      value={inputPage}
                      onBlur={() => setInputPage(curPage)}
                      onChange={(e) => {
                        setInputPage(e.target.value || '');
                      }}
                      disabled={!data}
                      endDecorator={
                        <Button
                          variant="soft"
                          color="neutral"
                          disabled
                          size="sm"
                        >
                          /
                          {data && data.totalCount && data.pageSize
                            ? Math.ceil(data.totalCount / data.pageSize)
                            : 1}
                        </Button>
                      }
                    />
                  </form>
                </Box>
                <Button
                  size="sm"
                  variant="outlined"
                  color="neutral"
                  endDecorator={<KeyboardArrowRightIcon />}
                  disabled={
                    !data ||
                    data.totalCount < data.pageSize ||
                    data.pageNumber * data.pageSize >= data.totalCount
                  }
                  onClick={() => {
                    setInputPage(String(Number(data.pageNumber) + 1));
                    setCurPage(String(Number(data.pageNumber) + 1));
                  }}
                >
                  Next
                </Button>
              </Box>
            </Stack>
          </Stack>
          <Divider />
          <DialogActions>
            <Button
              form="createRole"
              sx={{ backgroundColor: '#000000' }}
              variant="solid"
              color="neutral"
              type="submit"
              disabled={isPending || mutation.isPending}
            >
              Save
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false);
                setPermissionMap(new Map());
                setSelectedId('');
                setCurPage('1');
                setInputPage('1');
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
