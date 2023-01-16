import React from "react";
import axios from "axios";
function Main()
{
    const SERVICE_KEY = process.env.REACT_APP_SERVICE_KEY;
    return (
        <div onClick={()=>dataLoad()}>
            데이터 표시 중...
        </div>
    );

    async function dataLoad()
    {
        const url = `https://apis.data.go.kr/1543061/abandonmentPublicSrvc/sido?serviceKey=${SERVICE_KEY}`;
        const response = await axios.get(url, {
            params: {
                numOfRows: 3,
                pageNo: 1,
                _type: "json"
            }
        });
        console.log(response);
    }
}
export default Main;