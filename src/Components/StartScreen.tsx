import {
  Alert,
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography
} from '@mui/material';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FetchType, GameType } from '../App';
import axiosInstance from '../AxiosInstance';
import { AddFartShitty } from '../Util';
import ModernBaseball from '../assets/EmoHouseData/HolyGhostModernBaseball/ModernBaseball';
import americanFootball from '../assets/EmoHouseData/HolyGhostModernBaseball/americanFootball';
import charmer from '../assets/EmoHouseData/HolyGhostModernBaseball/charmer';
import {
  ManuallySetGameData,
  gameTypeChanged,
  newGame,
  resetState
} from '../slices/GameSlice';
import { AppThunkDispatch, RootState } from '../store';
import { CityData } from '../types';

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({}: StartScreenProps) {
  const navigate = useNavigate();
  const [fetchType, setFetchType] = useState(FetchType.NewHouse);
  const [cityData, setCityData] = useState<CityData[]>();
  const [searchCityData, setSearchCityData] = useState<CityData | null>(null);
  const [useSetLocation, setUseSetLocation] = useState<boolean>(false);

  const dispatch = useDispatch<AppThunkDispatch>();
  const gameType = useSelector((state: RootState) => state.game.gameType);
  const reduxError = useSelector((state: RootState) => state.game.error);
  const status = useSelector((state: RootState) => state.game.status);
  const zillowData = useSelector((state: RootState) => state.game.gameData);
  const [emoIndex, setEmoIndex] = useState(0);
  return (
    <StyledStartScreen>
      <Alert
        sx={{
          display: reduxError == null ? 'none' : 'initial',
          overflow: 'scroll',
          maxWidth: '100%'
        }}
        severity="error"
      >
        {reduxError}
      </Alert>

      <Typography variant="h1">Zilldle</Typography>
      <Button
        sx={{ display: import.meta.env.PROD ? 'none' : 'initial' }}
        size="large"
        variant="contained"
        disabled={status == 'loading'}
        onClick={async () => {
          dispatch(
            newGame({
              payload: {
                fetchType,
                cityData: searchCityData,
                gameType: gameType
              },
              type: ''
            })
          );
          navigate('/game');
        }}
      >
        {status == 'loading' ? 'Loading' : 'Fetch New House'}
      </Button>

      <Button
        size="large"
        variant="contained"
        onClick={async () => {
          dispatch(
            newGame({
              payload: {
                fetchType: FetchType.Daily,
                cityData: null,
                gameType: gameType
              },
              type: ''
            })
          );
          navigate('/game');
        }}
      >
        Daily
      </Button>
      <Button
        size="large"
        variant="contained"
        onClick={async () => {
          dispatch(
            newGame({
              payload: {
                fetchType: FetchType.Random,
                cityData: null,
                gameType: gameType
              },
              type: ''
            })
          );
          navigate('/game');
        }}
      >
        Random
      </Button>
      <Button
        size="large"
        variant="contained"
        onClick={async () => {
          const emoOptions = [ModernBaseball, charmer, americanFootball];
          dispatch(
            ManuallySetGameData(
              emoOptions[
                Math.min(
                  emoOptions.length - 1,
                  Math.floor((emoIndex / 100) * emoOptions.length)
                )
              ]
            )
          );
          navigate('/game');
        }}
      >
        Emo
      </Button>
      <Slider
        aria-label="Volume"
        value={emoIndex}
        sx={{ maxWidth: '200px' }}
        onChange={(_, newValue) => {
          setEmoIndex(newValue as number);
        }}
      />

      {zillowData != null && (
        <Button
          size="large"
          onClick={() => {
            navigate('/game');
          }}
          variant="contained"
        >
          Continue
        </Button>
      )}

      <Button
        onClick={() => {
          dispatch(resetState());
        }}
      >
        reset state
      </Button>

      {/* {hasResume && (
            <Button
              onClick={() => {
                navigate('/game');
              }}
              size="large"
              variant="contained"
            >
              Resume
            </Button>
          )} */}
      <StyledOptionsContainer>
        <FormControl
          sx={{ display: import.meta.env.PROD ? 'none' : 'initial' }}
        >
          <InputLabel id="fetch-type-label">Fetch Type</InputLabel>
          <Select
            labelId="fetch-type-label"
            value={fetchType}
            label="Fetch Type"
            onChange={(e) => {
              setFetchType(e.target.value as FetchType);
            }}
          >
            <MenuItem value={FetchType.CachedHouse}>Cached</MenuItem>
            <MenuItem value={FetchType.NewHouse}>New</MenuItem>
            <MenuItem value={FetchType.NewHouseAtLocation}>Location</MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="game-type-label">Game Type</InputLabel>
          <Select
            labelId="game-type-label"
            value={gameType}
            label="Game Type"
            onChange={(e) => {
              dispatch(gameTypeChanged(e.target.value as GameType));
            }}
          >
            <MenuItem value={GameType.Location}>Location</MenuItem>
            <MenuItem value={GameType.Price}>Price</MenuItem>
            <MenuItem value={GameType.Both}>Both</MenuItem>
          </Select>
        </FormControl>
      </StyledOptionsContainer>

      {fetchType == FetchType.NewHouseAtLocation && (
        <>
          {!cityData && (
            <Button
              onClick={() => {
                axiosInstance.get('/cities').then((response) => {
                  if (response.status == 200) {
                    const newCityData = response.data as CityData[];
                    AddFartShitty(newCityData);
                    setCityData(newCityData);
                    setSearchCityData(newCityData[0]);
                  }
                });
              }}
            >
              Fetch City Data
            </Button>
          )}
          <StyledOptionsContainer>
            {cityData && (
              <>
                <Autocomplete
                  disablePortal
                  disableClearable
                  disabled={!useSetLocation}
                  getOptionLabel={(item) => `${item.city}, ${item.state_id}`}
                  options={cityData.sort((a, b) =>
                    a.state_id.localeCompare(b.state_id)
                  )}
                  isOptionEqualToValue={(option, value) => option === value}
                  onChange={(_, newValue) => {
                    console.log(newValue);
                    setSearchCityData(newValue as CityData);
                  }}
                  groupBy={(option) => option.state_id}
                  sx={{ width: 300 }}
                  blurOnSelect
                  renderInput={(params) => (
                    <TextField {...params} label="City" />
                  )}
                />

                <Checkbox
                  checked={useSetLocation}
                  onChange={(e) => {
                    setUseSetLocation(e.target.checked);
                  }}
                />
              </>
            )}
          </StyledOptionsContainer>
        </>
      )}
    </StyledStartScreen>
  );
}

const StyledStartScreen = styled.div`
  height: 100%;
  width: 100%;
  background-color: aliceblue;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: scroll;
  gap: 1rem;
`;

const StyledOptionsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
