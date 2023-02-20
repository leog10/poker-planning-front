import { Box, Dialog, IconButton, styled, Typography } from '@mui/material';
import { StyledButton } from '../styles';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DeleteIssueModal from './DeleteIssueModal';
import { useCallback, useRef, useState } from 'react';
import StoryPointsMenu from './StoryPointsMenu';
import EditIssueField from './EditIssueField';

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
    height: 738,
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
  const [openStoryPointsMenu, setOpenStoryPointsMenu] = useState(false);
  const storyPointsButtonRef = useRef<HTMLButtonElement>(null);
  const [openEditTitle, setOpenEditTitle] = useState(false);
  const [issueTitle, setIssueTitle] = useState('issueTitle');

  const handleEditTitle = useCallback(() => {
    setOpenEditTitle(!openEditTitle);
  }, [openEditTitle]);

  const handleSaveIssueTitle = useCallback((textFieldValue: string) => {
    setIssueTitle(textFieldValue);
  }, []);

  const handleOpenDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(true);
  }, []);

  const handleCloseDeleteIssue = useCallback(() => {
    setOpenDeleteIssue(false);
  }, []);

  const handleStoryPointsMenu = useCallback(
    (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const event = e?.target as HTMLElement;

      if (event.id === 'storyPointsMenuBox') return;

      setOpenStoryPointsMenu(!openStoryPointsMenu);
    },
    [openStoryPointsMenu]
  );

  const handleCloseStoryPointsMenu = useCallback(() => {
    setOpenStoryPointsMenu(false);
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
            height: openEditTitle ? '100vh' : 738
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
            paddingX: 7,
            paddingTop: 9.8,
            gap: 3,
            overflow: 'auto',
            paddingBottom: openEditTitle ? 8 : 0
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
          <Box sx={{ width: '100%' }}>
            {!openEditTitle && (
              <Box
                onClick={handleEditTitle}
                sx={{
                  width: '102%',
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
                  {issueTitle}
                </Typography>
              </Box>
            )}
            {openEditTitle && (
              <EditIssueField
                id='editTitle'
                handleClose={handleEditTitle}
                handleSave={handleSaveIssueTitle}
                fieldValue={issueTitle}
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
              <Typography
                sx={{
                  fontSize: 22.5,
                  fontWeight: 700,
                  flexGrow: 1
                }}>
                Link
              </Typography>
              <Box
                onClick={() => {}}
                sx={{
                  width: '100%',
                  marginY: 2,
                  display: 'flex',
                  flexGrow: 1,
                  paddingY: 1.2,
                  paddingX: 3,
                  textAlign: 'left',
                  borderRadius: 2,
                  cursor: 'pointer',
                  backgroundColor: '#f1f1f1',
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
                  Add a link to the issue...
                </Typography>
              </Box>
            </Box>
            <Box sx={{ width: '100%' }}>
              <Typography
                sx={{
                  fontSize: 22.5,
                  fontWeight: 700,
                  flexGrow: 1
                }}>
                Description
              </Typography>
              <Box
                onClick={() => {}}
                sx={{
                  width: '100%',
                  marginY: 2,
                  display: 'flex',
                  flexGrow: 1,
                  paddingY: 1.2,
                  paddingX: 3,
                  textAlign: 'left',
                  borderRadius: 2,
                  cursor: 'pointer',
                  backgroundColor: '#f1f1f1',
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
                  Add a description...
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
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
                onClick={handleStoryPointsMenu}
                variant='outlined'
                sx={{
                  position: 'relative',
                  color: '#000',
                  margin: 0,
                  textWrap: 'no-wrap',
                  border: 'none',
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
                  89
                </Typography>
                <StoryPointsMenu
                  open={openStoryPointsMenu}
                  handleClose={handleCloseStoryPointsMenu}
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
