import { Box, useMediaQuery, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import { User } from '../types/User';

type Votes = {
  users: User[] | undefined;
  reveal: boolean;
};

const Votes: React.FC<Votes> = ({ users, reveal }) => {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        position: users && users.length > 1 ? 'absolute' : 'unset',
        display: 'flex',
        justifyContent: 'center',
        marginTop: users && users.length > 1 ? 0 : '25px',
        alignItems: 'center',
        userSelect: 'none',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: users && users.length * 65,
        columnGap: 7,
        rowGap: matchesMd ? 21 : 22
      }}>
      {users?.length &&
        users.map(user => (
          <div key={user.clientId}>
            <Box
              id='flip-card'
              sx={{
                backgroundColor: 'transparent',
                height: matchesMd ? 77 : 90,
                width: matchesMd ? 46 : 54,
                perspective: '1000px',
                color: '#3993ff',
                fontSize: matchesMd ? 21 : 22,
                fontWeight: 700,
                borderRadius: '10px',
                marginBottom: 0.3
              }}>
              <Box
                id='flip-card-inner'
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.6s',
                  transformStyle: 'preserve-3d',
                  transform: user.card && reveal ? 'rotateY(180deg)' : '',
                  borderRadius: '10px'
                }}>
                <Box
                  id='back'
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    webkitBackfaceVisibility: 'hidden' /* Safari */,
                    backfaceVisibility: 'hidden',
                    background: user.card ? 'url(/logo.png)' : '#e8e9ea',
                    boxShadow:
                      user.card && !reveal ? '2px 2px 5px #00000095' : '',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'center',
                    backgroundPositionY: 'center',
                    backgroundSize: 40,
                    borderRadius: '10px',
                    transition: reveal ? 'box-shadow .3s' : ''
                  }}></Box>
                <Box
                  id='front'
                  sx={{
                    position: 'absolute',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid #3993ff',
                    width: '100%',
                    height: '100%',
                    webkitBackfaceVisibility: 'hidden' /* Safari */,
                    backfaceVisibility: 'hidden',
                    backgroundColor: '#fff',
                    transform: 'rotateY(180deg)',
                    borderRadius: '10px'
                  }}>
                  {reveal ? user.card : ''}
                </Box>
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: matchesMd ? 19 : 22,
                fontWeight: matchesMd ? 600 : 700
              }}>
              {user.username}
            </Typography>
          </div>
        ))}
    </Box>
  );
};

export default Votes;
