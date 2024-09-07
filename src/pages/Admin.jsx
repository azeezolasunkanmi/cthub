import maintenanceImg from "../assets/maintenance.png";

const Admin = () => {
  return (
    <div
      className="bg-no-repeat bg-cover bg-center z-0 relative pt-4 h-screen font-poppins"
      style={{
        backgroundImage: `url(${maintenanceImg})`,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
      }}
    >
      <section className="bg-black bg-opacity-50 max-w-[600px] rounded-md p-4 mt-10 mx-auto z-20">
        <h2 className="pt-10 text-center text-[36px] text-white">
          Sorry, we&apos;re down for scheduled maintenance right now.
        </h2>
        <h2 className="pt-2 text-center text-white text-[24px]">
          Be right back!
        </h2>
      </section>
    </div>
  );
};

export default Admin;
