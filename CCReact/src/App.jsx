import { useState, useEffect } from "react";

export default function App () {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [purchasedItems, setPurchasedItmes] = useState([]);

  const upgradeShop =[
    {name:"Item1",cost: 100, cpsShop: 2},
    {name:"Item2",cost: 500, cpsShop: 4},
    {name:"Item3",cost: 1000, cpsShop: 10},
    {name:"Item4",cost: 10000, cpsShop: 100},
    {name:"Item5",cost: 1000000, cpsShop: 10000},
  ];

  const secretSpotUpgrade = { name: "Secret Spot", cost : 0, cpsShop: 1000};

  useEffect(() => {
    const cookieInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + cps);
    }, 1000 /cps)
    return() => {
      clearInterval(cookieInterval);
    };
  },[cps])


  function cookiesPlusOne (){
    setCookies(cookies + 1);
  }


  function increaseCpsShop(item){
    const newCookies = cookies - item.cost;
    if (newCookies >= 0) {
      const newPurchasedItems = {
        ...purchasedItems,
        [item.name]: (purchasedItems[item.name] || 0) + 1
      };

      setCookies(newCookies);
      setCps(cps + item.cpsShop);
      setPurchasedItmes(newPurchasedItems);
    }
  }

  function secretSpotClick() {
    increaseCpsShop(secretSpotUpgrade);
    alert("You found the secret spot! +10000 Cookies Per Second!!!")
  }

  return (
    <div className="gameContainer">
      <h1>Cookies : {cookies}</h1>
      <button onClick={cookiesPlusOne}>+1</button>
      <p>Cookies per second : {cps}</p>
      <div className="shopContainer">
        <h2>Shop</h2>
      {upgradeShop.map((item, index) => (
        <div key={index}>
        <button key={index} onClick={() => increaseCpsShop(item)}>
          Buy {item.name} ({item.cost} cookies, +{item.cpsShop} cps)
        </button>
        <p>{item.name} owned: {purchasedItems[item.name] || 0}</p>
      </div>
      ))}
    </div>
    <div className="secretSpot" onClick={secretSpotClick}>
        <p>SS spot</p>
      </div>
  </div>
  );
}
