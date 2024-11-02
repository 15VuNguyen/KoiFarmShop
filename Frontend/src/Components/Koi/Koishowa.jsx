import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import { Layout } from "antd";
import "../Css/koiStyle.css";
import Showa from "../ThongTinCaKoi/Showa";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koishowa() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Showa />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
