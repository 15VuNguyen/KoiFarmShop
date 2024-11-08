import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Layout from "antd/es/layout/layout";
import Ogon from "../ThongTinCaKoi/Ogon";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koikohaku() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px", backgroundColor: "#470101" }}>
          <Ogon />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
