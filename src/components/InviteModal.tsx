import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { StyledButton, StyledTextField } from '../styles';
import { Box } from '@mui/material';

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

  return (
    <BootstrapDialog
      sx={{
        display: 'flex',
        justifyContent: 'center'
      }}
      onClose={handleClose}
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
          aria-label='close'
          onClick={handleClose}
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
          onClick={handleCopyLink}
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

export default InviteModal;
