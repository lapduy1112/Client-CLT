import * as React from "react";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import Dropdown from "@mui/joy/Dropdown";
import Stack from "@mui/joy/Stack";

interface OrderSelectorProps {
  onSortChange: (sortBy: string, sortOrder: string) => void;
}

export default function OrderSelector({ onSortChange }: OrderSelectorProps) {
  const handleSortChange = (sortBy: string, sortOrder: string) => {
    onSortChange(sortBy, sortOrder);
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
          Order by
        </MenuButton>
        <Menu sx={{ minWidth: 120 }}>
          <MenuItem onClick={() => handleSortChange("address", "DESC")}>
            Address Desc
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("address", "ASC")}>
            Address Asc
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("createdAt", "DESC")}>
            CreatedAt Desc
          </MenuItem>
          <MenuItem onClick={() => handleSortChange("createdAt", "ASC")}>
            CreatedAt Asc
          </MenuItem>
        </Menu>
      </Dropdown>
    </Stack>
  );
}
