import { Box, Drawer, ToggleButton, Typography } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import NewIssue from './NewIssue';
import AddIcon from '@mui/icons-material/Add';
import IssueCard from './IssueCard';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IssuesMenu from './IssuesMenu';
import DeleteIssueModal from './DeleteIssueModal';
import useIssue from '../types/useIssue';

type DrawerRight = {
  open: boolean;
  handleDrawerClose: () => void;
  averageVote: number | undefined;
  useIssue: useIssue;
  revealing: boolean;
  roomId: string;
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

const DrawerRight: React.FC<DrawerRight> = ({
  open,
  handleDrawerClose,
  averageVote,
  useIssue,
  revealing,
  roomId
}) => {
  const [openIssue, setOpenIssue] = useState(false);
  const [openIssuesMenu, setOpenIssuesMenu] = useState(false);
  const [openDeleteIssues, setOpenDeleteIssues] = useState(false);

  const handleOpenDeleteIssues = useCallback(() => {
    setOpenDeleteIssues(true);
  }, []);

  const handleCloseDeleteIssues = useCallback(() => {
    setOpenDeleteIssues(false);
  }, []);

  const handleDeleteIssues = useCallback(() => {
    useIssue.issues.handleDeleteAllIssues(roomId);
    handleCloseDeleteIssues();
  }, [roomId]);

  const handleOpenIssue = useCallback(() => {
    setOpenIssue(true);
  }, []);

  const handleCloseIssue = useCallback(() => {
    setOpenIssue(false);
  }, []);

  const handleIssuesMenu = useCallback(() => {
    setOpenIssuesMenu(!openIssuesMenu);
  }, [openIssuesMenu]);

  const handleCloseMenuIssues = useCallback(() => {
    setOpenIssuesMenu(false);
  }, []);

  const drawerSubtitle = useMemo(() => {
    const issuesQuantity = useIssue.issues.roomIssues.length;
    const issuesSum = useIssue.issues.roomIssues
      .filter(issue => !isNaN(Number(issue.storyPoints)))
      .reduce((a, b) => a + Number(b.storyPoints), 0);
    if (issuesQuantity && issuesSum) {
      return `${issuesQuantity} issues   •   ${issuesSum} points`;
    }
    if (issuesQuantity) {
      return `${issuesQuantity} issues`;
    }
  }, [useIssue.issues]);

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
            {drawerSubtitle}
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
            openDeleteAllIssuesModal={handleOpenDeleteIssues}
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
          {useIssue.issues.roomIssues.map(issue => {
            return (
              <IssueCard
                key={issue.id}
                issue={issue}
                handleVotingNow={useIssue.editVotingNow.handleVotingNow}
                handleEditStoryPoints={
                  useIssue.editStoryPoints.handleEditStoryPoints
                }
                useIssue={useIssue}
                averageVote={averageVote}
              />
            );
          })}
        </Box>
        {openIssue && (
          <NewIssue
            handleClose={handleCloseIssue}
            handleAddIssue={title => {
              useIssue.issues.handleAddIssue(title, revealing, roomId);
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
              {!useIssue.issues.roomIssues.length
                ? 'Add an issue'
                : 'Add another issue'}
            </Typography>
          </Box>
        )}
      </Box>
      <DeleteIssueModal
        content={{
          title: 'Wait! Are you sure you want to delete all issues?',
          subtitle: 'Once you confirm, you will not be able to recover them.',
          callToAction: 'Delete issues'
        }}
        open={openDeleteIssues}
        handleClose={() => {
          handleCloseDeleteIssues();
        }}
        handleDelete={() => {
          handleDeleteIssues();
        }}
      />
    </Drawer>
  );
};

export default DrawerRight;
