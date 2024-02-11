import { FetchType } from './App';
import { CityData } from './types';
import axiosInstance from './AxiosInstance.js';

export function FetchZillowHouse(
  fetchType: FetchType,
  cityData: CityData | null
) {
  switch (fetchType) {
    case FetchType.CachedHouse:
      if (import.meta.env.VITE_API_URL_PROD) {
        return FetchRandomZillowHouse();
      } else {
        return FetchCachedZillowHouse();
      }
    case FetchType.NewHouse:
      return FetchNewRandomZillowHouse();
    case FetchType.NewHouseAtLocation:
      return FetchNewZillowHouseAtLocation(cityData);
    case FetchType.Daily:
      return FetchDailyZillowHouse();
    case FetchType.Random:
      return FetchRandomZillowHouse();
  }
}

async function FetchDailyZillowHouse() {
  return axiosInstance.get(`/zillow/daily`);
}

async function FetchRandomZillowHouse() {
  return axiosInstance.get(`/zillow/random`);
}

//dev

async function FetchCachedZillowHouse() {
  return axiosInstance.get(`/zillow-dev/cached-house`);
}

async function FetchNewRandomZillowHouse() {
  return axiosInstance.get(`/zillow-dev/new-house/random`);
}

async function FetchNewZillowHouseAtLocation(cityData: CityData | null) {
  if (cityData) {
    return axiosInstance.get(`/zillow-dev/new-house/location`, {
      params: { city: cityData.city, state: cityData.state_id }
    });
  } else {
    return FetchNewRandomZillowHouse();
  }
}
