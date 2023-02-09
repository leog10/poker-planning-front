import { Box, Drawer, Link } from '@mui/material';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

type DrawerRight = {
  children: React.ReactElement;
};

const drawerWidth = 600;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3.3, 3.5),
  gap: 10,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const DrawerRight: React.FC<DrawerRight> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Link
        sx={{ textDecoration: 'none' }}
        onClick={handleDrawerOpen}>
        {children}
      </Link>
      <Drawer
        sx={{
          width: -drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            border: 'none'
          }
        }}
        variant='persistent'
        anchor='right'
        open={open}>
        <DrawerHeader>
          <Divider
            sx={{
              borderColor: '#d0d0d0',
              borderWidth: 1,
              height: 32
            }}
            orientation='vertical'
          />
          <IconButton
            onClick={handleClose}
            aria-label='close'
            sx={{
              height: 60,
              width: 60,
              color: theme => theme.palette.grey[700]
            }}>
            <CloseIcon
              sx={{
                fontSize: 26
              }}
            />
          </IconButton>
        </DrawerHeader>
      </Drawer>
    </Box>
  );
};

export default DrawerRight;
