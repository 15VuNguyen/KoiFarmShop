import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { Layout } from "antd";
import "../Css/koiStyle.css";
import Benigoi from "../ThongTinCaKoi/Benigoi";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koibenigoi() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Benigoi />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
