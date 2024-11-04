import { useState, useEffect } from 'react';
import axiosInstance from '../Utils/axiosJS';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import message from 'antd/lib/message';
/**
 * Custom hook to manage Koi data.
 *
 * @returns {Object} - The hook's return object.
 * @returns {Array} result - The list of Koi.
 * @returns {Array} categoryList - The list of categories.
 * @returns {Object} expandedCategories - The state of expanded categories.
 * @returns {Object} isEditing - The state of editing for each Koi.
 * @returns {Array} selectedCategories - The list of selected categories.
 * @returns {Array} filteredCategories - The list of filtered categories based on selection.
 * @returns {Function} toggleCategory - Function to toggle the expansion of a category.
 * @returns {Function} handleEditToggle - Function to toggle the editing state of a Koi.
 * @returns {Function} handleCancelEdit - Function to cancel the editing of a Koi and revert changes.
 * @returns {Function} handleDisableEnable - Function to disable or enable a Koi.
 * @returns {Function} handleInputChange - Function to handle input changes for a Koi.
 * @returns {Function} handleUpdate - Function to update a Koi's information.
 * @returns {Function} handleCategorySelection - Function to handle category selection.
 */
/**
 * Custom hook for managing koi data and categories.
 *
 * @returns {Object} - An object containing the following properties and functions:
 * 
 * @property {Array} result - The list of koi data.
 * @property {Array} categoryList - The list of categories.
 * @property {Object} expandedCategories - The state of expanded categories.
 * @property {Object} isEditing - The state of editing for each koi item.
 * @property {Array} selectedCategories - The list of selected categories.
 * @property {Array} filteredCategories - The list of categories filtered by selection.
 * 
 * @function toggleCategory - Toggles the expanded state of a category by its ID.
 * @param {string} categoryId - The ID of the category to toggle.
 * 
 * @function handleEditToggle - Toggles the edit state for a specific koi item.
 * @param {string} koiId - The ID of the koi item to toggle editing for.
 * 
 * @function handleCancelEdit - Cancels the editing mode and reverts to original data.
 * @param {string} koiId - The ID of the koi item to cancel editing for.
 * 
 * @function handleDisableEnable - Toggles the status of a koi between enabled and disabled.
 * @param {string} koiId - The unique identifier of the koi to be toggled.
 * @returns {Promise<void>} - A promise that resolves when the status has been toggled.
 * 
 * @function handleInputChange - Updates the specified field of a koi object in the result state.
 * @param {string} koiId - The unique identifier of the koi to be updated.
 * @param {string} field - The field of the koi object to be updated.
 * @param {any} value - The new value to be set for the specified field.
 * 
 * @function handleUpdate - Updates the information of a specific koi by its ID.
 * @param {string} koiId - The ID of the koi to be updated.
 * @returns {Promise<void>} - A promise that resolves when the update is complete.
 * 
 * @function handleCategorySelection - Handles the selection and deselection of categories.
 * @param {string} categoryId - The ID of the category to be selected or deselected.
 */
