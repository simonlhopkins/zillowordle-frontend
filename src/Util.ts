import { CityData } from './types';

export function AddFartShitty(cityData: CityData[]) {
  cityData.push({
    city: 'Fart Shitty',
    city_ascii: '',
    state_id: 'Pootah',
    state_name: '',
    county_fips: '',
    county_name: '',
    lat: '',
    lng: '',
    population: '',
    density: '',
    source: '',
    military: '',
    incorporated: '',
    timezone: '',
    ranking: '',
    zips: '',
    id: ''
  });
}

export function GetDistanceBetweenCoords(
  from: google.maps.LatLngLiteral,
  to: google.maps.LatLngLiteral
) {
  return google.maps.geometry.spherical.computeDistanceBetween(from, to) / 1000;
}

export function formatNumberWithCommas(numberToFormat: number): string {
  // Use Intl.NumberFormat to format the number with commas
  return new Intl.NumberFormat().format(numberToFormat);
}

//chat poopoopee
export function formatNumberToTwoDecimals(number: number): string {
  // Check if the number is valid
  if (isNaN(number)) {
    return 'Invalid number';
  }

  // Round the number to two decimal places
  const roundedNumber = Math.round(number * 100) / 100;

  // Convert the rounded number to a string
  const formattedNumber = roundedNumber.toFixed(2);

  return formattedNumber;
}
//chat poo poo pee
export function mapRange(
  value: number,
  fromMin: number,
  fromMax: number,
  toMin: number,
  toMax: number
): number {
  // Ensure the value is within the original range
  const clampedValue = Math.max(Math.min(value, fromMax), fromMin);

  // Calculate the percentage of the value within the original range
  const percentage = (clampedValue - fromMin) / (fromMax - fromMin);

  // Map the percentage to the new range and return the result
  return toMin + percentage * (toMax - toMin);
}
