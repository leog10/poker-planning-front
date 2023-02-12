import { Box, Dialog, IconButton, styled, Typography } from '@mui/material';
import { StyledButton, StyledTextField } from '../styles';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(26,41,53,.8)'
  },
  '& .MuiPaper-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 790,
    width: 787,
    height: 307,
    borderRadius: 20,
    boxShadow: 'none'
  }
}));

type DeleteIssueModal = {
  open: boolean;
  handleClose: () => void;
};

const DeleteIssueModal: React.FC<DeleteIssueModal> = ({
  open = false,
  handleClose
}) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
      aria-labelledby='customized-dialog-title'
      open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          flexGrow: 1,
          paddingX: 5.9,
          paddingTop: 7.5
        }}>
        <IconButton
          onClick={handleClose}
          aria-label='close'
          sx={{
            height: 60,
            width: 60,
            position: 'absolute',
            right: 0,
            top: 0,
            color: theme => theme.palette.grey[700],
            marginRight: 1.3,
            marginTop: 1.1
          }}>
          <CloseIcon
            sx={{
              fontSize: 26
            }}
          />
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%'
          }}>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 700,
              flexGrow: 1
            }}>
            Are you sure you want to delete this issue?
          </Typography>
          <Typography
            sx={{
              fontSize: 22.5,
              fontWeight: 400
            }}>
            This operation is irreversible.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            marginTop: 3,
            gap: 1.8,
            height: 65
          }}>
          <StyledButton
            onClick={handleClose}
            variant='outlined'
            sx={{
              borderRadius: 3,
              margin: 0,
              textWrap: 'no-wrap',
              border: '2px solid #f1f1f1',
              width: '100%',
              fontWeight: 700,
              fontSize: 23,
              backgroundColor: '#fff',
              ':hover': {
                border: '2px solid #f1f1f1',
                transition: 'all 0.3s',
                backgroundColor: '#ebf4ff'
              }
            }}>
            Cancel
          </StyledButton>
          <StyledButton
            onClick={handleClose}
            variant='outlined'
            sx={{
              borderRadius: 3,
              color: '#fff',
              margin: 0,
              textWrap: 'no-wrap',
              border: 2,
              width: '100%',
              fontWeight: 700,
              fontSize: 23,
              backgroundColor: '#ff3d71',
              '&:hover': {
                border: 2,
                transition: 'all 0.3s',
                backgroundColor: '#ff3d7190'
              }
            }}>
            Delete issue
          </StyledButton>
        </Box>
      </Box>
    </BootstrapDialog>
  );
};

export default DeleteIssueModal;
