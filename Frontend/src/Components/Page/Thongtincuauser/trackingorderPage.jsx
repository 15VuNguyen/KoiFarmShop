import React from "react";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer";
import TrackingOrderPage from "../../trackingOrderPage";
export default function Trackingorderpage() {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "100px" }}>
        <TrackingOrderPage />
      </div>
      <Footer />
    </div>
  );
}
