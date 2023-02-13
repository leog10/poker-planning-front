import { Box, Typography } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

type IssuesMenu = {
  open: boolean;
};

const IssuesMenu: React.FC<IssuesMenu> = ({ open }) => {
  return (
    <>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: '#fff',
            top: 70,
            right: 0,
            boxShadow: '0 4px 8px hsl(204deg 6% 68% / 40%)',
            display: 'flex',
            flexDirection: 'column',
            width: 375,
            height: 120,
            borderRadius: 2,
            zIndex: 99
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
              paddingX: 1.7,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ebf4ff'
              }
            }}>
            <SaveAltIcon
              sx={{ fontSize: 26, color: '#a8a8a8', marginRight: 1.7 }}
            />
            <Typography sx={{ fontSize: 22.5 }}>
              Download Issues as CSV
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              height: '100%',
              paddingX: 1.7,
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#ebf4ff'
              }
            }}>
            <DeleteOutlinedIcon
              sx={{ fontSize: 26, color: '#a8a8a8', marginRight: 1.7 }}
            />
            <Typography sx={{ fontSize: 22.5 }}>Delete all issues</Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default IssuesMenu;