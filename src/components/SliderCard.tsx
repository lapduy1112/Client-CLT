import * as React from "react";
import Card from "@mui/material/Card";
import Image from "next/image";
import containerImg from "../../public/images/container_4.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// export default function MediaControlCard() {
//   const theme = useTheme();

//   return (
//     <Card sx={{ display: 'flex' }}>
//       <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//         <CardContent sx={{ flex: '1 0 auto' }}>
//           <Typography component="div" variant="h5">
//             Live From Space
//           </Typography>
//           <Typography
//             variant="subtitle1"
//             component="div"
//             sx={{ color: 'text.secondary' }}
//           >
//             Mac Miller
//           </Typography>
//         </CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
//           <IconButton aria-label="previous">
//             {theme.direction === 'rtl' ? (
//               <SkipNextIcon />
//             ) : (
//               <SkipPreviousIcon />
//             )}
//           </IconButton>
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon sx={{ height: 38, width: 38 }} />
//           </IconButton>
//           <IconButton aria-label="next">
//             {theme.direction === 'rtl' ? (
//               <SkipPreviousIcon />
//             ) : (
//               <SkipNextIcon />
//             )}
//           </IconButton>
//         </Box>
//       </Box>
//       <CardMedia
//         component="img"
//         sx={{ width: 151 }}
//         //   image="../../public/images/container_4.jpg"
//         src={containerImg}
//         alt="Live from space album cover"
//       />
//     </Card>
//   );
// }
export default function SliderCard() {
  return (
    <Card
      sx={{ display: "flex" }}
      className="justify-space max-w-72 gap-x-2 rounded-2xl"
    >
      <div className="w-3/5">
        <Image
          src={containerImg}
          alt=""
          className="w-full p-1 h-24 rounded-2xl object-cover"
        ></Image>
      </div>
      <div className="w-2/5 text-left align-middle font-semibold text-sm my-auto">
        Complete control of your{" "}
        <span className="italic text-slate-500 font-bold">shipments</span>
        <ArrowForwardIcon className="text-3xl pl-3" />
      </div>
    </Card>
  );
}
