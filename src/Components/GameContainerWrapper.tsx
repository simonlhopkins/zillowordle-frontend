import { CircularProgress } from '@mui/material';
import { GameContainer } from './GameContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { GameDataType } from '../slices/GameSlice';
import styled from 'styled-components';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function GameContainerWrapper() {
  const gameData = useSelector((state: RootState) => state.game.gameData);
  const status = useSelector((state: RootState) => state.game.status);
  switch (status) {
    case 'idle':
      return <Navigate to={'/'}></Navigate>;
    case 'loading':
      return (
        <StyledLoadingContainer>
          <CircularProgress size={'300px'} />
        </StyledLoadingContainer>
      );
    case 'succeeded':
      return (
        <Routes>
          <Route
            path="/"
            element={<GameContainer gameData={gameData as GameDataType} />}
          />
        </Routes>
      );

    case 'failed':
      return <Navigate to={'/'}></Navigate>;
  }
}

const StyledLoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
