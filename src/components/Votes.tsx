import { Box } from '@mui/material';
import { User } from '../types/User';

type Votes = {
  users: User[] | undefined;
  reveal: boolean;
};

const Votes: React.FC<Votes> = ({ users, reveal }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '25px',
        alignItems: 'center',
        userSelect: 'none',
        flexDirection: 'row'
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
