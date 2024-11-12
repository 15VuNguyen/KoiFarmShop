import React from "react";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
const { Title, Text, Paragraph } = Typography;
import { Container } from "react-bootstrap";
import { Spin } from "antd"; // Import the Spin component
import Layout from "antd/es/layout/layout";
import { Typography } from "antd";
import { Table } from "react-bootstrap";
import "./Css/koiStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import img1 from "../assets/CaKoiNhat/1.webp";
import img2 from "../assets/CaKoiNhat/2.webp";
import img3 from "../assets/CaKoiNhat/3.webp";
import img4 from "../assets/CaKoiNhat/4-1.jpg";
import img5 from "../assets/CaKoiNhat/4-2.png";
import img6 from "../assets/CaKoiNhat/5.webp";
import img7 from "../assets/CaKoiNhat/6.jpg";
import img8 from "../assets/CaKoiNhat/7.jpg";
import img9 from "../assets/CaKoiNhat/8.jpg";
import img10 from "../assets/CaKoiNhat/9.webp";
import img11 from "../assets/CaKoiNhat/10.webp";
import img12 from "../assets/CaKoiNhat/11.webp";
import img13 from "../assets/CaKoiNhat/12.webp";
import img14 from "..//assets/CaKoiNhat/13.webp";
import img15 from "../assets/CaKoiNhat/14.webp";
import img16 from "../assets/CaKoiNhat/16.webp";
import img17 from "../assets/CaKoiNhat/16.webp";
import img18 from "../assets/CaKoiNhat/17.webp";
import img19 from "../assets/CaKoiNhat/19.webp";
import img20 from "../assets/CaKoiNhat/20.webp";
import img21 from "../assets/CaKoiNhat/21.webp";
import img22 from "../assets/CaKoiNhat/22.webp";
import img23 from "../assets/CaKoiNhat/23.jpg";
import img24 from "../assets/CaKoiNhat/24.webp";
import img25 from "../assets/CaKoiNhat/25.webp";
import img26 from "../assets/CaKoiNhat/26.webp";
import img27 from "../assets/CaKoiNhat/27.webp";
import img28 from "../assets/CaKoiNhat/28.webp";
export default function CaKoiNhat() {
  const handleScroll1 = () => {
    const element = document.getElementById("1");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll11 = () => {
    const element = document.getElementById("11");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll12 = () => {
    const element = document.getElementById("12");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll13 = () => {
    const element = document.getElementById("13");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll14 = () => {
    const element = document.getElementById("14");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll2 = () => {
    const element = document.getElementById("2");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll21 = () => {
    const element = document.getElementById("21");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll22 = () => {
    const element = document.getElementById("22");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll23 = () => {
    const element = document.getElementById("23");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll24 = () => {
    const element = document.getElementById("24");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll25 = () => {
    const element = document.getElementById("25");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll26 = () => {
    const element = document.getElementById("26");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll27 = () => {
    const element = document.getElementById("27");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll28 = () => {
    const element = document.getElementById("28");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll29 = () => {
    const element = document.getElementById("29");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll210 = () => {
    const element = document.getElementById("210");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll211 = () => {
    const element = document.getElementById("211");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll212 = () => {
    const element = document.getElementById("212");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll213 = () => {
    const element = document.getElementById("213");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll214 = () => {
    const element = document.getElementById("214");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll215 = () => {
    const element = document.getElementById("215");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll216 = () => {
    const element = document.getElementById("216");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll217 = () => {
    const element = document.getElementById("217");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll218 = () => {
    const element = document.getElementById("218");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll3 = () => {
    const element = document.getElementById("3");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll31 = () => {
    const element = document.getElementById("31");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll32 = () => {
    const element = document.getElementById("32");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll33 = () => {
    const element = document.getElementById("33");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 80; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll4 = () => {
    const element = document.getElementById("4");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll5 = () => {
    const element = document.getElementById("5");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll51 = () => {
    const element = document.getElementById("51");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll52 = () => {
    const element = document.getElementById("52");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll53 = () => {
    const element = document.getElementById("53");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll54 = () => {
    const element = document.getElementById("54");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll6 = () => {
    const element = document.getElementById("6");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll61 = () => {
    const element = document.getElementById("61");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll62 = () => {
    const element = document.getElementById("62");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll63 = () => {
    const element = document.getElementById("63");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll7 = () => {
    const element = document.getElementById("7");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll71 = () => {
    const element = document.getElementById("71");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll72 = () => {
    const element = document.getElementById("72");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll73 = () => {
    const element = document.getElementById("73");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll8 = () => {
    const element = document.getElementById("8");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll81 = () => {
    const element = document.getElementById("81");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll82 = () => {
    const element = document.getElementById("82");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll83 = () => {
    const element = document.getElementById("83");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll84 = () => {
    const element = document.getElementById("84");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll85 = () => {
    const element = document.getElementById("85");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll9 = () => {
    const element = document.getElementById("9");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const handleScroll10 = () => {
    const element = document.getElementById("10");

    if (element) {
      const elementRect = element.getBoundingClientRect();
      const offset = 100; // Khoảng cách nhích lên từ trên cùng

      // Tính toán vị trí chính xác để cuộn
      const targetPosition = elementRect.top + window.scrollY - offset;

      // Cuộn đến vị trí đã tính toán
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  const fishData = [
    {
      type: "Cá Koi mini",
      size: "10 cm - 15 cm",
      price: "600.000 - 2.000.000 đ",
    },
    {
      type: "Cá Koi mini",
      size: "15 cm - 20 cm",
      price: "1.200.000 - 3.000.000 đ",
    },
    {
      type: "Cá Koi mini",
      size: "20 cm - 25 cm",
      price: "1.600.000 - 4.500.000 đ",
    },
    {
      type: "Cá Koi mini",
      size: "25 cm - 30 cm",
      price: "2.200.000 - 6.500.000 đ",
    },
    { type: "Cá Koi trưởng thành", size: "50 cm", price: "Liên hệ" },
    { type: "Cá Koi trưởng thành", size: "60 cm", price: "Liên hệ" },
    { type: "Cá Koi trưởng thành", size: "72 cm", price: "Liên hệ" },
    { type: "Cá Koi trưởng thành", size: "80 cm", price: "Liên hệ" },
  ];

  return (
    <>
      <Navbar />
      <Container>
        <div style={{ paddingTop: "100px" }}>
          <div>
            <div
              className="body_StyleKoiOfPage"
              style={{ backgroundColor: "#ead8c8" }}
            >
              <Title level={2} style={{ color: "red" }}>
                Nội Dung Bài Viết
              </Title>
              <ul
                style={{
                  marginTop: "10px",
                  backgroundColor: "#ead8c8",
                  paddingTop: "10px",
                  textDecoration: "none",
                  listStyleType: "none",
                }}
              >
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll1}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    1. Tìm hiểu về cá Koi là cá gì
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll11}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        1.1. Nguồn gốc của cá Koi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll12}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        1.2. Đặc điểm của cá koi thuần chủng
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll13}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        1.3. Đặc tính sinh sản, sinh trưởng của cá koi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll14}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        1.4. Phân loại cá koi
                      </Text>
                    </li>
                  </ul>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll2}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    2. Các loại cá Koi phổ biến được ưa chuộng trên thị trường
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll21}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.1. Tìm hiểu về Cá koi Kohaku
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll22}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.2. Tìm hiểu về cá koi Chagoi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll23}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.3. Tìm hiểu về cá koi Taisho Sanke
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll24}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.4. Tìm hiểu về cá koi showa sanshoku (showa)
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll25}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.5. Tìm hiểu về cá koi showa sanshoku (showa)
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll26}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.6. Tìm hiểu về cá koi Hikari Utsuri
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll27}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.7. Tìm hiểu cá koi Bekko
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll28}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.8. Tìm hiểu về cá koi Asagi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll29}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.9. Tìm hiều về cá koi Goshiki
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll210}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.10. Tìm hiểu Cá koi Karashi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll211}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.11. Tìm hiểu về cá koi Benigoi (mud pond)
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll212}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.12. Cá Koi Hikarimuji mono
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll213}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.13. Cá koi Hikarimoyo
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll214}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.14. Tìm hiểu về cá koi Shiro Utsuri(Bò Sữa)
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll215}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.15. Tìm hiểu về cá koi Shusui
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll216}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.16. Cá Koi Tancho
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll217}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.17. Tìm hiểu cá koi Bướm
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll218}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        2.18. Tìm hiểu về cá koi Kin/Ginrin
                      </Text>
                    </li>
                  </ul>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll3}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    3. Các giống Koi Kohaku phổ biến nhất
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll31}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        3.1. Ý nghĩa của cá Koi trong văn hóa các quốc gia
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll32}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        3.2. Ý nghĩa phong thủy của cá Koi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll33}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        3.3. Ý nghĩa của cá chép koi theo màu sắc
                      </Text>
                    </li>
                  </ul>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll4}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    4. Sự khác nhau giữa Koi Kohaku Nhật, Koi Kohaku F1
                  </Text>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll5}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    5. Cách chọn cá Koi Kohaku
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll51}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        5.1. Dựa vào nguồn gốc xuất xứ
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll52}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        5.2. Dựa trên màu sắc
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll53}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        5.3. Dựa trên độ sức khỏe của cá koi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll54}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        5.4. Dựa trên thân hình của cá
                      </Text>
                    </li>
                  </ul>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll6}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    6. Cách chăm sóc Koi Kohaku
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll61}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        6.1. Đặc điểm về màu sắc
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll62}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        6.2. Dựa vào hình dáng
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll63}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        6.3. Dựa vào đặc tính
                      </Text>
                    </li>
                  </ul>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll7}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    7. Chăm sóc cá Koi như thế nào cho lên màu đẹp và mau lớn
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll71}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        7.1. Hồ nuôi cá koi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll72}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        7.2. Thức ăn của cá koi
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll73}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        7.3. Cách chăm sóc và cách nuôi cá koi chuẩn nhất
                      </Text>
                    </li>
                  </ul>
                </li>
                <li style={{ paddingTop: "10px" }}>
                  <Text
                    onClick={handleScroll8}
                    className="contentBox"
                    style={{
                      cursor: "pointer",
                      color: "#920202",
                    }}
                  >
                    8. Các bệnh thường gặp ở cá koi
                  </Text>
                  <ul>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll81}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        8.1. Cá Koi bị đỏ mình
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll82}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        8.2. Bệnh Cá Koi nằm đáy, co mình, hay nhảy khỏi mặt
                        nước.
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll83}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        8.3. Cá Koi bị stress
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll84}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        8.4. Cá koi bị nhát người
                      </Text>
                    </li>
                    <li style={{ paddingTop: "10px" }}>
                      <Text
                        onClick={handleScroll85}
                        className="contentBox"
                        style={{
                          cursor: "pointer",
                          color: "#920202",
                        }}
                      >
                        8.5. Cá Koi bị đục mắt
                      </Text>
                    </li>
                  </ul>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll9}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      9. Giá cá Koi bao nhiêu tại IKoi
                    </Text>
                  </li>
                  <li style={{ paddingTop: "10px" }}>
                    <Text
                      onClick={handleScroll10}
                      className="contentBox"
                      style={{
                        cursor: "pointer",
                        color: "#920202",
                      }}
                    >
                      10. Mua cá Koi Nhật ở đâu đẹp, đảm bảo chất lượng uy tín
                    </Text>
                  </li>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="noidungchitiet">Nội dung chi tiết</h2>
              <Paragraph style={{ fontSize: "20px", fontWeight: "400" }}>
                <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                  Cá Koi{" "}
                </span>
                được coi là dòng cá cảnh yêu thích nhất trên thế giới. Để tìm
                hiểu thêm về đặc điểm và cách chăm sóc của dòng cá này, hãy đọc
                bài viết sau của IKoi.
              </Paragraph>
            </div>
            <div id="1">
              <h3
                style={{
                  color: "rgb(146, 2, 2)",
                  backgroundColor: "#ead8c8",
                  padding: "10px",
                }}
              >
                1. Tìm hiểu về cá Koi là cá gì
              </h3>
              <div>
                <Paragraph className="paragraph-Style">
                  Cá Koi là một tên gọi của một giống cá có quan hệ gần với cá
                  chép vàng. Nó còn có tên gọi khác là: cá chép Koi (Tiếng Nhật:
                  鯉 / こい) hoặc cá chép Nhật theo cách gọi quen thuộc của Việt
                  Nam. Dòng cá này có xuất xứ từ Nhật với cái tên Nishikigoi.
                  Trải qua sự thuần hóa và lai tạo, thời điểm hiện tại dòng cá
                  này đã trở thành một vật nuôi làm cảnh được rất nhiều gia đình
                  yêu thích.
                  <br />
                  <br />
                  Theo{" "}
                  <a
                    href="https://vi.wikipedia.org/wiki/Koi"
                    style={{ fontSize: "20px" }}
                  >
                    Wikipedia
                  </a>
                  , giống cá koi này thuộc:
                </Paragraph>

                <div>
                  <span className="span-Style" id="11">
                    1.1. Nguồn gốc của cá Koi{" "}
                  </span>
                  <Paragraph className="paragraph-Style">
                    <br />
                    Cá koi ban đầu được xem là xuất xứ từ Trung Quốc, nhưng sau
                    đó đã được nhập vào Nhật Bản từ đầu thế kỉ 19. Tại đây,
                    chúng đã được thuần hóa, lai tạo qua nhiều đời để nuôi làm
                    cá cảnh. Tên gọi ban đầu của chúng là "cá chép Nishikigoi"
                    (tiếng Nhật: 錦鯉/ にしきこい), có nghĩa là cá chép thổ cẩm
                    hoặc cá chép có nhiều màu sắc.
                  </Paragraph>
                  <div style={{ textAlign: "center" }}>
                    <img src={img1} />
                    <Paragraph className="paragraph-Style">
                      Cá Koi có nguồn gốc từ Nhật Bản
                    </Paragraph>
                  </div>
                  <Paragraph className="paragraph-Style">
                    Để tôn vinh hoàng tử Hirohito, năm 1914 Nhật Bản cho tổ chức
                    triển lãm các giống cá Koi tại Tokyo và đảo Niigata. Từ đó,
                    cá Koi Nhật Bản được biết đến rộng rãi và tên cá Koi được
                    công nhận. Trong tiếng Nhật, "Koi" có nghĩa là cá chép, đồng
                    âm khác nghĩa với nó là tình yêu và yêu mến.
                  </Paragraph>
                </div>
                <div>
                  {" "}
                  <span className="span-Style" id="12">
                    1.2. Đặc điểm của cá koi thuần chủng
                  </span>
                  <Paragraph className="paragraph-Style">
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Kích thước
                    </span>
                    : Cá chép koi là loài cá cảnh tương đối lớn, chiều dài trung
                    bình khi trưởng thành khoảng 1m. Cân nặng thay đổi dao động
                    từ 6 đến 8 kg. Tuy nhiên vẫn có những chú cá koi có kích
                    thước dài tới 2m và cân nặng tới
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Tuổi thọ
                    </span>
                    : {""}Cá Koi thông thường có thể sống trong khoảng từ 40 đến
                    60 năm. Tuy nhiên, nếu chúng được nuôi trong điều kiện tốt:
                    nguồn nước đảm bảo, đầy đủ thức ăn, không có kẻ thù, cá Koi
                    có thể sống tới 230 năm
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Thân hình:
                    </span>
                    <ul>
                      <li>
                        Cá Koi có thân tương đối tròn, dài và thu nhỏ ở phần
                        đuôi. Phần lưng có vây tia mềm và một cặp vây gần mang.
                        Đặc điểm này giúp cho cá Koi có thể bơi lội một cách
                        linh hoạt.
                      </li>
                      <li>
                        Đuôi của cá Koi thường ngắn, chia đôi ở giữa, chỉ có một
                        màu và không có hoa văn.
                      </li>
                      <li>
                        Đầu cá Koi nhỏ với miệng rộng, đẹp và có một đôi râu ở
                        hai bên mép. Cá Koi có kích thước mắt vừa phải và không
                        bao giờ nhắm.
                      </li>
                    </ul>
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "20px" }}>
                      Màu sắc
                    </span>
                    <ul>
                      <li>Màu Kohaku: có màu trắng pha với màu đỏ</li>
                      <li>Màu Showa Sanke: kết hợp giữa màu đỏ và đen</li>
                      <li>Màu Utsurimono: kết hợp giữa màu trắng và đen</li>
                      <li>Màu Shiro Bekko: màu đen trộn với màu trắng</li>
                      <li>Màu Ki Utsuri: kết hợp giữa màu vàng và màu đen</li>
                      <li>Màu Kinginrin: màu bạch kim pha với màu vàng kim</li>
                      <li>
                        Màu Tancho: màu trắng toàn thân và trên đỉnh đầu có vòng
                        tròn màu đỏ, tương đồng với quốc kỳ của Nhật Bản.
                      </li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                      <img src={img2} />
                      <Paragraph className="paragraph-Style">
                        Cá Koi có tuổi thọ cao
                      </Paragraph>
                    </div>
                  </Paragraph>
                </div>
                <div>
                  {" "}
                  <span className="span-Style" id="13">
                    1.3. Đặc tính sinh sản, sinh trưởng của cá koi
                  </span>
                  <Paragraph className="paragraph-Style">
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Tập tính ăn uống của cá koi:
                    </span>
                    Cá Koi là một loại cá ăn tạp và phàm ăn. Tuy nhiên, thức ăn
                    cho chúng phải đảm bảo vệ sinh và sạch sẽ, cần chú ý đến
                    nguồn gốc thức ăn để tránh ảnh hưởng đến hình dáng và màu
                    sắc cá sau này. Ngoài ra, hãy chú ý đến số lượng thức ăn cho
                    chúng vì không nên cho quá nhiều ăn.
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Tập tính sinh sản của cá koi:
                    </span>
                    Cá chép koi sống trong hồ nhân tạo, trong điều kiện tốt sẽ
                    sống được tới 25 - 35 năm. Sau khoảng 1 năm koi bắt đầu đẻ
                    trứng, cá koi cái 2-3 tuổi có thể đẻ khoảng 150-200 nghìn
                    trứng mỗi lần. Cá thường đẻ vào khoảng 4 - 5 giờ sáng, sau
                    khoảng 26 - 48 giờ ở nhiệt độ 28 đến 30 độ C cá sẽ nở.
                    <br />
                    Khi tuổi tác và nhiệt độ của môi trường thay đổi, màu sắc và
                    hình dạng của cá kiểng cá koi sẽ liên tục thay đổi, giống
                    như một bức tranh màu mà bạn tự vẽ lên. Nếu cá koi pha quá
                    nhiều màu, bị lem hoặc bị biến dạng thì sẽ bị loại và không
                    được chọn.
                    <div style={{ textAlign: "center" }}>
                      <img src={img3} />
                      <Paragraph className="paragraph-Style">
                        Cá Koi có nhiều loại với vẻ đẹp khác nhau
                      </Paragraph>
                    </div>
                  </Paragraph>
                </div>
                <div>
                  {" "}
                  <span className="span-Style" id="14">
                    1.4. Phân loại cá koi
                  </span>
                  <Paragraph className="paragraph-Style">
                    <br />
                    Hiện nay, trên thị trường mua bán các dòng cá chép Koi đẹp
                    các dân chơi cá Koi chia cá làm hai loại cá Koi chính và hai
                    loại này có những đặc điểm khác nhau như:
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Cá Koi chuẩn:
                    </span>
                    Là dòng cá cảnh cá Koi có hình thể giống như cá nguyên thủy.
                    Điểm khác duy nhất là trên thân cá phần dọc sống lưng pha
                    trộn nhiều màu sắc đa dạng hơn và khi nhìn từ trên xuống có
                    một vẻ đẹp đặc biệt ấn tượng. Do đó dòng cá koi chuẩn này
                    chỉ thích hợp nuôi ở cá ao hồ
                    <br />
                    <span style={{ fontWeight: "bold", fontSize: "17px" }}>
                      Cá Koi bướm
                    </span>
                    Là loại cá cảnh Koi còn được gọi với cái tên mỹ miều là cá
                    chép rồng. Loại cá này còn phần vi, vây và đuôi dài hơn cùng
                    dáng bơi uyển chuyển rất đẹp mắt. Thông thường, cá Koi bướm
                    sẽ chọn nuôi trong tủ kiếng và các loại ao lớn. Dòng cá này
                    bắt đầu được nhân giống vào năm 1980 tại Nhật Bản
                  </Paragraph>
                </div>
              </div>
              <div id="detailed-content">
                <h3
                  style={{
                    color: "rgb(146, 2, 2)",
                    backgroundColor: "#ead8c8",
                    padding: "10px",
                  }}
                  id="2"
                >
                  2. Các loại cá Koi phổ biến được ưa chuộng trên thị trường
                </h3>
                <Paragraph className="paragraph-Style">
                  Trong quá trình lai tạo và phát triển cá koi kiểng, đã sản
                  sinh ra rất nhiều dòng cá koi đẹp. Tuy nhiên không phải ai
                  cũng biết cá koi có bao nhiêu loại và phân biệt được các loại
                  cá koi cảnh này. Cùng tìm hiểu các dòng cá được ưa chuộng và
                  phổ biến tại Việt Nam
                  <div>
                    <span id="21" className="span-Style">
                      2.1. Tìm hiểu về Cá koi Kohaku
                    </span>
                    <br />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "blue",
                        fontSize: "20px",
                      }}
                    >
                      Cá Koi Kohaku
                    </span>{" "}
                    là dòng cá koi được ưa thích và phổ biến nhất trên thị
                    trường. Với đặc điểm trên thân sẽ có màu đỏ và màu trắng là
                    dòng cá đặc trưng có khả năng sinh sản rất tốt, và cũng là
                    một trong những dòng cá có tuổi thọ cao. Chính vì vậy mà nó
                    còn được gọi là “Cá Trường Thọ”.
                    <div style={{ textAlign: "center" }}>
                      <img src={img4} />
                      <Paragraph>Cá koi Kohaku</Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="22" className="span-Style">
                      2.2. Tìm hiểu về cá koi Chagoi
                    </span>
                    <br />
                    <span
                      style={{
                        fontWeight: "bold",
                        color: "blue",
                        fontSize: "20px",
                      }}
                    >
                      Cá koi chagoi
                    </span>{" "}
                    được mệnh danh là loài cá koi dẫn đàn, loài cá này có sức
                    sống rất mạnh, có khả năng bơi nhanh, đuôi vẫy mạnh, thân
                    thiện và giản dị nên là loài cá được nuôi phổ biến. Loại cá
                    koi chagoi này có đặc điểm là màu sắc đặc, không có màu.
                    Giống cá này khá phàm ăn, do đó chúng lớn nhanh chóng và dễ
                    dàng đạt được kích thước lớn sau một thời gian ngắn nuôi.
                    <div style={{ textAlign: "center" }}>
                      <img src={img5} />
                      <Paragraph className="paragraph-Style">
                        Cá Koi Chagoi là một dòng cá được nuôi phổ biến
                      </Paragraph>
                    </div>
                    Vây ngực, vây lưng và đuôi của cá koi chagoi khá dày và
                    cứng, râu dài và cứng. Cá koi chagoi được chia làm 3 loại
                    theo màu sắc: chagoi nâu, chagoi xanh nhạt, chagoi xanh xám.
                  </div>
                  <div>
                    <span id="23" className="span-Style">
                      2.3. Tìm hiểu về cá koi Taisho Sanke
                    </span>
                    Sanke là một trong ba giống koi thuần chủng phổ biến nhất –
                    Gosanke. Gosanke bao gồm 3 dòng là Kohaku koi, Showa và
                    Sanke. Do đó, đặc điểm của cá là cơ thể vẫn giữ màu đỏ,
                    trắng giống Kohaku, và xen lẫn với màu đen. Vẻ đẹp và giá
                    trị của cá koi Taisho Sanke được đánh giá bằng các mảng màu
                    trắng trên thân. Được mệnh danh là “tam hùng” trong các loại
                    cá, giống cá koi Taisho Sanke được ưa chuộng ở khắp nơi trên
                    thế giới, mảng trắng càng nhiều, cá càng sạch, càng đẹp và
                    giá trị sẽ tăng
                  </div>
                  <div>
                    <span id="24" className="span-Style">
                      2.4. Tìm hiểu về cá koi showa sanshoku (showa)
                    </span>
                    Đặc điểm của Cá koi Showa trên thân sẽ có màu đỏ - trắng -
                    đen giống dòng Taisho Sanke, tuy nhiên lại sở hữu sắc đen,
                    thường gọi là sumi hoàn toàn khác biệt. cá koi showa
                    sanshoku có phần sumi nhiều hơn, xuất hiện ở đầu xuống tới
                    miệng còn Taisho Sanke thì hoàn toàn không có.
                    <div style={{ textAlign: "center" }}>
                      <img src={img6} />
                      <Paragraph className="paragraph-Style">
                        Phân biệt cá koi Showa và Sanke
                      </Paragraph>
                    </div>
                    Cá koi showa sanshoku còn được gọi là "cá chép may mắn". Cá
                    sẽ có một nắp đen lớn trên đầu, khi đó 3 màu đỏ, đen, trắng
                    sẽ được phân bổ đồng đều, sẽ có nhiều màu đen hơn giống cá
                    koi sanke. Người ta tin rằng màu đen sẽ giết chết tà ma, xua
                    đuổi vận đen và mang lại may mắn. Vì vậy, nhiều thương lái,
                    chủ cửa hàng đã chọn loại cá này để nuôi. Chính vì vậy mà
                    chú cá koi Showa được mọi người đặc biệt ưa chuộng.
                    <br />
                    Showa được chia thành nhiều dòng khác nhau, phổ biến nhất
                    là: Hi Showa, Tancho Showa, Maruten Showa, Ginrin Showa,
                    Kindai Showa
                  </div>
                  <div>
                    <span id="25" className="span-Style">
                      2.5. Tìm hiểu về cá koi Goromo{" "}
                    </span>
                    Cá koi Nhật Bản Goromo chính là sự lai tạo phát triển lên từ
                    hai loại cá Koi nhật là Kohaku và Asagi. Cá koi Goromo có
                    thân hình nổi bật là các đường nét hoa văn nổi trên màu
                    trắng hoặc màu sắc trắng sữa, xen lẫn vào là màu đỏ hết sức
                    đặc biệt
                    <div style={{ textAlign: "center" }}>
                      <img src={img7} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Goromo
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="26" className="span-Style">
                      2.6. Tìm hiểu về cá koi Hikari Utsuri
                    </span>
                    Là loại cá Koi được lai tạo từ cá koi utsuri. Cá koi Hikari
                    Utsuri thuộc dòng cá kim loại có màu sắc cơ bản bao gồm là
                    đen - vàng, đen - trắng, đen - cam…
                    <div style={{ textAlign: "center" }}>
                      <img src={img8} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Hikari Utsuri
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="27" className="span-Style">
                      2.7. Tìm hiểu cá koi Bekko
                    </span>
                    Cá koi bekko có hình dạng tương đối giống Utsuri, trên thân
                    chỉ có 2 màu sắc là: Shiro Bekko (trắng – đen), Aka Bekko
                    (đỏ – đen) hoặc Ki Bekko (vàng – đen).
                    <br />
                    Đặc điểm của cá koi bekko là mắt to, mình rong và vảy đục
                    không có ánh kim, phần vai và bụng thường mập và có xu hướng
                    bầu và tròn hơn các loại Koi khác.
                  </div>
                  <div>
                    <span id="28" className="span-Style">
                      2.8. Tìm hiểu về cá koi Asagi
                    </span>
                    Cá koi asagi có thể nói là một trong những dòng koi đầu tiên
                    xuất hiện tại Nhật. Trải qua một khoảng thời gian dài khoảng
                    160 năm, Asagi với hai dòng Narumi Asagi và Kongo Asagi đã
                    cho ra những hậu duệ của giống Asagi Magoi (Narumi là tên
                    của ngôi làng sản sinh ra toàn bộ giống Asagi)..
                    <div style={{ textAlign: "center" }}>
                      <img src={img9} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Asagi
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="29" className="span-Style">
                      2.9. Tìm hiều về cá koi Goshiki{" "}
                    </span>
                    Về cá koi Goshiki trong tiếng nhật có nghĩa là “ngũ sắc”,
                    cũng được mệnh danh là những “kẻ đánh cắp ánh đèn sân khấu.
                    Từ đó ta có thể thấy được màu sắc đặc biệt của cá Koi đẹp
                    này. Nếu thả loại cá koi này vào nước lạnh thì màu của nó có
                    khả năng sẽ tối hơn so với bình thường
                    <div style={{ textAlign: "center" }}>
                      <img src={img10} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Goshiki - kẻ đánh cắp ánh đèn sân khấu
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="210" className="span-Style">
                      2.10. Tìm hiểu Cá koi Karashi
                    </span>
                    <span style={{ fontWeight: "bold", color: "blue" }}>
                      Karashi Koi
                    </span>{" "}
                    là dòng cá được gây giống từ 2 giống cá cha mẹ là Kigoi và
                    Chagoi, có màu sắc biến đổi từ màu be, màu vàng nhạt đến màu
                    vàng đậm. Thời điểm mới được lai tạo những chú cá Koi
                    Karashi bị nhiều người coi là kỳ lạ. Trải qua nhiều năm, giá
                    trị của cá koi Karashi dần dần mới được công nhận, và nhanh
                    chóng trở nên nổi tiếng và được nhiều người yêu thích.
                    <div style={{ textAlign: "center" }}>
                      <img src={img11} />
                      <Paragraph className="paragraph-Style">
                        Đây là loại cá lớn nhanh, dễ đạt kích cỡ lớn sau 2-3 năm
                        nuôi thích hợp, cá có khả năng thích nghi cao với môi
                        trường và dạn người.
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="211" className="span-Style">
                      2.11. Tìm hiểu về cá koi Benigoi (mud pond)
                    </span>
                    <span style={{ fontWeight: "bold", color: "blue" }}>
                      Cá koi Benigoi
                    </span>{" "}
                    thuộc dòng cá koi đơn sắc với tông màu đỏ nổi bật. Toàn bộ
                    vảy, vây và từ chóp mũi đến đuôi đều là màu đỏ, hoàn toàn
                    không có vạch hay mảng màu trắng nào. Vì vậy, trông loại cá
                    này giống như một quả ớt khổng lồ.
                    <br />
                    Khá nhiều người nhầm lẫn cá chép koi Benigoi và Higoi với
                    nhau bởi đều cùng màu đỏ. Tuy nhiên, nếu để ý kỹ thì dễ dàng
                    nhận thấy, koi Higoi có tông màu đỏ hơi cam, còn koi Benigoi
                    thì toàn thân đỏ sậm. Đặc biệt, với dòng koi Ginrin (kích
                    thước nhỏ) thì chỗ vảy sẽ phát quang lấp lánh, óng ánh. Đây
                    là loại cá có khá dễ sống, có khả năng thích nghi cao với
                    môi trường
                    <div style={{ textAlign: "center" }}>
                      <img src={img12} />
                      <Paragraph className="paragraph-Style">
                        Koi Benigoi toàn thân màu đỏ như một quả ớt khổng lồ,
                        phần vây có thể phản quang nếu thuộc biến thể Ginrin
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="212" className="span-Style">
                      2.12. Cá Koi Hikarimuji mono
                    </span>
                    Hikarimuji mono được yêu thích do đặc điểm có ánh kim loại ở
                    mặt sau và chỉ có 1 màu sắc duy nhất trên thân mình. Các
                    dòng koi Hikarimuji mono phổ biến: platinum ogon (màu trắng
                    bạc), hi ogon (màu đỏ), nezu ogon (màu đen), yamabuki ogon
                    (màu vàng), orenji ogon (màu cam) và mukashi ogon (màu xám
                    bạc).
                  </div>
                  <div>
                    <span id="213" className="span-Style">
                      2.13. Cá koi Hikarimoyo
                    </span>
                    Hikarimoyo có đặc điểm tương tự như Hikarimuji Mono đó là
                    toàn thân phủ kim loại nhưng chúng là cá Koi đa dạng màu
                    sắc. Có 4 loại cá Koi Hikarimoyo phổ biến nhất tại Việt Nam
                    là Kujaku, Yamatonishiki, Hariwake và Kikusui.
                    <div style={{ textAlign: "center" }}>
                      <img src={img13} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Hariwake có thân màu trắng ánh kim, điểm thêm màu
                        đỏ, cam hoặc vàng trên cơ thể
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="214" className="span-Style">
                      2.14. Tìm hiểu về cá koi Shiro Utsuri(Bò Sữa)
                    </span>
                    Chép koi Shiro sở hữu 2 màu đen trắng y hệt bò sữa nên còn
                    được gọi là koi Bò Sữa. Cụ thể, toàn thân cá có màu đen
                    tuyền, nổi bật trên đó là những mảng màu trắng như tuyết,
                    tạo nên hiệu ứng thẩm mỹ cao và thu hút ánh nhìn. Dòng Shiro
                    Utsuri phổ biến nhất là Ginrin Shiro Utsuri và Doitsu Shiro
                    Utsuri
                    <br />
                    Khác biệt của koi Shiro Utsuri với các dòng koi khác là
                    không dùng thức ăn chứa các thành phần sắc tố. Nếu không, sẽ
                    khiến màu sắc của cá bị thay đổi. Chính vì sự khác biệt này
                    mà koi Shiro Utsuri được giá là thanh cao, thuần túy, màu
                    sắc không bị can thiệp bởi thành phần thức ăn.
                    <div style={{ textAlign: "center" }}>
                      <img src={img14} />
                      <Paragraph className="paragraph-Style">
                        Koi Shiro Utsuri với tông màu đen trắng nổi bật, còn
                        được gọi với cái tên quen thuộc là koi Bò Sữa
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="215" className="span-Style">
                      2.15. Tìm hiểu về cá koi Shusui
                    </span>
                    Đây là loài cá koi ra đời sớm hơn cả koi Kohaku và koi
                    Showa. Chúng thuộc dòng koi da trơn, tuy nhiên, có 2 hàng
                    vảy dọc sống lưng. Màu sắc và hoa văn trên cá chưa rõ ràng
                    lúc mới sinh. Nhưng sau 12 - 13 tuần, nếu được chăm sóc kỹ
                    lưỡng thì cá có khả năng sẽ lên màu và hoa văn rất đẹp.
                    <br />
                    Một con cá koi Shusui đẹp là khi sở hữu màu đỏ, màu trắng
                    sắc nét. Màu đỏ không quá lớn mà lại thanh mảnh mà phân bổ
                    dọc theo 2 hàng vảy màu xanh đậm, đối xứng nhau, dọc trên
                    sống lưng của cá. Cá có thân hình tròn trịa và da trơn nhẵn.
                    <div style={{ textAlign: "center" }}>
                      <img src={img15} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Shusui sở hữu tông màu mà diện mạo đẹp, nổi bật
                        với phần vảy màu xanh đậm dọc sống lưng
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="216" className="span-Style">
                      2.16. Cá Koi Tancho
                    </span>
                    Tancho là dòng koi có vòng tròn màu đỏ ở giữa đầu. Ba loại
                    cá Tancho phổ biến chính là Tancho Kohaku, Tancho Sanke và
                    Tancho Showa có ngoại hình giống cá chép koi tiêu chuẩn. Tuy
                    nhiên, loại cá này có màu sắc của vảy trắng đục, vây đẹp với
                    các tia vây rõ, màu sáng, mắt to, râu dài và thân tròn, đầu
                    hơi gù.
                    <div style={{ textAlign: "center" }}>
                      <img src={img16} />
                      <Paragraph className="paragraph-Style">
                        Cá koi Tancho
                      </Paragraph>
                    </div>
                    Cá Koi Tancho là loài cá được các quan chức và người dân ưa
                    chuộng, gọi là cá chép “quan phong”. Thân cá có màu trắng
                    tuyết rất đẹp, đầu cá có màu đỏ nổi bật, giống như biểu
                    tượng của quốc kỳ Nhật Bản - tượng trưng cho đất nước mặt
                    trời đỏ, tượng trưng cho đất nước nên được người dân cưng
                    chiều lựa chọn và nâng niu. Theo phong thủy, nó thúc đẩy sự
                    nghiệp của gia chủ, làm ăn phát đạt hơn, đảm bảo vận trình
                    suôn sẻ, thăng quan tiến chức, củng cố địa vị và quyền lực.
                  </div>
                  <div>
                    <span id="217" className="span-Style">
                      2.17. Tìm hiểu cá koi Bướm
                    </span>
                    Được đánh giá cao nhất trong các loài cá Koi, Cá Koi Bướm
                    nổi bật với dáng bơi uyển chuyển, đẹp mắt, dáng vẻ bồng bềnh
                    như cánh bướm vỗ cánh bay lên trời, vây của loài cá này
                    giống như cánh bướm, dài mượt mà uyển chuyển khiến người xem
                    mê mẩn nhìn theo những đường cong của chúng. . Cá koi bướm
                    không có màu giống nhau mà sẽ có các màu khác nhau và pha
                    trộn với nhau khá hài hòa.
                    <div style={{ textAlign: "center" }}>
                      <img src={img17} />
                      <Paragraph className="paragraph-Style">
                        Cặp cá koi bướm đẹp óng ánh
                      </Paragraph>
                    </div>
                    Là loại cá cảnh Koi còn được gọi với cái tên mỹ miều là cá
                    chép rồng. Loại cá koi bướm này còn phần vây và đuôi dài hơn
                    cùng dáng bơi uyển chuyển rất đẹp mắt. Thông thường, giống
                    cá Koi bướm sẽ chọn nuôi trong tủ kiếng và các loại ao lớn.
                  </div>
                  <div>
                    <span id="218" className="span-Style">
                      2.18. Tìm hiểu về cá koi Kin/Ginrin
                    </span>
                    Một trong những dòng cá koi đẹp và được yêu thích hiện nay
                    không thể bỏ qua đó là koi Ginrin. Sở dĩ có cái tên này là
                    do giống cá này phần vảy cá phát màu lấp lánh như ánh bạc,
                    ánh kim. Mà trong đạo Hồi, Ginrin có nghĩa là màu sắc ánh
                    bạc.
                    <br />
                    Koi Ginrin có màu đỏ và trắng, phần vảy dọc lưng cá phát
                    quang đẹp mắt. Cá càng già thì phần vảy càng dày và càng
                    phát quang mạnh mẽ. Một con Ginrin đẹp là khi phần vảy phát
                    quang được sắp xếp gọn gàng, ngay ngắn, dọc 2 bên lưng cá.
                    Mỗi con có ít nhất 2 hàng vảy, lý tưởng nhất là 3 hàng.
                    <div style={{ textAlign: "center" }}>
                      <img src={img18} />
                      <Paragraph className="paragraph-Style">
                        Koi Ginrin có phần vảy ở lưng phát quang lấp lánh và óng
                        ánh, tạo hiệu ứng thẩm mỹ cao, được nhiều người yêu
                        thích{" "}
                      </Paragraph>
                    </div>
                  </div>
                </Paragraph>
                <div id="3">
                  <h3
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    3. Ý nghĩa của cá Koi trong đời sống và văn hóa
                  </h3>
                  <div>
                    <span className="span-Style" id="31">
                      3.1. Ý nghĩa của cá Koi trong văn hóa các quốc gia
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cá koi đẹp không chỉ đẹp mà còn mang lại nhiều ý nghĩa đặc
                      biệt trong văn hóa các quốc gia. Loài cá này được biết đến
                      tượng trưng cho nghị lực trong cuộc sống qua điển tích “Cá
                      Chép Hóa Rồng”. Ngoài ra còn là biểu tượng cho sự dũng
                      cảm, kiên cường dám thực hiện ước mơ.
                      <br />
                      Các giống Cá Koi được ví như “quốc ngư” của đất nước Nhật
                      Bản và được gọi là cá thần. Chúng tượng trưng cho sự may
                      mắn và hạnh phúc..
                      <br />Ở Trung Quốc, cá koi còn được gọi là cá may mắn, cá
                      phong thủy, vua của các loài cá cảnh. Ngày xưa, loại cá
                      này thường được nuôi trong ao của các đền chùa với ý nghĩa
                      tốt lành. Ngày nay, các hộ gia đình hay các cơ sở kinh
                      doanh vẫn duy trì phong tục mua cá koi trong dịp lễ đầu
                      xuân với mong muốn khởi đầu năm mới nhiều cát lợi, may
                      mắn.
                    </Paragraph>
                  </div>
                  <div>
                    <span className="span-Style" id="32">
                      3.2. Ý nghĩa phong thủy của cá Koi
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cá Koi trong phong thuỷ được cho là loài cá sinh tiền tài,
                      nuôi cá Koi trong nhà có thể giúp gia chủ tăng vận may về
                      tài chính, thành công trong sự nghiệp.
                      <br />
                      Ngoài ra, những con chép Koi đẹp còn mang lại nhiều ý
                      nghĩa thể hiện:
                    </Paragraph>
                    <ul className="paragraph-Style">
                      <li>Giàu sang</li>
                      <li>Phú quý</li>
                      <li>Phồn thịnh</li>
                      <li>Trường thọ</li>
                      <li>Thành công</li>
                      <li>Hoài bão</li>
                      <li>Can đảm</li>
                    </ul>
                  </div>
                  <div>
                    <span id="33" className="span-Style">
                      3.3. Ý nghĩa của cá chép koi theo màu sắc
                    </span>
                    <Paragraph className="paragraph-Style">
                      Với người chơi cá kiểng chuyên nghiệp, mỗi đặc điểm màu
                      sắc của loài cá này đều mang lại nhiều ý nghĩa phong thủy
                      khác nhau.
                    </Paragraph>
                    <ul className="paragraph-Style">
                      <li>
                        <span className="paragraph-Style">
                          Cá trắng khoang đỏ:
                        </span>{" "}
                        có ý nghĩa thành công trong sự nghiệp.
                      </li>
                      <li>
                        <span className="paragraph-Style">
                          Cá trắng khoang đen hoặc thuần đen:
                        </span>{" "}
                        Nhắn nhủ sự biến động và thay đổi theo chiều hướng tốt
                        đẹp.
                      </li>
                      <li>
                        <span className="paragraph-Style">
                          Cá thân xám bạc:
                        </span>{" "}
                        Hình ảnh tượng trưng cho mã đáo thành công.
                      </li>
                      <li>
                        <span className="paragraph-Style">Cá vàng:</span> có ý
                        nghĩa cho tài lộc, an khang.
                      </li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                      <img src={img19} />
                      <Paragraph className="paragraph-Style">
                        Mỗi màu sắc trên thân cá tượng trưng có ý nghĩa phong
                        thủy khác nhau
                      </Paragraph>
                    </div>
                    <Paragraph className="paragraph-Style" z>
                      Trong một hồ cá koi đẹp sẽ có thể kết hợp nuôi nhiều loại
                      cá để mang đến nhiều điều ý nghĩa tốt lành nhất. Đàn cá
                      nhiều màu sắc bơi lội chắc chắn sẽ khiến rất nhiều người
                      phải trầm trồ và thích thú.
                    </Paragraph>
                  </div>
                </div>
                <div id="4">
                  <h3
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    4. Cách lựa chọn cá Koi đẹp phù hợp với phong thủy
                  </h3>
                  <Paragraph className="paragraph-Style">
                    Để chọn được cá koi đẹp phù hợp với phong thủy và bản mệnh
                    của gia chủ, hãy “ghi chú” lại những thông tin sau đây:
                    <ul>
                      <li>
                        <Text className="text-Style">
                          Theo nguyên lý tương sinh tương khắc: Những người
                          thuộc mệnh Kim, Mộc, Thủy, Thổ đều có thể nuôi được cá
                          Koi, bởi cá là vật sống dưới nước, đại diện cho mệnh
                          Thủy. Còn người mệnh Hỏa, nếu muốn nuôi cá Koi có thể
                          lựa chọn những màu sắc cá Koi khác sao cho phù hợp với
                          bản mệnh.
                        </Text>
                      </li>
                      <li>
                        <Text className="text-Style">
                          Cá koi hiện nay đã được lai tạo với hơn 100 lợi với
                          loại màu sắc khác nhau, từ bảng màu của cá Koi bạn có
                          thể lựa chọn được những chú cá có màu sắc phù hợp nhất
                          với bản mệnh của mình. Các màu sắc này tương ứng với
                          các bản mệnh như màu đỏ tượng trưng cho Hỏa, màu đen
                          tượng trưng cho Thủy, trắng/vàng tượng trưng cho Kim,
                          da cam tượng trưng cho thổ và xanh xám tượng trưng cho
                          Mộc….
                        </Text>
                      </li>
                      <li>
                        <Text className="text-Style">
                          Ngoài ra, để chọn được những chú cá Koi phù hợp nhất
                          với phong thủy bạn có thể tìm kiếm ý kiến của các
                          chuyên gia trong lĩnh vực này. Nhưng trên hết, có lẽ
                          vẫn phải xuất phát từ tình yêu và sở thích về loài cá
                          cảnh này của mỗi người, từ đó mới có thể chọn được
                          được cá Koi phù hợp nhất.
                        </Text>
                      </li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                      <img src={img20} />
                      <Paragraph className="paragraph-Style">
                        Chọn loại cá phù hợp với sở thích người nuôi
                      </Paragraph>
                    </div>
                  </Paragraph>
                </div>
                <div id="5">
                  <h3
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    5. Lưu ý khi lựa chọn cá koi đẹp, hợp phong thủy
                  </h3>
                  <Paragraph className="paragraph-Style">
                    Khi thực hiện lựa chọn cá koi đẹp cho hồ cá koi thì bạn nên
                    tìm một địa chỉ cung cấp cá uy tín, đồng thời tham khảo từ
                    những người chơi có kinh nghiệm để có thể chọn được dòng cá
                    tốt nhất. Việc lựa chọn được những chú cá koi đẹp, người
                    chơi có thể tham khảo một số tiêu chí và lưu ý sau đây.
                  </Paragraph>
                  <div>
                    <span id="51" className="span-Style">
                      5.1. Dựa vào nguồn gốc xuất xứ
                    </span>
                    <Paragraph className="paragraph-Style">
                      Ngày nay, cá koi được cung cấp cho thị trường Việt Nam từ
                      3 nguồn chính:
                      <ul>
                        <li>
                          Nhập khẩu: Hiện nay các trại cá thường nhập cá koi
                          Nhật Bản thuần chủng và Trung Quốc. Các giống cá này
                          thường có giá trị cao do tính thuần chủng và tính thẩm
                          mĩ cao
                        </li>
                        <li>
                          Lai tạo: Là giống cá koi được lai tạo từ cá bố và cá
                          mẹ đều là cá chép Nhật Bản. Dòng cá F1 này có giá
                          thành rẻ hơn cá koi Nhật Bản do được phối giống và
                          nuôi dưỡng tại Việt Nam. Tuy là dòng F1 nhưng chất
                          lượng và màu sắc cũng không thua kém gì cá Nhật Bản
                          nên rất được người chơi ưa chuộng.
                        </li>
                        <li>
                          Thuần Việt: Là cá sinh trưởng và lớn lên tại Việt Nam,
                          có bố và mẹ đều là cá F1 nên hình dáng và màu sắc sẽ
                          không đẹp bằng các dòng cá khác
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                  <div>
                    <span id="52" className="span-Style">
                      5.2. Dựa trên màu sắc
                    </span>
                    <Paragraph className="paragraph-Style">
                      Màu sắc trên thân, vây và vảy phải rõ ràng và tươi sáng.
                      Các dải màu gọn gàng, không bị lem hay lẫn với các dải màu
                      khác. Mỗi loài cá sẽ có những màu sắc, hình thái và đặc
                      điểm nhận dạng khác nhau. Bạn cần đọc kỹ về từng giống cá
                      ở trên để không bị nhầm lẫn khi lựa chọn.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img21} />
                      <Paragraph className="paragraph-Style">
                        Dựa vào màu sắc của cá
                      </Paragraph>
                    </div>
                    <Paragraph className="paragraph-Style">
                      Không nên chọn những con giống có màu sắc nhợt nhạt, xỉn
                      màu. Nó có thể là một con cá có sức khỏe kém. Hoặc nếu màu
                      sắc không ngay ngắn thì khả năng cao đó sẽ không phải là
                      cá thuần chủng mà chỉ là cá koi F1 hoặc cá koi Việt Nam.
                    </Paragraph>
                  </div>
                  <div>
                    <span className="span-Style" id="53">
                      5.3. Dựa trên độ sức khỏe của cá koi
                    </span>
                    <Paragraph className="paragraph-Style">
                      Lựa chọn cá koi phải khỏe mạnh, có đôi mắt nhạy bén và
                      phản ứng nhanh. Cá bơi khỏe và tốt, linh hoạt, không lờ đờ
                      hoặc ít bơi lười bơi. Cá không bị kén ăn, bạn có thể kiểm
                      tra cho cá ăn khi mua tại cửa hàng. Nếu cá đớp mồi tốt
                      chứng tỏ cá có khả năng phát triển tốt.
                    </Paragraph>
                    <div>
                      <img src={img22} />
                      <Paragraph className="paragraph-Style">
                        Dựa vào màu sắc của cá
                      </Paragraph>
                    </div>
                    Cá koi không bị nhiễm bệnh, không có mầm bệnh. Mua phải cá
                    koi bị bệnh không những có thể lây lan sang những con cá
                    khác mà còn làm tăng khả năng cá chết lên nhiều lần.
                  </div>
                  <div>
                    <span className="span-Style" id="54">
                      5.4. Dựa trên thân hình của cá
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cơ thể của cá phải cân đối hài hòa, bề mặt cơ thể nhẵn
                      bóng, dáng vẻ tự nhiên. Đầu cá hơi gù, các vây cân đối,
                      không bị dị tật, trầy xước trên mình cá. Phần thân của cá
                      cũng phải có tỷ lệ vừa ý, để càng nuôi cá lớn, thân cá sẽ
                      càng đẹp và hấp dẫn. Theo kinh nghiệm, chúng tôi chia thân
                      cá thành 4 phần và có 4 điểm cần chú ý lần lượt là A, B,
                      C, D.
                    </Paragraph>
                    <div>
                      <img src={img23} />
                      <Paragraph className="paragraph-Style">
                        Dựa trên thân hình của cá
                      </Paragraph>
                    </div>
                    <Paragraph className="paragraph-Style">
                      Tỷ lệ thân giữa A và D là quan trọng nhất. Nếu trên thân
                      của cá khác nhau ở hai điểm này thì sau này cá sẽ lớn,
                      đuôi mỏng và vai rộng ra khiến chúng mất cân đối. Và nếu
                      vai của cá ở điểm A rộng và đuôi ở điểm D dày thì khi lớn
                      lên sẽ rất cân đối và sẽ tạo nên vẻ đẹp cân xứng khi nuôi
                      cá trong hồ.
                      <br />
                      Không chọn cá có kích thước quá lớn: đối với cá gia đình
                      nói chung, bạn nên chọn cá koi có kích thước từ 10 - 20 cm
                      trở lên để phù hợp với bể cá của gia đình.
                    </Paragraph>
                  </div>
                </div>
                <div id="6">
                  <h3
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    6. Phân biệt cá Koi Nhật thuần chủng và cá Koi Việt Nam
                  </h3>
                  <Paragraph className="paragraph-Style">
                    Trên thị trường hiện nay có 2 loại là cá koi Nhật thuần
                    chủng và Việt Nam khiến nhiều người mới tìm hiểu khó phân
                    biệt. Dưới đây là cách phân biệt dựa vào chủng loại, màu
                    sắc, hình dáng và đặc tính và giấy chứng nhận của cá koi:
                  </Paragraph>
                  <div>
                    <span id="61" className="span-Style">
                      6.1. Đặc điểm về màu sắc
                    </span>
                    <Paragraph className="paragraph-Style">
                      Màu sắc là đặc điểm phân biệt cá Koi Việt và cá Koi Nhật
                      đơn giản nhất.
                      <ul>
                        <li>
                          Cá Koi Nhật: Màu sắc koi thuần chủng luôn đậm, sắc nét
                          và sặc sỡ, các mảng màu tách biệt rõ ràng không lem
                          các màu vào nhau, không mờ nhạt, không chồng chéo lên
                          nhau.
                        </li>
                        <li>
                          Cá Koi Việt Nam: Màu sắc của koi việt mờ hơn nhiều so
                          với cá koi nhật. Màu đỏ thì đỏ cam hoặc cam, màu trắng
                          thì trắng sữa hoặc trắng đục, màu đen thì đen xám… Các
                          khoang màu không rõ nét, lờ mờ. Càng được lai tạo về
                          đời sau như F2, F3, F4…thì màu sắc cá koi càng mờ.
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                  <div>
                    <span id="62" className="span-Style">
                      6.2. Dựa vào hình dáng
                    </span>
                    <Paragraph className="paragraph-Style">
                      Dựa vào hình dán chúng ta cũng có thể phân biệt cá chép
                      nhật chuẩn và cá koi Việt:
                      <ul>
                        <li>
                          Cá chép Koi Nhật: Cơ thể lớn, mập mạp hơn và dài hơn.
                          Cơ thể có kích thước lớn, có thể phát triển tới hơn
                          100cm. Đầu của koi thuần chủng gù, mập và bị bè khi
                          nhìn từ trên cao. Mắt của cá nhanh nhẹn, to, sáng. Râu
                          dài và cứng. Các vây ngực dày và mờ đục.
                        </li>
                        <li>
                          Cá chép Koi Việt Nam: thân hình hơi dài, phần bụng của
                          cá gầy hơn cá koi nhật. kích thước khó đạt trên 100
                          cm, mắt nhỏ, râu ngắn. Các vây mỏng, nhỏ và trong
                          suốt.
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                  <div>
                    <span id="63" className="span-Style">
                      6.3. Dựa vào đặc tính
                    </span>
                    <Paragraph className="paragraph-Style">
                      Dựa vào hình dán chúng ta cũng có thể phân biệt cá chép
                      nhật chuẩn và cá koi Việt:
                      <ul>
                        <li>
                          Cá koi nhật: dòng cá này đặc biệt thông minh, dạn
                          người và thân thiện hơn cá koi Việt. khi thực hiện cho
                          cá ăn chúng sẽ ngoi lên và đớp thức ăn trên tay bạn
                        </li>
                        <li>
                          Cá koi việt: Sẽ mất một thời gian khá lâu để tiến hành
                          huấn luyện cho chúng đớp tay và dạn người hơn
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                </div>
                <div id="7">
                  <h3
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    7. Chăm sóc cá Koi như thế nào cho lên màu đẹp và mau lớn
                  </h3>
                  <Paragraph className="paragraph-Style">
                    Người chơi muốn chăm sóc cá Koi cần hiểu tập quán của loài
                    cá này. Mỗi dòng cá Koi có tập tính và sự phát triển riêng
                    nên cần chế độ chăm sóc riêng biệt. Nếu bạn muốn nuôi cá
                    chép koi nhanh lớn, đẹp mắt có thể tham khảo những kinh
                    nghiệm nuôi giống cá này như sau:
                  </Paragraph>
                  <div>
                    <span id="71" className="span-Style">
                      7.1. Hồ nuôi cá koi
                    </span>
                    <Paragraph className="paragraph-Style">
                      Khi nuôi và chăm sóc cá koi ,việc hồ cá koi phải đạt chuẩn
                      thì cá koi mới có môi trường sống khỏe mạnh. Hãy tham khảo
                      các thông số về nước, nhiệt độ và độ pH...sau đây
                    </Paragraph>
                    <ul className="paragraph-Style">
                      <li>Thể tích hồ: 2m3, độ sâu 1.2 – 1.8m;</li>
                      <li>Độ pH đạt từ 6.8– 7.5;</li>
                      <li>Nhiệt độ chuẩn: 23 – 26oC;</li>
                      <li>Hàm lượng Oxy tối thiểu trong nước là 2,5mg/l;</li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                      <img src={img24} />
                      <Paragraph className="paragraph-Style">
                        Hồ nuôi cá Koi
                      </Paragraph>
                    </div>
                    <ul className="paragraph-Style">
                      <li>
                        Mật độ nuôi cá Koi trưởng thành là 1 – 3 con/ 1m3. Cá
                        koi mini thì có thể thả dày hơn.
                      </li>
                      <li>
                        Vào mùa hè cần che chắn bể cá, không để ánh nắng trực
                        tiếp chiếu quá lâu. Vào mùa đông, sử dụng máy nước nóng,
                        luôn giữ nhiệt độ tiêu chuẩn;
                      </li>
                      <li>
                        Hạn chế trồng các loại cây thủy sinh, rong tảo, vì chúng
                        có thể làm ô nhiễm nước và hút oxy của cá koi.;
                      </li>
                      <li>
                        Hệ thống lọc phải đảm bảo tiêu chuẩn và được thiết kế
                        đúng kỹ thuật;
                      </li>
                      <li>
                        Khi thay nước không nên xả hết nước mà chỉ thay ⅓ nước
                        trong hồ. Trước khi bơm nước mới vào hồ, cần phơi nước
                        hoặc dùng than hoạt tính để khử clo, khử trùng nước
                        máy..
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span id="72" className="span-Style">
                      7.2 Giá cá koi Kohaku Nhật chuẩn
                    </span>
                    <Paragraph className="paragraph-Style">
                      Cá Koi khá dễ chăm sóc nên không quá kén thức ăn. Thông
                      thường, loài cá này có khả năng tiêu hóa tốt nhiều loại
                      thức ăn khác nhau ngay khi 1 tháng tuổi. Một số loại thực
                      phẩm thông dụng nhất bạn nên cho cá Koi thưởng thức như:
                      Gạo, bột mì, bã đậu, tôm, giun, ốc, cám, phân xanh hay bột
                      cá.
                    </Paragraph>
                    <ul className="paragraph-Style">
                      <li>
                        Khẩu phần ăn: Không nên cho cá koi ăn quá nhiều một lúc
                        mà nên chia thành 6 lần trong ngày, với mỗi khẩu phần ăn
                        nên khoảng 2% -3% trọng lượng cơ thể.
                      </li>
                      <li>
                        Thời điểm cho cá ăn: Thời gian tốt nhất là từ 6h, 8h,
                        10h sáng. chiều từ 14h - 18h. Đừng cho chúng ăn khuya.
                      </li>
                      <li>
                        Một số thương hiệu thức ăn cho cá koi: Hikari, Aqua
                        Master, JPD, FDFOOD..
                      </li>
                      <li>
                        Thức ăn bổ sung hàng ngày: Thức ăn hàng ngày của cá nên
                        có đủ các chất như tinh bột, đạm, vitamin, men, bột, đậu
                        nành.,…
                      </li>
                      <li>
                        Thức ăn cho lên màu đẹp: Thức ăn có độ đạm cao 40% đồn
                        thời phải có thêm vitamin, khoáng chất và bổ sung thêm
                        lợi khuẩn…{" "}
                      </li>
                    </ul>
                    <div style={{ textAlign: "center" }}>
                      <img src={img25} />
                      <Paragraph className="paragraph-Style">
                        Chọn thức ăn cho cá phù hợp
                      </Paragraph>
                    </div>
                  </div>
                  <div>
                    <span id="74" className="span-Style">
                      7.4. Cách chăm sóc và cách nuôi cá koi chuẩn nhất
                    </span>
                    <Paragraph className="paragraph-Style">
                      Để cá kiểng cá koi lên màu đẹp và mau lớn cần áp dụng
                      những cách chăm sóc cá koi sau đây:
                      <ul>
                        <li>
                          Thứ nhất: thường xuyên lọc nước cho hồ cá, tuy nhiên,
                          chỉ nên lọc khoảng 20% lượng nước mỗi ngày để tránh
                          việc cá bị sốc môi trường{" "}
                        </li>
                        <li>
                          Thứ 2: đó chính là chọn giống cá đẹp - tốt ngay từ
                          đầu, đây là điều kiện đầu tiên cần có để có thể chăm
                          sóc cá Koi lên màu đẹp.{" "}
                        </li>
                        <li>
                          Thứ 3: Lựa chọn thức ăn lên màu sắc cho cá Koi phù
                          hợp. Để nuôi được cá Koi khỏe mạnh, mau lớn, lên màu
                          đẹp không chỉ cần những loại thức ăn có đầy đủ chất
                          dinh dưỡng. Mà bạn cần bổ sung thêm các loại chuyên
                          dụng giúp cá Koi lên màu đẹp.{" "}
                        </li>
                        <li>
                          Thứ 4: Tạo môi trường sống lý tưởng để nuôi cá. Để làm
                          được điều này, cần lưu ý những đặc điểm của hồ cá như:
                          Hồ Koi phải có độ sâu tiêu chuẩn, không cạn quá, nhiệt
                          đồ hồ cá luôn duy trì ở mức 27 - 28 độ C, nước càng
                          lạnh thì màu sắc cá Koi sẽ càng rực rỡ, tuy nhiên, nếu
                          để lạnh quá cá sẽ không chịu được rét, nguy cơ tử vong
                          cao.{" "}
                        </li>
                        <li>
                          Thứ 5: Lưu ý độ pH trong hồ nuôi cá Koi. Hồ cá koi cần
                          được trang bị đầy đủ hệ thống lọc, cung cấp oxy để
                          giúp cá được khỏe mạnh, hệ miễn dịch tốt hơn. Duy trì
                          độ pH trong hồ nuôi cá từ trong khoảng 7-7,5, tránh
                          trường hợp oxy bị ngưng đọng trên bề mặt hồ cá koi và
                          khiến cá dễ bị chết do thiếu oxy trong nước
                        </li>
                        <li>
                          Hồ nuôi cá koi phải có diện tích đủ rộng, phù hợp với
                          kích thước của cá, diện tích hồ nuôi cá tối thiểu là
                          2m2, độ sâu khoảng 1,2 đến 1,8m
                        </li>
                      </ul>
                      <div style={{ textAlign: "center" }}>
                        <img src={img26} />
                        <Paragraph className="paragraph-Style">
                          Hồ cá koi cần được trang bị đầy đủ hệ thống lọc
                        </Paragraph>
                      </div>
                    </Paragraph>
                  </div>
                </div>
                <div id="8">
                  <h4
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    8. Các bệnh thường gặp ở cá koi
                  </h4>
                  <Paragraph className="paragraph-Style">
                    Cùng tìm hiểu mốt số loại bệnh thường gặp ở các dòng cá koi
                    và cách điều trị phòng ngừa hiệu quả nhấtS
                  </Paragraph>
                  <div>
                    <span className="span-Style" id="81">
                      8.1. Cá Koi bị đỏ mình
                    </span>
                    <Paragraph className="paragraph-Style">
                      Nếu cá koi của gia đình bạn phát triển nấm đỏ, trắng và
                      màng nhầy tuột nhớt trên da của chúng, bạn nên cách ly cá
                      <br />
                      Nguyên nhân của bệnh này là do cá tiếp xúc với cá mới mua
                      đã bị nhiễm bệnh trước đó..
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img27} />
                      <Paragraph className="paragraph-Style">
                        Cá Koi bị đỏ mình
                      </Paragraph>
                    </div>
                    <Paragraph className="paragraph-Style">
                      Cách điều trị: Để nhanh chóng chữa khỏi tình trạng này,
                      bạn nên cho thuốc tím vào nước và dùng máy lọc oxy và sắc
                      thuốc “Malachite Green” để nâng cao hiệu quả chữa bệnh.
                    </Paragraph>
                  </div>
                  <div>
                    <span className="span-Style" id="82">
                      8.2. Bệnh Cá Koi nằm đáy, co mình, hay nhảy khỏi mặt nước.
                    </span>
                    <Paragraph className="paragraph-Style">
                      Khi cá có hiện tượng này, rất có thể cá koi đã bị sán lá
                      da ký sinh trên cơ thể. Nếu không có biện pháp xử lý kịp
                      thời, sức khỏe của cá koi sẽ ngày càng xấu đi, trên da sẽ
                      xuất hiện các vết loét.
                      <span>Các điều trị:</span>
                      <ul>
                        <li>
                          Để loại bỏ, Pazivantel nên được đổ vào hồ với khoảng
                          thời gian 2 lần / ngày.
                        </li>
                        <li>
                          Tiếp tục theo dõi trong khoảng 1 tuần, nếu không có gì
                          thay đổi, cá sẽ nhanh chóng hồi phục và bơi trong hồ.
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                  <div>
                    <span className="span-Style" id="83">
                      8.3. Cá Koi bị stress
                    </span>
                    <Paragraph className="paragraph-Style">
                      Sở dĩ cá koi bị stress là do chủ nhân của chúng đã thả
                      nhiều loài cá cảnh khác vào bể nuôi chung. Mặc dù, hành
                      động này sẽ khiến bể cá trở nên hấp dẫn và có hồn hơn. Tuy
                      nhiên, khi số lượng cá cảnh trong hồ quá nhiều, lượng oxy
                      sẽ bị giảm đi và những con cá nhỏ có thể tấn công vào đuôi
                      của cá koi.
                    </Paragraph>
                    <div style={{ textAlign: "center" }}>
                      <img src={img28} />
                      <Paragraph className="paragraph-Style">
                        Cá Koi bị stress
                      </Paragraph>
                    </div>
                    <Paragraph className="paragraph-Style">
                      Cách khắc phục: Tiến hành giảm lượng cá trong hồ. Nếu bạn
                      không tìm và tách cá cảnh nhỏ ra bể cá khác kịp thời,
                      chúng sẽ bị stress và chết.
                    </Paragraph>
                  </div>
                  <div>
                    <span className="span-Style" id="84">
                      8.4. Cá koi bị nhát người
                    </span>
                    <Paragraph className="paragraph-Style">
                      Hiện tượng này rất hay xảy ra với những chú cá koi mới
                      được đưa về nuôi trong hồ gia đình. Không riêng gì những
                      chú cá koi mà tất cả các loại thú cưng nào khi mang về nhà
                      nuôi cũng tương đối nhút nhát.
                      <span>Cách khắc phục:</span>
                      <ul>
                        <li>
                          Lúc này giải pháp là thời gian đầu bạn nên hạn chế
                          tiếp xúc để cá koi ổn định tâm lý. Đồng thời bể cá
                          cũng nên có nắp đậy hoặc xây tường cao để tránh nguy
                          cơ cá nhảy ra khỏi bể.
                        </li>
                        <li>
                          Sau khoảng 5 - 7 ngày, bạn nên cho cá ăn theo khung
                          giờ để hình thành thói quen. Việc cho ăn thường xuyên
                          sẽ vô hình trung làm cho tình cảm giữa người nuôi và
                          cá gần gũi hơn.
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                  <div>
                    <span className="span-Style" id="85">
                      8.5. Cá Koi bị đục mắt
                    </span>
                    <Paragraph className="paragraph-Style">
                      Hiện tượng này rất hay xảy ra với những chú cá koi mới
                      được đưa về nuôi trong hồ gia đình. Không riêng gì những
                      chú cá koi mà tất cả các loại thú cưng nào khi mang về nhà
                      nuôi cũng tương đối nhút nhát.
                      <span>Cách khắc phục:</span>
                      <ul>
                        <li>
                          Bệnh đục mắt ở cá koi là một bệnh thường được phát
                          hiện ở loài cá chép. Vì vậy, nếu thấy mắt cá bị đục và
                          yếu, bạn nên chuyển cá sang bể cá mới và xử lý bằng
                          thuốc tím.
                        </li>
                        <li>
                          Nguyên nhân chính của hiện tượng này là do nguồn nước
                          không đảm bảo, vệ sinh và thay nước không đúng cách.
                        </li>
                      </ul>
                    </Paragraph>
                  </div>
                </div>
                <div id="9">
                  <h4
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    9. Giá cá Koi bao nhiêu tại IKoi
                  </h4>
                  <Paragraph className="paragraph-Style">
                    Thị trường cá Koi Nhật thuần chủng và f1 ở Việt Nam hiện nay
                    rất sôi động vì đây là loại cá nhận được nhiều sự yêu thích.
                    Để trả lời giá cá Koi bao nhiêu cần căn cứ vào nhiều yếu tố
                    như giống cá Koi, tuổi cá, độ độc lạ và địa chỉ bán cá. Tùy
                    vào sự lựa chọn của bạn mà mức giá cá koi sẽ có sự thay đổi.
                    <br />
                    Sau đây là bảng giá bán các dòng cá koi tại IKoi:
                  </Paragraph>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Dòng cá</th>
                        <th>Kích thước</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fishData.map((fish, index) => (
                        <tr key={index}>
                          <td>{fish.type}</td>
                          <td>{fish.size}</td>
                          <td>{fish.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Paragraph className="paragraph-Style">
                    Thông thường, những dòng cá Koi màu sắc hiếm và cá koi nhập
                    khẩu từ Nhật Bản sẽ đắt hơn các dòng cá lai tạp. Nếu bạn
                    muốn biết thêm về các dòng cá Koi cảnh và giá thành của từng
                    loại hãy liên hệ trực tiếp đến các cửa hàng chuyên bán cá
                    Koi uy tín để được tư vấn giá cá koi tốt nhất.
                  </Paragraph>
                </div>
                <div id="10">
                  <h4
                    style={{
                      color: "rgb(146, 2, 2)",
                      backgroundColor: "#ead8c8",
                      padding: "10px",
                    }}
                  >
                    10. Mua cá Koi Nhật ở đâu đẹp, đảm bảo chất lượng uy tín
                  </h4>
                  <Paragraph className="paragraph-Style">
                    Mua cá Koi chất lượng ở đâu uy tín là câu hỏi nhiều người
                    mới nuôi cá Koi quan tâm. Thực chất, trên thị trường có rất
                    nhiều đơn vị cung cấp loại cá này với chất lượng và nhiều
                    mức giá khác nhau. Để chọn được một địa chỉ mua cá Koi đảm
                    bảo chất lượng, giá thành cạnh tranh đòi hỏi người dùng cần
                    tham khảo và so sánh nhiều đơn vị nhằm chọn cho mình một địa
                    chỉ mua phù hợp nhất.
                    <br />
                    IKoi là một trong những địa chỉ bán cá Koi uy tín nhất tại
                    Việt Nam bạn có thể tham khảo. Những ưu điểm khi bạn lựa
                    chọn mua cá tại IKoi như sau:
                  </Paragraph>
                  <Paragraph className="paragraph-Style">
                    <ul>
                      <li>
                        Các giống cá Koi nhập khẩu đa dạng đảm bảo tiêu chuẩn
                        chất lượng giúp người mua có thêm nhiều lựa chọn khi
                        cần.
                      </li>
                      <li>
                        Các loại cá koi kiểng đủ size cho khách hàng lựa chọn.
                      </li>
                      <li>
                        Các dòng cá Koi đẹp tại IKoi đảm bảo mức giá cạnh tranh
                        nhất trên thị trường.
                      </li>
                      <li>
                        Tất cả các dòng cá Koi tại đây đều được tuyển chọn kỹ
                        càng đảm bảo khỏe mạnh, không bệnh tật trước khi đến tay
                        khách hàng.
                      </li>
                      <li>
                        Các loại cá đa dạng mức giá từ rẻ đến đắt tiền phù hợp
                        với mọi phân khúc khách hàng.
                      </li>
                      <li>
                        Đội ngũ nhân viên tư vấn chuyên nghiệp sẵn sàng tư vấn
                        và gợi ý cho khách hàng cá phù hợp với nhu cầu và sở
                        thích của người chơi.
                      </li>
                      <li>
                        Sẵn sàng tư vấn về cách nuôi cá, chăm sóc và những giải
                        pháp lọc nước, hệ thống lọc giúp cá lớn khỏe mạnh và lên
                        màu sắc đẹp.
                      </li>
                      <li>
                        Có ship hàng tới tất cả các tỉnh thành tại Việt Nam với
                        giá cả hợp lý
                      </li>
                    </ul>
                  </Paragraph>
                  <Paragraph className="paragraph-Style">
                    Trên đây là những thông tin về cá koi chi tiết nhất giúp
                    khách hàng có thể phân biệt, hiểu rõ hơn về các loại cá Koi
                    là cá gì cũng như cách nuôi, cách chơi loài cá cảnh đặc sắc
                    này. Nuôi cá Koi không chỉ đơn giản ở những kỹ thuật và sự
                    hiểu biết, nó còn phụ thuộc rất lớn vào tâm huyết và sự yêu
                    thích với loài cá này của người chơi. Vậy nên, qua bài viết
                    này, hy vọng bạn sẽ thêm nhiều hơn những thông tin cần thiết
                    về cá koi và việc nuôi cá koi ra sao cho đúng. Chúc các bạn
                    thành công!
                  </Paragraph>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
