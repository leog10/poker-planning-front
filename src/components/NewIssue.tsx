import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useCallback, useState } from 'react';
import { StyledButton } from '../styles';

type NewIssue = {
  handleClose: () => void;
  handleAddIssue: (title: string) => void;
};

const NewIssue: React.FC<NewIssue> = ({ handleClose, handleAddIssue }) => {
  const [title, setTitle] = useState('');

  const handleSetTitle = useCallback(
    (title: string) => {
      setTitle(title);
    },
    [title]
  );

  const addIssue = useCallback(() => {
    if (title.length < 1 || title.trim().length < 1) {
      handleClose();
      return;
    }

    handleAddIssue(title);
  }, [title]);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box
        sx={{
          marginTop: 2.4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
        <TextField
          onChange={e => handleSetTitle(e.target.value)}
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
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginTop: 2.5,
            flexDirection: matchesSm ? 'column' : 'row'
          }}>
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
            onClick={addIssue}
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
    </ClickAwayListener>
  );
};

export default NewIssue;
