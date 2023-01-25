import {React, useEffect, useState, useRef} from "react";
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import axios from "axios";
import sidoList from "./sidoList.js";
import shelterList from "./shelterList.js";
import NaverMapAPI from "./naverMapAPI.js";
import Loading from "./img/loading.gif";

function Main()
{
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
    const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
    const [sidoCode, setSidoCode] = useState('');
    const [sigunIdx, setSigunIdx] = useState(0);
    const [sidoIdx, setIdx] = useState(0);
    const [shelterName, setShelterName] = useState('');
    const shelter = useRef([{name:'전체', address:'', placeArr:[], matrix:[{lng:'', lat:''}]}]);
    const [flag, setFlag] = useState(false);
    const newShelter = useRef([{name:'전체', address:'', placeArr:[], matrix:[{lng:'', lat:''}]}]);
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
            for (var i = 0; i < itemArr.length; i++) {
                tempShelter.push({ name: itemArr[i].careNm, address: itemArr[i].careAddr, placeArr: itemArr[i].orgNm.split(" ") });
            }
            shelter.current = [...shelter.current, ...tempShelter];
            shelter.current = shelter.current.filter(
                (arr, index, callback) => index === callback.findIndex(t => t.name === arr.name)
            );
            newShelter.current = [...shelter.current];
            console.log(response);
            searchAddressToCoordinate();
            setTimeout(()=>{setFlag(true)},2500);
        }
        dataLoad();
    },[SERVICE_KEY])
    
    return (
        <div>
            <select onChange={(e)=>{setIdx(e.target.value);}}>
            {
                sidoList.map((a,i)=>
                    i===0
                    ? <option value={0}>전체</option>
                    : <option value={sidoList[i].id}>{sidoList[i].name}</option>
                )
            }
            </select>
            <select onChange={(e)=>{setSidoCode(sidoList[sidoIdx].code); setSigunIdx(e.target.value);}}>
            {
                sidoList[sidoIdx].detail.map((a,i)=>
                <option value={i}>{sidoList[sidoIdx].detail[i]}</option>
                )
            }
            </select>
            <select onChange={(e)=>{setShelterName(e.target.value)}}>
            {
                shelter.current.map((a,i)=>
                i===0 ? <option value={''}>전체</option>
                : sidoList[sidoIdx].detail[sigunIdx] === shelter.current[i].placeArr[1] && sidoList[sidoIdx].name === shelter.current[i].placeArr[0]
                    ? <option value={shelter.current[i].name}>{shelter.current[i].name}</option>
                    : null
                )
            }
        </select>
            <div onClick={()=>{dataLoad(); setFlag(false);}}>유기동물 조회</div>
            <RenderAfterNavermapsLoaded
                ncpClientId={CLIENT_ID}
                error={<p>Maps Load Error</p>}
                loading={<p>Maps Loading...</p>}
                submodules={["geocoder"]}>
            {
                flag === true
                ? <NaverMapAPI newShelter={newShelter}/>
                : <img alt="loading" src={Loading}></img>
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
        for (let j = 0; j < itemArr.length; j++) {
            tempShelter.push({ name: itemArr[j].careNm, address: itemArr[j].careAddr, placeArr: itemArr[j].orgNm.split(" "), matrix:[{lng:'', lat:''}]});
        }
        newShelter.current = [...newShelter.current, ...tempShelter];
            newShelter.current = newShelter.current.filter(
                (arr, index, callback) => index === callback.findIndex(t => t.name === arr.name)
            );
        searchAddressToCoordinate();
        setTimeout(()=>{setFlag(true)},2000);
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