import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import "../Css/koiStyle.css";
import Layout from "antd/es/layout/layout";
import "../Css/koiStyle.css";
import Asagi from "../ThongTinCaKoi/Asagi";
import CustomerChatButton from "../Chat/CustomerChat";

export default function Koiasagi() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Asagi />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
