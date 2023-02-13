import { Box, ToggleButton, Typography } from '@mui/material';
import { StyledButton } from '../styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IssueCardMenu from './IssueCardMenu';
import { useCallback, useState } from 'react';
import { useOutsideClick } from '../hooks/useOutsideClick';

const IssueCard = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuClick = useCallback(() => {
    setOpenMenu(!openMenu);
  }, [openMenu]);

  const handleClickOutside = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const ref = useOutsideClick(handleClickOutside);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ebf4ff',
        height: 200,
        borderRadius: 2.5,
        boxShadow: '0px 1px 4px #a1a1a190',
        padding: 2,
        cursor: 'pointer',
        ':hover': {
          backgroundColor: '#d7e9ff'
        }
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          position: 'absolute',
          right: '0',
          top: '0',
          zIndex: 99
        }}>
        <ToggleButton
          href=''
          value={'menu'}
          ref={ref}
          onClick={handleMenuClick}
          aria-label='close'
          selected={openMenu}
          sx={{
            padding: 1.75,
            marginTop: 0.3,
            marginRight: 0.2,
            color: theme => theme.palette.grey[700],
            borderRadius: 15,
            border: 'none',
            '&.MuiToggleButton-root:hover': {
              transition: 'all 0.3s',
              backgroundColor: '#ebf4ff'
            },
            '&.Mui-selected': {
              transition: 'all 0.3s',
              backgroundColor: '#ebf4ff'
            }
          }}>
          <MoreHorizIcon
            sx={{
              fontSize: 26
            }}
          />
        </ToggleButton>
        <IssueCardMenu
          open={openMenu}
          handleClose={handleMenuClick}
        />
      </Box>
      <Typography sx={{ marginTop: 5, textAlign: 'left' }}>Title</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: 2.35,
          justifyContent: 'space-between'
        }}>
        <StyledButton
          variant='outlined'
          sx={{
            color: '#fff',
            margin: 0,
            textWrap: 'no-wrap',
            border: 'none',
            borderRadius: 2.5,
            width: 'fit-content',
            padding: '0.33rem 0.78rem',
            fontWeight: 600,
            fontSize: 21.5,
            backgroundColor: '#3993ff',
            '&:hover': {
              border: 'none',
              transition: 'all 0.3s',
              backgroundColor: '#3993ff90'
            }
          }}>
          Voting now...
        </StyledButton>
        <StyledButton
          variant='outlined'
          sx={{
            color: '#000',
            margin: 0,
            textWrap: 'no-wrap',
            border: 'none',
            borderRadius: 2.5,
            width: '5px',
            minWidth: '50px',
            padding: '0.33rem 0rem',
            backgroundColor: '#fff',
            '&:hover': {
              border: 'none',
              transition: 'all 0.3s',
              backgroundColor: '#ebf4ff'
            }
          }}>
          <Typography sx={{ fontWeight: 700, fontFamily: '', fontSize: 20.5 }}>
            89
          </Typography>
        </StyledButton>
      </Box>
    </Box>
  );
};

export default IssueCard;
