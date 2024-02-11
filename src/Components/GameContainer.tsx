import { useState } from 'react';
import { MapComponent } from './MapComponent';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  styled
} from '@mui/material';

import { FetchType, GameType } from '../App';
import ImageContainer from './ImageContainer';
import FullScreenImage from './FullScreenImage';
import useGoogleMap from '../hooks/useGoogleMap';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../store';
import { newGame, gameFinished, GameDataType } from '../slices/GameSlice';

//chat poopoopee
function formatNumberToTwoDecimals(number: number): string {
  // Check if the number is valid
  if (isNaN(number)) {
    return 'Invalid number';
  }

  // Round the number to two decimal places
  const roundedNumber = Math.round(number * 100) / 100;

  // Convert the rounded number to a string
  const formattedNumber = roundedNumber.toFixed(2);

  return formattedNumber;
}
type GameContainerProps = { gameData: GameDataType };

export function GameContainer({ gameData }: GameContainerProps) {
  const [showEndGameDialogue, setShowEndGameDialogue] = useState(false);
  const [imageToExpand, setImageToExpand] = useState<string | null>(null);

  const dispatch = useDispatch<AppThunkDispatch>();
  const endGameData = useSelector((state: RootState) => state.game.endGameData);
  const { fitBoundsToMarkers, mapDivRef, hasPlacedMarker } = useGoogleMap({
    houseMarkerPos: {
      lat: gameData.zillowHouseData.latitude,
      lng: gameData.zillowHouseData.longitude
    }
  });
  const onSubmit = () => {
    // showSolved();
    fitBoundsToMarkers();
    dispatch(gameFinished());
    setShowEndGameDialogue(true);
    // navigate('/game/endGame');
  };

  return (
    <StyledGameContainer>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          display: 'flex',
          padding: '10px',
          flexDirection: 'column',
          boxSizing: 'border-box',
          pointerEvents: 'none'
        }}
      >
        {/* <ZillowHouseDataDropdown
          zillowGameData={gameData.zillowHouseData}
          gameType={gameType}
        /> */}
        <MapComponent
          onSubmit={onSubmit}
          hasPlacedMarker={hasPlacedMarker}
          gameData={gameData}
          onInfoButton={() => {
            setShowEndGameDialogue(true);
          }}
          ref={mapDivRef}
        />
      </div>
      <Typography align="center" variant="h2">
        House Price💰: ${gameData.zillowHouseData.price}
      </Typography>
      <div className="ImageContainer">
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
      </div>
      {/* <div className={`MapContainer ${mapExpanded && 'expanded'}`}></div> */}
      {imageToExpand != null && (
        <FullScreenImage
          url={imageToExpand}
          onClose={() => {
            setImageToExpand(null);
          }}
        />
      )}
      {endGameData && (
        <Dialog
          onClose={() => {
            setShowEndGameDialogue(false);
          }}
          open={showEndGameDialogue}
        >
          <DialogTitle>Nice Job!!</DialogTitle>
          <DialogContent>
            <Typography>The house was</Typography>
            <Typography variant="body2">
              {gameData.zillowHouseData.streetAddress}
            </Typography>
            <Typography variant="body2">
              {gameData.zillowHouseData.city}, {gameData.zillowHouseData.state}
            </Typography>

            <Typography>
              You were {formatNumberToTwoDecimals(endGameData.distance)}
              km away
            </Typography>
            <Typography>
              <a
                target="blank"
                href={gameData.zillowHouseData.zillowHouseUrl as string}
              >
                Link to Zillow
              </a>
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(
                  newGame({
                    payload: {
                      fetchType: FetchType.CachedHouse,
                      cityData: null,
                      gameType: GameType.Location
                    },
                    type: ''
                  })
                );
              }}
            >
              Play Again
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </StyledGameContainer>
  );
}

const StyledGameContainer = styled('div')`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  flex: 1;
  .InfoContainer {
    flex-basis: 0;
    position: relative;
    flex-shrink: 0;
    overflow: hidden;
    &.expanded {
      flex-basis: 100px;
    }
    transition: flex-basis 800ms;
  }
  .ImageMapContainer {
    display: flex;
    flex: 1;
    overflow: hidden;
    position: relative;
    background-color: black;
    color: white;
  }
  @media (max-width: 767px) {
    /* Apply styles for screens with a maximum width of 767px (typical for phones) */
    .ImageMapContainer {
      flex-direction: column;
    }
  }
  .MapContainer {
    flex-basis: 0%;
    position: relative;
    height: 100%;
    &.expanded {
      flex-basis: 60%;
    }
    transition: flex-basis 800ms;
  }

  .ImageContainer {
    overflow-y: scroll;
    position: relative;
    height: 100%;
    flex: 1;
    img {
      width: 100%;
    }
  }
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
