import { Loader } from '@googlemaps/js-api-loader';
import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { userMarkerMoved } from '../slices/GameSlice';
import { RootState } from '../store';

type GoogleMapComponentProps = {
  showHint: boolean;
};
const center: google.maps.LatLngLiteral = { lat: 37.0902, lng: -95.7129 };
function getLatLngFromMarker(
  marker: google.maps.Marker
): google.maps.LatLngLiteral {
  return { lat: marker.getPosition()!.lat(), lng: marker.getPosition()!.lng() };
}

const GoogleMapComponent = memo(({ showHint }: GoogleMapComponentProps) => {
  const map = useRef<google.maps.Map | null>(null);
  const userMarker = useRef<google.maps.Marker | null>(null);
  const houseMarker = useRef<google.maps.Marker | null>(null);
  const robotMarker = useRef<google.maps.Marker | null>(null);
  const hintCircle = useRef<google.maps.Circle | null>(null);
  const polyLine = useRef<google.maps.Polyline | null>(null);
  const blockMarker = useRef<boolean>(false);
  const initialized = useRef<boolean>(false);
  const mapDivRef = useRef<HTMLDivElement>(null);
  const userMarkerPos = useSelector(
    (state: RootState) => state.game.userMarker
  );
  const robotMarkerPos = useSelector(
    (state: RootState) => state.game.gameData?.aIGuess
  );
  const gameData = useSelector((state: RootState) => state.game.gameData);
  const houseMarkerPos = {
    lat: gameData?.zillowHouseData.latitude as number,
    lng: gameData?.zillowHouseData.longitude as number
  };
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);
  const isSolved = useSelector((state: RootState) => state.game.isSolved);

  const dispatch = useDispatch();

  useEffect(() => {
    const initializeMap = async () => {
      if (initialized.current) return;
      console.log('map initialized');
      initialized.current = true;
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        version: 'weekly',
        libraries: ['geometry']
      });

      loader.load().then(() => {
        if (!mapDivRef.current) {
          return console.error('No map div set by useGoogleMap()');
        }
        const newMap = new google.maps.Map(mapDivRef.current, {
          center,
          zoomControl: true,
          zoom: 3.5,
          zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
          },
          mapTypeControlOptions: {
            mapTypeIds: [
              google.maps.MapTypeId.ROADMAP,
              google.maps.MapTypeId.SATELLITE
            ]
          },
          // streetViewControl: false,
          fullscreenControl: false,
          styles: [
            {
              featureType: 'poi',
              stylers: [{ visibility: 'off' }]
            }
          ],
          gestureHandling: 'greedy'
        });

        robotMarker.current = new google.maps.Marker();
        robotMarker.current.setLabel('🤖');

        const newHouseMarker = new google.maps.Marker();
        newHouseMarker.setLabel('🏠');

        houseMarker.current = newHouseMarker;
        const newUserMarker = new google.maps.Marker();
        newUserMarker.setLabel('🤔');

        hintCircle.current = new google.maps.Circle();

        const radius = 1000000;
        const setHintCircleOffsetPos = () => {
          const newCenter = google.maps.geometry.spherical.computeOffset(
            houseMarkerPos,
            radius * Math.random(),
            Math.random() * 360
          );
          hintCircle.current!.setCenter(newCenter);
        };
        setHintCircleOffsetPos();

        hintCircle.current.setMap(newMap);
        hintCircle.current.setRadius(radius);
        hintCircle.current.set;
        hintCircle.current.setOptions({
          fillColor: 'transparent',
          clickable: false
        });
        //todo, if a value exists in localstorage for a placed user marker, then use that.
        if (userMarkerPos) {
          newUserMarker.setMap(newMap);
          newUserMarker.setPosition(userMarkerPos);
        }
        if (robotMarkerPos) {
          // robotMarker.current.setMap(newMap);
          robotMarker.current.setPosition(robotMarkerPos);
        }
        polyLine.current = new google.maps.Polyline();

        map.current = newMap;
        userMarker.current = newUserMarker;
        resetMapZoom();

        google.maps.event.addListener(newMap, 'click', (event: any) => {
          if (blockMarker.current) return;
          dispatch(
            userMarkerMoved({
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            })
          );
        });
        if (isSolved) fitBoundsToMarkers();
        setMapInitialized(true);
      });
    };

    initializeMap();
  }, []);

  const fitBoundsToMarkers = () => {
    console.log('fit map to bounds');

    if (!userMarkerPos)
      return console.error('Trying to fit markers before userMarker is set');
    const bounds = new google.maps.LatLngBounds(houseMarkerPos).extend(
      userMarkerPos
    );
    setTimeout(() => {
      if (robotMarkerPos) {
        bounds.extend(robotMarkerPos);
        map.current!.fitBounds(bounds);
      }
    }, 2000);
    map.current!.fitBounds(bounds);
  };
  if (mapInitialized) {
    if (userMarkerPos) {
      userMarker.current!.setMap(map.current);
      userMarker.current!.setPosition(userMarkerPos);
    } else {
      userMarker.current!.setMap(null);
    }
    if (robotMarkerPos) {
      // robotMarker.current!.setMap(map.current);
      robotMarker.current!.setPosition(robotMarkerPos);
    }
    hintCircle.current!.setVisible(showHint);
    houseMarker.current!.setPosition(houseMarkerPos);
    blockMarker.current = isSolved;
    if (isSolved) {
      houseMarker.current!.setMap(map.current);
      polyLine.current!.setMap(map.current);
      robotMarker.current!.setMap(map.current);
      polyLine.current!.setPath([
        getLatLngFromMarker(houseMarker.current as google.maps.Marker),
        getLatLngFromMarker(userMarker.current as google.maps.Marker)
      ]);
    } else {
      polyLine.current!.setMap(null);
      houseMarker.current!.setMap(null);
      robotMarker.current!.setMap(null);
    }
    if (isSolved) fitBoundsToMarkers();
  }

  const resetMapZoom = () => {
    if (!map.current) return;
    const _map = map.current;
    _map.setZoom(3.5);
    _map.setCenter(center);
  };
  return <StyledMapDiv ref={mapDivRef}></StyledMapDiv>;
});

const StyledMapDiv = styled.div`
  min-height: min(500px, 70%);
  flex: 1;
`;
export default GoogleMapComponent;
