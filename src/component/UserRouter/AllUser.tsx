import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import api from "../../utils/api";
import { Alluser } from "../../@typeScript/AllUser";
import { setAllUser } from "../../store/AllUser/AllUser";


  
interface AllUser {
  UserName: string;
  category: string;
  email: string;
  mesage: string;
}

export default function AllUser() {
  const allUsers = useSelector((state: any) => state.allUser.AllUser);
  const dispatch = useDispatch();
  const getAllUSerData = async () => {
    try {
      const res = await api.get("/user/");
      dispatch(setAllUser(res.data));
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      console.log("submit ho gya");
    }
  };

  

  
  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/user/${id}`);
      if (res.status === 200) {
        
        getAllUSerData();
      }
    } catch (err) {
      console.error("Error deleting data:", err);
    }
  };
  useEffect(() => {
    getAllUSerData();
  }, []);
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
  return (
    
    <div className={`p-6 pt-[65px] ${isOpened ? "left-[16rem]" : "left-[.2rem]"} absolute w-full overflow-hidden `}>
      <h2 className={`text-2xl font-bold mb-4 flex justify-center items-center `}>
        All Users Table Table
        
      </h2>
      <p className="mb-4">AllUser all Defined here</p>
      <div className={` ${isOpened ? "block" : "flex"}`}>
        <table className={`w-full  border-separate  `} >
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left border-b">UserName</th>
              <th className="p-2 text-left border-b">Category</th>
              <th className="p-2 text-left border-b">Email</th>
              <th className="p-2 text-left border-b">Message</th>
              <th className="p-2 text-left border-b">createdAt</th>
              <th className="p-2 text-left border-b">Delete User</th>
              <th className="p-2 text-left border-b">Edit User</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.data?.map((person: Alluser, index: number) => {
              console.log(allUsers.data)
              return (
                <tr key={index} className="border-b hover:bg-orange-400 cursor-pointer ">
                  <td className="p-2">{person.username}</td>
                  <td className="p-2">{person.category}</td>
                  <td className="p-2">{person.email}</td>
                  <td className="p-2">{person.bioMessage}</td>
                  <td className="p-2">{person.createdAt}</td>
                  <td className="p-2 bg-white flex  justify-center items-center hover:bg-white"><input onClick={() => handleDelete(person._id)} type="submit" value="delete" className=" cursor-pointer hover:bg-red-500 bg-green-300 rounded-xl px-3" /></td>
                  <td className="p-2 bg-white  justify-center items-center hover:bg-white"><input onClick={() => handleDelete(person._id)} type="submit" value="Edit" className=" cursor-pointer hover:bg-red-500 bg-green-300 rounded-xl px-5" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
