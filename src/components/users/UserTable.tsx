/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useQuery } from '@tanstack/react-query';
import { searchUsers } from '@/libs/common/utils/fetch';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import DeleteUserModal from '../modal/DeleteModal';
import UpdateUserModal from '../modal/UpdateModal';
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

function RowMenu({
  dataId,
  setOpenDelete,
  setOpenUpdate,
  setId,
}: {
  dataId: string;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [order, setOrder] = React.useState<Order>('desc');
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
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
  function handleSearch(key: string, term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  }
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Sort</FormLabel>
        <Select
          size="sm"
          slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}
          defaultValue={sort || 'createdAt'}
          id="sort"
          onChange={(event, newValue) => {
            handleSearch('sort', newValue || ''), handleSearch('page', '1');
          }}
        >
          <Option value="createdAt">Created date</Option>
          <Option value="updatedAt">Updated date</Option>
          <Option value="username">Username</Option>
          <Option value="email">Email</Option>
          <Option value="role.role">Role</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Role</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={role || ''}
          id="role"
          onChange={(event, newValue) => {
            handleSearch('role', newValue || '');
            handleSearch('page', '1');
          }}
        >
          <Option value="">All</Option>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
          <Option value="sysadmin">SysAdmin</Option>
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
            handleSearch('isVerified', newValue || '');
            handleSearch('page', '1');
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
                <th style={{ width: 180, padding: '12px 6px' }}>
                  <Link
                    underline="none"
                    color="primary"
                    component="button"
                    onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                    endDecorator={<ArrowDropDownIcon />}
                    sx={[
                      {
                        fontWeight: 'lg',
                        '& svg': {
                          transition: '0.2s',
                          transform:
                            order === 'desc'
                              ? 'rotate(0deg)'
                              : 'rotate(180deg)',
                        },
                      },
                      order === 'desc'
                        ? { '& svg': { transform: 'rotate(0deg)' } }
                        : { '& svg': { transform: 'rotate(180deg)' } },
                    ]}
                  >
                    Id
                  </Link>
                </th>
                <th style={{ width: 180, padding: '12px 6px' }}>Email</th>
                <th style={{ width: 140, padding: '12px 6px' }}>Username</th>
                <th style={{ width: 80, padding: '12px 6px' }}>IsVerfied</th>
                <th style={{ width: 140, padding: '12px 6px' }}>CreatedAt</th>
                <th style={{ width: 140, padding: '12px 6px' }}>UpdatedAt</th>
                <th style={{ width: 80, padding: '12px 6px' }}>Role</th>
                <th style={{ width: 140, padding: '12px 6px' }}> </th>
              </tr>
            </thead>
            <tbody>
              {[...data.users].sort(getComparator(order, 'id')).map((row) => (
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
                    <Typography level="body-xs">{row.createdAt}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.updatedAt}</Typography>
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
    </React.Fragment>
  );
}
