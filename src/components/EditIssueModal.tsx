import {
  Box,
  Dialog,
  IconButton,
  Link,
  styled,
  Typography
} from '@mui/material';
import { StyledButton } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteIssueModal from './DeleteIssueModal';
import { useCallback, useRef, useState } from 'react';
import StoryPointsMenu from './StoryPointsMenu';
import EditIssueField from './EditIssueField';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Issue } from '../types/Issue';
import useIssue from '../types/useIssue';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {
    backgroundColor: 'rgba(26,41,53,.8)'
  },
  '& .MuiPaper-root': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1060,
    width: 1060,
    maxHeight: '97vh',
    borderRadius: 20,
    boxShadow: 'none'
  }
}));

type EditIssueModal = {
  open: boolean;
  handleClose: () => void;
  issue: Issue;
  useIssue: useIssue;
};

const EditIssueModal: React.FC<EditIssueModal> = ({
  open = false,
  handleClose,
  issue,
  useIssue
}) => {
  const [openDeleteIssue, setOpenDeleteIssue] = useState(false);
  const storyPointsButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(true);
  }, []);

  const handleCloseDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(false);
  }, []);

  return (
    <Box>
      <BootstrapDialog
        disablePortal
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& .MuiPaper-root': {
            height:
              useIssue.editTitle.openEditTitle ||
              useIssue.editDescription.openEditDescription
                ? '97vh'
                : useIssue.editLink.openEditLink
                ? '91vh'
                : 720,
            maxHeight:
              useIssue.editTitle.openEditTitle ||
              useIssue.editDescription.openEditDescription
                ? '97vh'
                : useIssue.editLink.openEditLink
                ? '91vh'
                : 720
          }
        }}
        aria-labelledby='customized-dialog-title'
        open={open}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            flexGrow: 1,
            paddingX: 5,
            paddingTop: 9.8,
            gap: 3,
            overflow: 'auto',
            paddingBottom:
              useIssue.editTitle.openEditTitle ||
              useIssue.editDescription.openEditDescription
                ? 8
                : 0
          }}>
          <IconButton
            onClick={handleOpenDeleteIssue}
            aria-label='close'
            sx={{
              height: 60,
              width: 60,
              position: 'absolute',
              right: 80,
              top: 0,
              color: theme => theme.palette.grey[800],
              marginRight: 1.3,
              marginTop: 1.1
            }}>
            <DeleteOutlinedIcon
              sx={{
                fontSize: 26
              }}
            />
          </IconButton>
          <IconButton
            onClick={handleClose}
            aria-label='close'
            sx={{
              height: 60,
              width: 60,
              position: 'absolute',
              right: 0,
              top: 0,
              color: theme => theme.palette.grey[700],
              marginRight: 1.3,
              marginTop: 1.1
            }}>
            <CloseIcon
              sx={{
                fontSize: 26
              }}
            />
          </IconButton>
          <Box sx={{ width: useIssue.editTitle.openEditTitle ? '97%' : '98%' }}>
            {!useIssue.editTitle.openEditTitle && (
              <Box
                onClick={useIssue.editTitle.handleEditTitle}
                sx={{
                  width: '100%',
                  marginY: 2,
                  display: 'flex',
                  paddingY: 1,
                  paddingX: 1,
                  textAlign: 'left',
                  borderRadius: 2,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transition: 'all 0.2s',
                    backgroundColor: '#f1f1f1'
                  }
                }}>
                <Typography
                  sx={{
                    fontSize: 27.5,
                    fontWeight: 700,
                    color: '#000'
                  }}>
                  {issue.title}
                </Typography>
              </Box>
            )}
            {useIssue.editTitle.openEditTitle && (
              <EditIssueField
                id='editTitle'
                handleClose={useIssue.editTitle.handleEditTitle}
                handleSave={title =>
                  useIssue.editTitle.handleSaveIssueTitle(issue.id, title)
                }
                fieldValue={issue.title}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              width: '100%',
              gap: 4,
              textAlign: 'left'
            }}>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%'
                }}>
                <Typography
                  sx={{
                    marginLeft: 2,
                    marginRight: 1,
                    fontSize: 22.5,
                    fontWeight: 700
                  }}>
                  Link
                </Typography>
                {useIssue.editLink.issueLink && (
                  <IconButton
                    onClick={useIssue.editLink.handleEditLink}
                    aria-label='close'
                    sx={{
                      height: 60,
                      width: 60,
                      color: theme => theme.palette.grey[800]
                    }}>
                    <EditOutlinedIcon
                      sx={{
                        fontSize: 26
                      }}
                    />
                  </IconButton>
                )}
              </Box>
              {!useIssue.editLink.openEditLink && (
                <Box
                  onClick={useIssue.editLink.handleEditLink}
                  sx={{
                    width: useIssue.editLink.openEditLink ? '98%' : '97%',
                    marginTop: useIssue.editLink.issueLink ? 0 : 1.5,
                    marginBottom: 1.5,
                    marginX: useIssue.editLink.issueLink ? 1 : 2,
                    display: 'flex',
                    flexGrow: 1,
                    paddingY: useIssue.editLink.issueLink ? 0.6 : 1.2,
                    paddingX: useIssue.editLink.issueLink ? 1 : 3,
                    textAlign: 'left',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: useIssue.editLink.issueLink
                      ? ''
                      : '#f1f1f1',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transition: 'all 0.2s',
                      backgroundColor: '#e8e9ea'
                    }
                  }}>
                  {useIssue.editLink.issueLink.length < 1 ? (
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontWeight: 400,
                        color: '#444444'
                      }}>
                      Add a link to the issue...
                    </Typography>
                  ) : useIssue.editLink.issueLink.match(/^https?:\/\//i) ? (
                    <Link
                      href={useIssue.editLink.issueLink}
                      target='_blank'
                      rel='noopener'
                      onClick={e => {
                        if (e.currentTarget) e.stopPropagation();
                      }}
                      sx={{
                        fontSize: 22.5,
                        fontWeight: 400,
                        color: '#3993ff',
                        textDecorationColor: '#3993ff',
                        ':hover': {
                          opacity: 0.7,
                          textDecoration: 'none'
                        }
                      }}>
                      {useIssue.editLink.issueLink}
                    </Link>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 22.5,
                        fontWeight: 400,
                        color: '#444444'
                      }}>
                      {useIssue.editLink.issueLink}
                    </Typography>
                  )}
                </Box>
              )}
              <Box sx={{ width: '96%', margin: '0 auto' }}>
                {useIssue.editLink.openEditLink && (
                  <EditIssueField
                    id='editLink'
                    handleClose={useIssue.editLink.handleEditLink}
                    handleSave={useIssue.editLink.handleSaveIssueLink}
                    fieldValue={useIssue.editLink.issueLink}
                  />
                )}
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%'
                }}>
                <Typography
                  sx={{
                    marginX: 2,
                    fontSize: 22.5,
                    fontWeight: 700
                  }}>
                  Description
                </Typography>
                {useIssue.editDescription.issueDescription && (
                  <IconButton
                    onClick={useIssue.editDescription.handleEditDescription}
                    aria-label='close'
                    sx={{
                      height: 60,
                      width: 60,
                      color: theme => theme.palette.grey[800]
                    }}>
                    <EditOutlinedIcon
                      sx={{
                        fontSize: 26
                      }}
                    />
                  </IconButton>
                )}
              </Box>
              {!useIssue.editDescription.openEditDescription && (
                <Box
                  onClick={useIssue.editDescription.handleEditDescription}
                  sx={{
                    width: '96%',
                    marginTop: useIssue.editDescription.issueDescription
                      ? 1
                      : 2,
                    marginBottom: 2,
                    marginX: 2,
                    display: 'flex',
                    flexGrow: 1,
                    paddingY: useIssue.editDescription.issueDescription
                      ? 0.5
                      : 1.2,
                    paddingX: useIssue.editDescription.issueDescription
                      ? 0.2
                      : 3,
                    textAlign: 'left',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: useIssue.editDescription.issueDescription
                      ? ''
                      : '#f1f1f1',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transition: 'all 0.2s',
                      backgroundColor: '#e8e9ea'
                    }
                  }}>
                  <Typography
                    sx={{
                      fontSize: 24,
                      fontWeight: 400,
                      color: '#444444'
                    }}>
                    {useIssue.editDescription.issueDescription.length
                      ? useIssue.editDescription.issueDescription
                      : 'Add a description...'}
                  </Typography>
                </Box>
              )}
              {useIssue.editDescription.openEditDescription && (
                <Box
                  sx={{
                    width: '96%',
                    margin: '0 auto',
                    fontSize: 23,
                    color: '#1a2935'
                  }}>
                  <EditIssueField
                    id='editDescription'
                    handleClose={useIssue.editDescription.handleEditDescription}
                    handleSave={
                      useIssue.editDescription.handleSaveIssueDescription
                    }
                    fieldValue={useIssue.editDescription.issueDescription}
                  />
                </Box>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              justifyContent: 'space-between',
              width: '96%',
              height: 60
            }}>
            <StyledButton
              onClick={() => useIssue.editVotingNow.handleVotingNow(issue.id)}
              variant='outlined'
              sx={{
                color: issue.voting ? '#fff' : '#1a2935',
                margin: 0,
                textWrap: 'no-wrap',
                border: 'none',
                borderRadius: 2.5,
                width: 'fit-content',
                paddingY: 0.5,
                paddingX: 3,
                fontWeight: 700,
                fontSize: 23,
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
                onClick={useIssue.editStoryPoints.handleStoryPointsMenu}
                variant='outlined'
                sx={{
                  position: 'relative',
                  color: '#000',
                  margin: 0,
                  textWrap: 'no-wrap',
                  border: 'none',
                  height: 60,
                  borderRadius: 2.5,
                  width: '60px',
                  minWidth: '60px',
                  padding: '0.33rem 0rem',
                  backgroundColor: !issue.voting
                    ? '#e8e9ea'
                    : useIssue.editStoryPoints.openStoryPointsMenu &&
                      issue.voting
                    ? '#bbd6f7'
                    : useIssue.editStoryPoints.openStoryPointsMenu
                    ? '#bfc3c5'
                    : '#fff',
                  '&:hover': {
                    border: 'none',
                    transition: 'all 0.3s',
                    backgroundColor: !issue.voting ? '#d1d4d7' : '#ebf4ff'
                  }
                }}>
                <Typography
                  sx={{ fontWeight: 700, fontFamily: '', fontSize: 23.5 }}>
                  {issue.storyPoints}
                </Typography>
                <StoryPointsMenu
                  open={useIssue.editStoryPoints.openStoryPointsMenu}
                  handleClose={
                    useIssue.editStoryPoints.handleCloseStoryPointsMenu
                  }
                  handleSelectPoint={card =>
                    useIssue.editStoryPoints.handleEditStoryPoints(
                      issue.id,
                      card
                    )
                  }
                  anchorEl={storyPointsButtonRef.current}
                />
              </StyledButton>
            </Box>
          </Box>
        </Box>
      </BootstrapDialog>
      <DeleteIssueModal
        open={openDeleteIssue}
        handleClose={() => {
          handleCloseDeleteIssue();
        }}
        handleDeleteIssue={() => {
          handleCloseDeleteIssue();
          handleClose();
        }}
      />
    </Box>
  );
};

export default EditIssueModal;
