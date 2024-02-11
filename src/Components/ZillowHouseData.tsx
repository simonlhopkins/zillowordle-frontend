import { List, ListItemText } from '@mui/material';
import styled from 'styled-components';

type ZillowHouseDataProps = {
  data: any;
};

export function ZillowHouseData({ data }: ZillowHouseDataProps) {
  console.log('render');
  return (
    <StyledZillowHouseData>
      <div className="statsContainer">
        <List>
          {/* <ListItemText>{`city: ${data.city}`}</ListItemText> */}
          <ListItemText>{`price: ${data.price}`}</ListItemText>
          <ListItemText>{`bedrooms: ${data.bedrooms}`}</ListItemText>
          <ListItemText>{`bathrooms: ${data.bathrooms}`}</ListItemText>
          <ListItemText>{`yearBuilt: ${data.yearBuilt}`}</ListItemText>
          {/* <ListItemText>{`streetAddress: ${data.streetAddress}`}</ListItemText> */}
          <ListItemText>{`walk score: ${data.scores.walkScore}`}</ListItemText>
          <ListItemText>{`bike score: ${data.scores.bikeScore}`}</ListItemText>
          <ListItemText>{`transit score: ${data.scores.transitScore}`}</ListItemText>
          <ListItemText>{`zestimate: ${data.zestimate}`}</ListItemText>
          <ListItemText>{`rentZestimate: ${data.rentZestimate}`}</ListItemText>
          <ListItemText>{`daysOnZillow: ${data.daysOnZillow}`}</ListItemText>
          <ListItemText>{`livingArea: ${data.livingArea}sq ft`}</ListItemText>
          <ListItemText>
            {`zillowHouseUrl: `}
            <a href={data.zillowHouseUrl}>here</a>
          </ListItemText>
        </List>
      </div>

      <div className="imgContainer">
        {data.images.map((url: string, i: number) => (
          <img key={i} src={url}></img>
        ))}
      </div>
    </StyledZillowHouseData>
  );
}

const StyledZillowHouseData = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  > div {
    flex: 1;
    overflow: scroll;
  }
  .imgContainer {
    flex: 2;
    img {
      max-width: 100%;
      border: 5px solid black;
      align-self: center;
      box-sizing: border-box;
    }
  }
`;
