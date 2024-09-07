import { faqLinksOne } from "../constants";
import Question from "./Question";
import bg from "../assets/bg/bg-coin.png";

const Faq = () => {
  return (
    <div className="py-10 box-shadow relative">
      <img
        src={bg}
        alt="background"
        className="absolute right-0 bottom-0 z-0"
      />
      <div className="mx-4 lg:mx-10 my-10 font-poppins">
        <h2 className="text-[24px] text-textColor font-semibold mb-10 md:text-[48px]">
          FAQs
        </h2>
        <div className="md:flex items-center justify-between">
          <div className="w-full mt-8 flex flex-col gap-4 justify-start flex-wrap md:w-[55%]">
            {faqLinksOne.map((link, linkIndex) => (
              <Question
                key={linkIndex}
                title={link.title}
                description={link.description}
              />
            ))}
          </div>
          <div className="w-full md:w-[40%] rounded-md overflow-hidden mt-8 self-start">
            <coingecko-coin-converter-widget
              coin-id="bitcoin"
              currency="usd"
              background-color="#6c757d"
              font-color="#4d4d4d"
              locale="en"
            ></coingecko-coin-converter-widget>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
