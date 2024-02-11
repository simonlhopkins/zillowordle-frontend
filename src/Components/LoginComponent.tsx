import styled from 'styled-components';
import cat from '../assets/cat.jpg';
import { TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../slices/AuthSlice';

type LoginComponentProps = {};
export default function LoginComponent({}: LoginComponentProps) {
  const dispatch = useDispatch();
  return (
    <StyledLoginComponent>
      <img src={cat}></img>
      <TextField
        label="who is this"
        variant="filled"
        sx={{
          background: 'white'
        }}
        onChange={(e) => {
          if (e.target.value.toUpperCase() == 'ERIC') {
            dispatch(login());
          }
        }}
      />
    </StyledLoginComponent>
  );
}

const StyledLoginComponent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  img {
    width: 100%;
    height: auto;
  }
  background: url('https://i.pinimg.com/originals/62/c9/3a/62c93a4cf6462f54fdea6d735d927f9c.gif')
    repeat;
  background-size: 50%;
`;
