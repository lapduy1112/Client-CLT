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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import BlockIcon from '@mui/icons-material/Block';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useQuery } from '@tanstack/react-query';
import { searchUsers, searchPermission } from '@/libs/common/utils/fetch';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Stack from '@mui/joy/Stack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { object } from 'yup';
interface searchInterface {
  key: string;
  term: string;
}
export default function PermissionTable() {
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = searchParams.get('sort');
  const possession = searchParams.get('possession');
  const object = searchParams.get('object');
  const action = searchParams.get('action');
  const searchTerm = searchParams.get('searchTerm');
  const page = searchParams.get('page');
  const [curPage, setCurPage] = React.useState(page || '1');
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: [
      'permissions',
      { sort, object, action, searchTerm, page, possession },
    ],
    queryFn: () =>
      searchPermission({
        searchTerm: searchTerm || undefined,
        sort: sort || undefined,
        object: object || undefined,
        action: action || undefined,
        possession: possession || undefined,
        page: Number(page) || undefined,
      }),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  console.log(data)
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
          <Option value="read">Read</Option>
          <Option value="update">Update</Option>
          <Option value="delete">Delete</Option>
          <Option value="create">Create</Option>
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
          <Option value="route">Route</Option>
          <Option value="role">Role</Option>
          <Option value="permission">Permission</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Possession</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={possession || ''}
          id="possession"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: 'possession', term: newValue || '' },
              { key: 'page', term: '1' },
            ]);
            setCurPage('1');
          }}
        >
          <Option value="">All</Option>
          <Option value="any">Any</Option>
          <Option value="own">Own</Option>
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
                    width: 140,
                    padding: '12px 6px',
                  }}
                >
                  Id
                </th>
                <th style={{ width: 120 }}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    Name
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
                          if (sort == 'permission:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'permission:ASC');
                          }
                        }}
                        color={sort == 'permission:ASC' ? 'primary' : 'neutral'}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (sort == 'permission:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'permission:DESC');
                          }
                        }}
                        color={
                          sort == 'permission:DESC' ? 'primary' : 'neutral'
                        }
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 120 }}>
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                      margin: 'auto',
                    }}
                  >
                    Action
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <IconButton
                        color={sort == 'action:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'action:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'action:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={sort == 'action:DESC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'action:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'action:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 120 }}>
                  {' '}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    Object
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
                        color={sort == 'object:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'object:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'object:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={sort == 'object:DESC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'object:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'object:DESC');
                          }
                        }}
                      >
                        <ArrowDownwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 120 }}>
                  {' '}
                  <Stack
                    direction="row"
                    sx={{
                      alignItems: 'center',
                    }}
                  >
                    Possession
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
                        color={sort == 'possession:ASC' ? 'primary' : 'neutral'}
                        onClick={() => {
                          if (sort == 'possession:ASC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'possession:ASC');
                          }
                        }}
                      >
                        <ArrowUpwardIcon style={{ fontSize: '18px' }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort == 'possession:DESC' ? 'primary' : 'neutral'
                        }
                        onClick={() => {
                          if (sort == 'possession:DESC') {
                            handleSearch('sort', '');
                          } else {
                            handleSearch('sort', 'possession:DESC');
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
                <th style={{ width: 40 }}> </th>
              </tr>
            </thead>
            <tbody>
              {[...data.permissions].map((row) => (
                <tr key={row.id}>
                  <td style={{ textAlign: 'center', width: 120 }}></td>
                  <td>
                    <Typography level="body-xs">{row.id}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.permission}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.action}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.object}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.possession}</Typography>
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
                    <Box
                      sx={{ display: 'flex', gap: 2, alignItems: 'center' }}
                    ></Box>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {isError && (
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 200,
            }}
          >
            <Typography
              level="body-lg"
              color="danger"
              sx={{ textAlign: 'center' }}
            >
              (Ｔ▽Ｔ) {error?.message || 'Something went wrong'}
            </Typography>
          </Stack>
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
