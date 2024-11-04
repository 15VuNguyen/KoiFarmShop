import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Koikohaku from "./Components/Koi/Koikohaku";
import Koiogon from "./Components/Koi/Koiogon";
import Koishowa from "./Components/Koi/Koishowa";
import Koitancho from "./Components/Koi/Koitancho";
import Koibekko from "./Components/Koi/Koibekko";
import Koidoitsu from "./Components/Koi/Koidoitsu";
import Koiginrin from "./Components/Koi/Koiginrin";
import Koigoshiki from "./Components/Koi/Koigoshiki";
import Koibenigoi from "./Components/Koi/Koibenigoi";
import Gioithieu from "./Components/Gioithieu";
import Gioithieusankygui from "./Components/Gioithieusankygui";
import Koiasagi from "./Components/Koi/Koiasagi";
import Koishusui from "./Components/Koi/Koishusui";
import Koiplatinum from "./Components/Koi/Koiplatinum";
import Lienhe from "./Components/Lienhe";
import Kienthuckoi from "./Components/Kienthuckoi";
import Koidangban from "./Components/Koidangban";
import Spinner from "./An/Components/Spinner";
import DashBoard from "./An/Pages/DashBoard";
import Home from "./Home";
import Login from "./Login";
import LoginPage from "./An/Pages/Login";
import OrderPage from "./Components/OrderPage";
import TrackingOrderPage from "./Components/trackingOrderPage";
import "bootstrap/dist/css/bootstrap.min.css";
import Profile from "./Components/Profile";
import DonKyGuiPage from "./Components/Donkygui";
import NguonGocCuaIKoi from "./Components/Nguongoccuaikoi";
import GioiThieuVeKoiViet from "./Components/GioiThieuVeKoiViet";
import GioiThieuVeKoiNhat from "./Components/GioiThieuVeKoiNhat";
import GioiThieuVeKoiF1 from "./Components/GioitThieuVeKoiF1";
import OrderingIKoi from "./Components/OrderingIKoi";
import OrderingJapanKoi from "./Components/OrderingJapanKoi";
import changePassword from "./Components/ChangePassword";
import Donkyguipage from "./Components/Page/Thongtincuauser/donkyguiPage";
const Staff = lazy(() => import("../src/An/Pages/Staff"));
const Manager = lazy(() => import("./An/Pages/Manager/Manager"));
// const Profiles = lazy(() => import("../src/An/Pages/Staff/Profiles"));
const Orders = lazy(() => import("../src/An/Pages/Staff/Orders"));
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import style cho toast
import ShoppingCart from "./Components/ShoppingCart";
import ResetPassword from "./An/Components/resetpassword";
import ManageKoi from "./An/Pages/Manager/ManageKoi";
import ManageSupplier from "./An/Pages/Manager/ManageSupplier";
import ChangePassword from "./Components/ChangePassword";
import FormFillInformation from "./Components/FormFillInformation";
// import Chart from "./An/Pages/Charts/Charts";
import PaymentMethod from "./Components/Paymentmethod";
import ManageInvoices from "./An/Pages/Manager/ManageInvoices";
import Profiles from "./An/Ant Design/Pages/Profiles";
import AnTopBar from "./An/Ant Design/Components/ANTDTopbar";
import Locakoinhapkhau from "./Components/LoCaKoiNhapKhau";
import Consigns from "./An/Ant Design/Pages/Consigns";
import Invoices from "./An/Ant Design/Pages/Invoices";
import Suppliers from "./An/Ant Design/Pages/Suppliers";
import CaKoiNhat from "./Components/CaKoiNhat";
import OrdersNext from "./An/Ant Design/Pages/Orders";
import Kois from "./An/Ant Design/Pages/Kois";
import Gioithieuvekoif1page from "./Components/Page/Gioithieu/gioithieuvekoif1";
//AN
import Chitietconsignpage from "./Components/Page/Thongtincuauser/chitietconsignPage";
import Changepasswordpage from "./Components/Page/Thongtincuauser/changepasswordPage";
import Trackingorderpage from "./Components/Page/Thongtincuauser/trackingorderPage";
import Gioithieupage from "./Components/Page/Gioithieu/gioithieuPage";
import ChinhSach from "./Components/ChinhSach/chinhSach";
import Gioithieuvekoinhatpage from "./Components/Page/Gioithieu/gioithieuvekoinhat";
import Gioithieuvekoivietpage from "./Components/Page/Gioithieu/gioithieuvekoiviet";
import NguongoccuaikoiPage from "./Components/Page/Gioithieu/nguongoccuaikoiPage";
import Profilepage from "./Components/Page/Thongtincuauser/profilePage";
import Chart from "./An/Ant Design/Pages/Chart";
const router = createBrowserRouter([
  {
    path: "/login/oauth",
    element: <Login />,
  },
  {
    path: "/kohaku",
    element: <Koikohaku />,
  },
  {
    path: "/ogon",
    element: <Koiogon />,
  },
  {
    path: "/showa",
    element: <Koishowa />,
  },
  {
    path: "/tancho",
    element: <Koitancho />,
  },
  {
    path: "/bekko",
    element: <Koibekko />,
  },
  {
    path: "/doitsu",
    element: <Koidoitsu />,
  },
  {
    path: "/ginrin",
    element: <Koiginrin />,
  },
  {
    path: "/goshiki",
    element: <Koigoshiki />,
  },
  {
    path: "/benigoi",
    element: <Koibenigoi />,
  },
  {
    path: "/asagi",
    element: <Koiasagi />,
  },
  {
    path: "/shusui",
    element: <Koishusui />,
  },
  {
    path: "/platinum",
    element: <Koiplatinum />,
  },
  {
    path: "/gioithieu",
    element: <Gioithieupage />,
  },
  {
    path: "/gioithieusankygui",
    element: <Gioithieusankygui />,
  },
  {
    path: "/lienhe",
    element: <Lienhe />,
  },
  {
    path: "/kienthuckoi",
    element: <Kienthuckoi />,
  },
  {
    path: "/kygui",
    element: <Gioithieusankygui />,
  },
  {
    path: "/koidangban",
    element: <Koidangban />,
  },
  {
    path: "/login",
    element: <LoginPage />, // Temporary login route
  },
  {
    path: "/",
    element: <Home />, // Home component
  },
  {
    path: "/order",
    element: <OrderPage />, // Home component
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/trackingorder",
    element: <TrackingOrderPage />, // Home component
  },
  {
    path: "/profile",
    element: <Profilepage />, // Home component
  },
  {
    path: "/donkygui",
    element: <DonKyGuiPage />, // Home gcomponent
  },
  {
    path: "/nguongocIKoi",
    element: <NguongoccuaikoiPage />, // Home component
  },
  {
    path: "/gioithieuvekoiviet",
    element: <Gioithieuvekoivietpage />, // Home component
  },
  {
    path: "/gioithieuvekoinhat",
    element: <Gioithieuvekoinhatpage />, // Home component
  },
  {
    path: "/gioithieuvekoif1",
    element: <Gioithieuvekoif1page />, // Home component
  },
  {
    path: "/gioithieuvekoiviet",
    element: <GioiThieuVeKoiViet />,
  },
  {
    path: "/orderingikoi",
    element: <OrderingIKoi />,
  },
  {
    path: "/orderingjapankoi",
    element: <OrderingJapanKoi />,
  },
  {
    path: "/changepassword",
    element: <ChangePassword />,
  },
  {
    path: "/cart",
    element: <ShoppingCart />,
  },
  {
    path: "/formfillinformation",
    element: <FormFillInformation />,
  },
  {
    path: "/paymentmethod",
    element: <PaymentMethod />,
  },
  {
    path: "/cakoinhat",
    element: <CaKoiNhat />,
  },
  {
    path: "/donkyguipage",
    element: <Donkyguipage />,
  },
  {
    path: "/changepasswordpage",
    element: <Changepasswordpage />,
  },

  {
    path: "/trackingorderpage",
    element: <Trackingorderpage />,
  },
  {
    path: "/chitiet",
    element: <Chitietconsignpage />,
  },
  {
    path: "/chinhsach",
    element: <ChinhSach />,
  },
  {
    path: "/NewDashboard",
    element: <AnTopBar />,
    children: [
      {
        path: "staff/Profiles",
        element: <Profiles />,
      },
      {
        path: "staff/Consigns",
        element: <Consigns />,
      },
      {
        path: "staff/Invoices",
        element: <Invoices />,
      },
      {
        path: "staff/Suppliers",
        element: <Suppliers />,
      },
      {
        path: "staff/Orders",
        element: <OrdersNext />,
      },
      {
        path: "staff/Kois",
        element: <Kois />,
      },
      {
        path: "staff/Report/:chartType",
        element: <Chart />,
      }
    ],
  },
  {
    path: "/lonhapkhau",
    element: <Locakoinhapkhau />,
  },
  {
    path: "/DashBoard",
    element: <DashBoard />, // DashBoard component
    children: [
      {
        path: "staff/Profiles",
        element: (
          <Suspense fallback={<Spinner />}>
            <Profiles /> {/* Profile component */}
          </Suspense>
        ),
      },
      // {
      //   path: "staff/Report/:chartType",
      //   element: (
      //     <Suspense fallback={<Spinner />}>
      //       <Chart />
      //     </Suspense>
      //   ),
      // },
      {
        path: "manager/ManageInvoices",
        element: (
          <Suspense fallback={<Spinner />}>
            <ManageInvoices />
          </Suspense>
        ),
      },
      {
        path: "staff/Orders",
        element: (
          <Suspense fallback={<Spinner />}>
            <Orders /> {/* Orders component */}
          </Suspense>
        ),
      },
      {
        path: "manager/Consign",
        element: (
          <Suspense fallback={<Spinner />}>
            <Manager /> {/* Manager component */}
          </Suspense>
        ),
      },
      {
        path: "manager/ManageSupplier",
        element: (
          <Suspense fallback={<Spinner />}>
            <ManageSupplier />
          </Suspense>
        ),
      },
      {
        path: "manager/ManageKoi",
        element: (
          <Suspense fallback={<Spinner />}>
            <ManageKoi />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
