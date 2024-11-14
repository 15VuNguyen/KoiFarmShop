import Navbar from "../Navbar/Navbar";
import Footer from "../Footer";
import Layout from "antd/es/layout/layout";
import Doitsu from "../ThongTinCaKoi/Doitsu";
import CustomerChatButton from "../Chat/CustomerChat";
export default function Koidoitsu() {
  return (
    <>
      <Layout>
        <Navbar />
        <div style={{ paddingTop: "100px" }}>
          <Doitsu />
        </div>
        <CustomerChatButton />
        <Footer />
      </Layout>
    </>
  );
}
