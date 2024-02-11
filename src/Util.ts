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
