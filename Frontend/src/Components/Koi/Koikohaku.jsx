import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Layout from "antd/es/layout/layout";
import Kohaku from "../ThongTinCaKoi/Kohaku";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koikohaku() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px", backgroundColor: "#470101" }}>
          <Kohaku />
        </div>
        <Footer />
        <CustomerChatButton />
      </Layout>
    </>
  );
}
