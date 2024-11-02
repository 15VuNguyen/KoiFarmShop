import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Layout from "antd/es/layout/layout";
import "../Css/koiStyle.css";
import Goshiki from "../ThongTinCaKoi/Goshiki";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koigoshiki() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "150px" }}>
          <Goshiki />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
