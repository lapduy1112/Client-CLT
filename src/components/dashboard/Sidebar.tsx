"use client";
import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Stack from "@mui/joy/Stack";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { closeSidebar } from "@/libs/common/utils/handleSideBar";
import { useStore } from "@/providers/ZustandProvider";
import { useRouter } from "next/navigation";
import KeyIcon from "@mui/icons-material/Key";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import { logOut } from "@/libs/common/utils/logOut";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={[
          {
            display: "grid",
            transition: "0.2s ease",
            "& > *": {
              overflow: "hidden",
            },
          },
          open ? { gridTemplateRows: "1fr" } : { gridTemplateRows: "0fr" },
        ]}>
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar({ tab }: { tab?: string }) {
  const user = useStore((state) => state.user);
  const router = useRouter();
  const abilities = useStore((state) => state.abilities);
  console.log("abilities", abilities);
  const deleteUser = useStore((state) => state.deleteUser);
  const mutation = useMutation({
    mutationFn: logOut,
    onSuccess: () => {
      toast.success("Logged out successfully");
      deleteUser();
    },
    onError: (error: Error | AxiosError) => {
      console.log("Error", error);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });
  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/login");
    mutation.mutate();
  };
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: { xs: "fixed", md: "sticky" },
        transform: {
          xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
          md: "none",
        },
        transition: "transform 0.4s, width 0.4s",
        zIndex: 10000,
        height: "100dvh",
        width: "var(--Sidebar-width)",
        top: 0,
        p: 2,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRight: "1px solid",
        borderColor: "divider",
      }}>
      <GlobalStyles
        styles={(theme) => ({
          ":root": {
            "--Sidebar-width": "220px",
            [theme.breakpoints.up("lg")]: {
              "--Sidebar-width": "240px",
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: "fixed",
          zIndex: 9998,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          opacity: "var(--SideNavigation-slideIn)",
          backgroundColor: "var(--joy-palette-background-backdrop)",
          transition: "opacity 0.4s",
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
            lg: "translateX(-100%)",
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <IconButton variant="soft" color="primary" size="sm">
          <BrightnessAutoRoundedIcon />
        </IconButton>
        <Typography level="title-lg">SSMS</Typography>
        <ColorSchemeToggle sx={{ ml: "auto" }} />
      </Box>
      <Box
        sx={{
          minHeight: 0,
          overflow: "hidden auto",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}>
        <List
          size="sm"
          sx={{
            gap: 1,
            "--List-nestedInsetStart": "30px",
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
          }}>
          {abilities &&
            abilities.size >= 1 &&
            abilities.has("search:permission") && (
              <ListItem>
                <ListItemButton
                  selected={tab == "permission"}
                  component="a"
                  href="/dashboard/permission">
                  <KeyIcon />
                  <ListItemContent>
                    <Typography level="title-sm">
                      Permission Dashboard
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            )}
          {abilities && abilities.size >= 1 && abilities.has("search:role") && (
            <ListItem>
              <ListItemButton
                selected={tab == "role"}
                href="/dashboard/role"
                component="a">
                <ManageAccountsIcon />
                <ListItemContent>
                  <Typography level="title-sm">Role Management</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}
          {abilities && abilities.size >= 1 && abilities.has("search:user") && (
            <ListItem>
              <ListItemButton
                selected={tab == "users"}
                href="/dashboard/users"
                component="a">
                <AdminPanelSettingsIcon />
                <ListItemContent>
                  <Typography level="title-sm">User Management</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          )}
          {abilities &&
            abilities.size >= 1 &&
            abilities.has("search:route") && (
              <ListItem>
                <ListItemButton
                  selected={tab == "ports"}
                  component="a"
                  href="/dashboard/ports">
                  <DirectionsBoatFilledIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Port Management</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            )}
          {abilities &&
            abilities.size >= 1 &&
            abilities.has("search:route") && (
              <ListItem>
                <ListItemButton
                  selected={tab == "routes"}
                  component="a"
                  href="/dashboard/routes">
                  <ModeOfTravelIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Route Management</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            )}
          <ListItem>
            <ListItemButton
              role="menuitem"
              component="a"
              href="/dashboard/booking">
              <ShoppingCartRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Booking</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
          <ListItem nested>
            <Toggler
              defaultExpanded
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDownIcon
                    sx={[
                      open
                        ? { transform: "rotate(180deg)" }
                        : { transform: "none" },
                    ]}
                  />
                </ListItemButton>
              )}>
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton
                    selected={tab == "profile"}
                    component="a"
                    href="/dashboard/profile">
                    My profile
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    selected={tab == "account"}
                    component="a"
                    href="/dashboard/account">
                    Account security
                  </ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>
        {/* <List
          size="sm"
          sx={{
            mt: "auto",
            flexGrow: 0,
            "--ListItem-radius": (theme) => theme.vars.radius.sm,
            "--List-gap": "8px",
            mb: 2,
          }}>
          <ListItem>
            <ListItemButton>
              <SupportRoundedIcon />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRoundedIcon />
              Settings
            </ListItemButton>
          </ListItem>
        </List> */}
        <Card
          invertedColors
          variant="soft"
          // color="warning"
          size="sm"
          sx={{ boxShadow: "none" }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}>
            <Typography level="title-sm" color="warning">
              Demo
            </Typography>
            <IconButton size="sm">
              <CloseRoundedIcon />
            </IconButton>
          </Stack>
          <Typography level="body-xs">
            Preview the shipping app demo! You can do many thing at the site
            including manage user or book routes, etc. Try out!
          </Typography>
        </Card>
      </Box>
      <Divider />
      {user && (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Avatar
            variant="outlined"
            size="sm"
            src={user?.profileImage}
            imgProps={{ referrerPolicy: 'no-referrer' }}
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              level="title-sm"
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {user?.username}
            </Typography>
            <Typography
              level="body-xs"
              sx={{ textOverflow: "ellipsis", overflow: "hidden" }}>
              {user?.email}
            </Typography>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={handleLogout}>
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      )}
    </Sheet>
  );
}
