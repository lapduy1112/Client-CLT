import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Typography from "@mui/joy/Typography";

type SearchProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

export default function Search({
  value,
  onChange,
  onKeyDown,
  onSearch,
}: SearchProps) {
  return (
    <div>
      <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <Input
            placeholder="Search"
            value={value}
            startDecorator={<SearchRoundedIcon />}
            aria-label="Search"
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        </FormControl>
        <Button variant="solid" color="primary" onClick={onSearch}>
          Search
        </Button>
      </Stack>
    </div>
  );
}
