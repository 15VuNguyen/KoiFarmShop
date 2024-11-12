import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Button, Container } from "react-bootstrap";
import { Empty } from "antd"; // Import Empty from Ant Design
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Css/trackingorderpayStyle.css";
import { Spin } from "antd";
import { Typography } from "antd";
import { useAuth } from "../Context/AuthContext";
import "./LoyaltyCardInfo.css"
import ProgressBarFormat from "./ProgressBarFormat";
import RegisterLoyaltyCardModals from "./RegisterLoyaltyCardModals";
import { getCard } from "../services/loyaltyCardService";

const { Title } = Typography;
export default function LoyaltyCardInfo() {
  const location = useLocation();
  const message = location.state?.message; // Safely access the message

  const [card, setCard] = useState(null);
  const [nextRankValue, setNextRankValue] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);
  const {currentUser} = useAuth()

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("userInfo")))
  },[])

  useEffect(() => {
    const fetchCardInfo = async () => {
      setLoading(true);
      try {
        const {data} = await getCard()
        console.log("card:", data.result.loyaltyCard);
        console.log("user:", user);

        if (data && data.result) {
          setCard(data.result.loyaltyCard);
          setNextRankValue(data.result.nextRank)
        } else {
          console.error("Don't have card, register first");
        }
      } catch (error) {
        console.error("Error fetching card information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCardInfo();
  }, [currentUser]);

  const handleRegister = async () => {
    setIsShowRegisterForm(true)
  }

  const handleClose = () => {
    setIsShowRegisterForm(false)
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Container>
      <Title
        level={4}
        style={{
          textAlign: "left",
          marginBottom: "55px",
          marginLeft: "15px",
          paddingTop: "36px",
        }}
      >
        Thông tin thẻ tích điểm
      </Title>
      {/* Conditional rendering for orders */}
      {!loading && card && user ? (
        <div className="card-page-container">
        <div className="card-info">
          <img src={`../src/card_pic/${card.RankName}.png`}/>
          {/* <div className="card-content">   */}
            <div className="cardHeader">
              <span className="content-header">{card.RankName}</span>
              <span className="content-header">{card.Point} điểm</span>
            </div>
            <div className="progressBar text-center">
              <ProgressBarFormat 
                now={Math.round(card.Point * 100 / nextRankValue.maxPoints)}
              />
              <p>Thêm {nextRankValue.maxPoints - card.Point} điểm để đạt member {nextRankValue.name}</p>
            </div>
          {/* </div> */}
        </div>
      </div>
      ) : (
        <div className="">
        <Button variant="warning" onClick={()=>handleRegister()}>Register Loyalty Card</Button>
        <RegisterLoyaltyCardModals
          show = {isShowRegisterForm}
          handleClose = {handleClose}
          setCard = {setCard}
        />
        <Empty
          description="No data"
          style={{ paddingTop: "100px", marginBottom: "200px" }}
        />
        </div>
        
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}
