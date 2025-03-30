import React from "react";
import homeImage from "../../assets/img/image1.jpg"; // Adjust the path as needed

function Home() {
  return (
    <div className="flex justify-center items-center bg-gray-100">
      <img src={homeImage} alt="Home" className="w-[1450px] h-[900px] object-contain" />
    </div>
  );
}

export default Home;
