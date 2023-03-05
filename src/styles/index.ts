import { styled } from "@mui/system";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  width: 640,
  padding: 6,
  borderRadius: "8px",
  marginLeft: "auto",
  marginRight: "auto",
  textTransform: "unset",
  fontSize: 22,
  fontWeight: 600,
  boxShadow: "none",
  "&:disabled": {
    backgroundColor: "#d1d4d7",
    color: "#fff",
  },
  "&:hover": {
    boxShadow: "none",
    transition: "all 0.1s",
    backgroundColor: "#3993ff90",
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& label.MuiInputLabel-shrink": {
    fontWeight: 500,
    color: "#1a2935 !important",
    top: "-2px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "2px solid #cfcfcf80",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      border: "2px solid #d4d4d4",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& label.MuiInputLabel-root": {
    fontFamily: "Segoe UI",
    fontWeight: 600,
    color: "#ababab",
  },
  "& input.MuiOutlinedInput-input": {
    marginLeft: 5,
  },
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginLeft: "auto",
  marginRight: "auto",
  width: 640,
}));
