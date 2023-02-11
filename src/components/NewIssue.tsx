import { Box, TextField } from '@mui/material';
import { StyledButton } from '../styles';

const NewIssue: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  return (
    <Box
      sx={{
        marginTop: 2.4,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
      <TextField
        autoFocus
        multiline
        placeholder='Enter a title for the issue'
        sx={{
          padding: '2px 6px',
          backgroundColor: '#f1f1f1',
          flexGrow: 1,
          borderRadius: 1.5,
          minHeight: 150,
          '& fieldset': {
            border: 'none'
          },
          '& .MuiInputBase-root': {
            display: 'flex',
            alignItems: 'flex-start',
            minHeight: 150,
            fontSize: 22.5,
            '& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input::-webkit-input-placeholder':
              {
                opacity: 0.7
              }
          },
          '& .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input': {
            minHeight: 150
          }
        }}
      />
      <Box sx={{ display: 'flex', gap: 2, marginTop: 2.5 }}>
        <StyledButton
          onClick={handleClose}
          variant='outlined'
          sx={{
            margin: 0,
            textWrap: 'no-wrap',
            border: '2px solid #f1f1f1',
            width: '100%',
            padding: '0.4rem 1.2rem !important',
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
          variant='outlined'
          sx={{
            color: '#fff',
            margin: 0,
            textWrap: 'no-wrap',
            border: 2,
            width: '100%',
            padding: '0.4rem 1.2rem',
            fontWeight: 700,
            fontSize: 23,
            backgroundColor: '#3993ff',
            '&:hover': {
              border: 2,
              transition: 'all 0.3s',
              backgroundColor: '#3993ff90'
            }
          }}>
          Save
        </StyledButton>
      </Box>
    </Box>
  );
};

export default NewIssue;
