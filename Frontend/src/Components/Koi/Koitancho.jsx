import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { Layout } from "antd";
import Tancho from "../ThongTinCaKoi/Tancho";

import "../Css/koiStyle.css";
export default function Koitancho() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Tancho />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
