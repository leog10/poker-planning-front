import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledButton } from "./styles";

const NotFound = () => {
  return (
    <Box>
      <Typography
        sx={{
          userSelect: "none",
          fontSize: 34,
        }}>
        ☠ Game Over ☠
      </Typography>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <StyledButton variant="contained" sx={{ width: 300 }}>
          Go Home
        </StyledButton>
      </Link>
    </Box>
  );
};

export default NotFound;
