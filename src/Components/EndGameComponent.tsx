import styled from 'styled-components';
import { formatNumberToTwoDecimals } from '../Util';
import { EndGameData, ZillowHouseDataType } from '../slices/GameSlice';
type EndGameComponentProps = {
  endGameData: EndGameData;
  zillowHouseData: ZillowHouseDataType;
};
export default function EndGameComponent({
  endGameData,
  zillowHouseData
}: EndGameComponentProps) {
  let feedback;
  if (endGameData.playerDistance < 200) {
    feedback = 'Great Job 🥳';
  } else if (endGameData.playerDistance < 500) {
    feedback = 'Nice Try 👏';
  } else {
    feedback = 'Woof 🐶';
  }

  const AIWon =
    endGameData.AIDistance &&
    endGameData.playerDistance >= endGameData.AIDistance;
  let playerTextClass = '';
  let AITextClass = '';
  if (endGameData.AIDistance) {
    playerTextClass = AIWon ? 'AILoser' : 'AIWinner';
    AITextClass = AIWon ? 'AIWinner' : 'AILoser';
  }
  return (
    <StyledEndGameComponent>
      <StyledWrapper>
        <h1>{feedback}!</h1>
        <h2>
          You were{' '}
          <span className={playerTextClass}>
            {formatNumberToTwoDecimals(endGameData.playerDistance)} km{' '}
          </span>
          away!
        </h2>
        {endGameData.AIDistance && (
          <>
            <h2>
              the AI was{' '}
              <span className={AITextClass}>
                {formatNumberToTwoDecimals(endGameData.AIDistance)} km{' '}
              </span>
              away!
            </h2>
            {!AIWon ? <h2>You beat the AI</h2> : <h2>the AI beat you!!</h2>}
          </>
        )}

        <h2>{zillowHouseData.streetAddress}</h2>
        <h2>
          {zillowHouseData.city}, {zillowHouseData.state}
        </h2>
        <a href={zillowHouseData.zillowHouseUrl}>
          <h2>🔗 Zillow</h2>
        </a>
      </StyledWrapper>
    </StyledEndGameComponent>
  );
}

const StyledWrapper = styled.div`
  border: 5px white outset;
  box-shadow: 10px 5px 5px red;
  padding: 5px;
`;

const StyledEndGameComponent = styled.div`
  margin: auto;
  width: fit-content;
  padding: 5px;
  margin: 10px;
  overflow: scroll;
  @media only screen and (max-width: 768px) {
    overflow: initial;
  }
  .AILoser {
    color: red;
  }
  .AIWinner {
    color: green;
  }
  iframe {
    min-height: 400px;
  }
`;
