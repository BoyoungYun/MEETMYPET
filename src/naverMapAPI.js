import * as React from 'react';
import { NaverMap, Marker } from 'react-naver-maps';

function NaverMapAPI({newShelter}) {
    const navermaps = window.naver.maps;
    return (
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%', // 네이버지도 가로 길이
          height: '70vh' // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 35.954722, lng: 127.865306247 }} // 지도 초기 위치
        defaultZoom={7} // 지도 초기 확대 배율
        >
        {
            newShelter.current.map((a,i)=>
            <Marker
            key={newShelter.current[i].name}
            title={newShelter.current[i].name}
            position={new navermaps.LatLng(newShelter.current[i].matrix.lat, newShelter.current[i].matrix.lng)}
            animation={2}
            onClick={() => {
                alert("여기는 N서울타워입니다!");
              }}
            icon={{
                content:
                `<img src="/images/pets.png"/>`
            }}/>
            )
        }
        
        </NaverMap>
    );
  };

  export default React.memo(NaverMapAPI);