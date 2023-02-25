import { Box, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { CardVotes } from '../types/CardVotes';

type VotingResults = {
  cards: CardVotes[] | undefined;
  average: number | undefined;
  coffee: boolean;
};

const VotingResult: React.FC<VotingResults> = ({ cards, average, coffee }) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        position: 'absolute',
        width: '100%',
        height: 'fit-content',
        bottom: 0,
        zIndex: 1,
        backgroundColor: '#f9f9f9',
        padding: 1.5
      }}>
      {cards &&
        cards.map(card => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column'
            }}
            key={card.card}>
            <Box
              sx={{
                fontSize: '1.3rem',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #000',
                borderRadius: '10px',
                backgroundColor: '#fff',
                height: 78,
                width: 50,
                color: 'black',
                userSelect: 'none',
                cursor: 'default',
                margin: '0 15px 15px'
              }}>
              {card.card}
            </Box>
            <Box
              sx={{
                color: '#717171',
                fontSize: 19.5,
                fontWeight: 500
              }}>
              {card.quantity} {card.quantity > 1 ? 'Votes' : 'Vote'}
            </Box>
          </Box>
        ))}

      <div>
        {average !== undefined && average !== null && (
          <Box
            sx={{
              marginLeft: 5
            }}>
            <Typography sx={{ fontSize: 24, color: '#a8aeb2' }}>
              Average:
            </Typography>
            <Typography
              sx={{
                fontSize: 40,
                fontWeight: 700,
                color: 'black'
              }}>
              {average}
            </Typography>
          </Box>
        )}

        {coffee && (
          <Box
            sx={{
              fontSize: 24,
              marginLeft: 5,
              color: '#a8aeb2'
            }}>
            <Typography sx={{ fontSize: 24, color: '#a8aeb2' }}>
              Coffee time!
            </Typography>
            <Box
              sx={{
                fontSize: 40
              }}>
              ☕
            </Box>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default VotingResult;
