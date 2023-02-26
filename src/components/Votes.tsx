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
        width: users && users.length * 70,
        columnGap: 5,
        rowGap: matchesMd ? 21 : 22
      }}>
      {users?.length &&
        users.map(user => (
          <div key={user.clientId}>
            <Box
              sx={{
                color: '#3993ff',
                fontSize: matchesMd ? 21 : 22,
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: matchesMd ? 77 : 90,
                width: matchesMd ? 45 : 50,
                border:
                  user.card && !reveal
                    ? '1px solid #ededed25'
                    : user.card && reveal
                    ? '2px solid #3993ff'
                    : '1px solid transparent',
                borderRadius: '10px',
                backgroundColor: user.card
                  ? '#fff'
                  : user.card && reveal
                  ? '#fff'
                  : '#e8e9ea',
                marginX: 0.5,
                marginY: 0.3,
                backgroundImage: user.card && !reveal ? 'url(/logo.png)' : '',
                boxShadow: user.card && !reveal ? '2px 2px 5px #00000095' : '',
                backgroundRepeat: 'no-repeat',
                backgroundPositionX: 'center',
                backgroundPositionY: 'center',
                backgroundSize: 40
              }}>
              {reveal ? user.card : ''}
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
