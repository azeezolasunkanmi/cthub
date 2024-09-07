import about1 from "../assets/about1.webp";
import about2 from "../assets/about2.webp";
import about3 from "../assets/about3.webp";
import aboutbgimg from "../assets/aboutbgimg.png";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="bg-[#f2f2f2] lg:flex items-center font-poppins text-textColor">
        <div className="lg:w-[70%] pt-20 lg:pt-40 px-4 md:ml-8">
          <h2 className="text-textColor bg-[#03fc9d] px-4 text-[38px] lg:text-[64px] inline-block font-semibold italic">
            Who are we?
          </h2>
          <p className="text-textColor my-4 text-[18px] md:text-[24px] max-w-[500px] font-semibold ml-4">
            Security. Transparency. Regulation. The CTH Way since 2011.
          </p>
          <div className="md:flex justify-between gap-10 my-10 px-4">
            <div className="">
              <img src={about1} alt="icon" />
              <p className="mt-6">
                Security, transparency and regulation are the pillars on which
                we have made crypto securely accessible to everyone, and on
                which we now serve over 4 million customers globally. Whether
                you&apos;re new to crypto, a pro trader, or a financial
                institution, we support you with a customer-first approach.
              </p>
            </div>
            <div>
              <img src={about2} alt="icon" />
              <p className="mt-6">
                Our dedication to the secure evolution of the financial system
                is reflected by our AA rating as the world&apos;s top-rated
                crypto exchange in CryptoCompare&apos;s Exchange Benchmark
                report. We live by the mantra ‘Your crypto is always yours&apos;
                - all your assets are always available to you.
              </p>
            </div>
            <div>
              <img src={about3} alt="icon" />
              <p className="mt-6">
                Our global presence has allowed us to become one of the most
                regulated crypto exchanges in the world supported by around 500
                people. We have offices in Luxembourg, Singapore, Slovenia, the
                UK and the USA and take pride in our live customer support.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[30%] relative overflow-hidden">
          <div className="h-full">
            <img src={aboutbgimg} alt="girl smiling" className="h-full" />
          </div>
        </div>
      </div>
      <section className="bg-white py-10 md:flex justify-between px-12">
        <div className="md:w-1/2 mt-20">
          <h2 className="text-[48px] font-semibold italic">
            Our <span className="px-3 bg-[#03fc9d]">mission</span>
          </h2>
          <p className="text-[24px] font-semibold mt-8 max-w-[350px]">
            Shaping the new world of finance for the benefit of all.
          </p>
        </div>
        <div className="md:w-1/2 mt-20 text-[16px]">
          <h4 className="text-[28px] mb-16 max-w-[400px] font-bold">
            How we make crypto accessible to everyone
          </h4>
          <div className=" max-w-[450px] mb-6">
            <h4 className="text-[24px] mb-4 font-bold">
              Industry-leading security
            </h4>
            <p>
              The protection of customer assets is crucial, and we have been a
              leader in the industry in security since our founding. All funds
              and crypto on CTH are backed 100% and ready to be withdrawn at any
              time. They are stored in separate accounts from our corporate
              assets. Our commitment to advanced technology helps us maintain
              the industry-leading reliability standard with 99.9% uptime.
            </p>
          </div>
          <div className="max-w-[450px] mb-6">
            <h4 className="text-[24px] mb-4 font-bold">
              Transparency through internal and external audits
            </h4>
            <p>
              Our financial controls are reviewed annually by external parties
              and are also subject to regular internal audit reviews. This
              ensures that our control environment, along with all our
              procedures, is validated and continuously improved upon. Each year
              since 2016 CTH has been audited by a big four global accounting
              firm. Find out more on{" "}
              <span
                onClick={() => navigate("/cth-way")}
                className="text-blue-500 font-semibold cursor-pointer"
              >
                The CTH way.
              </span>
            </p>
          </div>
          <div className="max-w-[550px] mb-6">
            <h4 className="text-[24px] mb-4 font-bold">
              Regulation and compliance – a never-ending process
            </h4>
            <p>
              CTH holds 50 licenses and registrations in key jurisdictions
              globally, but we are also aware that being regulated is not just a
              matter of holding a certificate – it is a daily process. In total
              we have around 180 people, roughly 29% of our staff, working in
              compliance, regulation, legal, risk management, security, and
              internal audit functions. They ensure we run things by the book.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
