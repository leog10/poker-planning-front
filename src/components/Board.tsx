import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../styles';
import { User } from '../types/User';
import { useMemo } from 'react';
import Votes from './Votes';
import { useMediaQuery, useTheme } from '@mui/material';

type Board = {
  revealing: boolean;
  users: User[] | undefined;
  allowedReveal: boolean;
  revealCards: (roomId: string) => void;
  startNewVoting: (roomId: string) => void;
  roomId: string;
  revealingTime: number;
  handleOpenInvite: () => void;
  reveal: boolean;
  openDrawer: boolean;
};

const Board: React.FC<Board> = ({
  users,
  revealing,
  allowedReveal,
  revealCards,
  startNewVoting,
  roomId,
  revealingTime,
  handleOpenInvite,
  reveal,
  openDrawer
}) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  const boardContent = useMemo(() => {
    if (!revealing) {
      if (allowedReveal) {
        if (users && users.some(user => user.card.length > 0)) {
          return (
            <StyledButton
              sx={{
                width: 200,
                fontSize: 25
              }}
              variant='contained'
              color='primary'
              onClick={() => {
                revealCards(roomId);
              }}>
              Reveal cards
            </StyledButton>
          );
        }
      } else if (users && users.some(user => user.card.length > 0)) {
        return (
          <Typography sx={{ fontSize: 22, userSelect: 'none' }}>
            Voting in progress
          </Typography>
        );
      } else {
        return (
          <Typography sx={{ fontSize: 22, userSelect: 'none' }}>
            Pick your cards!
          </Typography>
        );
      }
    } else if (revealingTime <= 0) {
      if (allowedReveal) {
        return (
          <StyledButton
            sx={{
              width: 240,
              fontSize: 25,
              backgroundColor: '#48545d',
              '&:hover': {
                backgroundColor: '#1a2935'
              }
            }}
            variant='contained'
            color='primary'
            onClick={() => startNewVoting(roomId)}>
            {matchesMd ? 'New voting' : 'Start new voting'}
          </StyledButton>
        );
      } else {
        return (
          <Typography sx={{ fontSize: 22, userSelect: 'none' }}>
            Voting finished
          </Typography>
        );
      }
    } else {
      return (
        <Typography
          sx={{
            fontSize: 25,
            fontWeight: 700,
            color: 'text.secondary',
            userSelect: 'none'
          }}>
          {revealingTime}
        </Typography>
      );
    }
    return (
      <Typography sx={{ fontSize: 22, userSelect: 'none' }}>
        Pick your cards!
      </Typography>
    );
  }, [allowedReveal, users, revealing, revealingTime, matchesMd]);

  const feelingLonely = useMemo(() => {
    return (
      <Box
        sx={{
          marginBottom: 1.8
        }}>
        <Box
          sx={{
            fontSize: 23,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            userSelect: 'none'
          }}>
          Feeling lonely?
          <Typography
            sx={{ fontSize: 18, marginLeft: '5px', userSelect: 'none' }}>
            😴
          </Typography>
        </Box>
        <Box
          onClick={handleOpenInvite}
          sx={{
            display: 'inline-block',
            fontSize: 23,
            fontWeight: 700,
            color: 'text.secondary',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'all 0.3s',
            userSelect: 'none',
            '&:hover': {
              transition: 'all 0.3s',
              opacity: 0.7
            }
          }}>
          Invite players
        </Box>
      </Box>
    );
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: matchesMd ? 10 : 12,
        width: openDrawer ? 'calc(100vw - 600px)' : '100%',
        transition: 'all .2s'
      }}>
      {users && users.length < 2 && feelingLonely}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#d7e9ff',
          width: matchesMd ? 300 : 440,
          height: '9.4rem',
          borderRadius: '35px',
          margin: '0 auto',
          zIndex: 1
        }}>
        {boardContent}
      </Box>
      <Votes
        users={users}
        reveal={reveal}
      />
    </Box>
  );
};

export default Board;
