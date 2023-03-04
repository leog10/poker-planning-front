import { Box, ClickAwayListener, Typography } from "@mui/material";

type IssueCardMenu = {
  handleCloseMenu: () => void;
  open: boolean;
  openEditIssueModal: () => void;
  openDeleteIssueModal: () => void;
};

const IssueCardMenu: React.FC<IssueCardMenu> = ({
  handleCloseMenu,
  openEditIssueModal,
  openDeleteIssueModal,
  open = false,
}) => {
  return (
    <div>
      {open && (
        <ClickAwayListener onClickAway={handleCloseMenu}>
          <Box
            sx={{
              position: "absolute",
              top: 72,
              right: 0,
              backgroundColor: "#fff",
              marginRight: 0.2,
              boxShadow: "0 4px 8px hsl(204deg 6% 68% / 40%)",
              display: "flex",
              flexDirection: "column",
              width: 300,
              height: 240,
              borderRadius: 2,
              zIndex: 99,
            }}
          >
            <Box
              onClick={() => {
                openEditIssueModal();
                handleCloseMenu();
              }}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                paddingX: 3,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#ebf4ff",
                },
              }}
            >
              <Typography sx={{ fontSize: 22.5 }}>Open</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                paddingX: 3,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#ebf4ff",
                },
              }}
            >
              <Typography sx={{ fontSize: 22.5 }}>Move to top</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                paddingX: 3,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#ebf4ff",
                },
              }}
            >
              <Typography sx={{ fontSize: 22.5 }}>Move to bottom</Typography>
            </Box>
            <Box
              onClick={() => {
                openDeleteIssueModal();
                handleCloseMenu();
              }}
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                height: "100%",
                paddingX: 3,
                borderBottomLeftRadius: 8,
                borderBottomRightRadius: 8,
                cursor: "pointer",
                ":hover": {
                  backgroundColor: "#ebf4ff",
                },
              }}
            >
              <Typography sx={{ fontSize: 22.5 }}>Delete</Typography>
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </div>
  );
};

export default IssueCardMenu;
