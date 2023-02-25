import { Box, useMediaQuery, useTheme } from '@mui/material';
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
        rowGap: matchesMd ? 21 : 25
      }}>
      {users?.length &&
        users.map(user => (
          <div key={user.clientId}>
            {reveal ? (
              <div
                className={
                  user.card
                    ? 'card-voted received-card'
                    : 'card-voted card-empty'
                }>
                {user.card}
              </div>
            ) : (
              <div
                className={
                  user.card ? 'card-voted back-card' : 'card-voted card-empty'
                }></div>
            )}
            <div className='user'>{user.username}</div>
          </div>
        ))}
    </Box>
  );
};

export default Votes;
