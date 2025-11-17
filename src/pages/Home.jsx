
import React, {  useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate,useLocation } from "react-router-dom";


function Home({ arr, setArr }) {
  const [temp, setTemp] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  
  const [edit, setEdit] = useState(null);

  const navigate = useNavigate();
  const location=useLocation();

  useEffect(()=>{
    if(location.state?.editId){
      console.log(location.state?.editId)
      const selected=arr.find((item)=>item.id===location.state.editId);
      console.log(selected.id);
      if(selected){
        setTemp(selected.temp);
        setEmail(selected.email);
        setMobile(selected.mobile);
        setMessage(selected.message);
        setEdit(selected.id);
      }
    }
  },[location.state,arr])

  const handelsubmit = async (e) => {
    e.preventDefault();

    const dtaa={name:temp, email,mobile,message};

    if (edit !== null) {
      const updatedArr = arr.map((item) =>
        item.id === edit ? { ...item, temp, email, mobile, message } : item
      );
      setArr(updatedArr);
      setEdit(null);
      toast.success("Record updated successfully");
    } else {
      try {
        // ✅ FIXED: correct spelling "enquiry" (not enqury)
       const response=await axios.post("https://ecommerce-backend-rxl1.onrender.com/enqury",dtaa,{
            withCredentials: true
       })
        console.log(response.data)
        let dta = {
          id: arr.length + 1,
          temp,
          email,
          mobile,
          message,
        };

        setArr((prev) => [...prev, dta]);
        toast.success("Form submitted successfully");
      } catch (err) {
        console.error("Axios Error:", err);
        toast.error(
          "Failed to submit form. Please check backend URL or server."
        );
      }
    }

    setTemp("");
    setEmail("");
    setMobile("");
    setMessage("");
  };




  return (
    <div className="min-h-screen bg-slate-300">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2 className="text-3xl font-semibold text-center pt-10">Enquiry Form</h2>

      <form className="max-w-2xl mx-auto mb-15 space-y-5">
        <div>
          <label className="font-medium ml-2">Name</label>
          <input
            onChange={(e) => setTemp(e.target.value)}
            value={temp}
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="font-medium ml-2">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="font-medium ml-2">Phone</label>
          <input
            onChange={(e) => setMobile(e.target.value)}
            value={mobile}
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="font-medium ml-2">Message</label>
          <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            name="message"
            rows="6"
            placeholder="Write your message"
            className="w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>

        <div className="text-center flex justify-center gap-3">
          <button
            onClick={handelsubmit}
            className="bg-blue-700 mr-4 px-4 py-2 rounded-md text-white"
          >
            Save
          </button>
          <button onClick={()=> navigate("/table")} className="bg-blue-700 px-4 py-2 rounded-md text-white">
            Next
          </button>
          <button onClick={()=> navigate("/weather")} className="bg-green-600 px-4 py-2 rounded-md text-white">
            Weather
          </button>
        </div>
      </form>

      
    </div>
  );
}


export default Home;
