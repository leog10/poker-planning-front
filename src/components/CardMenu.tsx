import { Box, Typography } from '@mui/material';

const CardMenu = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        marginTop: 0.9,
        marginRight: 0.2,
        boxShadow: '0 4px 8px hsl(204deg 6% 68% / 40%)',
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        height: 240,
        borderRadius: 2
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100%',
          paddingX: 3,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#ebf4ff'
          }
        }}>
        <Typography sx={{ fontSize: 22.5 }}>Open</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100%',
          paddingX: 3,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#ebf4ff'
          }
        }}>
        <Typography sx={{ fontSize: 22.5 }}>Move to top</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100%',
          paddingX: 3,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#ebf4ff'
          }
        }}>
        <Typography sx={{ fontSize: 22.5 }}>Move to bottom</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          height: '100%',
          paddingX: 3,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#ebf4ff'
          }
        }}>
        <Typography sx={{ fontSize: 22.5 }}>Delete</Typography>
      </Box>
    </Box>
  );
};

export default CardMenu;
