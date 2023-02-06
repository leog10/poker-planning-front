import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { StyledButton } from '../styles';
import { User } from '../types/User';
import { useMemo } from 'react';
import { Link } from '@mui/material';

type Board = {
  revealing: boolean;
  users: User[] | undefined;
  allowedReveal: boolean;
  revealCards: (roomId: string) => void;
  startNewVoting: (roomId: string) => void;
  roomId: string;
  revealingTime: number;
};

const Board: React.FC<Board> = ({
  users,
  revealing,
  allowedReveal,
  revealCards,
  startNewVoting,
  roomId,
  revealingTime
}) => {
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
            Start new voting
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
  }, [allowedReveal, users, revealing, revealingTime]);

  return (
    <div>
      {users && users.length < 2 && (
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
          <Link
            sx={{
              fontSize: 23,
              fontWeight: 700,
              color: 'text.secondary',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'all 0.3s',
              '&:hover': {
                transition: 'all 0.3s',
                opacity: 0.7
              }
            }}>
            Invite players
          </Link>
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#d7e9ff',
          width: '21rem',
          height: '9.4rem',
          borderRadius: '35px',
          margin: '0 auto'
        }}>
        {boardContent}
      </Box>
    </div>
  );
};

export default Board;
