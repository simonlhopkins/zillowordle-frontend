import { Button, ButtonGroup, Slider, Tooltip, styled } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import { forwardRef, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import InfoIcon from '@mui/icons-material/Info';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { useDispatch, useSelector } from 'react-redux';
import { AppThunkDispatch, RootState } from '../store';
import { GameDataType, newGame } from '../slices/GameSlice';
import { FetchType, GameType } from '../App';

enum MapSize {
  SMALL,
  MED,
  LARGE
}
type MapComponentProps = {
  onSubmit: () => void;
  onInfoButton: () => void;
  hasPlacedMarker: boolean;
  gameData: GameDataType;
};

export const MapComponent = forwardRef<HTMLDivElement, MapComponentProps>(
  ({ onSubmit, hasPlacedMarker, onInfoButton }, ref) => {
    const [currentMapSize, setCurrentMapSize] = useState<MapSize>(
      MapSize.SMALL
    );
    const [expandedMapSize, setExpandedMapSize] = useState<MapSize>(
      MapSize.MED
    );
    const [mapPinned, setMapPinned] = useState(false);
    const [mapHidden, setMapHidden] = useState(false);
    const [infoHidden, setInfoHidden] = useState(true);
    const [resizeTimeoutID, setResizeTimeoutID] =
      useState<NodeJS.Timeout | null>(null);
    const resizeTimeoutLength = 1000;
    const isSolved = useSelector((state: RootState) => state.game.isSolved);
    const gameType = useSelector((state: RootState) => state.game.gameType);
    const dispatch = useDispatch<AppThunkDispatch>();
    return (
      <StyledMapContainerDiv
        mapHidden={mapHidden}
        mapSize={currentMapSize}
        onMouseEnter={() => {
          if (resizeTimeoutID) {
            clearTimeout(resizeTimeoutID);
          }
          if (currentMapSize == MapSize.SMALL) {
            setCurrentMapSize(expandedMapSize);
          }
        }}
        onMouseLeave={() => {
          if (!mapPinned) {
            const newResizeTimeoutId = setTimeout(() => {
              setCurrentMapSize(MapSize.SMALL);
            }, resizeTimeoutLength);
            setResizeTimeoutID(newResizeTimeoutId);
          }
        }}
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Tooltip
            title={mapPinned ? 'Unpin Map' : 'Pin Map'}
            placement="top"
            enterDelay={700}
          >
            <Button
              variant="contained"
              onClick={() => {
                setMapPinned((prev) => !prev);
              }}
            >
              <PushPinIcon
                style={{
                  transform: `rotate(${mapPinned ? '0' : '-90'}deg)`,
                  transition: 'transform 300ms'
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip
            title={expandedMapSize == MapSize.LARGE ? 'medium' : 'large'}
            placement="top"
            enterDelay={700}
          >
            <Button
              onClick={() => {
                if (expandedMapSize == MapSize.LARGE) {
                  setExpandedMapSize(MapSize.MED);
                  setCurrentMapSize(MapSize.MED);
                } else if (expandedMapSize == MapSize.MED) {
                  setExpandedMapSize(MapSize.LARGE);
                  setCurrentMapSize(MapSize.LARGE);
                }
              }}
            >
              {expandedMapSize == MapSize.LARGE ? (
                <CloseFullscreenIcon
                  style={{
                    transform: `rotate(90deg)`
                  }}
                />
              ) : (
                <OpenInFullIcon
                  style={{
                    transform: `rotate(90deg)`
                  }}
                />
              )}
            </Button>
          </Tooltip>
          <Button
            onClick={() => {
              setMapHidden(!mapHidden);
            }}
          >
            {mapHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </Button>
          {isSolved && (
            <Button
              onClick={() => {
                setInfoHidden(!infoHidden);
                onInfoButton();
              }}
            >
              <InfoIcon />
            </Button>
          )}
        </ButtonGroup>
        <StyledMapDiv
          mapHidden={mapHidden}
          mapSize={currentMapSize}
          ref={ref}
        ></StyledMapDiv>

        {gameType == GameType.Price && (
          <Slider
            aria-label="Temperature"
            defaultValue={30}
            color="secondary"
          />
        )}
        {isSolved ? (
          <Button
            variant="contained"
            onClick={() => {
              console.log('play again');

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
        ) : (
          <Button
            onClick={onSubmit}
            disabled={!hasPlacedMarker}
            variant="contained"
            sx={{
              width: '100%'
            }}
          >
            {hasPlacedMarker ? 'Guess' : 'Place Your Pin on the Map'}
          </Button>
        )}
      </StyledMapContainerDiv>
    );
  }
);
const GetHeightFromMapSize = (mapSize: MapSize) => {
  switch (mapSize) {
    case MapSize.SMALL:
      return '30%';
    case MapSize.MED:
      return '50%';
    case MapSize.LARGE:
      return '100%';
  }
};
const GetWidthFromMapSize = (mapSize: MapSize) => {
  switch (mapSize) {
    case MapSize.SMALL:
      return '30%';
    case MapSize.MED:
      return '60%';
    case MapSize.LARGE:
      return '100%';
  }
};

const StyledMapDiv = styled('div')<{ mapSize: MapSize; mapHidden: boolean }>`
  flex: 1;
`;
const StyledMapContainerDiv = styled('div')<{
  mapSize: MapSize;
  mapHidden: boolean;
}>`
  /* min-height: 400px; */
  max-width: 100%;
  max-height: 100%;
  flex-basis: ${(props) =>
    props.mapHidden ? '0' : GetHeightFromMapSize(props.mapSize)};
  /* min-height: ${(props) =>
    props.mapHidden ? '0' : GetHeightFromMapSize(props.mapSize)}; */
  min-width: 100%;
  @media only screen and (min-width: 768px) {
    min-width: ${(props) =>
      props.mapHidden ? '0' : GetWidthFromMapSize(props.mapSize)};
  }
  right: 0px;
  bottom: 0px;
  padding: 10px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  z-index: 3;
  pointer-events: all;
  align-self: flex-end;
  justify-self: flex-end;
  margin-top: auto;
  transition:
    min-height 300ms,
    flex-basis 300ms,
    min-width 300ms;
`;
