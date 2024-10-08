import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import PublicIcon from "@mui/icons-material/Public";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
const CustomCard = ({ url }: { url: string }) => {
  return (
    <Card
      className="w-[32%] rounded-xl relative"
      sx={{ position: "relative", borderRadius: "0.75rem", width: "32%" }}
    >
      <CardMedia
        component="img"
        image={url}
        alt="Paella dish"
        className="rounded-xl w-full"
      />
      <div className="absolute top-3 left-3 gap-x-2 flex">
        <IconButton
          className="text-white border-2 border-[#FFFFFFB3] border-solid"
          sx={{
            width: "28px",
            height: "28px",
            borderWidth: "2px",
            borderStyle: "solid",
            color: "#ffffff",
            borderColor: "#FFFFFFB3",
          }}
        >
          <PublicIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
        <IconButton
          className=" text-white border-2 border-[#FFFFFFB3] border-solid"
          sx={{
            width: "28px",
            height: "28px",
            borderWidth: "2px",
            borderStyle: "solid",
            color: "#ffffff",
            borderColor: "#FFFFFFB3",
          }}
        >
          <LocalShippingOutlinedIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
      </div>
      <Button
        variant="outlined"
        sx={{
          color: "white",
          borderColor: "white",
          padding: "4px 6px",
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          borderRadius: "0.75rem",
          fontSize: "0.75rem",
          lineHeight: "1rem",
        }}
        className="absolute top-3 right-3 text-xs rounded-xl"
      >
        Transport
      </Button>
      <div className="absolute left-3 bottom-3 ">
        <h6 className="text-white">Sea</h6>
      </div>
      <div className="absolute right-3 bottom-3">
        <h6 className="text-white text-lg">01</h6>
      </div>
    </Card>
  );
};

export default CustomCard;
