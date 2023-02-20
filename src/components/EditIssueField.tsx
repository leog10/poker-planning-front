import { Box, ClickAwayListener, TextField } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyledButton } from '../styles';

type EditIssueField = {
  id: string;
  handleClose: () => void;
  open: boolean;
  handleSave: (textFieldValue: string) => void;
  fieldValue: string;
};

const EditIssueField: React.FC<EditIssueField> = ({
  id,
  handleClose,
  open,
  handleSave,
  fieldValue
}) => {
  const [textFieldValue, setTextFieldValue] = useState(fieldValue);

  const handleChangeField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTextFieldValue(e.target.value);
    },
    []
  );

  return (
    <div id={id}>
      {open ? (
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            sx={{
              marginTop: 2.4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
            <TextField
              onChange={e => handleChangeField(e)}
              autoFocus
              multiline
              value={textFieldValue}
              sx={{
                padding: '2px 6px',
                backgroundColor: '#fff',
                flexGrow: 1,
                borderRadius: 1.5,
                minHeight: 150,
                border: '2px solid #d1d1d1',
                '& fieldset': {
                  border: 'none'
                },
                '& .MuiInputBase-root': {
                  display: 'flex',
                  alignItems: 'flex-start',
                  minHeight: 150,
                  fontSize: 27.5,
                  fontWeight: 700
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
                onClick={() => {
                  handleSave(textFieldValue);
                  handleClose();
                }}
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
      ) : (
        ''
      )}
    </div>
  );
};

export default EditIssueField;
