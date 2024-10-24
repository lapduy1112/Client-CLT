/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useQuery } from "@tanstack/react-query";
import { searchPorts } from "@/libs/common/utils/fetchRoute";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "@mui/joy/Link";
import DeletePortModal from "@/components/portmanage/DeleteModal";
import UpdatePortModal from "@/components/portmanage/UpdateModal";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";
interface Port {
  id: string;
  address: string;
  lat: string;
  lon: string;
  createdAt: string;
  updatedAt: string;
}
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface SearchInterface {
  key: string;
  term: string;
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
        slotProps={{
          root: { variant: "plain", color: "neutral", size: "sm" },
        }}>
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem
          onClick={() => {
            setId(dataId);
            setOpenUpdate(true);
          }}>
          Edit
        </MenuItem>
        <Divider />
        <MenuItem
          color="danger"
          onClick={() => {
            setId(dataId);
            setOpenDelete(true);
          }}>
          Delete
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function PortTable({ ports }: { ports: Port[] }) {
  const [order, setOrder] = React.useState<Order>("desc");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");
  const page = searchParams.get("page" || "1");
  const [curPage, setCurPage] = React.useState(page || "1");

  const { data, isSuccess } = useQuery({
    queryKey: ["port", { sort, search, page }],
    queryFn: () =>
      searchPorts({
        search: search || undefined,
        sortBy: sort?.split(":")[0],
        sortOrder: sort?.split(":")[1],
        page: Number(page) || undefined,
      }),
    retry: false,
    staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  function handleSearchKeys(searchQueries: SearchInterface[]) {
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
    replace(`${pathname}?${params.toString()}`);
  }

  console.log(data);
  return (
    <>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: "sm",
          py: 2,
          display: { xs: "none", sm: "flex" },
          flexWrap: "wrap",
          gap: 1.5,
          "& > *": {
            minWidth: { xs: "120px", md: "160px" },
          },
        }}>
        <form
          className="flex-1"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;
            handleSearch(
              "search",
              (form.elements.namedItem("search") as HTMLInputElement).value ||
                ""
            );
          }}>
          <FormControl sx={{ flex: 1 }} size="sm">
            <FormLabel>Search for ports</FormLabel>
            <Input
              id="search"
              name="search"
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
            />
          </FormControl>
        </form>
        {/* {renderFilters()} */}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}>
        {isSuccess && data && (
          <Table
            aria-labelledby="tableTitle"
            stickyHeader
            hoverRow
            sx={{
              "--TableCell-headBackground":
                "var(--joy-palette-background-level1)",
              "--Table-headerUnderlineThickness": "1px",
              "--TableRow-hoverBackground":
                "var(--joy-palette-background-level1)",
              "--TableCell-paddingY": "4px",
              "--TableCell-paddingX": "8px",
            }}>
            <thead>
              <tr>
                <th
                  style={{
                    width: 24,
                    textAlign: "center",
                    padding: "12px 6px",
                  }}>
                  #
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", margin: "auto" }}>
                    Address
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "address:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "address:ASC") {
                            handleSearch("sort", "address:DESC");
                          } else {
                            handleSearch("sort", "address:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={sort === "address:DESC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "address:DESC") {
                            handleSearch("sort", "address:ASC");
                          } else {
                            handleSearch("sort", "address:DESC");
                          }
                        }}>
                        <ArrowDownwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", margin: "auto" }}>
                    Latitude
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "lat:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "lat:ASC") {
                            handleSearch("sort", "lat:DESC");
                          } else {
                            handleSearch("sort", "lat:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={sort === "lat:DESC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "lat:DESC") {
                            handleSearch("sort", "lat:ASC");
                          } else {
                            handleSearch("sort", "lat:DESC");
                          }
                        }}>
                        <ArrowDownwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", margin: "auto" }}>
                    Longtitude
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "lon:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "lon:ASC") {
                            handleSearch("sort", "lon:DESC");
                          } else {
                            handleSearch("sort", "lon:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={sort === "lon:DESC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "lon:DESC") {
                            handleSearch("sort", "lon:ASC");
                          } else {
                            handleSearch("sort", "lon:DESC");
                          }
                        }}>
                        <ArrowDownwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", margin: "auto" }}>
                    CreatedAt
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "createdAt:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "createdAt:ASC") {
                            handleSearch("sort", "createdAt:DESC");
                          } else {
                            handleSearch("sort", "createdAt:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort === "createdAt:DESC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "createdAt:DESC") {
                            handleSearch("sort", "createdAt:ASC");
                          } else {
                            handleSearch("sort", "createdAt:DESC");
                          }
                        }}>
                        <ArrowDownwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", margin: "auto" }}>
                    updatedAt
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "updatedAt:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "updatedAt:ASC") {
                            handleSearch("sort", "updatedAt:DESC");
                          } else {
                            handleSearch("sort", "updatedAt:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort === "updatedAt:DESC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "updatedAt:DESC") {
                            handleSearch("sort", "updatedAt:ASC");
                          } else {
                            handleSearch("sort", "updatedAt:DESC");
                          }
                        }}>
                        <ArrowDownwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                    </Stack>
                  </Stack>
                </th>
                <th style={{ width: 140, padding: "12px 6px" }}> </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data.data) && data.data.length > 0 ? (
                [...data.data].map((row, index) => (
                  <tr key={row.id}>
                    <td style={{ textAlign: "center", width: 120 }}>
                      <Typography level="body-xs">{index + 1}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.address}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.lat}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.lon}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {new Date(row.createdAt).toISOString().substring(0, 10)}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {new Date(row.updatedAt).toISOString().substring(0, 10)}
                      </Typography>
                    </td>
                    <td>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          alignItems: "center",
                        }}>
                        <RowMenu
                          dataId={row.id || ""}
                          setOpenDelete={setOpenDeleteModal}
                          setOpenUpdate={setOpenUpdateModal}
                          setId={setSelectedId}
                        />
                      </Box>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    <Typography level="body-sm">No ports found</Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Sheet>
      {/* Phân trang */}
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: {
            xs: "none",
            md: "flex",
          },
        }}>
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
          disabled={Number(page) === 1 || !page}
          onClick={() => {
            const prevPage = String(Number(page) - 1);
            handleSearch("page", prevPage);
            setCurPage(prevPage);
          }}>
          Previous
        </Button>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (
                curPage === "" ||
                curPage === page ||
                Number(curPage) > Math.ceil(data.total / data.pageSize)
              ) {
                setCurPage(page || "1");
                return;
              }
              handleSearch("page", curPage);
            }}>
            <Input
              className="max-w-20"
              value={curPage}
              onBlur={() => setCurPage(page || "1")}
              onChange={(e) => {
                setCurPage(e.target.value || "");
              }}
              disabled={!data}
              endDecorator={
                <Button variant="soft" color="neutral" disabled size="sm">
                  /{data && data.total && data.lastPage ? data.lastPage : 1}
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
          disabled={!data || data.nextPage == null}
          onClick={() => {
            handleSearch("page", String(Number(data.currentPage) + 1));
            setCurPage(String(Number(data.currentPage) + 1));
          }}>
          Next
        </Button>
      </Box>
      <DeletePortModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        id={selectedId}
        setSelectedId={setSelectedId}
      />
      <UpdatePortModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        id={selectedId}
        setSelectedId={setSelectedId}
      />
    </>
  );
}
