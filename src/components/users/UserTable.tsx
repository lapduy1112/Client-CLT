import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useQuery } from '@tanstack/react-query';
import { searchUsers, getAllRoles } from '@/libs/common/utils/fetch';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import DeleteUserModal from '../modal/DeleteModal';
import UpdateUserModal from '../modal/UpdateModal';
import Stack from '@mui/joy/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignRoleModal from '../modal/AssignRoleModal';
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface searchInterface {
  key: string;
  term: string;
}
function RowMenu({
  dataId,
  setOpenDelete,
  setOpenUpdate,
  setOpenAssignRole,
  setId,
}: {
  dataId: string;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenAssignRole: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem
          onClick={() => {
            setId(dataId), setOpenUpdate(true);
          }}
        >
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setId(dataId), setOpenAssignRole(true);
          }}
        >
          Assign Role to User
        </MenuItem>
        <Divider />
        <MenuItem
          color="danger"
          onClick={() => {
            setId(dataId), setOpenDelete(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
export default function UserTable() {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [openAssignRoleModal, setOpenAssignRoleModal] = React.useState(false);
  const [selectedId, setselectedId] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = searchParams.get('sort');
  const role = searchParams.get('role');
  const isVerified = searchParams.get('isVerified');
  const searchTerm = searchParams.get('searchTerm');
  const page = searchParams.get('page');
  const [curPage, setCurPage] = React.useState(page || '1');
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['users', { sort, role, isVerified, searchTerm, page }],
    queryFn: () =>
      searchUsers({
        searchTerm: searchTerm || undefined,
        sort: sort || undefined,
        role: role || undefined,
        isVerified: isVerified || undefined,
        page: Number(page) || undefined,
      }),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  const fetchRole = useQuery({
    queryKey: ['roles'],
    queryFn: () => getAllRoles(),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  function handleSearchKeys(searchQueries: searchInterface[]) {
    const params = new URLSearchParams(searchParams);
    for (const searchQuery of searchQueries) {
      if (searchQuery.term) {
        params.set(searchQuery.key, searchQuery.term);
      } else {
        params.delete(searchQuery.key);
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function handleSearch(key: string, term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }
    console.log('params', params.toString());
    replace(`${pathname}?${params.toString()}`);
  }
  const renderFilters = () => (
    <React.Fragment>
      {/* <FormControl size="sm">
        <FormLabel>Sort</FormLabel>
        <Select
          size="sm"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          defaultValue={sort || 'createdAt'}
          id="sort"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'sort', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="createdAt">Created date</Option>
          <Option value="updatedAt">Updated date</Option>
          <Option value="username">Username</Option>
          <Option value="email">Email</Option>
          <Option value="role.role">Role</Option>
        </Select>
      </FormControl> */}
      <FormControl size="sm">
        <FormLabel>Role</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={role || ''}
          id="role"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'role', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="">All</Option>
          {fetchRole.isSuccess &&
            fetchRole.data.roles.map((r: { id: string; role: string }) => (
              <Option key={r.id} value={r.id}>
                {r.role}
              </Option>
            ))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Verified</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={isVerified || ''}
          id="isVerified"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'isVerified', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="">All</Option>
          <Option value="True">Yes</Option>
          <Option value="False">No</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: 'flex', sm: 'none' }, my: 1, gap: 1 }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <form
          className="flex-1"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            handleSearch(
              'searchTerm',
              (form.elements.namedItem('search') as HTMLInputElement).value ||
                ''
            );
          }}
        >
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for users</FormLabel>
            <Input
              id="searchTerm"
              name="search"
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
            />
          </FormControl>
        </form>
        {renderFilters()}
      </Box>
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
                <th
                  style={{
                    width: 120,
                    padding: '12px 6px',
                  }}
                >
                  Id
                </th>
                {/* <th style={{ width: 180, padding: '12px 6px' }}>Email</th> */}
                <th style={{ width: 160 }}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    Email
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (sort == 'email:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'email:ASC');
                          }
                        }}
                        color={sort == 'email:ASC' ? 'primary' : 'neutral'}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (sort == 'email:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'email:DESC');
                          }
                        }}
                        color={sort == 'email:DESC' ? 'primary' : 'neutral'}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140 }}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      margin: 'auto',
                    }}
                  >
                    Username
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        color={sort == 'username:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'username:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'username:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={sort == 'username:DESC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'username:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'username:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 100 }}>
                  {' '}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    Verified
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: '8px',
                      }}
                    >
                      <IconButton
                        color={sort == 'isVerified:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'isVerified:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'isVerified:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort == 'isVerified:DESC' ? 'primary' : 'neutral'
                        }
                        onClick={() => {
                          if (sort == 'isVerified:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'isVerified:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140 }}>
                  {' '}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    CreatedAt
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        color={sort == 'createdAt:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'createdAt:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'createdAt:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={sort == 'createdAt:DESC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'createdAt:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'createdAt:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140 }}>
                  {' '}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    UpdatedAt
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        color={sort == 'updatedAt:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'updatedAt:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'updatedAt:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={sort == 'updatedAt:DESC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'updatedAt:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'updatedAt:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
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
                    Role
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        color={sort == 'role.role:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'role.role:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'role.role:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (sort == 'role.role:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'role.role:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 80 }}> </th>
              </tr>
            </thead>
            <tbody>
              {[...data.users].map((row) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center', width: 120 }}></td>
                  <td>
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.email}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.username}</Typography>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          true: <CheckRoundedIcon />,
                          false: <BlockIcon />,
                        }[String(row.isVerified)]
                      }
                      color={
                        {
                          true: 'success',
                          false: 'danger',
                        }[String(row.isVerified)] as ColorPaletteProp
                      }
                    >
                      {row.isVerified.toString()}
                    </Chip>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row.createdAt
                        ? new Date(row.createdAt).toUTCString()
                        : ''}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">
                      {row.updatedAt
                        ? new Date(row.updatedAt).toUTCString()
                        : ''}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.role.role}</Typography>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <RowMenu
                        dataId={(row.id as string) || ''}
                        setOpenDelete={setOpenDeleteModal}
                        setOpenUpdate={setOpenUpdateModal}
                        setOpenAssignRole={setOpenAssignRoleModal}
                        setId={setselectedId}
                      />
                    </Box>
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
          disabled={Number(page) === 1 || !page}
          onClick={() => {
            handleSearch('page', String(Number(page) - 1));
            setCurPage(String(Number(page) - 1));
          }}
        >
          Previous
        </Button>

        {/* <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))} */}
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
                curPage === '' ||
                curPage === page ||
                Number(curPage) > Math.ceil(data.totalCount / data.pageSize)
              ) {
                setCurPage(page || '1');
                return;
              }
              handleSearch('page', curPage);
            }}
          >
            <Input
              className="max-w-20"
              value={curPage}
              onBlur={() => setCurPage(page || '1')}
              onChange={(e) => {
                setCurPage(e.target.value || '');
              }}
              disabled={!data}
              endDecorator={
                <Button variant="soft" color="neutral" disabled size="sm">
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
            handleSearch('page', String(Number(data.pageNumber) + 1));
            setCurPage(String(Number(data.pageNumber) + 1));
          }}
        >
          Next
        </Button>
      </Box>
      <DeleteUserModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedId}
        setSelectedId={setselectedId}
      />
      <UpdateUserModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={selectedId}
        setSelectedId={setselectedId}
      />
      <AssignRoleModal
        open={openAssignRoleModal}
        setOpen={setOpenAssignRoleModal}
        id={selectedId}
        setSelectedId={setselectedId}
      />
    </React.Fragment>
  );
}
