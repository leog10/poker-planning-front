import {
  Box,
  Dialog,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { StyledButton, StyledTextField } from "../styles";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(26,41,53,.8)",
  },
  "& .MuiPaper-root": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 790,
    width: "95vw",
    borderRadius: 20,
    boxShadow: "none",
  },
}));

type DeleteIssueModal = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  content: {
    title: string;
    subtitle: string;
    callToAction: string;
  };
};

const DeleteIssueModal: React.FC<DeleteIssueModal> = ({
  open = false,
  handleClose,
  handleDelete,
  content,
}) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <BootstrapDialog
      onClose={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flexGrow: 1,
          paddingX: matchesMd ? 3 : 5.9,
          paddingY: 6.7,
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="close"
          sx={{
            height: 60,
            width: 60,
            position: "absolute",
            right: 0,
            top: 0,
            color: (theme) => theme.palette.grey[700],
            marginRight: 1.3,
            marginTop: 1.1,
          }}
        >
          <CloseIcon
            sx={{
              fontSize: 26,
            }}
          />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontWeight: matchesMd ? 800 : 700,
              fontSize: matchesMd ? 26 : 30,
              flexGrow: 1,
            }}
          >
            {content.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 22.5,
              fontWeight: 400,
            }}
          >
            {content.subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: matchesSm ? "column" : "row",
            width: "100%",
            marginTop: 3,
            marginBottom: matchesSm ? 10 : 0,
            gap: 1.8,
            height: 65,
          }}
        >
          <StyledButton
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: 3,
              margin: 0,
              textWrap: "no-wrap",
              border: "2px solid #f1f1f1",
              width: "100%",
              fontWeight: 700,
              fontSize: 23,
              backgroundColor: "#fff",
              paddingY: matchesSm ? 1.5 : 0,
              ":hover": {
                border: "2px solid #f1f1f1",
                transition: "all 0.3s",
                backgroundColor: "#ebf4ff",
              },
            }}
          >
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleDelete}
            variant="outlined"
            sx={{
              borderRadius: 3,
              color: "#fff",
              margin: 0,
              textWrap: "no-wrap",
              border: 2,
              width: "100%",
              fontWeight: 700,
              fontSize: 23,
              backgroundColor: "#ff3d71",
              paddingY: matchesSm ? 1.5 : 0,
              "&:hover": {
                border: 2,
                transition: "all 0.3s",
                backgroundColor: "#ff3d7190",
              },
            }}
          >
            {content.callToAction}
          </StyledButton>
        </Box>
      </Box>
    </BootstrapDialog>
  );
};

export default DeleteIssueModal;
