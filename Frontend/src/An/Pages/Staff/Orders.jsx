import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaSearch } from "react-icons/fa";
import '../../Css/Orders.css'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import { BsFilterSquare } from "react-icons/bs";
import { Table } from 'react-bootstrap';
import { PiDotsThreeCircleLight } from "react-icons/pi";
import { useState } from 'react';
import useFilter from '../../Hooks/useFilter';
import { PiDotsThreeCircleFill } from "react-icons/pi";
import FilterBar from '../../Components/Staff/FilterBar';
import FilterButton from '../../Components/Staff/FilterButton';
import { countCategory } from '../../Utils/valueParser';
const orders = [
  {
    orderId: 101,
    customer: "John Doe",
    orderDate: "2024-02-05",
    deliveryDate: "2024-02-10",
    paymentStatus: "Paid",
    items: ["Laptop", "Monitor"],
    deliveryAddress: "123 Main St, Anytown, USA",
    total: 1500.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 102,
    customer: "Jane Smith",
    orderDate: "2024-02-03",
    deliveryDate: "2024-02-08",
    paymentStatus: "Pending",
    items: ["Smartphone", "Headphones"],
    deliveryAddress: "456 Elm St, Othertown, USA",
    total: 800.00,
    orderStatus: "Processing"
  },
  {
    orderId: 103,
    customer: "Bob Johnson",
    orderDate: "2024-02-07",
    deliveryDate: "2024-02-14",
    paymentStatus: "Paid",
    items: ["Tablet", "Power Bank"],
    deliveryAddress: "789 Oak Ave, Somewhereville, USA",
    total: 900.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 104,
    customer: "Alice Brown",
    orderDate: "2024-02-06",
    deliveryDate: "2024-02-11",
    paymentStatus: "Pending",
    items: ["Smartwatch", "Wireless Earbuds"],
    deliveryAddress: "321 Pine St, Downtownville, USA",
    total: 1200.00,
    orderStatus: "On Hold"
  },
  {
    orderId: 105,
    customer: "Mike Davis",
    orderDate: "2024-02-04",
    deliveryDate: "2024-02-09",
    paymentStatus: "Paid",
    items: ["Gaming PC", "High Refresh Rate Monitor"],
    deliveryAddress: "901 Maple St, Suburbiaville, USA",
    total: 2500.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 106,
    customer: "Sarah Lee",
    orderDate: "2024-02-08",
    deliveryDate: "2024-02-13",
    paymentStatus: "Pending",
    items: ["Laptop", "External Hard Drive"],
    deliveryAddress: "234 Cedar St, Anytown, USA",
    total: 1300.00,
    orderStatus: "Processing"
  },
  {
    orderId: 107,
    customer: "David Kim",
    orderDate: "2024-02-01",
    deliveryDate: "2024-02-06",
    paymentStatus: "Paid",
    items: ["Smart TV", "Soundbar"],
    deliveryAddress: "567 Walnut St, Othertown, USA",
    total: 1800.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 108,
    customer: "Emily Chen",
    orderDate: "2024-02-09",
    deliveryDate: "2024-02-14",
    paymentStatus: "Pending",
    items: ["Gaming Console", "Extra Controller"],
    deliveryAddress: "890 Birch Ave, Somewhereville, USA",
    total: 2000.00,
    orderStatus: "On Hold"
  },
  {
    orderId: 109,
    customer: "Kevin White",
    orderDate: "2024-02-02",
    deliveryDate: "2024-02-07",
    paymentStatus: "Paid",
    items: ["Smartphone", "Power Bank", "Screen Protector"],
    deliveryAddress: "345 Oak St, Downtownville, USA",
    total: 1000.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 110,
    customer: "Lisa Nguyen",
    orderDate: "2024-02-10",
    deliveryDate: "2024-02-15",
    paymentStatus: "Pending",
    items: ["Laptop", "External Keyboard", "Mouse"],
    deliveryAddress: "678 Maple St, Suburbiaville, USA",
    total: 1500.00,
    orderStatus: "Processing"
  },
  {
    orderId: 111,
    customer: "James Brown",
    orderDate: "2024-02-03",
    deliveryDate: "2024-02-08",
    paymentStatus: "Paid",
    items: ["Smartwatch", "Fitness Tracker"],
    deliveryAddress: "901 Pine St, Anytown, USA",
    total: 800.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 112,
    customer: "Sarah Taylor",
    orderDate: "2024-02-07",
    deliveryDate: "2024-02-12",
    paymentStatus: "Pending",
    items: ["Tablet", "Stylus Pen"],
    deliveryAddress: "234 Cedar Ave, Othertown, USA",
    total: 900.00,
    orderStatus: "On Hold"
  },
  {
    orderId: 113,
    customer: "Michael Lee",
    orderDate: "2024-02-04",
    deliveryDate: "2024-02-09",
    paymentStatus: "Paid",
    items: ["Smart TV", "Soundbar"],
    deliveryAddress: "567 Walnut Ave, Somewhereville, USA",
    total: 1800.00,
    orderStatus: "Shipped"
  },
  {
    orderId: 114,
    customer: "Emily Johnson",
    orderDate: "2024-02-01",
    deliveryDate: "2024-02-06",
    paymentStatus: "Pending",
    items: ["Laptop", "External Hard Drive"],
    deliveryAddress: "890 Birch Ave, Downtownville, USA",
    total: 1300.00,
    orderStatus: "Processing"
  }
];

