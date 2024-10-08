import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onNextPage,
  onPreviousPage,
  onPageChange,
}: PaginationProps) {
  // Ensure totalPages is at least 1 to prevent array errors
  const pages = Array.from(Array(Math.max(totalPages, 1)).keys());

  return (
    <div>
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          mx: 2,
          my: 1,
        }}>
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={onPreviousPage}
          disabled={currentPage === 1}>
          <ArrowBackIosRoundedIcon />
        </IconButton>
        <Typography level="body-sm" sx={{ mx: "auto" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
          onClick={onNextPage}
          disabled={currentPage === totalPages}>
          <ArrowForwardIosRoundedIcon />
        </IconButton>
      </Box>

      <Box
        className="Pagination-laptopUp"
        sx={{
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
          display: { xs: "none", md: "flex" },
          mx: 4,
          my: 2,
        }}>
        <Button
          size="sm"
          variant="plain"
          color="neutral"
          startDecorator={<ArrowBackIosRoundedIcon />}
          onClick={onPreviousPage}
          disabled={currentPage === 1}>
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {pages.map((page) => (
          <IconButton
            key={page + 1}
            size="sm"
            variant={currentPage === page + 1 ? "soft" : "plain"}
            color="neutral"
            onClick={() => onPageChange(page + 1)}>
            {page + 1}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="plain"
          color="neutral"
          endDecorator={<ArrowForwardIosRoundedIcon />}
          onClick={onNextPage}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </div>
  );
}
