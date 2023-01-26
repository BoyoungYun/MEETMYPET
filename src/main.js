import {React, useEffect, useState, useRef} from "react";
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import axios from "axios";
import sidoList from "./sidoList.js";
import shelterList from "./shelterList.js";
import NaverMapAPI from "./naverMapAPI.js";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Main()
{
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
    const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const [sidoCode, setSidoCode] = useState('');
    const [sigunIdx, setSigunIdx] = useState(0);
    const [sidoIdx, setIdx] = useState(0);
    const [shelterName, setShelterName] = useState('');
    const shelter = useRef([{name:'전체', address:'', code:'', placeArr:[], matrix:[{lng:'', lat:''}]}]);
    const [flag, setFlag] = useState(false);
    const newShelter = useRef([{name:'전체', address:'', code:'', placeArr:[], matrix:[{lng:'', lat:''}]}]);
    useEffect(()=>{
        async function dataLoad()
        {
            const url = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${SERVICE_KEY}`;
            const response = await axios.get(url, {
                params: {
                    pageNo: 3,
                    numOfRows: 1000,
                    _type: "json"
                }
            });
            let itemArr = response.data.response.body.items.item;
            let tempShelter = [];
            for (let i = 0; i < itemArr.length; i++) {
                for(let j=0; j<shelterList.length; j++)
                {
                    if(shelterList[j].name===itemArr[i].careNm && shelterList[j].org_Nm===itemArr[i].orgNm)
                    {
                        tempShelter.push({ name: itemArr[i].careNm, code: shelterList[j].code, address: itemArr[i].careAddr, placeArr: itemArr[i].orgNm.split(" ") });
                    }
                }
            }
            shelter.current = [...shelter.current, ...tempShelter];
            shelter.current = shelter.current.filter(
                (arr, index, callback) => index === callback.findIndex(t => t.code === arr.code)
            );
            newShelter.current = [...shelter.current];
            console.log(response);
            console.log(newShelter);
            searchAddressToCoordinate();
            setTimeout(()=>{setFlag(true)},3000);
        }
        dataLoad();
    },[SERVICE_KEY])
    const [sidoTitle, setSidoTitle] = useState('시/도');
    const [sigunTitle, setSigunTitle] = useState('시/군/구');
    const [shelterTitle, setShelterTitle] = useState('보호센터');
    return (
        <div>
                <div className="headline mt-4">FINDPETMAP</div>
                <div className="headline_sub"><span>유기동물 지도조회 서비스</span></div>
            {
                flag === true
                ? 
                <>
                <DropdownButton style={{display:'inline-block'}} className="dropDown mx-1 mt-1" id="dropdown-basic-button" title={sidoTitle} onSelect={(eventKey)=>{setIdx(eventKey);}}>
                {
                    sidoList.map((a,i)=>
                        i===0
                        ? <Dropdown.Item as="button" eventKey={0}><div onClick={()=>{setSidoTitle('전체')}}>전체</div></Dropdown.Item>
                        : <Dropdown.Item eventKey={sidoList[i].id}><div onClick={()=>{setSidoTitle(sidoList[i].name)}}>{sidoList[i].name}</div></Dropdown.Item>
                    )
                }
                </DropdownButton>
                <DropdownButton style={{display:'inline-block'}} className="dropDown mx-1" id="dropdown-basic-button" title={sigunTitle} onSelect={(eventKey)=>{setSidoCode(sidoList[sidoIdx].code); setSigunIdx(eventKey);}}>
                {
                    sidoList[sidoIdx].detail.map((a,i)=>
                    <Dropdown.Item eventKey={i}><div onClick={()=>{setSigunTitle(sidoList[sidoIdx].detail[i])}}>{sidoList[sidoIdx].detail[i]}</div></Dropdown.Item>
                    )
                }
                </DropdownButton>        
                <DropdownButton style={{display:'inline-block'}} className="dropDown mx-1" id="dropdown-basic-button" title={shelterTitle} onSelect={(eventKey)=>{setShelterName(eventKey);}}>
                {
                    shelter.current.map((a,i)=>
                    i===0 ? <Dropdown.Item eventKey={''}><div onClick={()=>{setShelterTitle('전체')}}>전체</div></Dropdown.Item>
                    : sidoList[sidoIdx].detail[sigunIdx] === shelter.current[i].placeArr[1] && sidoList[sidoIdx].name === shelter.current[i].placeArr[0]
                        ? <Dropdown.Item eventKey={shelter.current[i].name}><div onClick={()=>{setShelterTitle(shelter.current[i].name)}}>{shelter.current[i].name}</div></Dropdown.Item>
                        : null
                    )
                }
            </DropdownButton>
            <Button variant="outline-primary" className="mx-1"><div className="dropDown" onClick={()=>{dataLoad(); setFlag(false);}}>유기동물 조회</div></Button>
            <div className="mt-3"></div>
            
            </>
            : null
            }
            <RenderAfterNavermapsLoaded
                ncpClientId={CLIENT_ID}
                error={<p>Maps Load Error</p>}
                submodules={["geocoder"]}>
            {
                flag === true
                ? <NaverMapAPI newShelter={newShelter}/>
                : 
                <>
                <img alt="loading" src="/images/loading.gif"></img>
                <div className="headline_sub"><span>지도 로딩 중...</span></div>
                </>
            }
            </RenderAfterNavermapsLoaded>
        </div>
    );

    async function dataLoad()
    { 
        newShelter.current = [{name:'전체', address:'', placeArr:[], matrix:[{lng:'', lat:''}]}];
        const sigunCode = sidoList[sidoIdx].detail_code[sigunIdx];
        let shelterCode='';
        for(let i=0; i<shelterList.length; i++)
        {
            if(shelterName === shelterList[i].name && sigunCode === shelterList[i].org_cd)
            {
                shelterCode=shelterList[i].code;
            }
        }
        const url = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${SERVICE_KEY}`;
        const response = await axios.get(url, {
            params: {
                upr_cd: sidoCode,
                org_cd: sigunCode,
                care_reg_no: shelterCode,
                pageNo: 1,
                numOfRows: 10,
                _type: "json"
            }
        });
        let itemArr = response.data.response.body.items.item;
        let tempShelter = [];
        for (let i = 0; i < itemArr.length; i++) {
            for(let j=0; j<shelterList.length; j++)
            {
                if(shelterList[j].name===itemArr[i].careNm && shelterList[j].org_Nm===itemArr[i].orgNm)
                {
                    tempShelter.push({ name: itemArr[i].careNm, code: shelterList[j].code, address: itemArr[i].careAddr, placeArr: itemArr[i].orgNm.split(" ") });
                }
            }
        }
        newShelter.current = [...newShelter.current, ...tempShelter];
            newShelter.current = newShelter.current.filter(
                (arr, index, callback) => index === callback.findIndex(t => t.name === arr.name)
            );
        searchAddressToCoordinate();
        setTimeout(()=>{setFlag(true)},3000);
        console.log(response);
    }
      function searchAddressToCoordinate()
      {
          const navermaps = window.naver.maps;
          const tempMatrix = [{lng:'127.065306247', lat:'34.830044004'},{lng:'126.781226058', lat:'34.331872997'},{lng:'129.21957696', lat:'37.359297145'},
          {lng:'128.5298266', lat:'35.571881'},{lng:'128.60968014', lat:'35.868390999'}];
          for(let i=1; i<newShelter.current.length; i++)
          {
              navermaps.Service.geocode(
                  {
                      query: newShelter.current[i].address
                  },
                  function (status, response) {
                        if (status === navermaps.Service.Status.ERROR) {
                            if (!newShelter.current[i].address) {
                                return alert('Geocode Error, Please check address');
                            }
                            return alert('Geocode Error, address:' + newShelter.current[i].address);
                        }
        
                        if (response.v2.meta.totalCount === 0) {
                            newShelter.current[i].matrix = {
                                lng: tempMatrix[0].lng,
                                lat: tempMatrix[0].lat,
                            };
                            tempMatrix.shift();
                        }
                        else
                        {
                            let item = response.v2.addresses[0];
                            newShelter.current[i].matrix = {
                                lng: item.x,
                                lat: item.y,
                        }
                      };
                  },
              );
          }
      };
}
export default Main;