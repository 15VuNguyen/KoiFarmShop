import { useState, useEffect } from "react";
import { Button, Container, Card } from "react-bootstrap";
import Layout from "antd/es/layout/layout";
import Navbar from "../components/Navbar/Navbar.jsx";
import CustomFooter from "./Footer.jsx";
import "./Css/locakoiStyle.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../An/Utils/axiosJS.js";
import CustomerChatButton from "./Chat/CustomerChat.jsx";
import Footer from "./Footer.jsx";

export default function Locakoinhapkhau() {
  const [koiData, setKoiData] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [koiCount, setKoiCount] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "http://localhost:4000/getAllKoi"
        );
        if (Array.isArray(response.data.result)) {
          const groupedData = response.data.result.map((group) => {
            return {
              groupid: group.groupid,
              count: group.result.length,
              koiArray: group.result,
            };
          });
          setKoiData(groupedData);
          console.log("Card data fetched successfully.", groupedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(koiData);
  }, [koiData]);

  // return (
  //   <>
  //     <Layout>
  //       <Navbar />
  //       <Container>
  //         <div style={{ paddingTop: "100px" }}>
  //           <h2>Lô Cá Koi Nhập Khẩu</h2>
  //           <div style={{ textAlign: "center" }}>
  //             <Button variant="danger">
  //               Lô Cá Nhập Khẩu Cuối Năm Vip 2024
  //             </Button>
  //           </div>
  //           <div>
  //             {Object.entries(koiData).map(([groupId, { count, results }]) => (
  //               <div key={groupId} className="listPrBlock active">
  //                 {results.map((koi) => (
  //                   <div className="wrapWidth" key={koi._id}>
  //                     <Card style={{ width: "100%", marginBottom: "20px" }}>
  //                       <div style={{ marginTop: "0px" }}>
  //                         <img
  //                           src={koi.Image}
  //                           alt={koi.KoiName || "Koi"} // xử lý trường hợp KoiName rỗng
  //                           className="image"
  //                           onClick={() =>
  //                             navigate("/order", {
  //                               state: { selectedItem: koi },
  //                             })
  //                           }
  //                           style={{ cursor: "pointer" }}
  //                         />
  //                       </div>
  //                       <Card.Body>
  //                         <Card.Title className="namePr">
  //                           {koi.KoiName || "Koi chưa có tên"}
  //                         </Card.Title>
  //                         <Card.Text>
  //                           <p className="desText">
  //                             Giới Tính: {koi.Gender || "Koi chưa có giới tính"}
  //                           </p>
  //                           <h3>
  //                             Group ID: {groupId} (Count: {count})
  //                           </h3>
  //                           <p className="desText">
  //                             Kích Thước: {koi.Size || "Koi chưa có size"} cm
  //                           </p>
  //                           <p className="desText">
  //                             Giống: {koi.Breed || "Koi chưa có giống"}
  //                           </p>
  //                           <p className="desText">
  //                             Nguồn Gốc: {koi.Origin || "Koi chưa có nguồn gốc"}
  //                           </p>
  //                         </Card.Text>
  //                         <div style={{ textAlign: "center" }}>
  //                           <Button
  //                             variant="danger"
  //                             className="btnType_1"
  //                             onClick={() =>
  //                               navigate("/order", {
  //                                 state: { selectedItem: koi },
  //                               })
  //                             }
  //                           >
  //                             Giá{" "}
  //                             {new Intl.NumberFormat("vi-VN").format(koi.Price)}{" "}
  //                             VND
  //                           </Button>
  //                         </div>
  //                       </Card.Body>
  //                     </Card>
  //                   </div>
  //                 ))}
  //                 <hr />
  //               </div>
  //             ))}
  //           </div>

  //           <div style={{ textAlign: "center", paddingTop: "100px" }}>
  //             <Button
  //               variant="danger"
  //               className="btnType_1"
  //               onClick={() => navigate("/koidangban")}
  //               style={{ marginBottom: "100px" }}
  //             >
  //               Xem thêm
  //             </Button>
  //           </div>
  //         </div>
  //       </Container>

  //       <Footer />
  //     </Layout>
  //   </>
  // );
}
