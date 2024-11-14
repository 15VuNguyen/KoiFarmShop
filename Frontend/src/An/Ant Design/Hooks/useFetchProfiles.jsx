import React from 'react'
import axiosInstance from '../../Utils/axiosJS';
import { func } from 'prop-types';

export default function useFetchProfiles() {
  const [profiles, setProfiles] = React.useState([]);
    const [refresh , setRefresh] = React.useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('manager/manage-user/get-all');
        let array = response.data.result;
        array = array.reverse();
        setProfiles(array);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [refresh]);

  function totalCustomers() {
    return profiles.filter(profile => profile.roleid === '1' || profile.roleid === undefined).length;
  }
  function totalStaff() {
    return profiles.filter(profile => profile.roleid == '2').length;
  }
  function totalManager() {
    return profiles.filter(profile => profile.roleid == '3').length;
  }
  function totalVerified() {
    return profiles.filter(profile => profile.verify === 1).length;
  }
  function totalUnverified() {
    return profiles.filter(profile => profile.verify === 0).length;
  }
  function UserChangesIn7DaysPercent() {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    
    const usersIn7Days = profiles.filter(profile => new Date(profile.created_at) > lastWeek);
    console.log(usersIn7Days);
    if (profiles.length === 0) return 0;  
    return ((usersIn7Days.length / profiles.length) * 100).toFixed(2).toString();
  }
  function refreshData(){
    setRefresh(!refresh);
  }

  return {
    profiles, 
    totalCustomers, 
    totalStaff, 
    totalManager, 
    totalVerified, 
    totalUnverified, 
    UserChangesIn7DaysPercent,
    refreshData
  };
}
