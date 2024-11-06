import React, { useState, useEffect } from 'react';
// CSS
import '../../Css/Orders.css';
import '../Manager/ManageKoi.css';
// Bootstrap 
import { Modal, Button, Form, DropdownButton, Card, Carousel } from 'react-bootstrap';
import FormControl from 'react-bootstrap/FormControl';
// Custom Hooks
import useFilter from '../../Hooks/useFilter';
// Utils
import { isAddress, whatRole } from '../../Utils/valueParser';
// Components
import FilterBar from '../../Components/Staff/FilterBar';
import FilterButton from '../../Components/Staff/FilterButton';
import Spinner from '../../Components/Spinner';
import TableGen from '../../Components/Staff/TableGen';
// Axios
import axiosInstance from '../../Utils/axiosJS';
//firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";

export default function ManageSupplier() {
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayType, setOverlayType] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [hoveredRow, setHoveredRow] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [supplierID, setSupplierID] = useState(null);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const headers = ['#', 'Mã Nhà Cung Cấp', 'Tên Nhà Cung Cấp', 'Địa Chỉ', 'Quốc Gia', 'Số Điện Thoại'];
    const fieldMapping = ['_id', 'SupplierName', 'Address', 'Country', 'PhoneNumber'];
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
    };
    const handleShowOverlay = (type) => {
        setOverlayType(type);
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const handleCreate = () => {
        setIsCreating(true);

        setShowModal(true);
    };
    const handleImageUpload = (e) => {


        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setImageFile(file);
        }
    };

    const handleVideoUpload = (e) => {

        const file = e.target.files[0];
        console.log('File:', file);
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoPreview(videoUrl);
            setVideoFile(file);
        }
    };
    const handleRowAction = (id, actionType) => {
        if (actionType === 'delete') {
            console.log(`Delete user with ID: ${id}`);
        } else if (actionType === 'view') {
            setIsCreating(false);
            const supplier = intialData.find(supplier => supplier._id === id);
            setSelectedSupplier(supplier);
            setShowModal(true);
        }
    };

    const [intialData, setIntialData] = useState([]);
    const handleMouseEnter = (index) => {
        setHoveredRow(index);
    };

    const handleMouseLeave = () => {
        setHoveredRow(null);
    };

    const { searchTerm, handleFilterChange, filteredData, handleSearch, filterList } = useFilter(intialData, 'supplier');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/manager/manage-supplier/get-all');
                setIntialData(response.data.result);
                console.log(response.data.result);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleCreating = async () => {
        try {
            let imageUrl = '';
            let videoUrl = '';

            if (imageFile) {
                const imageRef = ref(storage, `images/${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
                setSelectedSupplier(prevState => ({
                    ...prevState,
                    SupplierImage: imageUrl
                }));
                console.log(selectedSupplier)
            }

            if (videoFile) {
                const videoRef = ref(storage, `videos/${videoFile.name}`);
                await uploadBytes(videoRef, videoFile);
                videoUrl = await getDownloadURL(videoRef);
                setSelectedSupplier(prevState => ({
                    ...prevState,
                    SupplierVideo: videoUrl
                }));
            }

            console.log('Selected Supplier:', selectedSupplier);
            const response = await axiosInstance.post('/manager/manage-supplier/create-new-supplier', selectedSupplier);
            console.log(response.data);

            setShowModal(false);
            setIsCreating(false);
            // window.location.reload();

        } catch (error) {
            console.error('Error creating supplier:', error);
        }
    };
    const handleModalClose = () => setShowModal(false);

    const handleModalSave = async () => {
        try {
            let updatedSupplier = { ...selectedSupplier };


            console.log('Updated Supplier:', updatedSupplier);
            const response = await axiosInstance.put(`/manager/manage-supplier/${updatedSupplier._id}`, updatedSupplier);
            console.log(response.data);

            setSelectedSupplier(updatedSupplier);
            setShowModal(false);
            setIsCreating(false);
                window.location.reload();

        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log('Name:', name, 'Value:', value);
        setSelectedSupplier(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
                <div className='fw-bold fs-1 ms-5 mb-5'>Nhà Cung Cấp</div>
                <div className='d-flex ms-5 me-5 mb-3 Card-Container' style={{ height: '100px', gap: '1rem' }}>
                    <div className='border rounded-3 p-2 w-25'>
                        <h4 className='fw-bold fs-4 fs-md-5'>Tổng số lượng nhà cung cấp</h4>
                        <p>{intialData.length}</p>
                    </div>
                </div>

                <div className='d-flex ms-5 me-5 Order-container' style={{ gap: '2rem' }}>
                    {/* Filter buttons */}
                    <FilterButton
                        label="Tất Cả Nhà Cung Cấp"
                        filterType="Country"
                        filterValue=""
                        currentFilter={filterList.Country}
                        onFilterChange={handleFilterChange}
                        count={intialData.length}
                    />
                    <FilterButton
                        label="Tất cả Nhà Cung Cấp Nhật Bản"
                        filterType="Country"
                        filterValue="Nhật Bản"
                        currentFilter={filterList.Country}
                        onFilterChange={handleFilterChange}
                        count={intialData.filter((item) => item.Country === 'Nhật Bản').length}
                    />
                    <FilterButton
                        label="Tất cả Nhà Cung Cấp Việt Nam"
                        filterType="Country"
                        filterValue="Việt Nam"
                        currentFilter={filterList.Country}
                        onFilterChange={handleFilterChange}
                        count={intialData.filter((item) => item.Country === 'Việt Nam').length}
                    />
                    

            </div>
            <hr className="my-1 mb-4" />
            <div className='d-flex ms-5 me-5 flex-wrap ' style={{ gap: '2rem' }}>
                <FilterBar
                    initialTitle={
                        filterList.Country === '' ? "Tất Cả" : filterList.Country === 'Nhật Bản' ? "Nhật Bản" : filterList.Country === 'Việt Nam' ? "Việt Nam" : "Trung Quốc"
                    }
                    NavItems={["All", "Nhật Bản", "Việt Nam", "Trung Quốc"]}
                    handleFilterChange={handleFilterChange}
                    filter="Country"
                />
                <DropdownButton title={'CREATE NEW SUPPLIER'} variant="success" className='do-not-show' onClick={handleCreate}></DropdownButton>
                <div className="d-flex ms-auto search-container" style={{ flexGrow: 0.125 }}>
                    <Form className="d-flex w-100 flex-row search-bar">
                        <FormControl
                            type="search"
                            placeholder="Tìm kiếm nhà cung cấp"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="me-1"
                            aria-label="Search"
                        />
                    </Form>
                </div>
            </div>

            <TableGen
                data={filteredData}
                headers={headers}
                fieldMapping={fieldMapping}
                hoveredRow={hoveredRow}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                whatRole={whatRole}
                isAddress={isAddress}
                isActive={isActive}
                setIsActive={setIsActive}
                handleRowAction={handleRowAction}
                showModal={setShowModal}
                isSpecial={true}
            />


            {showModal && (
                <Modal show={showModal} onHide={handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{!isCreating ? 'View' : 'Create New Supplier'}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        {selectedSupplier?.SupplierImage ? (
                            <Carousel>
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={selectedSupplier?.SupplierImage}
                                        alt="Supplier Image"
                                    />
                                </Carousel.Item>
                            </Carousel>
                        ) : (
                            <div className="text-center">No Image</div>
                        )}
                        <Form>
                            <Form.Group controlId="formSupplierName">
                                <Form.Label>Supplier Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="SupplierName"
                                    {
                                    ...isCreating ? {
                                        placeholder: 'Enter Supplier Name'
                                    } : {
                                        value: selectedSupplier?.SupplierName
                                    }
                                    }
                                    onChange={handleInputChange}

                                />
                            </Form.Group>

                            <Form.Group controlId="formAddress" className="mt-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Address"
                                    {
                                    ...isCreating ? {
                                        placeholder: 'Enter Address'
                                    } : {
                                        value: selectedSupplier?.Address
                                    }

                                    }
                                    onChange={handleInputChange}

                                />
                            </Form.Group>

                            <Form.Group controlId="formCountry" className="mt-3">
                                <Form.Label>Country</Form.Label>
                                <Form.Select
                                    name="Country"

                                    onChange={handleInputChange}

                                >
                                    <option value="Nhật Bản">Nhật Bản</option>
                                    <option value="Việt Nam">Việt Nam</option>
                                    <option value="Trung Quốc">Trung Quốc</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group controlId="formPhoneNumber" className="mt-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="Text"
                                    name="PhoneNumber"

                                    onChange={handleInputChange}
                                    {
                                    ...isCreating ? {
                                        placeholder: 'Enter Phone Number'
                                    } : {
                                        value: selectedSupplier?.PhoneNumber
                                    }
                                    }
                                />
                            </Form.Group>
                            {
                                !isCreating && (
                                    <Form.Group controlId="formSupplierID" className="mt-3">
                                        <Form.Label>Image Upload</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleImageUpload}

                                        />
                                    </Form.Group>
                                )

                            }

                            {!isCreating && (
                                <>
                                    {selectedSupplier?.SupplierImage && (
                                        <Form.Group controlId="formSupplierImage" className="mt-4">
                                            <Form.Label>Supplier Image</Form.Label>
                                            <div className="mb-3">
                                                <img
                                                    src={selectedSupplier?.SupplierImage}
                                                    alt="Supplier"
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        </Form.Group>
                                    )}

                                    {selectedSupplier?.SupplierVideo && (
                                        <Form.Group controlId="formSupplierVideo" className="mt-4">
                                            <Form.Label>Supplier Video</Form.Label>
                                            <div>
                                                <video
                                                    controls
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                >
                                                    <source src={selectedSupplier?.SupplierVideo} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        </Form.Group>
                                    )}
                                </>
                            )}


                            {isCreating && (
                                <Form.Group className="mt-4">
                                    <Card>
                                        <Card.Header>Upload Image and Video</Card.Header>
                                        <Card.Body>
                                   
                                            <Form.Group controlId="formImageUpload" className="mb-3">
                                                <Form.Label>Upload Image</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                />
                                            </Form.Group>
                                            <Button variant="primary" onClick={() => handleShowOverlay('image')}>
                                                Show Image
                                            </Button>

                                            {/* {imagePreview && (
                                            <div className="mb-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                />
                                            </div>
                                        )} */}


                                            <Form.Group controlId="formVideoUpload" className="mb-3">
                                                <Form.Label>Upload Video</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    name="video"
                                                    accept="video/*"
                                                    onChange={handleVideoUpload}
                                                />
                                            </Form.Group>
                                            <Button variant="primary" onClick={() => handleShowOverlay('video')}>
                                                Show Video
                                            </Button>
                                            {/* {videoPreview && (
                                            <div>
                                                <video
                                                    controls
                                                    style={{ maxWidth: '100%', height: 'auto' }}
                                                >
                                                    <source src={videoPreview} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )} */}
                                        </Card.Body>
                                    </Card>
                                </Form.Group>
                            )}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        {!isCreating ? (
                            <>
                                <Button variant="secondary" onClick={handleModalClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleModalSave}>
                                    Save Changes
                                </Button>
                            </>
                        ) : (
                            <Button variant="success" onClick={handleCreating}>
                                Create
                            </Button>
                        )}
                    </Modal.Footer>
                    {showOverlay && (
                        <div className="overlay-special" onClick={handleCloseOverlay}>
                            <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
                          
                                <button className="overlay-close-btn" onClick={handleCloseOverlay}>
                                    &times; 
                                </button>

                                {overlayType === 'image' && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'fill' }}
                                    />
                                )}
                                {overlayType === 'video' && (
                                    <video controls style={{ maxWidth: '100%', maxHeight: '90vh' }}>
                                        <source src={videoPreview} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                        </div>

                    )}
                </Modal>

            )}

        </div>
    );
}
