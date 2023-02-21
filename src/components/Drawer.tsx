import { Box, Drawer, ToggleButton, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NewIssue from './NewIssue';
import AddIcon from '@mui/icons-material/Add';
import IssueCard from './IssueCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IssuesMenu from './IssuesMenu';
import useEditIssue from '../helpers/useEditIssue';

type DrawerRight = {
  open: boolean;
  handleDrawerClose: () => void;
};

const drawerWidth = 600;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '31px 35px 33px 50px',
  gap: 10,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));

const DrawerRight: React.FC<DrawerRight> = ({ open, handleDrawerClose }) => {
  const [openIssue, setOpenIssue] = useState(false);
  const [openIssuesMenu, setOpenMenuIssues] = useState(false);

  const handleOpenIssue = useCallback(() => {
    setOpenIssue(true);
  }, []);

  const handleCloseIssue = useCallback(() => {
    setOpenIssue(false);
  }, []);

  const handleIssuesMenu = useCallback(() => {
    setOpenMenuIssues(!openIssuesMenu);
  }, [openIssuesMenu]);

  const handleCloseMenuIssues = useCallback(() => {
    setOpenMenuIssues(false);
  }, []);

  const useIssues = useEditIssue();

  return (
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
        <Box
          sx={{
            textAlign: 'left',
            flexGrow: 1
          }}>
          <Typography
            sx={{
              fontSize: 22.5,
              fontWeight: 700
            }}>
            Issues
          </Typography>
          <Typography
            sx={{
              fontSize: 17.5,
              fontWeight: 700,
              color: '#a8a8a8',
              marginTop: '1.8px'
            }}>
            1 issue
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <ToggleButton
            href=''
            value={'menu'}
            onClick={handleIssuesMenu}
            selected={openIssuesMenu}
            aria-label='close'
            sx={{
              height: 60,
              width: 60,
              color: theme => theme.palette.grey[700],
              borderRadius: 15,
              border: 'none',
              '&.Mui-selected': {
                transition: 'all 0.3s',
                backgroundColor: '#eaeaea'
              }
            }}>
            <MoreVertIcon
              sx={{
                fontSize: 26
              }}
            />
          </ToggleButton>
          <IssuesMenu
            open={openIssuesMenu}
            handleClose={handleCloseMenuIssues}
          />
        </Box>
        <Divider
          sx={{
            borderColor: '#d0d0d0',
            borderWidth: 1,
            height: 32
          }}
          orientation='vertical'
        />
        <IconButton
          onClick={handleDrawerClose}
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
          paddingLeft: 5,
          paddingRight: 5,
          flexDirection: 'column'
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {useIssues.issues.roomIssues.map(issue => {
            return (
              <IssueCard
                key={issue.id}
                issue={issue}
                handleVotingNow={useIssues.editVotingNow.handleVotingNow}
                handleEditStoryPoints={
                  useIssues.editStoryPoints.handleEditStoryPoints
                }
                useIssue={useIssues}
              />
            );
          })}
        </Box>
        {openIssue && (
          <NewIssue
            handleClose={handleCloseIssue}
            handleAddIssue={title => {
              useIssues.issues.handleAddIssue(title);
              handleCloseIssue();
            }}
          />
        )}
        {!openIssue && (
          <Box
            onClick={handleOpenIssue}
            sx={{
              marginY: 2.4,
              display: 'flex',
              alignItems: 'center',
              gap: 0.3,
              flexGrow: 1,
              paddingY: 1,
              paddingX: 2.5,
              textAlign: 'left',
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f9f9f9'
              }
            }}>
            <AddIcon
              viewBox='0 0 24 24'
              sx={{ fontSize: 36, stroke: '#fff' }}
            />
            <Typography
              sx={{ fontSize: 23.5, fontWeight: 700, color: '#666666' }}>
              Add an issue
            </Typography>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default DrawerRight;