export const useManageKoi = () => {
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_API_KEY,
        authDomain: import.meta.env.VITE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_APP_ID,
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [result, setResult] = useState([]);
    const [backupResult, setBackupResult] = useState({});  
    const [refresh, setRefresh] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isEditing, setIsEditing] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [updatedKoi, setUpdatedKoi] = useState(1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('manager/manage-koi/get-all');
                const catagoryResponse = await axiosInstance.get('getAllKoi');
                console.log(response.data);
                const { categoryList } = catagoryResponse.data;
                const { result } = response.data;
                setResult(result);
                setCategoryList(categoryList);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [updatedKoi,refresh]);
    const Refreshing = () => {
        setRefresh(!refresh);
    }

    /**
     * Toggles the expanded state of a category by its ID.
     *
     * @param {string} categoryId - The ID of the category to toggle.
     */
    const toggleCategory = (categoryId) => {
        setExpandedCategories(prevState => ({
            ...prevState,
            [categoryId]: !prevState[categoryId]
        }));
    };

    /**
     * Toggles the edit state for a specific koi item.
     * 
     * When editing starts, it stores a copy of the koi data in `backupResult`.
     * When editing is cancelled or completed, it clears the backup.
     * 
     * @param {string} koiId - The ID of the koi item to toggle editing for.
     */
    const handleEditToggle = (koiId) => {
        if (!isEditing[koiId]) {
            // Store a copy of koi data in backupResult when editing starts
            const koiToBackup = result.find(koi => koi._id === koiId);
            setBackupResult(prevBackup => ({ ...prevBackup, [koiId]: { ...koiToBackup } }));
        } else {
            // Clear the backup if editing is cancelled or completed
            setBackupResult(prevBackup => {
                const { [koiId]: _, ...remainingBackup } = prevBackup;
                return remainingBackup;
            });
        }

        // Toggle the edit state
        setIsEditing(prevState => ({
            ...prevState,
            [koiId]: !prevState[koiId]
        }));
    };

    const handleCancelEdit = (koiId) => {
        // Revert to original data from backup
        const originalKoi = backupResult[koiId];
        if (originalKoi) {
            setResult(result.map(koi => (koi._id === koiId ? originalKoi : koi)));
            handleEditToggle(koiId);  // Cancel editing mode
        }
    };

    /**
     * Toggles the status of a koi between enabled and disabled.
     *
     * @param {string} koiId - The unique identifier of the koi to be toggled.
     * @returns {Promise<void>} - A promise that resolves when the status has been toggled.
     * @throws Will log an error message if the request fails.
     */
    const handleDisableEnable = async (koiId) => {
        try {
            await axiosInstance.put(`manager/manage-koi/disable-enable/${koiId}`);

            // Update the status to the new status
          
                    setUpdatedKoi(updatedKoi + 1);
                
          
         
        } catch (error) {
            message.error('Failed to disable/enable koi. Please try again.'+error.response.data.message);
            
            console.log('Failed to disable/enable koi:', error.response.data.message);
        }
    };

    /**
     * Updates the specified field of a koi object in the result state.
     *
     * @param {string} koiId - The unique identifier of the koi to be updated.
     * @param {string} field - The field of the koi object to be updated.
     * @param {any} value - The new value to be set for the specified field.
     */
    const handleInputChange = (koiId, field, value) => {
        setResult(result.map(koi => {
            if (koi._id === koiId) {
                return { ...koi, [field]: value };
            }
            return koi;
        }));
    };

    /**
     * Updates the information of a specific koi by its ID.
     *
     * @param {string} koiId - The ID of the koi to be updated.
     * @returns {Promise<void>} - A promise that resolves when the update is complete.
     *
     * @throws {Error} - Throws an error if the update fails.
     */
    const handleUpdate = async (koiId,data) => {
        const koi = result.find(koi => koi._id === koiId);
        const { CategoryID } = koi;
        const { KoiName,Age, Origin, Gender, Size, Breed, Description, DailyFoodAmount, FilteringRatio, CertificateID, Price, Image, Video } = data;
        const info = { KoiName, CategoryID, Age, Origin, Gender, Size, Breed, Description, DailyFoodAmount, FilteringRatio, CertificateID, Price, Image, Video };
        console.log(info);
        try {
            // Send updated data to the backend
            await axiosInstance.put(`manager/manage-koi/updateKoi/${koiId}`, info);

            // Update the koi in the state with the updated data from the form
            setResult(prevResult =>
                prevResult.map(koi => koi._id === koiId ? { ...koi, ...info } : koi)
            );

            handleEditToggle(koiId);  // Exit editing mode
            alert('Koi updated successfully!');
        } catch (error) {
            console.log('Failed to update koi:', error.response.data);
        }
    };


    /**
     * Handles the selection and deselection of categories.
     * 
     * @param {string} categoryId - The ID of the category to be selected or deselected.
     */
    const handleCategorySelection = (categoryId) => {
        setSelectedCategories(prevState =>
            prevState.includes(categoryId)
                ? prevState.filter(id => id !== categoryId)
                : [...prevState, categoryId]
        );
    };

    const filteredCategories = categoryList.filter(category =>
        selectedCategories.length === 0 || selectedCategories.includes(category._id)
    );
    const handleNewKoiCreation = async (categoryId, koiData) => {
            const imgRef = ref(storage, `images/${koiData.Image.name}`);
            await uploadBytes(imgRef, koiData.Image);
            const imgURL = await getDownloadURL(imgRef);
            koiData.Image = imgURL;
        try {
            const newKoi = await axiosInstance.post(`manager/manage-koi/create-new-koi`, {
                ...koiData,
                CategoryID: categoryId,
                Status: 1 
            });

            setResult(prevResult => [...prevResult, newKoi]);
            setShowCreateForm(false);
            alert('New Koi created successfully!');
        } catch (error) {
            console.error('Failed to create new Koi:', error.response.data);
            alert('Failed to create new Koi. Please try again.');
        }
    };

    return {
        result,
        categoryList,
        expandedCategories,
        isEditing,
        selectedCategories,
        filteredCategories,
        toggleCategory,
        handleEditToggle,
        handleCancelEdit,
        handleDisableEnable,
        handleInputChange,
        handleUpdate,
        handleCategorySelection,
        showCreateForm,
        setShowCreateForm,
        handleNewKoiCreation,Refreshing
    };
};
