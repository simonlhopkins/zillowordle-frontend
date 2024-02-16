import styled from 'styled-components';
import { formatNumberWithCommas } from '../Util';
import { ZillowHouseDataType } from '../slices/GameSlice';
import ChecklistComponent from './ChecklistComponent';

type ZillowHouseDataProps = {
  gameData: ZillowHouseDataType;
};

export function ZillowHouseData({ gameData }: ZillowHouseDataProps) {
  const checklist: string[] = [
    '"live laugh love" core sign',
    'truck',
    'palm tree',
    'jacuzzi',
    'family picture',
    'millennial flooring',
    'stuffed animals',
    'floor plan',
    'body of water',
    'snow',
    'wood burning fireplace',
    'evergreen tree',
    'blue chair',
    'towel over window',
    'ohio',
    'fake furniture',
    'cat',
    'man cave',
    'Dolls',
    'clock',
    'Bricks',
    'Holiday decorations',
    'public park',
    'live animal'
  ];
  return (
    <StyledZillowHouseData>
      <table>
        <tbody>
          <tr>
            <td>Price</td>
            <td>${formatNumberWithCommas(gameData.price)}</td>
          </tr>
          <tr>
            <td>bedrooms</td>
            <td>{gameData.bedrooms || 'N/A'}</td>
          </tr>
          <tr>
            <td>bathrooms</td>
            <td>{gameData.bathrooms}</td>
          </tr>
          <tr>
            <td>year built</td>
            <td>{gameData.yearBuilt}</td>
          </tr>
          <tr>
            <td>living area</td>
            <td>{gameData.livingArea} sq ft</td>
          </tr>
          <tr>
            <td>lot size</td>
            <td>{gameData.lotSize} sq ft</td>
          </tr>

          {gameData.scores && (
            <>
              <tr>
                <td colSpan={2}>Scores</td>
              </tr>
              <tr>
                <td>walk score</td>
                <td>{gameData.scores.walkScore}</td>
              </tr>
              <tr>
                <td>bike score</td>
                <td>{gameData.scores.bikeScore}</td>
              </tr>
              <tr>
                <td>transit score</td>
                <td>{gameData.scores.transitScore}</td>
              </tr>
            </>
          )}
        </tbody>
      </table>

      <ChecklistComponent checklist={checklist} />
    </StyledZillowHouseData>
  );
}

const StyledZillowHouseData = styled.div`
  padding: 20px;
  font-size: 1.3rem;
  color: white;
  overflow: scroll;
  table,
  td {
    border: 1px solid white;
    border-collapse: collapse;
    border-spacing: 0;
    padding: 5px;
    white-space: nowrap;
  }
`;
