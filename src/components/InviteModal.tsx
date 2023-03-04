import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { StyledButton, StyledTextField } from "../styles";
import { Box, useMediaQuery, useTheme } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(26,41,53,.8)",
  },
  "& .MuiPaper-root": {
    [theme.breakpoints.down("md")]: {},
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 1.5rem 3.1rem",
    maxWidth: 790,
    width: "95vw",
    height: 408,
    borderRadius: 20,
    boxShadow: "none",
  },
  "& .MuiBox-root": {
    display: "flex",
    justifyContent: "center",
    maxWidth: "100vw",
    width: "100%",
    overflow: "hidden",
  },
}));

type Modal = {
  open: boolean;
  handleClose: () => void;
};

const InviteModal: React.FC<Modal> = ({ open, handleClose }) => {
  const handleCopyLink = () => {
    const inviteLink = window.location.href;
    inviteLink && navigator.clipboard.writeText(inviteLink.toString());
    handleClose();
  };

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <BootstrapDialog
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
        <Typography
          sx={{
            fontWeight: matchesMd ? 800 : 700,
            fontSize: matchesMd ? 26 : 30,
            alignSelf: "flex-start",
            flexGrow: 1,
            marginTop: 7.6,
            marginLeft: matchesMd ? 0 : 2.5,
            transition: "all .1s",
          }}
        >
          Invite players
        </Typography>
        <StyledTextField
          autoFocus={true}
          onFocus={(e) => e.target.select()}
          sx={{
            width: matchesMd ? "100%" : 670,
            marginBottom: matchesMd ? 4.2 : 4.8,
            transition: "all .2s",
            "& .MuiOutlinedInput-root": {
              height: matchesMd ? 70 : 60,
              color: "#000",
            },
          }}
          inputProps={{
            readOnly: true,
          }}
          value={window.location.href}
        />
        <StyledButton
          onClick={handleCopyLink}
          variant="contained"
          sx={{
            fontSize: 24,
            paddingY: matchesMd ? 1.3 : 0.8,
            m: 0,
            width: matchesMd ? "100%" : 670,
            borderRadius: 2.5,
            transition: "all .2s",
          }}
        >
          Copy Invitation link
        </StyledButton>
      </Box>
    </BootstrapDialog>
  );
};

export default InviteModal;
