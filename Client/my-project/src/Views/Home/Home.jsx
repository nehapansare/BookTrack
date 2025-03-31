import React from "react";
import homeImage from "../../assets/img/image5.jpg"; 
import Navbar from "../../Component/Navbar/Navbar";
import Footer from "../../Component/Footer/Footer";

function Home() {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center bg-gray-100 relative">
        <img 
          src={homeImage} 
          alt="Home" 
          className="w-[1450px] h-[700px] object-contain" 
        />
        <button 
          className="absolute px-6 py-3 bg-[#A7F1A8] text-black text-lg font-semibold rounded-lg shadow-lg hover:bg-[#A7F1A8] transform transition-transform duration-500 hover:scale-110 z-10"
          style={{ top: "65%", left: "50%", transform: "translate(-50%, -50%)" }}
        >
          Get Started
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
