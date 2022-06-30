import React from 'react'
import axios from 'axios';

const Createpost = () => {
 
    
  const handleSubmit = async () => {
  
    const URL = "http://localhost:8080/createpost";
    try {
        const {data : res} = await axios.post(URL,{
            title : 'a',
            description : 'b',
            author: 'c',
            status : 'unverified',
        });
        console.log(res);
    } catch (error) {
        console.log(error.response.data.message);
    }
} 
  return (
     <div>
         <button onClick={handleSubmit}>click</button>
    </div>
  );
};

export default Createpost;




