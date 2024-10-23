/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import { ColorPaletteProp } from "@mui/joy/styles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Stack from "@mui/joy/Stack";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { searchBooking, searchRoutes } from "@/libs/common/utils/fetchRoute";
import DeleteRouteModal from "@/components/routemanage/DeleteModal";
import UpdateRouteModal from "@/components/routemanage/UpdateModal";
import UpdateBookingStatusModal from "@/components/bookingmanage/UpdateStatusModal";
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
interface searchInterface {
  key: string;
  term: string;
}
function RowMenu({
  dataId,
  setOpenUpdateStatus,
  setId,
}: {
  dataId: string;
  setOpenUpdateStatus: React.Dispatch<React.SetStateAction<boolean>>;
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
        <Divider />
        <MenuItem
          onClick={() => {
            setId(dataId), setOpenUpdateStatus(true);
          }}>
          Update Status
        </MenuItem>
        <Divider />
      </Menu>
    </Dropdown>
  );
}
export default function BookingTable() {
  const [order, setOrder] = React.useState<Order>("desc");
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [openUpdateStatusModal, setOpenUpdateStatusModal] =
    React.useState(false);
  const [selectedId, setselectedId] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = searchParams.get("sort");
  const status = searchParams.get("status");
  const search = searchParams.get("search");
  const page = searchParams.get("page");
  const [curPage, setCurPage] = React.useState(page || "1");
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["booking", { sort, search, status, page }],
    queryFn: () =>
      searchBooking({
        search: search || undefined,
        sortBy: sort?.split(":")[0],
        sortOrder: sort?.split(":")[1],
        status: status || undefined,
        page: Number(page) || undefined,
      }),
    retry: false,
    staleTime: 1000 * 60 * 5,
    // cacheTime: 1000 * 60 * 5,
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
    replace(`${pathname}?${params.toString()}`);
  }
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          defaultValue={status || ""}
          id="status"
          onChange={(event, newValue) => {
            handleSearchKeys([
              { key: "status", term: newValue || "" },
              { key: "page", term: "1" },
            ]);
            setCurPage("1");
          }}>
          <Option value="">All</Option>
          <Option value="pending">Pending</Option>
          <Option value="confirm">Confirm</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  console.log(data);
  return (
    <React.Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{ display: { xs: "flex", sm: "none" }, my: 1, gap: 1 }}>
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
          onClick={() => setOpen(true)}>
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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
            <FormLabel>Search for route</FormLabel>
            <Input
              id="search"
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
          display: { xs: "none", sm: "initial" },
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          overflow: "auto",
          minHeight: 0,
        }}>
        {isSuccess && (
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
                <th style={{ width: 80, padding: "12px 6px" }}>UserID </th>
                <th style={{ width: 140, padding: "12px 6px" }}>
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", margin: "auto" }}>
                    Details
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "startPort:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "startPort:ASC") {
                            handleSearch("sort", "startPort:DESC");
                          } else {
                            handleSearch("sort", "startPort:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort === "startPort:DESC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "startPort:DESC") {
                            handleSearch("sort", "startPort:ASC");
                          } else {
                            handleSearch("sort", "startPort:DESC");
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
                    Weight
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "endPort:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "endPort:ASC") {
                            handleSearch("sort", "endPort:DESC");
                          } else {
                            handleSearch("sort", "endPort:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={sort === "endPort:DESC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "endPort:DESC") {
                            handleSearch("sort", "endPort:ASC");
                          } else {
                            handleSearch("sort", "endPort:DESC");
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
                    Status
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={sort === "status:ASC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "status:ASC") {
                            handleSearch("sort", "status:DESC");
                          } else {
                            handleSearch("sort", "status:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={sort === "status:DESC" ? "primary" : "neutral"}
                        onClick={() => {
                          if (sort === "status:DESC") {
                            handleSearch("sort", "status:ASC");
                          } else {
                            handleSearch("sort", "status:DESC");
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
                    Departure Date
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={
                          sort === "departureDate:ASC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "departureDate:ASC") {
                            handleSearch("sort", "departureDate:DESC");
                          } else {
                            handleSearch("sort", "departureDate:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort === "departureDate:DESC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "departureDate:DESC") {
                            handleSearch("sort", "departureDate:ASC");
                          } else {
                            handleSearch("sort", "departureDate:DESC");
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
                    ArrivalDate
                    <Stack
                      direction="row"
                      spacing={0}
                      sx={{ justifyContent: "center", alignItems: "center" }}>
                      <IconButton
                        color={
                          sort === "arrivalDate:ASC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "arrivalDate:ASC") {
                            handleSearch("sort", "arrivalDate:DESC");
                          } else {
                            handleSearch("sort", "arrivalDate:ASC");
                          }
                        }}>
                        <ArrowUpwardIcon style={{ fontSize: "18px" }} />
                      </IconButton>
                      <IconButton
                        color={
                          sort === "arrivalDate:DESC" ? "primary" : "neutral"
                        }
                        onClick={() => {
                          if (sort === "arrivalDate:DESC") {
                            handleSearch("sort", "arrivalDate:ASC");
                          } else {
                            handleSearch("sort", "arrivalDate:DESC");
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
                      <Typography level="body-xs">
                        {row.userId.substring(0, 4).toUpperCase()}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {row.goodsDetails}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.weightRange}</Typography>
                    </td>
                    <td>
                      <Chip
                        variant="soft"
                        size="sm"
                        color={
                          {
                            Pending: "danger",
                            Completed: "success",
                          }[String(row.status)] as ColorPaletteProp
                        }>
                        {row.status.toString()}
                      </Chip>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {new Date(row.createdAt).toISOString().substring(0, 10)}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {new Date(row.route.departureDate)
                          .toISOString()
                          .substring(0, 10)}
                      </Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {new Date(row.route.arrivalDate)
                          .toISOString()
                          .substring(0, 10)}
                      </Typography>
                    </td>
                    <td>
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <RowMenu
                          dataId={(row.id as string) || ""}
                          setOpenUpdateStatus={setOpenUpdateStatusModal}
                          setId={setselectedId}
                        />
                      </Box>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center" }}>
                    <Typography level="body-sm">No booking found</Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Sheet>
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
            handleSearch("page", String(Number(page) - 1));
            setCurPage(String(Number(page) - 1));
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
                Number(curPage) > Math.ceil(data.totalCount / data.pageSize)
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
          disabled={!data || data.currentPage >= data.lastPage}
          onClick={() => {
            handleSearch("page", String(Number(data.currentPage) + 1));
            setCurPage(String(Number(data.currentPage) + 1));
          }}>
          Next
        </Button>
      </Box>
      <UpdateBookingStatusModal
        open={openUpdateStatusModal}
        setOpen={setOpenUpdateStatusModal}
        id={selectedId}
        setSelectedId={setselectedId}
      />
    </React.Fragment>
  );
}
