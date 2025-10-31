import { Typography, Box } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h3">404</Typography>
      <Typography>Страница не найдена</Typography>
    </Box>
  );
}
