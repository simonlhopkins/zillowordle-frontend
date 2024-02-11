import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  styled
} from '@mui/material';
import { GameType } from '../App';

type ZillowHouseDataDropdownProps = {
  zillowGameData: { [key: string]: string | number | string[] };
  gameType: GameType;
  show: boolean;
};
//chat poopoopee
function formatUSD(number: number): string {
  // Check if the number is valid
  if (isNaN(number)) {
    return 'Invalid number';
  }

  // Use the toLocaleString method with the 'en-US' locale and 'currency' style
  const formattedUSD = number.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formattedUSD;
}
export default function ZillowHouseDataDropdown({
  zillowGameData,
  gameType,
  show
}: ZillowHouseDataDropdownProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: show ? '100%' : '0px', transition: 'max-width 300ms' }}
    >
      <StyledTable
        sx={{
          fontSize: '4rem'
        }}
        aria-label="simple table"
      >
        <TableBody>
          {gameType == GameType.Location ? (
            <TableRow>
              <TableCell>price</TableCell>
              <TableCell align="right">
                {formatUSD(zillowGameData.price as number)}
              </TableCell>
            </TableRow>
          ) : (
            <>
              <TableRow>
                <TableCell>address</TableCell>
                <TableCell align="right">
                  {zillowGameData.streetAddress}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>city</TableCell>
                <TableCell align="right">{zillowGameData.city}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>state</TableCell>
                <TableCell align="right">{zillowGameData.state}</TableCell>
              </TableRow>
            </>
          )}

          <TableRow>
            <TableCell>year built</TableCell>
            <TableCell align="right">{zillowGameData.yearBuilt}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>living area</TableCell>
            <TableCell align="right">
              {zillowGameData.livingArea} sq ft
            </TableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
    </TableContainer>
  );
}
const StyledTable = styled(Table)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  backgroundColor: theme.palette.secondary.main,
  left: 0,
  // marginTop: '100px',
  padding: '10px',
  zIndex: 2,
  pointerEvents: 'all',
  alignSelf: 'end',
  justifySelf: 'center'
}));
