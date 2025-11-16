import React from 'react'
import { useNavigate } from "react-router-dom";
const Table = ({ arr, setArr }) => {
    const navigate=useNavigate()
    const handleEdit=(id)=>{
        navigate("/",{state:{editId:id}})
    }
    
    const handleDelete=(id)=>{
        const filtered=arr.filter((item)=>item.id!==id);
        setArr(filtered)
    }

    return (
    <div className="max-w-2xl mx-auto">
        <h1 className="text-xl font-bold mt-3 text-center">User Details</h1>

        <div className="flex justify-center">
          <table className="border border-gray-500 border-collapse table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 text-center">Id</th>
                <th className="py-2 px-4 text-center">Name</th>
                <th className="py-2 px-4 text-center">Email</th>
                <th className="py-2 px-4 text-center">Phone</th>
                <th className="py-2 px-4 text-center">Message</th>
                <th className="py-2 px-4 text-center">Action</th>
                <th className="py-2 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {arr.length === 0 ? (
                <tr>
                  <td colSpan={"7"} className="text-center text-red-600">
                    No Data Found
                  </td>
                </tr>
              ) : (
                arr.map((v, idx) => (
                  <tr key={idx}>
                    <td className="text-center py-2 px-4 border whitespace-nowrap">
                      {v.id}
                    </td>
                    <td className="text-center py-2 px-4 border whitespace-nowrap">
                      {v.temp}
                    </td>
                    <td className="text-center py-2 px-4 border whitespace-nowrap">
                      {v.email}
                    </td>
                    <td className="text-center py-2 px-4 border whitespace-nowrap">
                      {v.mobile}
                    </td>
                    <td className="text-center py-2 px-4 border whitespace-nowrap">
                      {v.message}
                    </td>
                    <td className="text-center bg-green-700 border border-cyan-50 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(v.id)}
                        className="w-full py-2 text-white hover:bg-green-600"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="text-center bg-red-700 border border-cyan-50 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="w-full py-2 text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Table