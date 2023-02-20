import { Box, ToggleButton, Typography } from '@mui/material';
import { StyledButton } from '../styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IssueCardMenu from './IssueCardMenu';
import { useCallback, useRef, useState } from 'react';
import EditIssueModal from './EditIssueModal';
import DeleteIssueModal from './DeleteIssueModal';
import StoryPointsMenu from './StoryPointsMenu';
import { Issue } from '../types/Issue';

type IssueCard = {
  issue: Issue;
  handleVotingNow: (id: string) => void;
  handleEditStoryPoints: (id: string, card: string) => void;
};

const IssueCard: React.FC<IssueCard> = ({
  issue,
  handleVotingNow,
  handleEditStoryPoints
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openEditIssue, setOpenEditIssue] = useState(false);
  const [openDeleteIssue, setOpenDeleteIssue] = useState(false);
  const [openStoryPointsMenu, setOpenStoryPointsMenu] = useState(false);
  const storyPointsButtonRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = useCallback(() => {
    setOpenMenu(!openMenu);
  }, [openMenu]);

  const handleOpenEditIssue = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const event = e?.target as HTMLElement;

      if (event.id === 'title' || event.id === 'buttonsDiv') {
        return setOpenEditIssue(true);
      }

      if (e?.currentTarget !== e?.target) return;

      setOpenEditIssue(true);
    },
    []
  );

  const handleOpenEditIssueFromMenu = useCallback(() => {
    setOpenEditIssue(true);
  }, []);

  const handleCloseEditIssue = useCallback(() => {
    setOpenEditIssue(false);
  }, []);

  const handleOpenDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(true);
  }, []);

  const handleCloseDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(false);
  }, []);

  const handleStoryPointsMenu = useCallback(() => {
    setOpenStoryPointsMenu(!openStoryPointsMenu);
  }, [openStoryPointsMenu]);

  const handleCloseStoryPointsMenu = useCallback(() => {
    setOpenStoryPointsMenu(false);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        onClick={handleOpenEditIssue}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: openMenu ? '#d7e9ff' : '#ebf4ff',
          height: 200,
          borderRadius: 2.5,
          boxShadow: '0px 1px 4px #a1a1a190',
          padding: 2,
          cursor: 'pointer',
          ':hover': {
            backgroundColor: '#d7e9ff'
          }
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            position: 'absolute',
            right: '0',
            top: '0'
          }}>
          <Box>
            <ToggleButton
              href=''
              value={'menu'}
              onClick={handleMenuClick}
              aria-label='close'
              selected={openMenu}
              sx={{
                padding: 1.75,
                marginTop: 0.3,
                marginRight: 0.2,
                color: theme => theme.palette.grey[700],
                borderRadius: 15,
                border: 'none',
                '&.MuiToggleButton-root:hover': {
                  transition: 'all 0.3s',
                  backgroundColor: '#ebf4ff'
                },
                '&.Mui-selected': {
                  transition: 'all 0.3s',
                  backgroundColor: '#ebf4ff'
                }
              }}>
              <MoreHorizIcon
                sx={{
                  fontSize: 26
                }}
              />
            </ToggleButton>
            <IssueCardMenu
              open={openMenu}
              handleCloseMenu={handleMenuClick}
              openDeleteIssueModal={handleOpenDeleteIssue}
              openEditIssueModal={handleOpenEditIssueFromMenu}
            />
          </Box>
        </Box>
        <Typography
          id='title'
          sx={{ marginTop: 5, textAlign: 'left' }}>
          {issue.title}
        </Typography>
        <Box
          id='buttonsDiv'
          sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 2.35,
            justifyContent: 'space-between'
          }}>
          <StyledButton
            onClick={() => handleVotingNow(issue.id)}
            variant='outlined'
            sx={{
              color: issue.voting ? '#fff' : '#1a2935',
              margin: 0,
              textWrap: 'no-wrap',
              border: 'none',
              borderRadius: 2.5,
              width: 'fit-content',
              padding: '0.33rem 0.78rem',
              fontWeight: 600,
              fontSize: 21.5,
              backgroundColor: issue.voting ? '#3993ff' : '#e8e9ea',
              '&:hover': {
                border: 'none',
                transition: 'all 0.3s',
                backgroundColor: issue.voting ? '#3993ff90' : '#d1d4d7'
              }
            }}>
            {!issue.voting && issue.storyPoints !== '-'
              ? 'Vote again'
              : issue.voting
              ? 'Voting now...'
              : 'Vote this issue'}
          </StyledButton>
          <Box sx={{ position: 'relative' }}>
            <StyledButton
              ref={storyPointsButtonRef}
              onClick={handleStoryPointsMenu}
              variant='outlined'
              sx={{
                position: 'relative',
                color: '#000',
                margin: 0,
                textWrap: 'no-wrap',
                border: 'none',
                borderRadius: 2.5,
                width: '5px',
                minWidth: '50px',
                padding: 1,
                backgroundColor: !issue.voting
                  ? '#e8e9ea'
                  : openStoryPointsMenu && issue.voting
                  ? '#bbd6f7'
                  : openStoryPointsMenu
                  ? '#bfc3c5'
                  : '#fff',
                zIndex: 90,
                '&:hover': {
                  border: 'none',
                  transition: 'all 0.3s',
                  backgroundColor: !issue.voting ? '#d1d4d7' : '#ebf4ff'
                }
              }}>
              <Typography
                sx={{ fontWeight: 700, fontFamily: '', fontSize: 20.5 }}>
                {issue.storyPoints}
              </Typography>
            </StyledButton>
            <StoryPointsMenu
              open={openStoryPointsMenu}
              handleClose={handleCloseStoryPointsMenu}
              anchorEl={storyPointsButtonRef.current}
              handleSelectPoint={card => {
                handleEditStoryPoints(issue.id, card);
                handleCloseStoryPointsMenu();
              }}
            />
          </Box>
        </Box>
      </Box>
      <DeleteIssueModal
        open={openDeleteIssue}
        handleClose={handleCloseDeleteIssue}
        handleDeleteIssue={handleCloseDeleteIssue}
      />
      <EditIssueModal
        open={openEditIssue}
        handleClose={handleCloseEditIssue}
      />
    </Box>
  );
};

export default IssueCard;
