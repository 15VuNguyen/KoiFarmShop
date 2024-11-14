import DonKyGui from "../../Donkygui";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import React from "react";

export default function Donkyguipage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "50px" }}>
        <DonKyGui />
      </div>
      <Footer />
    </div>
  );
}
