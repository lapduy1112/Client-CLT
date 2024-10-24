import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";
import Stack from "@mui/joy/Stack";

interface StatusSelectorProps {
  onStatusChange: (status: string) => void;
}

export default function StatusSelector({
  onStatusChange,
}: StatusSelectorProps) {
  const handleStatusChange = (status: string) => {
    onStatusChange(status);
  };

  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      sx={{
        justifyContent: { xs: "space-between" },
        flexWrap: "wrap",
        minWidth: 0,
      }}>
      <Dropdown>
        <MenuButton
          variant="plain"
          color="primary"
          endDecorator={<ArrowDropDown />}
          sx={{ whiteSpace: "nowrap" }}>
          Status
        </MenuButton>
        <Menu sx={{ minWidth: 120 }}>
          <MenuItem onClick={() => handleStatusChange("")}>All</MenuItem>
          <MenuItem onClick={() => handleStatusChange("available")}>
            Available
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("transit")}>
            In Transit
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("completed")}>
            Completed
          </MenuItem>
        </Menu>
      </Dropdown>
    </Stack>
  );
}
