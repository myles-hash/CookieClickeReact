import { useState, useEffect } from "react";

export default function App() {
  const initialCookies = 0;
  const initialCps = 1;
  const initialPurchasedItems = [];
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(1);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [secretSpotClicked, setSecretSpotClicked] = useState(false);

  const upgradeShop = [
    { name: "Item1", cost: 100, cpsShop: 2 },
    { name: "Item2", cost: 500, cpsShop: 4 },
    { name: "Item3", cost: 1000, cpsShop: 10 },
    { name: "Item4", cost: 10000, cpsShop: 100 },
    { name: "Item5", cost: 1000000, cpsShop: 10000 },
  ];

  useEffect(() => {
    const cookieInterval = setInterval(() => {
      setCookies((currentCookies) => currentCookies + cps);
    }, 1000);

    return () => {
      clearInterval(cookieInterval);
    };
  }, [cps, secretSpotClicked]);

  function cookiesPlusOne() {
    setCookies((currentCookies) => 
    secretSpotClicked ? currentCookies + 50 : currentCookies + 1
  );
  }

  function increaseCpsShop(item) {
    const newCookies = cookies - item.cost;
    if (newCookies >= 0) {
      const newPurchasedItems = {
        ...purchasedItems,
        [item.name]: (purchasedItems[item.name] || 0) + 1,
      };

      setCookies(newCookies);
      setCps(cps + item.cpsShop);
      setPurchasedItems(newPurchasedItems);
    }
  }

  function secretSpotClick() {
    if (!secretSpotClicked) {
      setSecretSpotClicked(true);
      alert("You found the secret spot! +50 Cookies Per click!!!");
    }
  }

  function resetGame() {
    setCookies(initialCookies);
    setCps(initialCps);
    setPurchasedItems(initialPurchasedItems);
    setSecretSpotClicked(false);
  }


  return (
    <div className="gameContainer">
      <h1 className="cookieCounter">Cookies : {cookies}</h1>
      <button className="plusClick" onClick={cookiesPlusOne}>{secretSpotClicked ? "+50" : "+1"}</button>
      <p>Cookies per second : {cps}</p>
      <div className="shopContainer">
        <h2>Shop</h2>
        {upgradeShop.map((item, index) => (
          <div key={index}>
            <button onClick={() => increaseCpsShop(item)}>
              Buy {item.name} ({item.cost} cookies, +{item.cpsShop} cps)
            </button>
            <p>{item.name} owned: {purchasedItems[item.name] || 0}</p>
          </div>
        ))}
      </div>
      <p className="sSMessage">Look for the secret spot on the page! If you find and click on it you get a <span className="special">special prize! </span></p>
      <div className="secretSpot" onClick={secretSpotClick}>
      </div>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}
