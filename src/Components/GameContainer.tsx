import { useState } from 'react';
import { MapComponent } from './MapComponent';

import Confetti from 'react-confetti';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameDataType, gameFinished } from '../slices/GameSlice';
import { AppThunkDispatch, RootState } from '../store';
import FullScreenImage from './FullScreenImage';
import ImageContainer from './ImageContainer';

type GameContainerProps = { gameData: GameDataType };

export function GameContainer({ gameData }: GameContainerProps) {
  const [imageToExpand, setImageToExpand] = useState<string | null>(null);

  const dispatch = useDispatch<AppThunkDispatch>();
  const isSolved = useSelector((state: RootState) => state.game.isSolved);

  const onSubmit = () => {
    dispatch(gameFinished());
  };

  return (
    <StyledGameContainer>
      {isSolved && (
        <Confetti recycle={false} numberOfPieces={500} style={{ zIndex: 4 }} />
      )}

      <MapComponent onSubmit={onSubmit} gameData={gameData} />

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
