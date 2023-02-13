import { Box } from '@mui/material';
import { fiboCardsArray } from '../helpers/useCards';

type StoryPointsMenu = {
  open: boolean;
  handleClose: () => void;
};

const StoryPointsMenu: React.FC<StoryPointsMenu> = ({ open }) => {
  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            top: -31,
            right: 76,
            backgroundColor: '#fff',
            marginRight: 0.2,
            boxShadow: '0 4px 8px hsl(204deg 6% 68% / 40%)',
            display: 'flex',
            flexDirection: 'column',
            width: 375,
            height: 360,
            borderRadius: 2,
            zIndex: 99
          }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingY: 1.8,
              paddingX: 1.9
            }}>
            {fiboCardsArray.map(card => {
              return (
                <Box
                  sx={{
                    cursor: 'pointer',
                    color: '#48545d',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 22.5,
                    fontWeight: 700,
                    width: 60,
                    height: 60,
                    borderRadius: 50,
                    margin: 1,
                    ':hover': {
                      backgroundColor: '#f1f1f1'
                    }
                  }}>
                  {card.card}
                </Box>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
};

export default StoryPointsMenu;
