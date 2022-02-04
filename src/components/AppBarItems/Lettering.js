import Typography from "@mui/material/Typography";

export default function Lettering() {
  return (
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
    >
      Telefonbuch
    </Typography>
  );
}
