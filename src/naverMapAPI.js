import * as React from "react";
import { useState } from "react";
import { NaverMap, Marker } from "react-naver-maps";
import Modal from "react-bootstrap/Modal";

function NaverMapAPI({ newShelter, data }) {
  const navermaps = window.naver.maps;
  const [lgShow, setLgShow] = useState(false);
  const [idx, setIdx] = useState(0);
  return (
    <>
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: "100%", // 네이버지도 가로 길이
          height: "70vh", // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 35.754722, lng: 127.865306247 }} // 지도 초기 위치
        defaultZoom={7} // 지도 초기 확대 배율
      >
        {newShelter.current.map((a, i) => (
          <Marker
            key={newShelter.current[i].name}
            title={newShelter.current[i].name}
            position={
              new navermaps.LatLng(
                newShelter.current[i].matrix.lat,
                newShelter.current[i].matrix.lng
              )
            }
            animation={0}
            onClick={() => {
              setLgShow(true);
              setIdx(i);
            }}
            icon={{
              content: `<img src="/images/pets.png"/>`,
            }}
          />
        ))}
      </NaverMap>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="mx-auto modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {newShelter.current[idx].name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <h6 className="mt-5 mb-3"><b>{newShelter.current[idx].name}</b></h6>
        <h6 className="mb-3">주소 : {newShelter.current[idx].address}</h6>
        <h6 className="mb-5">전화번호 : {newShelter.current[idx].tel}</h6>
          {data.current.map((a, i) =>
            data.current[i].careNm === newShelter.current[idx].name ? (
              <>
                <h5 className="mt-3 mb-5">
                  <b>{data.current[i].noticeNo}</b>
                </h5>
                <img
                  alt="file"
                  src={data.current[i].filename}
                  className="mb-5"
                />
                {data.current[i].sexCd === "M" ? (
                  <h6 className="mb-3">
                    품종 : {data.current[i].kindCd} / 성별 : 남
                  </h6>
                ) : (
                  <h6 className="mb-3">
                    품종 : {data.current[i].kindCd} / 성별 : 여
                  </h6>
                )}
                <h6 className="mb-3">
                  털색 : {data.current[i].colorCd} / 체중 :{" "}
                  {data.current[i].weight}
                </h6>
                <h6 className="mb-3">나이 : {data.current[i].age}</h6>
                <h6 className="mb-3">발견 : {data.current[i].happenPlace}</h6>
                <h6 className="mb-3">특징 : {data.current[i].specialMark}</h6>
                <h6 className="mb-3">접수 : {data.current[i].happenDt}</h6>
                <h6 className="mb-3">
                  공고 : {data.current[i].noticeSdt}~{data.current[i].noticeEdt}
                </h6>
                <h6 className="mb-5">관할 : {data.current[i].orgNm}</h6>
              </>
            ) : null
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default React.memo(NaverMapAPI);
