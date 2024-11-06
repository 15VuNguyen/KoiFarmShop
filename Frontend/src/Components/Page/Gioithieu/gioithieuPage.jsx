import React from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import NguonGocCuaIKoi from "../../NguonGocCuaIKoi";
import GioiThieuVeKoiNhat from "../../GioiThieuVeKoiNhat";
import GioiThieuVeKoiF1 from "../../GioitThieuVeKoiF1";
import GioiThieuVeKoiViet from "../../GioiThieuVeKoiViet";
import CustomerChatButton from "../../Chat/CustomerChat";
export default function Gioithieupage() {
  return (
    <>
      <div>
        <Navbar />
      <div style={{ backgroundColor: "#470101" }}>
          <NguonGocCuaIKoi />
          <GioiThieuVeKoiNhat />
          <GioiThieuVeKoiF1 />
          <GioiThieuVeKoiViet />
        </div>
        <CustomerChatButton />
        <Footer />
      </div>
    </>
  );
}