export default function Orders() {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(orders)
  const { searchTerm, handleFilterChange, filteredData, handleSearch, filterList } = useFilter(data,'order');

  return (
    <div>
      <div className='fw-bold fs-1 ms-5 mb-5'>Order</div>

      <div className='d-flex ms-5 me-5 mb-3 Card-Container' style={{ height: '100px', gap: '1rem' }}>
        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Orders</h4>
          <p>{data.length}</p>
        </div>

        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Orders</h4>
          <p>{data.length}</p>
        </div>
        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Orders</h4>
          <p>{data.length}</p>
        </div>
        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Orders</h4>
          <p>{data.length}</p>
        </div>

      </div>
      <div className='d-flex ms-5 me-5 Order-container' style={{ gap: '2rem' }}>
        <FilterButton label="All Order" filterType="OrderStatus" filterValue="" currentFilter={filterList.OrderStatus} onFilterChange={handleFilterChange} count={data.length} />
        <FilterButton label="Shipped" filterType="OrderStatus" filterValue="Shipped" currentFilter={filterList.OrderStatus} onFilterChange={handleFilterChange} count={countCategory(data,'orderStatus','Shipped')} />
        <FilterButton label="Processing" filterType="OrderStatus" filterValue="Processing" currentFilter={filterList.OrderStatus} onFilterChange={handleFilterChange} count={countCategory(data,'orderStatus','Processing')} />
        <FilterButton label="On Hold" filterType="OrderStatus" filterValue="On Hold" currentFilter={filterList.OrderStatus} onFilterChange={handleFilterChange} count={countCategory(data,'orderStatus','On Hold')} />
      </div>

      <hr className="my-1 mb-4" />
      <div className='d-flex ms-5 me-5 ' style={{ gap: '2rem' }}>

        <FilterBar initialTitle="Order Status" NavItems={["All", "Shipped", "Processing", "On Hold"]} handleFilterChange={handleFilterChange} filter="OrderStatus" />


        <FilterBar initialTitle="Payment Status" NavItems={["All", "Paid", "Pending"]} handleFilterChange={handleFilterChange} filter="PaymentStatus" />

        <div className="d-flex ms-auto" style={{ flexGrow: 0.125 }}>
          <Form className="d-flex w-100 flex-row">
            <FormControl
              type="search"
              placeholder="Find Order"
              value={searchTerm}
              onChange={handleSearch}
              className="me-1"
              aria-label="Search"
            />
            {/* <button className='btn btn-primary d-inline' type="submit" onClick={e =>{e.preventDefault}}>
              <FaSearch />
            </button> */}
          </Form>
        </div>
      </div>
      <div className='ms-5 me-5'>
        <Table striped bordered hover responsive="md">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Payment Status</th>
              <th>Items</th>
              <th>Delivery Address</th>
              <th>Total</th>
              <th>Order Status</th>
              <th className='d-flex justify-content-center align-content-center'><BsFilterSquare /></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((order, index) => (
              <tr key={order.orderId}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}

              >
                <td>{index + 1}</td>
                <td>{order.orderId}</td>
                <td>{order.customer}</td>
                <td>{order.orderDate}</td>
                <td>{order.deliveryDate}</td>
                <td>{order.paymentStatus}</td>
                <td>{order.items.join(", ")}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.total}</td>
                <td>{order.orderStatus}</td>
                <td className='d-flex justify-content-center align-items-center' style={{ height: '40px' }}>
                  <Dropdown>
                    <Dropdown.Toggle as="div" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                      {hoveredRow === index ? <PiDotsThreeCircleFill /> : <PiDotsThreeCircleLight />}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">View</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                      <Dropdown.Item onMouseLeave={() => { setIsActive(false) }} onMouseEnter={() => { setIsActive(true) }} className={isActive ? ('bg-danger text-white') : ''}>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>

  )
}
