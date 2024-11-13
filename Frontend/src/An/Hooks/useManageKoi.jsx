import { useState, useEffect } from 'react';
import axiosInstance from '../Utils/axiosJS';
import message from 'antd/lib/message';

export const useManageKoi = () => {
    
  
  
    const [result, setResult] = useState([]);
  
    const [refresh, setRefresh] = useState(false);
    const [categoryList, setCategoryList] = useState([]);
  
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

    
  
    const filteredCategories = categoryList.filter(category =>
        selectedCategories.length === 0 || selectedCategories.includes(category._id)
    );
   

    return {
        result,     
        filteredCategories,
        handleDisableEnable,   
        Refreshing
    };
};
