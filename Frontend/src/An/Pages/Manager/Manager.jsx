import TopBar from "../../Components/TopBar"
import { useState, useEffect } from "react"
import useFilter from "../../Hooks/useFilter"
import axiosInstance from "../../Utils/axiosJS"
import Spinner from "../../Components/Spinner"
import FilterButton from "../../Components/Staff/FilterButton"
import TableGen from "../../Components/Staff/TableGen"
import FilterBar from "../../Components/Staff/FilterBar"
import ConsignDetailModal from "../../Components/Manager/ConsignDetailModal"
import { Form, FormControl } from "react-bootstrap"
import '../../Css/Orders.css'
import { whatRole } from "../../Utils/valueParser"
export default function Manager() {
  const [intialData, setIntialData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hoveredRow, setHoveredRow] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consignID, setConsignID] = useState(null);
  const { searchTerm, handleFilterChange, filteredData, handleSearch, filterList } = useFilter(intialData, 'consign');
  const handleRowAction = (id, actionType) => {
    if (actionType === 'delete') {

      console.log(`Delete user with ID: ${id}`);
    }
    else if (actionType === 'view') {
      setConsignID(id)
    }
  };
  const handleMouseEnter = (index) => {
    setHoveredRow(index);
  };
  const handleMouseLeave = () => {
    setHoveredRow(null);
  };
  const headers = ['#', 'Consign ID', 'Shipped Date', 'Receipt Date', 'Description', 'State', 'Method', 'Position Care'];
  const fieldMapping = ['_id', 'ShippedDate', 'ReceiptDate', 'Description', 'State', 'Method', 'PositionCare']
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get('manager/manage-ki-gui/get-all')
        console.log(res.data.result)
        setIntialData(res.data.result)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }
    , [])
  function totalKoiChecks(data) {
    let count = 0;
    data.forEach(element => {
      if (element.State === 1) {
        count++;
      }
    });
    return count;
  }
  function totalPriceAgreements(data) {
    let count = 0;
    data.forEach(element => {
      if (element.State === 2) {
        count++;
      }
    });
    return count;
  }
  function totalFishDeliveries(data) {
    let count = 0;
    data.forEach(element => {
      if (element.State === 3) {
        count++;
      }
    });
    return count;
  }
  function totalFishSales(data) {
    let count = 0;
    data.forEach(element => {
      if (element.State === 4) {
          count++;
          console.log(element)
      }
    });
    return count;
  }
  

  return (
    <div>
      <ConsignDetailModal actions={showModal} setactions={setShowModal} consignID={consignID} />


      <div className='fw-bold fs-1 ms-5 mb-5'>Consign</div>

      <div className='d-flex ms-5 me-5 mb-3 Card-Container' style={{ height: '100px', gap: '1rem' }}>
        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Deposit Requests</h4>
          <p>{intialData.length}</p>
        </div>

        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Koi Checks</h4>
          <p>{totalKoiChecks(intialData)}</p>
        </div>
        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Price Agreements</h4>
          <p>{totalPriceAgreements(intialData)}</p>
        </div>

        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Fish Deliveries</h4>
          <p>{totalFishDeliveries(intialData)}</p>
        </div>

        <div className='border rounded-3 p-2 flex-grow-1'>
          <h4 className='fw-bold fs-4 fs-md-5'>Total Fish Sales</h4>
          <p>{totalFishSales(intialData)}</p>
        </div>
      </div>
      <div className='d-flex ms-5 me-5 Order-container' style={{ gap: '2rem' }}>
        {/* ==============================Filter Button========================================= */}
        <FilterButton
          label="All"
          filterType="State"
          filterValue=""
          currentFilter={filterList.State}
          onFilterChange={handleFilterChange}
          count={intialData.length}
        />
        <FilterButton
          label=" Deposit Requests"
          filterType="State"
          filterValue="1"
          currentFilter={filterList.State}
          onFilterChange={handleFilterChange}
          count={totalKoiChecks(intialData)}
        />
        <FilterButton
          label="Koi Checks"
          filterType="State"
          filterValue="2"
          currentFilter={filterList.State}
          onFilterChange={handleFilterChange}
          count={totalPriceAgreements(intialData)}
        />

        <FilterButton
          label="Price Agreements"
          filterType="State"
          filterValue="3"
          currentFilter={filterList.State}
          onFilterChange={handleFilterChange}
          count={totalFishDeliveries(intialData)}

        />
        <FilterButton
          label="Fish Deliveries"
          filterType="State"
          filterValue="4"
          currentFilter={filterList.State}
          onFilterChange={handleFilterChange}
          count={totalFishSales(intialData)}
        />
        <FilterButton
          label="Fish Sales"
          filterType="State"
          filterValue="5"
          currentFilter={filterList.State}
          onFilterChange={handleFilterChange}
          count={totalFishSales(intialData)}
        />
      </div>
      <hr className="my-1 mb-4" />
      {/* ==============================Filter Bar========================================= */}
      <div className='d-flex ms-5 me-5 flex-wrap ' style={{ gap: '2rem' }}>
        <FilterBar
          initialTitle= 
          {
            filterList.location === '' ? "All Location" : filterList.location === 'iKoi farm' ? "iKoi farm" : "iKoi farm"
          }
          NavItems={["All", "IKoiFarm"]}
          handleFilterChange={handleFilterChange}
          filter="location"
        />

        <FilterBar
          initialTitle={
            filterList.State === '' ? "Consign State" : filterList.State === '1' ? "Deposit Requests" : filterList.State === '2' ? "Koi Checks" : filterList.State === '3' ? "Price Agreements" : filterList.State === '4' ? "Fish Deliveries" : "Fish Sales"
          }
          NavItems={["All", "Deposit Requests", "Koi Checks", "Price Agreements", "Fish Deliveries", "Fish Sales"]}
          handleFilterChange={handleFilterChange}
          filter="State"
        />


        <div className="d-flex ms-auto search-container" style={{ flexGrow: 0.125 }}>
          <Form className="d-flex w-100 flex-row search-bar">
            <FormControl
              type="search"
              placeholder="Find Consign"
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
      <div>
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <TableGen
            headers={headers}
            data={filteredData}
            fieldMapping={fieldMapping}
            handleRowAction={handleRowAction}
            setHoveredRow={setHoveredRow}
            hoveredRow={hoveredRow}
            isActive={isActive}
            setIsActive={setIsActive}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            whatRole={whatRole}
            showModal={setShowModal}
            Table={'Consign'}
          />
        )}
      </div>
    </div>
  )
}
