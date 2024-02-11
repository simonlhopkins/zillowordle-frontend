import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';
import { GameDataType } from '../slices/GameSlice';
import useGoogleMap from '../hooks/useGoogleMap';
import { styled } from '@mui/material';
type EndGameComponentProps = { gameData: GameDataType };
export default function EndGameComponent({ gameData }: EndGameComponentProps) {
  const isSolved = useSelector((state: RootState) => state.game.isSolved);
  const { mapDivRef } = useGoogleMap({
    houseMarkerPos: {
      lat: gameData.zillowHouseData.latitude,
      lng: gameData.zillowHouseData.longitude
    }
  });

  if (!isSolved) {
    return <Navigate to={'/'}></Navigate>;
  }
  return (
    <StyledEndGameComponent>
      <div
        ref={mapDivRef}
        style={{
          width: '400px',
          height: '400px'
        }}
      ></div>
    </StyledEndGameComponent>
  );
}

const StyledEndGameComponent = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
