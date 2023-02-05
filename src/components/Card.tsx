import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FiboCards } from '../types/FiboCards';

type Cards = {
  fiboCards: FiboCards[];
  roomId: string;
  clientId: string;
  revealing: boolean;
  handleCardSelect: (card: string, roomId: string, clientId: string) => void;
};

const Cards: React.FC<Cards> = ({
  fiboCards,
  roomId,
  clientId,
  revealing,
  handleCardSelect
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        left: 0,
        bottom: '1%'
      }}>
      <Box
        sx={{
          margin: 2.5,
          fontSize: 22.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none'
        }}>
        Choose your card
        <Typography sx={{ fontSize: 20, marginLeft: '5px' }}>👇</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none'
        }}>
        {fiboCards.map(fibo => (
          <div
            onClick={() => handleCardSelect(fibo.card, roomId, clientId)}
            className={fibo.checked ? 'card-checked' : 'card'}
            key={fibo.card}>
            {fibo.card}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default Cards;
