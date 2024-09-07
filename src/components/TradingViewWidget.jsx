import useAxios from "../hooks/useAxios";
import { useEffect, useRef, memo } from "react";
import { UserAuth } from "../store/AuthContext";

function TradingViewWidget() {
  const { setBaseCurrency, setQuoteCurrency, pairs, setPairs } = UserAuth();

  // const { response } = useAxios("exchanges/binance/tickers");
  const { response } = useAxios(`coins/tether`);

  if (response) {
    // console.log(response.tickers);
  }

  const selectPairs = e => {
    setPairs(e.target.value);
    const pair = e.target.value;
    const match = pair.match(/(USDT)/);
    console.log(pair);

    if (match) {
      const baseCurrency = match[1]; // "USDT"
      const quoteCurrency = pair.replace(baseCurrency, ""); // Remove "USDT" from the pair
      setBaseCurrency(baseCurrency);
      setQuoteCurrency(quoteCurrency);
      console.log(baseCurrency, quoteCurrency);
    } else {
      console.log("USDT not found in the pair.");
    }
  };

  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "BINANCE:${pairs}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
      }
    `;
    const currentContainer = container.current;
    container.current.innerHTML = " "; // Clear previous content
    if (container.current) {
      currentContainer.appendChild(script);
    }

    // Cleanup function
    return () => {
      currentContainer.innerHTML = ""; // Remove script when component unmounts
    };
  }, [pairs]);

  return (
    <div className="h-[450px] md:h-[70%] pb-8">
      <div className="flex gap-8 my-2">
        <select
          onChange={selectPairs}
          className="w-[150px] bg-textColor outline-none text-blue-500 font-bold"
          name="pairs"
          id="pairs"
        >
          <option value="BTCUSDT">BTC/USDT</option>
          {/* <option value="ETHUSDT">ETH/USDT</option>
          <option value="BTCUSD">BTC/USD</option> */}
          {response &&
            response.tickers.map((tick, i) => (
              <option key={i} value={tick.base + tick.target}>
                {tick.base}/{tick.target}
              </option>
            ))}
        </select>
        <p>Select a trading pair</p>
      </div>
      <div
        className="tradingview-widget-container"
        ref={container}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
}

export default memo(TradingViewWidget);
