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

interface Offset {
  latitudeOffsetMeters: number;
  longitudeOffsetMeters: number;
}

export function calculateNewCoordinates(
  startCoordinates: google.maps.LatLngLiteral,
  offset: Offset
): google.maps.LatLngLiteral {
  // Earth radius in meters
  const earthRadius = 6371000;

  // Convert latitude and longitude from degrees to radians
  const lat1 = (Math.PI / 180) * startCoordinates.lat;

  // Calculate new latitude
  const newLat =
    (180 / Math.PI) *
    Math.asin(
      Math.sin(lat1) * Math.cos(offset.latitudeOffsetMeters / earthRadius) +
        Math.cos(lat1) *
          Math.sin(offset.latitudeOffsetMeters / earthRadius) *
          Math.cos(0)
    );

  // Calculate new longitude
  const newLon =
    startCoordinates.lng +
    (180 / Math.PI) *
      (offset.longitudeOffsetMeters /
        earthRadius /
        Math.cos((Math.PI / 180) * startCoordinates.lat));

  return { lat: newLat, lng: newLon };
}
