import React,{ useState,useEffect} from 'react'
import * as api from '../api/Api'; 
import styled from "styled-components";
import { css } from "styled-components/macro";

export default function MyComplaints() {
    const [Data, setData] = useState([]);
    const [userId, setUserId] = useState("User Not Connected");

    // Get All Complaints Data
    const getComplaintsByUser = async () => {
        await api.getComplaintByUserId(userId._id)
          .then(response => {
            const result = response.data;
            const { status, message, data } = result;
            if (status !== 'SUCCESS') {
              alert(message, status)
            }
            else {
                setData(data);
            }
          }).catch(err => { console.log(err) })
      }

      const GetComplaintsData = () => {
        api.getAllComplaint()
        .then(response => {
          const result = response.data;
          const { status, message, data } = result;
              if (status !== 'SUCCESS') {
                  alert(message, status)
              }
              else {
                  setData(data);
                  console.log(result);
              }
      }) .catch(err => {console.log(err)})
    }
    useEffect(() => {
      setUserId(JSON.parse(localStorage.getItem("user")));
      console.log("user id  ====== ",userId._id);
    }, [])
    
    useEffect(() => {
      getComplaintsByUser();
      },[userId]);

      
  return (
   
    <div className="overflow-x-auto">
        {/* <button onClick={getComplaintsByUser}>Refresh</button> */}
    <table className="items-center w-full bg-transparent border-collapse">
        <thead>
            <tr>
            <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
            Date
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                Topic
                </th>
             
            
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                status
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                description
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                email
                </th>
                <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                image
                </th>
                </tr>
        </thead>
        {Data.length !== 0 ? (
<tbody>
{Data.map((el, i) => (
  <tr key={i}>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.Date}
    </th>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.topic}
    </th>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.status}
    </th>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.description}
    </th>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.email}
    </th>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.image}
    </th>
    <th className="px-2 text-black-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
      {el.userId}
    </th>
  </tr>
))}
</tbody>
) : null}
    </table>
</div>  
)
}