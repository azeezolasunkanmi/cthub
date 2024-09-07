import cthway from "../assets/cthway.webp";
import cthway1 from "../assets/cthway1.webp";
import cthway2 from "../assets/cthway2.webp";
import cthway3 from "../assets/cthway3.webp";
import certificate1 from "../assets/certificate1.webp";
import certificate2 from "../assets/certificate2.webp";
import Footer from "../components/Footer";

const CTHWay = () => {
  return (
    <div>
      <section className="bg-[#f2f2f2] flex items-center gap-10 font-poppins py-20">
        <div className="lg:w-1/2  py-20 lg:pt-40 px-4 md:ml-8">
          <h2 className="text-textColor bg-[#03fc9d] px-4 text-[38px] lg:text-[58px] inline-block font-semibold italic">
            The CTH way
          </h2>
          <p className="text-textColor my-4 text-[18px] md:text-[24px] max-w-[500px] font-semibold">
            Security, transparency and regulation. Since 2011.
          </p>
          <p className="max-w-[550px] text-[16px]">
            These are the cornerstones on which we have built our business to
            bring safe and reliable access to crypto for all our customers.
          </p>
        </div>
        <div className="hidden lg:block lg:w-1/2 pt-20 px-4">
          <img src={cthway} alt="audited since 2016" />
        </div>
      </section>
      <section className="my-20 px-10">
        <h2 className="text-[48px]  font-semibold italic">
          <span className="px-4 bg-[#03fc9d]">Fully backed</span> Funds
        </h2>
        <div className="mt-16 md:flex justify-between gap-10">
          <div className="md:w-[33%]">
            <img src={cthway1} alt="icon" className="mb-6" />
            <h4 className="text-[24px] font-semibold mb-6">
              All customer funds held on CTH are 100% backed and available for
              withdrawal at any time.
            </h4>
            <p className="text-[16px] mb-6">
              They are held 1:1 in custody, meaning for each coin our customers
              hold with us, that coin is safely held with a fully licensed,
              qualified custodian.
            </p>
          </div>
          <div className="md:w-[33%]">
            <img src={cthway2} alt="icon" className="mb-6" />
            <h4 className="text-[24px] font-semibold mb-6">
              All our customers’ crypto and fiat are stored separately from our
              corporate assets.
            </h4>
            <p className="text-[16px] mb-6">
              That means we never lend or stake out your assets, crypto or fiat,
              without your express instruction.
            </p>
          </div>
          <div className="md:w-[33%]">
            <img src={cthway3} alt="icon" className="mb-6" />
            <h4 className="text-[24px] font-semibold mb-6">
              95% of crypto held at Bitstamp is securely stored offline in
              bank-grade Class III vaults.
            </h4>
            <p className="text-[16px] mb-6">
              Keeping crypto offline adds additional security against
              cybercrime. We keep the remaining 5% online to enable smooth and
              fast transactions. Additionally, our custodians hold insurance for
              client assets in cold wallets.
            </p>
          </div>
        </div>
      </section>
      <section className="bg-[#003b2f] text-white py-32 px-10 md:flex">
        <div className="md:w-1/2">
          <h2 className="text-[32px] md:text-[48px] mb-4 font-bold px-4 bg-[#03fc9d] inline-block text-textColor italic">
            Annual global audits -
          </h2>
          <h3 className="text-[32px] md:text-[42px] mb-4 font-bold px-4 max-w-[450px]">
            The foundation of proof of reserves
          </h3>
        </div>
        <div className="mt-10 md:mt-0 md:w-1/2">
          <p className="text-[18px] max-w-[550px] mb-4">
            The starting point for a true and fair representation of CTH’s
            financial position, and whether the assets held match the customer
            liabilities, is monitoring, validating, and accounting for each
            transaction - all 100+ million of them per year. CTH’s financial
            control environment has been built to do this.
          </p>
          <p className="text-[18px] max-w-[550px] my-4">
            Specialized enterprise software from a leading global provider,
            integrated with our processes and internal systems, ensures that we
            are validating the accuracy of our records at a customer and
            transaction level. Our financial control team performs daily,
            weekly, and monthly oversight and reconciliation of customers’ funds
            against the records of the independent third-party custodians that
            hold these funds. This ensures we can validate customer assets and
            labilities, and separately, those of CTH.
          </p>
          <p className="text-[18px] max-w-[550px] my-4">
            The financial control environment is reviewed internally and
            externally each year: to assess, validate, and continuously improve
            the controls environment. The journey ends with CTH’s annual global
            financial statements, which are audited by a Big Four global
            accounting firm and have been since 2016.
          </p>
        </div>
      </section>
      <section className="bg-[#f2f2f2 py-20 px-10">
        <div className="text-center my-8">
          <h2 className="text-[32px] md:text-[48px] mb-4 font-bold px-4 bg-[#03fc9d] inline-block italic">
            Our certifications
          </h2>
        </div>
        <div className="px-10 my-20">
          <div className="md:flex gap-8 mb-10 border-b border-slate-300 pb-6">
            <img src={certificate1} alt="" />
            <span className="px-10">
              <h3 className="text-[28px] font-bold mb-6">ISO/IEC 27001</h3>
              <p className="text-[16px]">
                Compliance with this standard demonstrates that our information
                security management system (ISMS) follows established best
                practices in information security and that we’re constantly
                improving our security capabilities to keep customers&apos; data
                safe.
              </p>
            </span>
          </div>
          <div className="md:flex gap-10">
            <img src={certificate2} alt="" />
            <span className="px-10">
              <h3 className="text-[28px] font-bold mb-6">SOC2 Type 2</h3>
              <p className="text-[16px]">
                With periodic SOC2 Type 2 attestations, our security controls
                are continuously assessed by independent external auditors. It
                provides assurance that our security controls are adequately
                designed, operating effectively over time, and meeting the
                criteria set forth by the American Institute of Certified Public
                Accountants (AICPA).
              </p>
            </span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CTHWay;
