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
    padding: '0 0 3.1rem',
    width: 790,
    height: 408,
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
          flexGrow: 1
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
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: 700,
            alignSelf: 'flex-start',
            flexGrow: 1,
            marginTop: 7.6
          }}>
          Invite players
        </Typography>
        <StyledTextField
          autoFocus={true}
          onFocus={e => e.target.select()}
          sx={{
            width: 670,
            marginBottom: 4.8,
            '& .MuiOutlinedInput-root': {
              height: 60,
              color: '#000'
            }
          }}
          inputProps={{
            readOnly: true
          }}
          value={window.location.href}
        />
        <StyledButton
          variant='contained'
          sx={{
            fontSize: 24,
            paddingY: 0.8,
            m: 0,
            width: 670,
            borderRadius: 2.5
          }}>
          Copy Invitation link
        </StyledButton>
      </Box>
    </BootstrapDialog>
  );
};

export default DeleteIssueModal;
