const OrderHead = () => {
  return (
    <div>
      <div className="hidden md:flex border-b border-slate-600 py-4">
        <p className="w-[10%]">Side</p>
        <p className="w-[15%]">Type</p>
        <p className="w-[20%]">Date and Time</p>
        <p className="w-[15%]">Pair</p>
        <p className="w-[15%]">Amount</p>
        {/* <p className="w-[15%]">+/-</p> */}
      </div>
      <div className="flex justify-between gap-2 items-center border-b border-slate-600 py-4 md:hidden">
        <div className="w-[20%]">
          <p>Side</p>
          <p>Type</p>
        </div>
        <div className="w-[30%]">
          <p className="">Pair</p>
          <p className="">Date</p>
        </div>
        <div className="w-[30%]">
          <p>Amount</p>
          {/* <p>+/-</p> */}
        </div>
        <p className="w-[5%]"></p>
      </div>
    </div>
  );
};

export default OrderHead;
