import { ThemeProvider, createTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GameContainerWrapper from './Components/GameContainerWrapper';
import LoginComponent from './Components/LoginComponent';
import StartScreen from './Components/StartScreen';
import ericPic from './assets/eric.jpg';
import { RootState } from './store';

export enum FetchType {
  CachedHouse = 1,
  NewHouse,
  NewHouseAtLocation,
  Daily,
  Random
}

export enum GameType {
  Location = 1,
  Price,
  Both
}

export type GameConfig = {
  gameType: GameType;
};

//dude where's my house
function App() {
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  return (
    <ThemeProvider theme={theme}>
      <StyledApp>
        <div style={{ maxWidth: '1080px', width: '100%', height: '100%' }}>
          <BrowserRouter>
            {loggedIn ? (
              <Routes>
                <Route path="/" element={<StartScreen onStart={() => {}} />} />
                <Route path="/game/*" element={<GameContainerWrapper />} />
              </Routes>
            ) : (
              <LoginComponent />
            )}
          </BrowserRouter>
        </div>
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  background: url(${ericPic});
  background-size: 20%;
  overflow: hidden;
`;

['#2AA4BF', '#BFF29B', '#F2E963', '#F2F0D8', '#F28749'];
const primary = {
  main: '#2AA4BF',
  // light: '#34CBED',
  // dark: '#196273',
  contrastText: '#fff'
};
const secondary = {
  main: '#F2E963'
  // light: '#34CBED',
  // dark: '#196273',
};
const error = {
  main: '#F28749',
  // light: '#F28749',
  // dark: '#F28749',
  contrastText: '#fff'
};

const theme = createTheme({
  palette: {
    primary: primary,
    secondary: secondary,
    background: { paper: '#F2F0D8' },
    action: {
      disabledOpacity: 1,
      disabled: error.contrastText,
      disabledBackground: error.main
    }
  }
});

export default App;
