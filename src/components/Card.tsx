import { Box, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FiboCards } from '../types/FiboCards';

type Cards = {
  fiboCards: FiboCards[];
  roomId: string;
  clientId: string;
  handleCardSelect: (card: string, roomId: string, clientId: string) => void;
};

const Cards: React.FC<Cards> = ({
  fiboCards,
  roomId,
  clientId,
  handleCardSelect
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'fixed',
          width: '100%',
          left: 0,
          bottom: 0,
          zIndex: 1
        }}>
        {!matches && (
          <Box
            sx={{
              margin: 0.5,
              fontSize: 22.5,
              color: '#000',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              userSelect: 'none'
            }}>
            Choose your card
            <Typography sx={{ fontSize: 20, marginLeft: 0.6 }}>👇</Typography>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            justifyContent: matches ? 'flex-start' : 'center',
            alignItems: 'center',
            userSelect: 'none',
            height: 140,
            overflowY: 'hidden',
            overflowX: matches ? 'auto' : 'hidden',
            transition: 'all 1s',
            paddingX: 2
          }}>
          {fiboCards.map(fibo => (
            <Box
              sx={{
                flexShrink: 0,
                color: fibo.checked ? '#fff' : '#3993ff',
                fontSize: 20,
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 100,
                width: 60,
                border: '2px solid',
                borderColor: fibo.checked ? '#1a7bf2' : '#3993ff',
                borderRadius: 2.5,
                backgroundColor: fibo.checked ? '#1a7bf2' : '#fff',
                margin: '5px 10px',
                cursor: 'pointer',
                transition: 'all 0.1s',
                transform: fibo.checked ? 'translateY(-8px)' : ''
              }}
              onClick={() => handleCardSelect(fibo.card, roomId, clientId)}
              // className={fibo.checked ? 'card-checked' : 'card'}
              key={fibo.card}>
              {fibo.card}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Cards;
