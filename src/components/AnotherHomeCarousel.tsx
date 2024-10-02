import { Container } from "@mui/material";
import CustomCard from "./CustomCard";
import image from "../../public/images/container_4.jpg";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import IconButton from "@mui/material/IconButton";
import AbstractIcon from "../../public/images/abstract.svg";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
export const AnotherHomeCarousel = () => {
  const items = [
    "../../public/images/carousel1.jpg",
    "../../public/images/carousel2.jpg",
    "../../public/images/container_4.jpg",
  ];
  return (
    <div className="bg-gradient-to-r from-[#010101] to-[#092A3D] py-10">
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          position: "relative",
          paddingTop: "1rem",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundSize: "cover",
        }}
      >
        <div className="w-1/2">
          <div className="w-full flex flex-row justify-between">
            <CustomCard url={image.src}></CustomCard>
            <CustomCard url={image.src}></CustomCard>
            <CustomCard url={image.src}></CustomCard>
          </div>
          <div className="flex mt-8 justify-between">
            <div className="text-white max-w-80 gap-y-6 flex flex-col">
              <h1 className="font-semibold text-xl">
                SEAMLESS LOGISTICS TRANSPORT
              </h1>
              <p className="tracking-wide">
                Seamless cargo transport solutions: efficient,reliable,global
              </p>
            </div>
            <div className="flex mr-4">
              <div className="">
                <IconButton className="text-white" sx={{ padding: "0px" }}>
                  <ArrowBackIosIcon />
                </IconButton>
                <IconButton className="text-white" sx={{ padding: "2px" }}>
                  <RemoveOutlinedIcon sx={{ width: "32px", height: "32px" }} />
                </IconButton>
              </div>
              <div className="">
                <IconButton className="text-white" sx={{ padding: "2px" }}>
                  <RemoveOutlinedIcon sx={{ width: "32px", height: "32px" }} />
                </IconButton>
                <IconButton className="text-white" sx={{ padding: "0px" }}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/6"></div>
        <div className="w-1/3">
          <div className="flex flex-row gap-x-1 mt-4">
            <div className="w-[15%]">
              <Image src={AbstractIcon} alt="" className="w-full" />
            </div>
            <div className="grow flex flex-col text-white mt-4 gap-y-6">
              <h1>
                Our delighted clients are at the heart of our success,and their
                satisfaction drives us to deliver exceptional logistics
                solutions tailored to their needs.
              </h1>
              <div className="flex justify-start gap-x-4">
                <Avatar className="">H</Avatar>
                <Avatar>N</Avatar>
                <Avatar sx={{ bgcolor: "purple" }}>OP</Avatar>
                <div className="text-xs my-auto">
                  <h1>12k+ happy</h1>
                  <h1>clients</h1>
                </div>
              </div>
              <h1>
                Great experience with OceanWave! Reliable and great efficient
                service.
              </h1>
              <div className="">
                <button className="flex items-center justify-center bg-transparent border-2 border-white text-white cursor-pointer box-border font-inter text-sm font-semibold h-12 min-w-[60px] md:min-w-[80px] px-4 text-center no-underline transition-all duration-300 select-none rounded-2xl">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
