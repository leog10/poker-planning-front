import { Box, ClickAwayListener, Modal, Popper } from '@mui/material';
import { fiboCardsArray } from '../helpers/useCards';

type StoryPointsMenu = {
  open: boolean;
  handleClose: () => void;
  anchorEl: any;
};

const StoryPointsMenu: React.FC<StoryPointsMenu> = ({
  open,
  handleClose,
  anchorEl
}) => {
  return (
    <Popper
      anchorEl={anchorEl}
      sx={{
        outline: 'none',
        width: 'fit-content',
        zIndex: 1200
      }}
      open={open}
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 10]
          }
        }
      ]}
      placement={'left'}>
      <ClickAwayListener onClickAway={handleClose}>
        <Box
          sx={{
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px hsl(204deg 6% 68% / 40%)',
            display: 'flex',
            flexDirection: 'column',
            width: 375,
            height: 360,
            borderRadius: 2
          }}>
          <Box
            id='storyPointsMenuBox'
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              paddingY: 1.8,
              paddingX: 1.9
            }}>
            {fiboCardsArray.map(card => {
              return (
                <Box
                  onClick={handleClose}
                  key={card.card}
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
      </ClickAwayListener>
    </Popper>
  );
};

export default StoryPointsMenu;
