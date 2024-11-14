import React from 'react'
import axios from 'axios';

export default function useAddress() {
  //     const [allVietnameseAddress, setAllVietnameseAddress] = React.useState([]);
  //     React.useEffect(() => { 
  //         async function fetchVietnameseCities () {
  //             try {
  //                 const response = await axios.get('https://provinces.open-api.vn/api/?depth=3');
  //                 setAllVietnameseAddress(response.data);
  //                 console.log(response);
  //             } catch (error) {
  //                 console.error('Error fetching data:', error);
  //             }
  //         }
  //           fetchVietnameseCities();

  //     }

  //     , [])
  //   function getAllDistrictOfACity(cityName) {
  //     const city = allVietnameseAddress.find(city => city.name === cityName);
  //     return city ? city.districts : [];
  //   }
  //   function getALLWardOfADistrict(cityName, districtName) {
  //     const city = allVietnameseAddress.find((city) => city.name === cityName);
  //     if (!city) {
  //         console.log("City not found:", cityName);
  //         return [];
  //     }

  //     const district = city.districts.find((district) => district.name === districtName);
  //     if (!district) {
  //         console.log("District not found:", districtName);
  //         return [];
  //     }

  //    
  //     return district.wards || [];
  // }

  //   return { allVietnameseAddress, getAllDistrictOfACity , getALLWardOfADistrict};
  const [searchText, setSearchText] = React.useState('');
  const [recommendations, setRecommendations] = React.useState([]);
  const [debouncedSearch, setDebouncedSearch] = React.useState(searchText);
  
  function removeDuplicateParts(address) {

    const parts = address.split(',').map(part => part.trim());
  

    let uniqueParts = [];
    parts.forEach((part, index) => {
      if (index === 0 || part !== parts[index - 1]) {
        uniqueParts.push(part);
      }
    });
  
    
    return uniqueParts.join(', ');
  }
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1000);
  
    return () => clearTimeout(handler);
  }, [searchText]);
  
 
  React.useEffect(() => {
    const fetchRecommendations = async () => {
      if (!debouncedSearch) {
        setRecommendations([]);
        return;
      }
  
      const query = debouncedSearch.replace(/\s/g, '%20');
  
      try {
        const VNresponse = await axios.get(`https://api.tomtom.com/search/2/search/${query}.json`, {
          params: {
            key: 'Oto3KzqLIshdRQRo2hhPjAaI96pwVtti',
            limit: 15,
            countrySet: 'VN',
            
          },
        });
        const JPReponse = await axios.get('https://api.mapbox.com/search/searchbox/v1/suggest',
          {
            params: {
              access_token: 'pk.eyJ1IjoiYWFuZzMxMTIiLCJhIjoiY20zOHA4dXJpMHJoNTJrcXcyZnJsNWZyMyJ9.T00M4iwq_7NHuM12sPzIvQ',
              session_token: localStorage.getItem('accessToken'),
              q: query,
              limit: 8,
              language: 'ja',
              country : 'JP'
          }
        });
        const VNdata = VNresponse.data.results;
       
        const JPdata = JPReponse.data.suggestions;
        let addresses = VNdata.map(item => item.address.freeformAddress);
        addresses = addresses.map(removeDuplicateParts);
        const addressesJP = JPdata.map(item => item.name);
        addresses.push(...addressesJP);
    
        const uniqueAddresses = Array.from(new Set(addresses));
        setRecommendations(uniqueAddresses);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRecommendations();
  }, [debouncedSearch]);
  
  return {
    searchText,
    setSearchText,
    recommendations,
  };
}  
  

