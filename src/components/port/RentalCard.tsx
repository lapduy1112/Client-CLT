import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import FmdGoodRoundedIcon from "@mui/icons-material/FmdGoodRounded";

// Định nghĩa kiểu cho props của PortCard
type PortCardProps = {
  image: string;
  liked?: boolean; // Trạng thái yêu thích (mặc định là false)
  lat: string; // Vĩ độ
  lon: string; // Kinh độ
  status?: boolean; // Trạng thái hoạt động (mặc định là true)
  address: string; // Địa chỉ
  onClick: () => void; // Thêm thuộc tính onClick
};

// Thành phần RentalCard
export default function RentalCard(props: PortCardProps) {
  const {
    address,
    status = true,
    liked = false,
    image,
    lat,
    lon,
    onClick,
  } = props; // Nhận onClick từ props
  const [isLiked, setIsLiked] = React.useState(liked);

  // Hàm xử lý việc bật/tắt yêu thích
  const handleLikeToggle = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        bgcolor: "neutral.softBg",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        "&:hover": {
          boxShadow: "lg",
          borderColor: "var(--joy-palette-neutral-outlinedDisabledBorder)",
        },
      }}
      onClick={onClick} // Gọi hàm onClick khi nhấp vào thẻ
    >
      <CardOverflow
        sx={{
          mr: { xs: "var(--CardOverflow-offset)", sm: 0 },
          mb: { xs: 0, sm: "var(--CardOverflow-offset)" },
          "--AspectRatio-radius": {
            xs: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0",
            sm: "calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px)) 0 0 calc(var(--CardOverflow-radius) - var(--variant-borderWidth, 0px))",
          },
        }}>
        <AspectRatio
          ratio="1"
          flex
          sx={{
            minWidth: { sm: 120, md: 160 },
            "--AspectRatio-maxHeight": { xs: "160px", sm: "9999px" },
          }}>
          <img alt={address} src={image} />
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              position: "absolute",
              top: 0,
              width: "100%",
              p: 1,
            }}>
            {status && (
              <Chip
                variant="soft"
                color="success"
                startDecorator={<WorkspacePremiumRoundedIcon />}
                size="md">
                Active
              </Chip>
            )}
            <IconButton
              variant="plain"
              size="sm"
              color={isLiked ? "danger" : "neutral"}
              onClick={handleLikeToggle}
              sx={{
                display: { xs: "flex", sm: "none" },
                ml: "auto",
                borderRadius: "50%",
                zIndex: "20",
              }}>
              <FavoriteRoundedIcon />
            </IconButton>
          </Stack>
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Stack
          spacing={1}
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <Typography level="title-md">
              <Link overlay underline="none" sx={{ color: "text.primary" }}>
                {address}
              </Link>
            </Typography>
          </div>
          <IconButton
            variant="plain"
            size="sm"
            color={isLiked ? "danger" : "neutral"}
            onClick={handleLikeToggle}
            sx={{ display: { xs: "none", sm: "flex" }, borderRadius: "50%" }}>
            <FavoriteRoundedIcon />
          </IconButton>
        </Stack>
        <Stack
          spacing="0.25rem 1rem"
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", my: 0.25 }}>
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            Lattitude: {lat}
          </Typography>
          <Typography level="body-xs" startDecorator={<FmdGoodRoundedIcon />}>
            Longtitude: {lon}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
