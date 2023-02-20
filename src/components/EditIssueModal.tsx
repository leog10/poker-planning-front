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
import useEditIssue from '../helpers/useEditIssue';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
};

const EditIssueModal: React.FC<EditIssueModal> = ({
  open = false,
  handleClose
}) => {
  const [openDeleteIssue, setOpenDeleteIssue] = useState(false);
  const storyPointsButtonRef = useRef<HTMLButtonElement>(null);

  const { editTitle, editLink, editDescription, editStoryPoints } =
    useEditIssue();

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
              editTitle.openEditTitle || editDescription.openEditDescription
                ? '97vh'
                : editLink.openEditLink
                ? '91vh'
                : 720,
            maxHeight:
              editTitle.openEditTitle || editDescription.openEditDescription
                ? '97vh'
                : editLink.openEditLink
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
              editTitle.openEditTitle || editDescription.openEditDescription
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
          <Box sx={{ width: editTitle.openEditTitle ? '97%' : '98%' }}>
            {!editTitle.openEditTitle && (
              <Box
                onClick={editTitle.handleEditTitle}
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
                  {editTitle.issueTitle}
                </Typography>
              </Box>
            )}
            {editTitle.openEditTitle && (
              <EditIssueField
                id='editTitle'
                handleClose={editTitle.handleEditTitle}
                handleSave={editTitle.handleSaveIssueTitle}
                fieldValue={editTitle.issueTitle}
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
                {editLink.issueLink && (
                  <IconButton
                    onClick={editLink.handleEditLink}
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
              {!editLink.openEditLink && (
                <Box
                  onClick={editLink.handleEditLink}
                  sx={{
                    width: editLink.openEditLink ? '98%' : '97%',
                    marginTop: editLink.issueLink ? 0 : 1.5,
                    marginBottom: 1.5,
                    marginX: editLink.issueLink ? 1 : 2,
                    display: 'flex',
                    flexGrow: 1,
                    paddingY: editLink.issueLink ? 0.6 : 1.2,
                    paddingX: editLink.issueLink ? 1 : 3,
                    textAlign: 'left',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: editLink.issueLink ? '' : '#f1f1f1',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transition: 'all 0.2s',
                      backgroundColor: '#e8e9ea'
                    }
                  }}>
                  {editLink.issueLink.length < 1 ? (
                    <Typography
                      sx={{
                        fontSize: 24,
                        fontWeight: 400,
                        color: '#444444'
                      }}>
                      Add a link to the issue...
                    </Typography>
                  ) : editLink.issueLink.match(/^https?:\/\//i) ? (
                    <Link
                      href={editLink.issueLink}
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
                      {editLink.issueLink}
                    </Link>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: 22.5,
                        fontWeight: 400,
                        color: '#444444'
                      }}>
                      {editLink.issueLink}
                    </Typography>
                  )}
                </Box>
              )}
              <Box sx={{ width: '96%', margin: '0 auto' }}>
                {editLink.openEditLink && (
                  <EditIssueField
                    id='editLink'
                    handleClose={editLink.handleEditLink}
                    handleSave={editLink.handleSaveIssueLink}
                    fieldValue={editLink.issueLink}
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
                {editDescription.issueDescription && (
                  <IconButton
                    onClick={editDescription.handleEditDescription}
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
              {!editDescription.openEditDescription && (
                <Box
                  onClick={editDescription.handleEditDescription}
                  sx={{
                    width: '96%',
                    marginTop: editDescription.issueDescription ? 1 : 2,
                    marginBottom: 2,
                    marginX: 2,
                    display: 'flex',
                    flexGrow: 1,
                    paddingY: editDescription.issueDescription ? 0.5 : 1.2,
                    paddingX: editDescription.issueDescription ? 0.2 : 3,
                    textAlign: 'left',
                    borderRadius: 2,
                    cursor: 'pointer',
                    backgroundColor: editDescription.issueDescription
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
                    {editDescription.issueDescription.length
                      ? editDescription.issueDescription
                      : 'Add a description...'}
                  </Typography>
                </Box>
              )}
              {editDescription.openEditDescription && (
                <Box
                  sx={{
                    width: '96%',
                    margin: '0 auto',
                    fontSize: 23,
                    color: '#1a2935'
                  }}>
                  <EditIssueField
                    id='editDescription'
                    handleClose={editDescription.handleEditDescription}
                    handleSave={editDescription.handleSaveIssueDescription}
                    fieldValue={editDescription.issueDescription}
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
              variant='outlined'
              sx={{
                color: '#fff',
                margin: 0,
                textWrap: 'no-wrap',
                border: 'none',
                borderRadius: 2.5,
                width: 200,
                padding: '0.33rem 1rem',
                fontWeight: 600,
                fontSize: 21.5,
                backgroundColor: '#3993ff',
                '&:hover': {
                  border: 'none',
                  transition: 'all 0.3s',
                  backgroundColor: '#3993ff90'
                }
              }}>
              Voting now...
            </StyledButton>
            <Box sx={{ position: 'relative' }}>
              <StyledButton
                ref={storyPointsButtonRef}
                onClick={editStoryPoints.handleStoryPointsMenu}
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
                  backgroundColor: '#e8e9ea',
                  '&:hover': {
                    border: 'none',
                    transition: 'all 0.3s',
                    backgroundColor: '#d1d4d7'
                  }
                }}>
                <Typography
                  sx={{ fontWeight: 700, fontFamily: '', fontSize: 23.5 }}>
                  {editStoryPoints.storyPoints}
                </Typography>
                <StoryPointsMenu
                  open={editStoryPoints.openStoryPointsMenu}
                  handleClose={editStoryPoints.handleCloseStoryPointsMenu}
                  handleSelectPoint={editStoryPoints.handleEditStoryPoints}
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
