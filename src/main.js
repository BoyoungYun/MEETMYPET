import {React, useEffect, useState, useRef} from "react";
import axios from "axios";
import sidoList from "./sidoList.js";
import shelterList from "./shelterList.js";
function Main()
{
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
    const [sidoCode, setSidoCode] = useState('');
    const [sigunIdx, setSigunIdx] = useState(0);
    const [sidoIdx, setIdx] = useState(0);
    const [shelterName, setShelterName] = useState('');
    const shelter = useRef([{name:'전체', address:'', code:'', placeArr:[]}]);
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
            let newShelter = [];
            for (var i = 0; i < itemArr.length; i++) {
                newShelter.push({ name: itemArr[i].careNm, address: itemArr[i].careAddr, code: itemArr[i].desertionNo, placeArr: itemArr[i].orgNm.split(" ") });
            }
            shelter.current = [...shelter.current, ...newShelter];
            shelter.current = shelter.current.filter(
                (arr, index, callback) => index === callback.findIndex(t => t.name === arr.name)
            );
            console.log(response);
        }
        dataLoad();
    },[SERVICE_KEY])
    return (
        <>
            <select onChange={(e)=>{setIdx(e.target.value)}}>
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
            <div onClick={()=>{dataLoad();}}>유기동물 조회</div>
        </>
    );

    async function dataLoad()
    { 
        const sigunCode = sidoList[sidoIdx].detail_code[sigunIdx];
        let shelterCode='';
        for(var i=0; i<shelterList.length; i++)
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
        console.log(response);
    }
}
export default Main;