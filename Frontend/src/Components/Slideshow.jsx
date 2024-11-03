import { Carousel } from "antd";
import "./Slideshow.css"; // Ensure your CSS is included
import img1 from "../../src/assets/image16-1661495517-88-width2048height1365.jpg";
import img2 from "../../src/assets/alo1.jpg";
import img3 from "../../src/assets/alo2.jpg";
import img4 from "../../src/assets/alo3.jpg";
import img5 from "../../src/assets/alo4.jpeg";
const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  // Add more image paths here
];

export default function Slideshow() {
  return (
    <div className="slideshow-container">
      <Carousel autoplay dots>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="slideshow-image"
              style={{
                marginTop: "80px",
                width: "100%",
                height: "70vh",
                margin: "0 auto",
              }} // Ensure images are responsive
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
