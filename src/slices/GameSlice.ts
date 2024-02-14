import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InferType, array, number, object, string } from 'yup';
import { FetchType } from '../App';
import { FetchZillowHouse } from '../FetchZillowHouse';
import { GetDistanceBetweenCoords } from '../Util';
import { CityData } from '../types';

const zillowHouseDataSchema = object()
  .required('Zillow house is required')
  .shape({
    latitude: number().required(),
    longitude: number().required(),
    images: array().required().of(string().required().url()),
    streetAddress: string().required(),
    city: string().required(),
    state: string().required(),
    zillowHouseUrl: string().url().required(),
    price: number().required(),
    bedrooms: number(),
    bathrooms: number(),
    yearBuilt: number(),
    livingArea: number().nullable(),
    lotSize: string(),
    scores: object()
      .shape({
        walkScore: number().nullable(),
        bikeScore: number().nullable(),
        transitScore: number().nullable()
      })
      .optional()
  });

export const gameDataSchema = object({
  zillowHouseData: zillowHouseDataSchema,
  aIGuess: object()
    .nullable()
    .shape({
      lat: number().required('ai guess Latitude is required'),
      lng: number().required('ai guess Longitude is required')
    }),
  classifiedImages: array()
    .nullable()
    .of(
      object().shape({
        url: string().required().url('Invalid URL'),
        labels: array()
          .required()
          .of(string().required())
          .required('Invalid labels')
      })
    )
});

export type EndGameData = {
  playerDistance: number;
  AIDistance: number | null;
};

export type GameDataType = InferType<typeof gameDataSchema>;
export type ZillowHouseDataType = InferType<typeof zillowHouseDataSchema>;

interface GameState {
  gameData: GameDataType | null;
  gameType: GameType;
  userMarker: google.maps.LatLngLiteral | null;
  isSolved: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  endGameData: EndGameData | null;
}
export enum GameType {
  Location = 1,
  Price,
  Both
}

const initGameData: GameState = {
  gameData: null,
  gameType: GameType.Location,
  userMarker: null,
  isSolved: false,
  status: 'idle',
  error: null,
  endGameData: null
};

const newGame = createAsyncThunk(
  'game/newGame',
  async (
    {
      payload
    }: PayloadAction<{
      fetchType: FetchType;
      cityData: CityData | null;
      gameType: GameType;
    }>,
    { rejectWithValue }
  ) => {
    try {
      const response = await FetchZillowHouse(
        payload.fetchType,
        payload.cityData
      );
      try {
        const recievedData = await gameDataSchema.validate(response!.data);
        return {
          gameData: recievedData,
          gameType: payload.gameType
        };
      } catch (err: any) {
        console.log(err);
        return rejectWithValue(
          'The incoming fetch object was not what we expected: ' + err.name
        );
      }
    } catch (e: any) {
      if (e.response) {
        console.log(e.response);
        return rejectWithValue(JSON.stringify(e.response.data));
      } else {
        return rejectWithValue('No response from server');
      }
    }
  }
);
export { newGame };

const GameSlice = createSlice({
  name: 'game',
  initialState: initGameData,
  reducers: {
    gameFinished: (state) => {
      state.isSolved = true;
      state.endGameData = {
        playerDistance: GetDistanceBetweenCoords(
          state.userMarker as google.maps.LatLngLiteral,
          {
            lat: state.gameData!.zillowHouseData.latitude,
            lng: state.gameData!.zillowHouseData.longitude
          }
        ),
        AIDistance: state.gameData?.aIGuess
          ? GetDistanceBetweenCoords(
              state.gameData?.aIGuess as google.maps.LatLngLiteral,
              {
                lat: state.gameData!.zillowHouseData.latitude,
                lng: state.gameData!.zillowHouseData.longitude
              }
            )
          : null
      };
    },
    gameTypeChanged: (state, { payload }: PayloadAction<GameType>) => {
      state.gameType = payload;
    },
    resetState: () => {
      return initGameData;
    },
    onMapClicked: (
      state,
      { payload }: PayloadAction<google.maps.LatLngLiteral>
    ) => {
      state.userMarker = payload;
    },
    ManuallySetGameData: (state, { payload }: PayloadAction<GameDataType>) => {
      state.status = 'succeeded';
      state.gameData = payload;
      state.gameType = GameType.Location;
      state.isSolved = false;
      state.userMarker = null;
      state.endGameData = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(newGame.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.gameData = null;
        state.endGameData = null;
      })
      .addCase(
        newGame.fulfilled,
        (
          state,
          {
            payload
          }: PayloadAction<{
            gameData: InferType<typeof gameDataSchema>;
            gameType: GameType;
          }>
        ) => {
          state.status = 'succeeded';
          state.gameData = payload.gameData;
          state.gameType = payload.gameType;
          state.isSolved = false;
          state.userMarker = null;
        }
      )
      .addCase(newGame.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export const {
  gameFinished,
  gameTypeChanged,
  resetState,
  onMapClicked,
  ManuallySetGameData
} = GameSlice.actions;

export default GameSlice.reducer;
