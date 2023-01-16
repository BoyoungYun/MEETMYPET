import {React, useState} from "react";
import axios from "axios";
import sidoList from "./sidoList.js";
function Main()
{
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
    const [sidoCode, setSidoCode] = useState('');
    const [sigunCode, setSigunCode] = useState('');
    const [sidoFlag, setSidoFlag] = useState(false);
    const [sidoIdx, setIdx] = useState(0);
    return (
        <>
            <select onChange={(e)=>{setIdx(e.target.value); setSidoFlag(true)}}>
            {
                sidoList.map((a,i)=>
                    <option value={sidoList[i].id}>{sidoList[i].name}</option>
                )
            }
            </select>
            {
                sidoFlag===true
                ? <select onChange={(e)=>{setSidoCode(sidoList[sidoIdx].code); setSigunCode(e.target.value);}}>
                    {
                        sidoList[sidoIdx].detail.map((a,i)=>
                        <option value={sidoList[sidoIdx].detail_code[i]}>{sidoList[sidoIdx].detail[i]}</option>
                        )
                    }
                </select>
                : null
            }
            <div onClick={()=>{dataLoad()}}>보호소 조회</div>
        </>
    );

    async function dataLoad()
    {
        const url = `http://apis.data.go.kr/1543061/abandonmentPublicSrvc/shelter?serviceKey=${SERVICE_KEY}`;
        const response = await axios.get(url, {
            params: {
                upr_cd: sidoCode,
                org_cd: sigunCode,
                _type: "json"
            }
        });
        console.log(response);
    }
}
export default Main;