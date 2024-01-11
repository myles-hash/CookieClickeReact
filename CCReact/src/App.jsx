import { useState, useEffect } from "react";

export default function App () {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);

  useEffect(() => {
    const cookieInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + 1);
    }, 1000 /cps)
    return() => {
      clearInterval(cookieInterval);
    };
  },[cps])

  function increaseCps(){
    setCps(cps+1);
  }

  return (
    <div>
      <p>Cookies : {cookies}</p>
      <p>Cookies per second : {cps}</p>
      <button onClick={increaseCps}>Buy Upgrade</button>
    </div>
  )
}
