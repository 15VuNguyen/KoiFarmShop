import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {

    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn truy cập không tồn tại."
      extra={
        <Button type="primary" onClick={() => navigate("/", { replace: true })}>
            Trở về trang chủ
        </Button>
      }
    />
  );
}

export default NotFound;
