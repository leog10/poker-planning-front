import {
  Box,
  Dialog,
  IconButton,
  Link,
  styled,
  Typography,
  useMediaQuery,
  useTheme
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
    width: '95vw',
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
  roomId: string;
};

const EditIssueModal: React.FC<EditIssueModal> = ({
  open = false,
  handleClose,
  issue,
  useIssue,
  roomId
}) => {
  const [openDeleteIssue, setOpenDeleteIssue] = useState(false);
  const storyPointsButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(true);
  }, []);

  const handleCloseDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(false);
  }, []);

  const handleDeleteIssue = useCallback(() => {
    useIssue.issues.handleDeleteIssue(issue.id, roomId);
    handleCloseDeleteIssue();
  }, []);

  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

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
                : useIssue.editLink.issueLink.length > 20
                ? '97vh'
                : 720,
            maxHeight:
              useIssue.editTitle.openEditTitle ||
              useIssue.editDescription.openEditDescription
                ? '97vh'
                : useIssue.editLink.openEditLink
                ? '91vh'
                : useIssue.editLink.issueLink.length > 20
                ? '97vh'
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
            paddingX: matchesMd ? 1 : 5,
            paddingTop: matchesMd ? 5 : 9.8,
            gap: 3,
            overflow: 'auto',
            paddingBottom: 6
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
                    color: '#000',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
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
                  useIssue.editTitle.handleSaveIssueTitle(
                    issue.id,
                    title,
                    roomId
                  )
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
                {issue.link && (
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
                    width: useIssue.editLink.openEditLink ? '98%' : '96%',
                    marginTop: issue.link ? 0 : 1.5,
                    marginBottom: 1.5,
                    marginX: issue.link ? 1 : matchesMd ? 0 : 2,
                    display: 'flex',
                    flexGrow: 1,
                    paddingY: issue.link ? 0.6 : 1.2,
                    paddingX: issue.link ? 1 : 3,
                    textAlign: 'left',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: issue.link ? '' : '#f1f1f1',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transition: 'all 0.2s',
                      backgroundColor: '#e8e9ea'
                    }
                  }}>
                  {!issue.link ? (
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontWeight: 400,
                        color: '#444444'
                      }}>
                      Add a link to the issue...
                    </Typography>
                  ) : issue.link && issue.link.match(/^https?:\/\//i) ? (
                    <Link
                      href={issue.link}
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
                        wordBreak: 'break-word',
                        ':hover': {
                          opacity: 0.7,
                          textDecoration: 'none'
                        }
                      }}>
                      {issue.link}
                    </Link>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 22.5,
                        fontWeight: 400,
                        color: '#444444',
                        wordBreak: 'break-word'
                      }}>
                      {issue.link}
                    </Typography>
                  )}
                </Box>
              )}
              <Box sx={{ width: '96%', margin: '0 auto' }}>
                {useIssue.editLink.openEditLink && (
                  <EditIssueField
                    id='editLink'
                    handleClose={useIssue.editLink.handleEditLink}
                    handleSave={link =>
                      useIssue.editLink.handleSaveIssueLink(
                        issue.id,
                        link,
                        roomId
                      )
                    }
                    fieldValue={issue.link ?? ''}
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
                    marginX: matchesMd ? 0 : 2,
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
                      color: '#444444',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {issue.description
                      ? issue.description
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
                    handleSave={description =>
                      useIssue.editDescription.handleSaveIssueDescription(
                        issue.id,
                        description,
                        roomId
                      )
                    }
                    fieldValue={issue.description ?? ''}
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
              onClick={() =>
                useIssue.editVotingNow.handleVotingNow(issue.id, roomId)
              }
              variant='outlined'
              sx={{
                color: issue.voting ? '#fff' : '#1a2935',
                margin: 0,
                textWrap: 'no-wrap',
                border: 'none',
                borderRadius: 2.5,
                width: 'fit-content',
                paddingY: matchesMd ? 3.5 : 0.5,
                paddingX: matchesMd ? 1 : 3,
                fontWeight: 700,
                fontSize: 23,
                lineHeight: 1,
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
                onClick={e => useIssue.editStoryPoints.handleStoryPointsMenu(e)}
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
                      card,
                      false,
                      roomId
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
        content={{
          title: 'Are you sure you want to delete this issue?',
          subtitle: 'This operation is irreversible.',
          callToAction: 'Delete issue'
        }}
        open={openDeleteIssue}
        handleClose={() => {
          handleCloseDeleteIssue();
        }}
        handleDelete={() => {
          handleDeleteIssue();
          handleClose();
        }}
      />
    </Box>
  );
};

export default EditIssueModal;
