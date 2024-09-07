const HistoryRowHead = () => {
  return (
    <>
      <div className="hidden md:flex border-b border-slate-600 py-4">
        <p className="w-[10%]">Side</p>
        <p className="w-[15%]">Type</p>
        <p className="w-[20%]">Date and time</p>
        <p className="w-[15%]">Pair</p>
        <p className="w-[15%]">Amount</p>
        <p className="w-[15%]">Gains</p>
        <p className="w-[10%]">Rate</p>
      </div>
      {/* mobile view */}
      <div className="flex justify-between gap-2 items-center border-b border-slate-600 py-4 md:hidden">
        <div className="w-[20%]">
          <p>Side</p>
          <p>Type</p>
        </div>
        <div className="w-[30%]">
          <p className="">Pair</p>
          <p className="">Date</p>
        </div>
        <div className="w-[25%]">
          <p>Amount</p>
          <p>Value</p>
        </div>
        <p className="w-[10%]">Rate</p>
      </div>
    </>
  );
};

export default HistoryRowHead;
