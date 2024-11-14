import Footer from "./Footer";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import img1 from "../assets/Red Modern Travel Presentation (4).jpg";
export default function Lienhe() {
  const [menu, setMenu] = useState("home");
  return (
    <>
      <div>
        <Navbar menu={menu} setMenu={setMenu} />
      </div>

      <div>
        <img src={img1} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
