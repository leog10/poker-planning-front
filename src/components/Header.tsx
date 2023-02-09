import { Box } from '@mui/material';
import { StyledButton } from '../styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import DrawerRight from './Drawer';

type Header = {
  gameName: string;
  username: string | undefined;
  gameStarted: boolean;
};

const Header: React.FC<Header> = ({ gameName, username, gameStarted }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '1.7rem 2.5rem',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#F9F9F9',
        userSelect: 'none',
        height: '6.2rem'
      }}>
      <Box
        sx={{
          alignSelf: 'end'
        }}>
        <Link
          to={'/'}
          onClick={() => {
            window.history.replaceState(null, 'Create game', '/');
            window.location.reload();
          }}>
          <img
            src='/logo.png'
            alt=''
            width={48}
          />
        </Link>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '0 1rem',
            width: 'fit-content',
            color: '#222222',
            fontSize: '1.4rem',
            fontWeight: 700,
            padding: '0rem 0.4rem',
            borderRadius: '10px',
            transition: 'all 0.3s',
            userSelect: 'none',
            textAlign: 'left',
            '&:hover': {
              transition: 'all 0.3s',
              backgroundColor: '#f1f1f1',
              cursor: 'pointer'
            }
          }}>
          {gameName && gameStarted ? gameName : 'Create game'}
          {gameName && gameStarted && (
            <KeyboardArrowDownIcon
              sx={{
                marginTop: 0.5,
                marginLeft: 0.5,
                color: '#626262',
                width: '28px'
              }}
            />
          )}
        </Box>
      </Box>
      {gameStarted && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3
          }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              borderRadius: '10px',
              padding: '0.7rem 0.8rem',
              '&:hover': {
                transition: 'all 0.3s',
                backgroundColor: '#f1f1f1',
                cursor: 'pointer'
              }
            }}>
            <img
              src='/logo.png'
              alt=''
              width={32}
            />
            <Box
              sx={{
                display: 'flex',
                fontSize: 21,
                fontWeight: 700,
                color: '#626262'
              }}>
              {username}
              <KeyboardArrowDownIcon
                sx={{
                  marginTop: 0.2,
                  marginLeft: 0.5,
                  color: '#626262',
                  width: '28px'
                }}
              />
            </Box>
          </Box>
          <Modal
            children={
              <StyledButton
                variant='outlined'
                sx={{
                  textWrap: 'no-wrap',
                  border: 2,
                  width: 'fit-content',
                  padding: '0.4rem 1.2rem',
                  fontWeight: 700,
                  fontSize: 23,
                  backgroundColor: '#fff',
                  '&:hover': {
                    border: 2,
                    transition: 'all 0.3s',
                    backgroundColor: '#ebf4ff',
                    cursor: 'pointer'
                  }
                }}>
                <Box sx={{ marginRight: 2 }}>🧛‍♂️</Box>Invite players
              </StyledButton>
            }
          />
          <DrawerRight
            children={
              <StyledButton
                variant='outlined'
                sx={{
                  border: 2,
                  width: 'fit-content',
                  padding: '0.8rem 0.9rem',
                  margin: 0,
                  fontWeight: 700,
                  fontSize: 23,
                  backgroundColor: '#fff',
                  '&:hover': {
                    border: 2,
                    transition: 'all 0.3s',
                    backgroundColor: '#ebf4ff',
                    cursor: 'pointer'
                  }
                }}>
                <ArticleOutlinedIcon
                  fontSize='small'
                  viewBox='0 0 24 24'
                  sx={{ width: '24px', height: '24px' }}
                />
              </StyledButton>
            }></DrawerRight>
        </Box>
      )}
    </Box>
  );
};

export default Header;
