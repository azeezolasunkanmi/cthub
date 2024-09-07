const OrderBook = () => {
  function generateRandomNumber() {
    const randomNumber = Math.random();
    return randomNumber;
  }

  let rand = generateRandomNumber();

  setInterval(() => {
    rand = generateRandomNumber();
    // console.log("Updated Random Number:", rand);
  }, 5000);

  return (
    <div className="border border-slate-600 h-full px-2">
      <div className="h-[50%] overflow-hidden  border-b border-slate-500">
        <h3 className=" text-[12px] my-1 border-b border-slate-500 text-white">
          ODER BOOK
        </h3>
        <div className="flex justify-between border-b border-slate-500">
          <p>Amount</p>
          <p>Value</p>
        </div>
        <section className="text-[13px]">
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.3).toFixed(6)}
            </p>
            <p>{(rand * 4000).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.2).toFixed(6)}
            </p>
            <p>{(rand * 5600).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.1).toFixed(6)}
            </p>
            <p>{(rand * 8023).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.4).toFixed(6)}
            </p>
            <p>{(rand * 567).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.6).toFixed(6)}
            </p>
            <p>{(rand * 8700).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.7).toFixed(6)}
            </p>
            <p>{(rand * 3470).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.5).toFixed(6)}
            </p>
            <p>{(rand * 900).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.9).toFixed(6)}
            </p>
            <p>{(rand * 5600).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.8).toFixed(6)}
            </p>
            <p>{(rand * 2100).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.04).toFixed(6)}
            </p>
            <p>{(rand * 4900).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.06).toFixed(6)}
            </p>
            <p>{(rand * 5670).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-red-500">Ask</p>
            <p className="text-red-500 bg-red-200 px-2">
              {(rand * 0.14).toFixed(6)}
            </p>
            <p>{(rand * 3100).toFixed(4)}</p>
          </div>
        </section>
      </div>
      <div className="h-[50%] overflow-hidden">
        <div className="flex justify-between text-[13px]">
          <p>Speed</p>
          <p>{rand.toFixed(5)}%</p>
        </div>
        <section className="text-[13px] my-1 border-t border-slate-500">
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.04).toFixed(6)}
            </p>
            <p>{(rand * 4900).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.05).toFixed(6)}
            </p>
            <p>{(rand * 9400).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.07).toFixed(6)}
            </p>
            <p>{(rand * 5703).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.09).toFixed(6)}
            </p>
            <p>{(rand * 9750).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.15).toFixed(6)}
            </p>
            <p>{(rand * 2000).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.02).toFixed(6)}
            </p>
            <p>{(rand * 11900).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.16).toFixed(6)}
            </p>
            <p>{(rand * 2840).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.004).toFixed(6)}
            </p>
            <p>{(rand * 17330).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.06).toFixed(6)}
            </p>
            <p>{(rand * 7100).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.32).toFixed(6)}
            </p>
            <p>{(rand * 34901).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.1232).toFixed(6)}
            </p>
            <p>{(rand * 34901).toFixed(4)}</p>
          </div>
          <div className="flex justify-between my-1">
            <p className="text-green-500">Bids</p>
            <p className="text-green-500 bg-green-200 px-2">
              {(rand * 0.32).toFixed(6)}
            </p>
            <p>{(rand * 134901).toFixed(4)}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderBook;
