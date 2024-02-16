import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import PushPinIcon from '@mui/icons-material/PushPin';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button, ButtonGroup, Slider, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FetchType, GameType } from '../App';
import { GameDataType, newGame } from '../slices/GameSlice';
import { AppThunkDispatch, RootState } from '../store';
import EndGameComponent from './EndGameComponent';
import GoogleMapComponent from './GoogleMapComponent';
import { ZillowHouseData } from './ZillowHouseData';
enum MapSize {
  SMALL,
  MED,
  LARGE
}
type MapComponentProps = {
  onSubmit: () => void;
  gameData: GameDataType;
};

export const MapComponent = ({ onSubmit, gameData }: MapComponentProps) => {
  const [currentMapSize, setCurrentMapSize] = useState<MapSize>(MapSize.SMALL);
  const [expandedMapSize, setExpandedMapSize] = useState<MapSize>(MapSize.MED);
  const [mapPinned, setMapPinned] = useState(false);
  const [mapHidden, setMapHidden] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [resizeTimeoutID, setResizeTimeoutID] = useState<NodeJS.Timeout | null>(
    null
  );
  const resizeTimeoutLength = 1000;
  const isSolved = useSelector((state: RootState) => state.game.isSolved);
  const gameType = useSelector((state: RootState) => state.game.gameType);
  const hasPlacedMarker =
    useSelector((state: RootState) => state.game.userMarker) != null;
  const dispatch = useDispatch<AppThunkDispatch>();
  const endGameData = useSelector((state: RootState) => state.game.endGameData);
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        flexDirection: 'column',
        boxSizing: 'border-box',
        zIndex: 3,
        pointerEvents: currentMapSize === MapSize.LARGE ? 'all' : 'none'
      }}
      onClick={() => {
        if (currentMapSize == MapSize.LARGE) {
          setCurrentMapSize(MapSize.MED);
          setExpandedMapSize(MapSize.MED);
        }

        // console.log(isFullscreenRef.current);
      }}
    >
      <StyledMapContainerDiv
        $mapHidden={mapHidden}
        $mapSize={currentMapSize}
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
          aria-label="outlined primary button group"
          sx={{
            marginTop: 'auto',
            alignSelf: 'flex-start'
          }}
        >
          <Tooltip
            title={mapPinned ? 'Unpin Map' : 'Pin Map'}
            placement="top"
            enterDelay={300}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
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
            enterDelay={300}
          >
            <Button
              variant="contained"
              onClick={(e) => {
                e.stopPropagation();
                console.log('button');
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
            variant="contained"
            onClick={(e) => {
              e.stopPropagation();
              setMapHidden(!mapHidden);
            }}
          >
            {mapHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </Button>
          <Tooltip title={'toggle hint'} placement="top" enterDelay={300}>
            <Button
              variant="contained"
              onClick={() => {
                setShowHint(!showHint);
              }}
            >
              <PsychologyAltIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <div style={{ position: 'relative', flex: '1' }}>
          <StyledBodyContents
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <GoogleMapComponent showHint={showHint} />

            {endGameData ? (
              <EndGameComponent
                endGameData={endGameData}
                zillowHouseData={gameData.zillowHouseData}
              />
            ) : (
              <div>
                <ZillowHouseData gameData={gameData.zillowHouseData} />
              </div>
            )}
          </StyledBodyContents>
        </div>
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
            onClick={() => {
              onSubmit();
              setMapPinned(true);
              setExpandedMapSize(MapSize.LARGE);
              setCurrentMapSize(MapSize.LARGE);
              setMapHidden(false);
            }}
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
    </div>
  );
};

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
      return '40%';
    case MapSize.MED:
      // return 'max(50%, 300px)';
      return '100%';
    case MapSize.LARGE:
      return '100%';
  }
};
const StyledBodyContents = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (min-width: 768px) {
    /* For desktop: */
    flex-direction: row;
  }
  /* flex-wrap: wrap; */
  position: absolute;
  width: 100%;
  height: 100%;
  transition: max-height 300ms;
  background-color: black;
  color: white;
  overflow: scroll;
`;

const StyledMapContainerDiv = styled.div<{
  $mapSize: MapSize;
  $mapHidden: boolean;
}>`
  padding: 10px;
  position: absolute;
  min-height: ${(props) =>
    props.$mapHidden ? '0%' : GetHeightFromMapSize(props.$mapSize)};
  min-width: ${(props) =>
    props.$mapHidden ? '0%' : GetWidthFromMapSize(props.$mapSize)};
  @media only screen and (max-width: 600px) {
    min-width: 100%;
  }
  max-width: 100%;
  right: 0px;
  bottom: 0px;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  pointer-events: all;
  transition:
    min-height 300ms,
    flex-basis 300ms,
    min-width 300ms;
`;
