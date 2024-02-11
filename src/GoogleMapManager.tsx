import { Loader } from '@googlemaps/js-api-loader';

let map: google.maps.Map;
const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };
let userMarker: google.maps.Marker;
let houseMarker: google.maps.Marker;
let polyLine: google.maps.Polyline;
let blockMarker = false;

function getLatLngFromMarker(
  marker: google.maps.Marker
): google.maps.LatLngLiteral {
  return { lat: marker.getPosition()!.lat(), lng: marker.getPosition()!.lng() };
}

export function UserMarkerPlaced() {
  return userMarker && userMarker.getMap() != null;
}

export const InitMap = async (onClickCallback: () => void) => {
  const loader = new Loader({
    apiKey: 'AIzaSyBSK_GAlrJT67WahQ037_dNkZUX7T8cbdw',
    version: 'weekly',
    libraries: ['geometry']
  });
  loader.load().then(async () => {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });
    userMarker = new google.maps.Marker();
    userMarker.setLabel('🤔');
    houseMarker = new google.maps.Marker();
    houseMarker.setLabel('🏠');
    polyLine = new google.maps.Polyline();
    // var marker = new google.maps.Marker({
    //     position: currentMarker,
    //     map: map
    // });
    resetForNewGame();
    google.maps.event.addListener(map, 'click', function (event: any) {
      if (blockMarker) return;
      onClickCallback();
      userMarker.setMap(map);
      userMarker.setPosition(event.latLng);
    });
  });
};

export function resetForNewGame() {
  blockMarker = false;
  houseMarker.setMap(null);
  userMarker.setMap(null);
  polyLine.setMap(null);
  map.setCenter({ lat: 39.11276910853217, lng: -94.58812807069887 });
  map.setZoom(3.5);
}
export function setHouseMarkerPosition(lat: number, lng: number) {
  if (!houseMarker) return;
  houseMarker.setPosition({ lat, lng });
}

export function showSolvedMap() {
  console.log('showing solved');
  blockMarker = true;
  houseMarker.setMap(map);
  polyLine.setMap(map);
  const bounds = new google.maps.LatLngBounds(getLatLngFromMarker(houseMarker));

  if (userMarker.getMap() != null) {
    console.log('current marker exist');
    bounds.extend(getLatLngFromMarker(userMarker));
    polyLine.setPath([
      getLatLngFromMarker(houseMarker),
      getLatLngFromMarker(userMarker)
    ]);
  }
  map.fitBounds(bounds);
}

export function GetDistanceBetweenMarkers() {
  return (
    google.maps.geometry.spherical.computeDistanceBetween(
      getLatLngFromMarker(userMarker),
      getLatLngFromMarker(houseMarker)
    ) / 1000
  );
}
