import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Layout from "antd/es/layout/layout";
import "../Css/koiStyle.css";
import Ginrin from "../ThongTinCaKoi/Ginrin";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koiginirin() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Ginrin />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
