import { Box } from '@mui/material';
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
      <Typography
        sx={{
          margin: 2.5,
          fontSize: 22.5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        Choose your card
        <Typography sx={{ fontSize: 20, marginLeft: '5px' }}>👇</Typography>
      </Typography>
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
