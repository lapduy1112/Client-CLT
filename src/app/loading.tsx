import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function LoadingSkeleton() {
  return (
    <div className="flex justify-center">
      <Stack spacing={1}>
        {/* For variant="text", adjust the height via font-size */}
        <Skeleton animation="wave" variant="text" sx={{ fontSize: "1rem" }} />

        {/* For other variants, adjust the size with `width` and `height` */}
        <Skeleton
          animation="wave"
          variant="rectangular"
          //   sx={{ width: '33.333333%', height: '33.333333%' }}
          width={640}
          height={320}
          //   className="w-1/3 h-1/3"
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          //   sx={{ width: '33.333333%', height: '33.333333%' }}
          width={640}
          height={320}
          //   className="w-1/3 h-1/3"
        />
      </Stack>
    </div>
  );
}
