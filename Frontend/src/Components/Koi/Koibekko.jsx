import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import "../Css/koiStyle.css";
import { Layout } from "antd";
import "../Css/koiStyle.css";
import Bekko from "../ThongTinCaKoi/Bekko";
export default function Koibekko() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Bekko />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
