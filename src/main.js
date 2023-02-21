import { React, useEffect, useState, useRef } from "react";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import axios from "axios";
import sidoList from "./sidoList.js";
import shelterList from "./shelterList.js";
import NaverMapAPI from "./naverMapAPI.js";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Main() {
  const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
  const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const [sigunIdx, setSigunIdx] = useState(0);
  const [sidoIdx, setIdx] = useState(0);
  const [shelterName, setShelterName] = useState("");
  const shelter = useRef([
    {
      name: "전체",
      address: "",
      code: "",
      tel: "",
      placeArr: [],
      matrix: [{ lng: "", lat: "" }],
    },
  ]);
  const [flag, setFlag] = useState(false);
  const newShelter = useRef([
    {
      name: "전체",
      address: "",
      code: "",
      tel: "",
      placeArr: [],
      matrix: [{ lng: "", lat: "" }],
    },
  ]);
  const data = useRef([]);
  useEffect(() => {
    async function dataLoad() {
      const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${SERVICE_KEY}`;
      let response = await axios.get(url, {
        params: {
          pageNo: 1,
          numOfRows: 1000,
          _type: "json",
        },
      });
      let itemArr = response.data.response.body.items.item;
      response = await axios.get(url, {
        params: {
          pageNo: 2,
          numOfRows: 1000,
          _type: "json",
        },
      });
      itemArr = [...itemArr, ...response.data.response.body.items.item];
      let tempShelter = [];
      for (let i = 0; i < itemArr.length; i++) {
        for (let j = 0; j < shelterList.length; j++) {
          if (
            shelterList[j].name === itemArr[i].careNm &&
            shelterList[j].org_Nm === itemArr[i].orgNm
          ) {
            tempShelter.push({
              name: itemArr[i].careNm,
              code: shelterList[j].code,
              address: itemArr[i].careAddr,
              tel: itemArr[i].officetel,
              placeArr: itemArr[i].orgNm.split(" "),
              matrix: [{ lng: "", lat: "" }],
            });
          }
        }
      }
      data.current = [...data.current, ...itemArr];
      shelter.current = [...shelter.current, ...tempShelter];
      shelter.current = shelter.current.filter(
        (arr, index, callback) =>
          index === callback.findIndex((t) => t.code === arr.code)
      );
      newShelter.current = [...shelter.current];
      searchAddressToCoordinate();
      setTimeout(() => {
        setFlag(true);
      }, 5000);
    }
    dataLoad();
  }, [SERVICE_KEY]);
  const [sidoTitle, setSidoTitle] = useState("시/도");
  const [sigunTitle, setSigunTitle] = useState("시/군/구");
  const [shelterTitle, setShelterTitle] = useState("보호센터");
  return (
    <div>
      {flag === true ? (
        <>
          <div className="headline mt-4">MEETMYPET</div>
          <div className="headline_sub">
            <span>유기동물 지도조회 서비스</span>
          </div>
          <DropdownButton
            style={{ display: "inline-block" }}
            className="dropDown mx-1"
            id="dropdown-basic-button"
            title={sidoTitle}
            onSelect={(eventKey) => {
              setIdx(eventKey);
            }}
          >
            {sidoList.map((a, i) =>
              i === 0 ? (
                <Dropdown.Item as="button" eventKey={0}>
                  <div
                    onClick={() => {
                      setSidoTitle("전체");
                    }}
                  >
                    전체
                  </div>
                </Dropdown.Item>
              ) : (
                <Dropdown.Item eventKey={sidoList[i].id}>
                  <div
                    onClick={() => {
                      setSidoTitle(sidoList[i].name);
                    }}
                  >
                    {sidoList[i].name}
                  </div>
                </Dropdown.Item>
              )
            )}
          </DropdownButton>
          <DropdownButton
            style={{ display: "inline-block" }}
            className="dropDown mx-1"
            id="dropdown-basic-button"
            title={sigunTitle}
            onSelect={(eventKey) => {
              setSigunIdx(eventKey);
            }}
          >
            {sidoList[sidoIdx].detail.map((a, i) => (
              <Dropdown.Item eventKey={i}>
                <div
                  onClick={() => {
                    setSigunTitle(sidoList[sidoIdx].detail[i]);
                  }}
                >
                  {sidoList[sidoIdx].detail[i]}
                </div>
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            style={{ display: "inline-block" }}
            className="dropDown mx-1"
            id="dropdown-basic-button"
            title={shelterTitle}
            onSelect={(eventKey) => {
              setShelterName(eventKey);
            }}
          >
            {shelter.current.map((a, i) =>
              i === 0 ? (
                <Dropdown.Item eventKey={""}>
                  <div
                    onClick={() => {
                      setShelterTitle("전체");
                    }}
                  >
                    전체
                  </div>
                </Dropdown.Item>
              ) : sidoList[sidoIdx].detail[sigunIdx] ===
                  shelter.current[i].placeArr[1] &&
                sidoList[sidoIdx].name === shelter.current[i].placeArr[0] ? (
                <Dropdown.Item eventKey={shelter.current[i].name}>
                  <div
                    onClick={() => {
                      setShelterTitle(shelter.current[i].name);
                    }}
                  >
                    {shelter.current[i].name}
                  </div>
                </Dropdown.Item>
              ) : null
            )}
          </DropdownButton>
          <Button variant="outline-primary" className="mx-1 mt-2 mb-2">
            <div
              className="dropDown"
              onClick={() => {
                dataLoad();
                setFlag(false);
              }}
            >
              유기동물 조회
            </div>
          </Button>
        </>
      ) : null}
      <RenderAfterNavermapsLoaded
        ncpClientId={CLIENT_ID}
        error={<p>Maps Load Error</p>}
        submodules={["geocoder"]}
      >
        {flag === true ? (
          <NaverMapAPI newShelter={newShelter} data={data} />
        ) : (
          <div className="my-5 py-5">
            <div className="headline mt-5 py-3">MEETMYPET</div>
            <div className="headline_sub">
              <span>유기동물 지도조회 서비스</span>
            </div>
            <img alt="loading" src="/images/loading.gif"></img>
            <div className="headline_sub">
              <span>지도 로딩 중...</span>
            </div>
          </div>
        )}
      </RenderAfterNavermapsLoaded>
    </div>
  );

  async function dataLoad() {
    let pageNo = 1;
    let numOfRows = 1000;
    let sidoCode = sidoList[sidoIdx].code;
    let sigunCode = sidoList[sidoIdx].detail_code[sigunIdx];

    newShelter.current = [
      {
        name: "전체",
        address: "",
        tel: "",
        placeArr: [],
        matrix: [{ lng: "", lat: "" }],
      },
    ];
    data.current = [];

    let shelterCode = "";
    for (let i = 0; i < shelterList.length; i++) {
      if (
        shelterName === shelterList[i].name &&
        sigunCode === shelterList[i].org_cd
      ) {
        shelterCode = shelterList[i].code;
      }
    }
    const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${SERVICE_KEY}`;
    let response = await axios.get(url, {
      params: {
        upr_cd: sidoCode,
        org_cd: sigunCode,
        care_reg_no: shelterCode,
        pageNo: pageNo,
        numOfRows: numOfRows,
        state: "notice",
        _type: "json",
      },
    });
    let itemArr = response.data.response.body.items.item;
    if (sidoIdx === 0) {
      response = await axios.get(url, {
        params: {
          upr_cd: sidoCode,
          org_cd: sigunCode,
          care_reg_no: shelterCode,
          pageNo: 2,
          numOfRows: numOfRows,
          state: "notice",
          _type: "json",
        },
      });
      itemArr = [...itemArr, ...response.data.response.body.items.item];
    }
    let tempShelter = [];
    for (let i = 0; i < itemArr.length; i++) {
      for (let j = 0; j < shelterList.length; j++) {
        if (
          shelterList[j].name === itemArr[i].careNm &&
          shelterList[j].org_Nm === itemArr[i].orgNm
        ) {
          tempShelter.push({
            name: itemArr[i].careNm,
            code: shelterList[j].code,
            tel: itemArr[i].officetel,
            address: itemArr[i].careAddr,
            placeArr: itemArr[i].orgNm.split(" "),
          });
        }
      }
    }
    data.current = [...data.current, ...itemArr];
    newShelter.current = [...newShelter.current, ...tempShelter];
    newShelter.current = newShelter.current.filter(
      (arr, index, callback) =>
        index === callback.findIndex((t) => t.name === arr.name)
    );
    searchAddressToCoordinate();
    setTimeout(() => {
      setFlag(true);
    }, 3000);
  }
  function searchAddressToCoordinate() {
    const navermaps = window.naver.maps;
    const tempMatrix = [
      {
        name: "보성유기동물보호센터",
        lng: "127.065306247",
        lat: "34.830044004",
      },
      {
        name: "유기동물임시보호센터",
        lng: "126.781226058",
        lat: "34.331872997",
      },
      { name: "삼척시동물보호센터", lng: "129.21957696", lat: "37.359297145" },
      { name: "늘푸른동물병원", lng: "126.738388227", lat: "37.522709653" },
      { name: "창녕 유기동물보호소", lng: "128.5298266", lat: "35.571881" },
      {
        name: "대구시수의사회(동인)",
        lng: "128.60968014",
        lat: "35.868390999",
      },
    ];
    for (let i = 1; i < newShelter.current.length; i++) {
      navermaps.Service.geocode(
        {
          query: newShelter.current[i].address,
        },
        function (status, response) {
          if (status === navermaps.Service.Status.ERROR) {
            if (!newShelter.current[i].address) {
              return alert("Geocode Error, Please check address");
            }
            return alert(
              "Geocode Error, address:" + newShelter.current[i].address
            );
          }

          if (response.v2.meta.totalCount === 0) {
            for (let j = 0; j < tempMatrix.length; j++) {
              if (tempMatrix[j].name === newShelter.current[i].name) {
                newShelter.current[i].matrix = {
                  lng: tempMatrix[j].lng,
                  lat: tempMatrix[j].lat,
                };
              }
            }
          } else {
            let item = response.v2.addresses[0];
            newShelter.current[i].matrix = {
              lng: item.x,
              lat: item.y,
            };
          }
        }
      );
    }
  }
}
export default Main;
