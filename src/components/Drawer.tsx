import { Box, Drawer, Link, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
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
  padding: '1.5rem 2.5rem',
  gap: 10,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const DrawerRight: React.FC<DrawerRight> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const DrawerMemo = useMemo(() => {
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
            <Typography
              sx={{
                textAlign: 'left',
                flexGrow: 1,
                fontSize: 18,
                fontWeight: 700
              }}>
              Issues
            </Typography>
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
          <Box
            sx={{
              display: 'flex',
              paddingLeft: 4,
              paddingRight: 6,
              flexDirection: 'column'
            }}>
            <Box>
              <TextField
                multiline
                inputProps={{
                  border: 'none',
                  outline: 'none'
                }}
                sx={{
                  backgroundColor: '#ededed'
                }}></TextField>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                paddingY: 1,
                paddingX: 2.5,
                textAlign: 'left',
                fontSize: 19,
                fontWeight: 700,
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f9f9f9'
                }
              }}>
              + Add an issue
            </Box>
          </Box>
        </Drawer>
      </Box>
    );
  }, [open]);

  return <>{DrawerMemo}</>;
};

export default DrawerRight;
