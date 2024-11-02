import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { Layout } from "antd";
import "../Css/koiStyle.css";
import Shusui from "../ThongTinCaKoi/Shusui";
import CustomerChatButton from "../Chat/CustomerChat";

export default function Koishusui() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Shusui />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
