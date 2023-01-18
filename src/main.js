import {React, useEffect, useState, useRef} from "react";
import axios from "axios";
import sidoList from "./sidoList.js";
function Main()
{
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
    const [sidoCode, setSidoCode] = useState('');
    const [sigunCode, setSigunCode] = useState('');
    const [sigunIdx, setSigunIdx] = useState(0);
    const [shelterCode, setShelterCode] = useState('');
    const [sidoIdx, setIdx] = useState(0);
    const shelter = useRef([{name:'전체', address:'', code:'', placeArr:[]}]);
    useEffect(()=>{
        async function dataLoad()
        {
            const url = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${SERVICE_KEY}`;
            const response = await axios.get(url, {
                params: {
                    upr_cd: sidoCode,
                    org_cd: sigunCode,
                    care_reg_no: shelterCode,
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
            let shelterbyadd = shelter.current.sort((a,b) => {
                if(a.address > b.address) return 1;
                if(a.address < b.address) return -1;
                return 0;
              });
            console.log(shelterbyadd);
            console.log(response);

        }
        dataLoad();
    },[])
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
            <select onChange={(e)=>{setShelterCode(e.target.value)}}>
            {
                shelter.current.map((a,i)=>
                i===0 ? <option value={''}>전체</option>
                : sidoList[sidoIdx].detail[sigunIdx] === shelter.current[i].placeArr[1]
                    ? <option value={shelter.current[i].code}>{shelter.current[i].name}</option>
                    : null
                )
            }
        </select>
            <div onClick={()=>{dataLoad();}}>유기동물 조회</div>
        </>
    );

    async function dataLoad()
    { 
        console.log(sidoCode);
        console.log(sidoList[sidoIdx].detail_code[sigunIdx]);
        console.log(shelterCode);
        const url = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/abandonmentPublic?serviceKey=${SERVICE_KEY}`;
        const response = await axios.get(url, {
            params: {
                upr_cd: sidoCode,
                org_cd: sidoList[sidoIdx].detail_code[sigunIdx],
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