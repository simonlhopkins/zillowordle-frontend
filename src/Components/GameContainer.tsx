import { useState } from 'react';
import { MapComponent } from './MapComponent';

import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { GameDataType, gameFinished } from '../slices/GameSlice';
import { AppThunkDispatch } from '../store';
import FullScreenImage from './FullScreenImage';
import ImageContainer from './ImageContainer';

type GameContainerProps = { gameData: GameDataType };

export function GameContainer({ gameData }: GameContainerProps) {
  const [imageToExpand, setImageToExpand] = useState<string | null>(null);

  const dispatch = useDispatch<AppThunkDispatch>();

  const onSubmit = () => {
    // showSolved();
    dispatch(gameFinished());

    // navigate('/game/endGame');
  };

  return (
    <StyledGameContainer>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          padding: '20px',
          flexDirection: 'column',
          boxSizing: 'border-box',
          pointerEvents: 'none'
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative'
          }}
        >
          <MapComponent onSubmit={onSubmit} gameData={gameData} />
        </div>
      </div>

      <StyledImageWrapper>
        <ImageContainer
          onImgClicked={(url: string) => {
            setImageToExpand(url);
          }}
          images={
            gameData.classifiedImages ||
            gameData.zillowHouseData.images.map((url: string) => ({
              url,
              labels: []
            }))
          }
        />
      </StyledImageWrapper>
      {imageToExpand != null && (
        <FullScreenImage
          url={imageToExpand}
          onClose={() => {
            setImageToExpand(null);
          }}
        />
      )}
    </StyledGameContainer>
  );
}
const StyledImageWrapper = styled.div`
  /* overflow-y: scroll; */
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const StyledGameContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  flex: 1;
  .InfoButton {
    left: 40px;
    top: 40px;
  }
  .MapButton {
    right: 40px;
    bottom: 40px;
    transition: opacity 800ms;
  }
`;
