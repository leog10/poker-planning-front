import './App.css';
import { io } from 'socket.io-client';
import useRoom from './helpers/useRoom';
import Cards from './components/Card';
import Votes from './components/Votes';
import { StyledButton, StyledTextField } from './styles';
import { Box, Typography } from '@mui/material';
import Board from './components/Board';
import Header from './components/Header';
import DrawerRight from './components/Drawer';
import { useCallback, useState } from 'react';
import InviteModal from './components/InviteModal';

const socket = io('ws://localhost:3000');

const Game = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openInvite, setOpenInvite] = useState(false);

  const { room, user, issue } = useRoom(socket);

  const handleOpenDrawer = useCallback(() => {
    setOpenDrawer(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const handleOpenInvite = useCallback(() => {
    setOpenInvite(true);
  }, []);

  const handleCloseInvite = useCallback(() => {
    setOpenInvite(false);
  }, []);

  return (
    <div className='App'>
      <Header
        handleOpenInvite={handleOpenInvite}
        handleOpenDrawer={handleOpenDrawer}
        gameName={room.gameName}
        username={user.username}
        gameStarted={room.gameStarted}
      />

      {!room.roomId && !room.gameStarted && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3.5rem'
          }}>
          <Typography
            sx={{
              fontSize: 24,
              marginBottom: 3,
              marginTop: -15,
              fontWeight: 400
            }}>
            Choose a name for your game.
          </Typography>
          <StyledTextField
            autoComplete='off'
            variant='outlined'
            label="Game's name"
            onChange={e => room.setGameName(e.target.value)}
          />
          <StyledButton
            sx={{ fontSize: 24, padding: '0.4rem' }}
            autoCapitalize='none'
            variant='contained'
            color='primary'
            disabled={!room.gameName}
            onClick={() =>
              room.createRoom(user.username || '', room.gameName, user.clientId)
            }>
            Create game
          </StyledButton>
        </Box>
      )}

      {!room.gameStarted && room.roomId && room.gameName && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '3.5rem'
          }}>
          <Typography
            sx={{
              fontSize: 21,
              marginBottom: 4,
              marginTop: -15,
              fontWeight: 600
            }}>
            Choose your display name
          </Typography>
          <StyledTextField
            variant='outlined'
            label='Your display name'
            type='text'
            onChange={e => {
              user.setUsername(e.target.value);
            }}
            disabled={user.clientId !== undefined && user.clientId.length < 0}
          />

          <StyledButton
            sx={{ fontSize: 24, padding: '0.4rem' }}
            variant='contained'
            color='primary'
            disabled={!room.roomId || !user.username}
            onClick={room.handleChooseUsername}>
            Continue to game
          </StyledButton>
        </Box>
      )}

      {room.gameStarted && room.gameName && (
        <Board
          users={room.users}
          roomId={room.roomId}
          allowedReveal={user.allowedReveal}
          revealing={room.revealing}
          revealCards={user.revealCards}
          startNewVoting={user.startNewVoting}
          revealingTime={room.revealingTime}
          handleOpenInvite={handleOpenInvite}
        />
      )}

      {room.gameStarted && (
        <Votes
          users={room.users}
          reveal={room.revealing && room.revealingTime <= 0}
        />
      )}

      {!room.revealing && room.gameStarted && (
        <Cards
          revealing={room.revealing}
          roomId={room.roomId}
          clientId={user.clientId}
          fiboCards={room.fiboCards}
          handleCardSelect={user.handleCardSelect}
        />
      )}

      {room.revealing && room.revealingTime <= 0 && (
        <div className='card-container'>
          {room.cards &&
            room.cards.map(card => (
              <div
                key={card.card}
                className='card-vote-container'>
                <div className='card-vote'>{card.card}</div>
                <span className='vote-quantity'>
                  {card.quantity} {card.quantity > 1 ? 'Votes' : 'Vote'}
                </span>
              </div>
            ))}

          <div>
            {room.average !== undefined && room.average !== null && (
              <div className='average'>
                <p>Average:</p>
                <p className='average-number'>{room.average}</p>
              </div>
            )}

            {room.coffee && (
              <div className='coffee'>
                <p>Coffee time!</p>
                <span>☕</span>
              </div>
            )}
          </div>
        </div>
      )}

      <InviteModal
        open={openInvite}
        handleClose={handleCloseInvite}
      />

      <DrawerRight
        open={openDrawer}
        handleDrawerClose={handleDrawerClose}
        useIssue={issue}
        revealing={room.revealing}
        roomId={room.roomId}
      />
    </div>
  );
};

export default Game;
