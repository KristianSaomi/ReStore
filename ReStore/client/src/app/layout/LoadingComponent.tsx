import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}
export default function LoadingComponent({ message = "Loading ..." }: Props) {
  return (
    <Backdrop open={true} invisible={true}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        alignContent="center"
      >
        <CircularProgress
          size={100}
          color="secondary"
          sx={{ marginBottom: "20px" }}
        />
        <Typography variant="h4" sx={{ justifyContent: "center" }}>
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
