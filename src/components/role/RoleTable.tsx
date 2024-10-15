import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
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
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { useQuery } from '@tanstack/react-query';
import { searchRole } from '@/libs/common/utils/fetch';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Stack from '@mui/joy/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
interface searchInterface {
  key: string;
  term: string;
}
function Row({
  row,
  setOpenDelete,
  setOpenUpdate,
  setId,
}: {
  row: any;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <tr key={row.id}>
        <td style={{ textAlign: 'center', width: 120 }}>
          {' '}
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>
          <Typography level="body-xs">{row.id}</Typography>
        </td>
        <td>
          <Typography level="body-xs">{row.role}</Typography>
        </td>
        <td>
          <Typography level="body-xs">
            {row.createdAt ? new Date(row.createdAt).toUTCString() : ''}
          </Typography>
        </td>
        <td>
          <Typography level="body-xs">
            {row.updatedAt ? new Date(row.updatedAt).toUTCString() : ''}
          </Typography>
        </td>
        <td>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <RowMenu
              dataId={(row.id as string) || ''}
              setOpenDelete={setOpenDelete}
              setOpenUpdate={setOpenUpdate}
              setId={setId}
            />
          </Box>
        </td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={6}>
          {open && (
            <Sheet
              variant="soft"
              sx={{
                p: 1,
                pl: 6,
                boxShadow: 'inset 0 3px 6px 0 rgba(0 0 0 / 0.08)',
              }}
            >
              <Typography level="body-lg" component="div">
                Permission
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="purchases"
                sx={{
                  '& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)':
                    { textAlign: 'right' },
                  '--TableCell-paddingX': '0.5rem',
                }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Action</th>
                    <th>Object</th>
                    <th>Possession</th>
                  </tr>
                </thead>
                <tbody>
                  {row.permission.map(
                    (permissionRow: {
                      permission: string;
                      action: string;
                      object: string;
                      possession: string;
                    }) => (
                      <tr key={permissionRow.permission}>
                        <th scope="row">{permissionRow.permission}</th>
                        <th scope="row">{permissionRow.action}</th>
                        <td>{permissionRow.object}</td>
                        <td>{permissionRow.possession}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </>
  );
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
          Add Permission
        </MenuItem>
        <Divider />
        <MenuItem
          color="danger"
          onClick={() => {
            setId(dataId), setOpenDelete(true);
          }}
        >
          Delete Permission
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}
export default function RoleTable() {
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [selectedId, setselectedId] = React.useState('');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = searchParams.get('sort');
  const action = searchParams.get('action');
  const object = searchParams.get('object');
  const possession = searchParams.get('possession');
  const searchTerm = searchParams.get('searchTerm');
  const page = searchParams.get('page');
  const [curPage, setCurPage] = React.useState(page || '1');
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['users', { sort, action, object, searchTerm, page, possession }],
    queryFn: () =>
      searchRole({
        searchTerm: searchTerm || undefined,
        sort: sort || undefined,
        permission_action: action || undefined,
        permission_object: object || undefined,
        permission_possession: possession || undefined,
        page: Number(page) || undefined,
      }),
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
      <FormControl size="sm">
        <FormLabel>Action</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={action || ''}
          id="action"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'action', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="">All</Option>
          <Option value="update">Update</Option>
          <Option value="create">Create</Option>
          <Option value="search">search</Option>
          <Option value="delete">delete</Option>
          <Option value="read">read</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Object</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={object || ''}
          id="object"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'object', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="">All</Option>
          <Option value="user">User</Option>
          <Option value="route">Routes</Option>
          <Option value="role">Role</Option>
          <Option value="permission">Permission</Option>
          <Option value="user_role">User Role</Option>
          <Option value="profile">Profile</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Possession</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={object || ''}
          id="object"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'possession', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="">All</Option>
          <Option value="own">Own</Option>
          <Option value="any">Any</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <React.Fragment>
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
                >
                  {' '}
                </th>
                <th
                  style={{
                    width: 120,
                    padding: '12px 6px',
                  }}
                >
                  Id
                </th>
                <th style={{ width: 160 }}>
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
                        onClick={() => {
                          if (sort == 'role:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'role:ASC');
                          }
                        }}
                        color={sort == 'role:ASC' ? 'primary' : 'neutral'}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (sort == 'role:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'role:DESC');
                          }
                        }}
                        color={sort == 'role:DESC' ? 'primary' : 'neutral'}
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
                <th style={{ width: 80 }}> </th>
              </tr>
            </thead>
            <tbody>
              {[...data.roles].map((row) => (
                <Row
                  key={row.id}
                  row={row}
                  setOpenUpdate={setOpenUpdateModal}
                  setOpenDelete={setOpenDeleteModal}
                  setId={setselectedId}
                />
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
    </React.Fragment>
  );
}
