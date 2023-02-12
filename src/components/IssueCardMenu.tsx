import { Box, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import DeleteIssueModal from './DeleteIssueModal';
import EditIssueModal from './EditIssueModal';

type IssueCardMenu = {
  handleClose: () => void;
  open: boolean;
};

const IssueCardMenu: React.FC<IssueCardMenu> = ({
  handleClose,
  open = false
}) => {
  const [openDeleteIssue, setOpenDeleteIssue] = useState(false);
  const [openEditIssue, setOpenEditIssue] = useState(false);

  const handleOpenDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(true);
  }, []);

  const handleCloseDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(false);
  }, []);

  const handleOpenEditIssue = useCallback(() => {
    setOpenEditIssue(true);
  }, []);

  const handleCloseEditIssue = useCallback(() => {
    setOpenEditIssue(false);
  }, []);

  return (
    <div>
      {open && (
        <Box
          sx={{
            backgroundColor: '#fff',
            marginTop: 0.9,
            marginRight: 0.2,
            boxShadow: '0 4px 8px hsl(204deg 6% 68% / 40%)',
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            height: 240,
            borderRadius: 2
          }}>
          <Box
            onClick={handleOpenEditIssue}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
              paddingX: 3,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ebf4ff'
              }
            }}>
            <Typography sx={{ fontSize: 22.5 }}>Open</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
              paddingX: 3,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ebf4ff'
              }
            }}>
            <Typography sx={{ fontSize: 22.5 }}>Move to top</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
              paddingX: 3,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ebf4ff'
              }
            }}>
            <Typography sx={{ fontSize: 22.5 }}>Move to bottom</Typography>
          </Box>
          <Box
            onClick={() => {
              handleOpenDeleteIssue();
              handleClose();
            }}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
              paddingX: 3,
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ebf4ff'
              }
            }}>
            <Typography sx={{ fontSize: 22.5 }}>Delete</Typography>
          </Box>
        </Box>
      )}
      <DeleteIssueModal
        open={openDeleteIssue}
        handleClose={handleCloseDeleteIssue}
      />
      <EditIssueModal
        open={openEditIssue}
        handleClose={handleCloseEditIssue}
      />
    </div>
  );
};

export default IssueCardMenu;
