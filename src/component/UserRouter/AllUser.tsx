import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { Alluser } from "../../@typeScript/AllUser";
import { setAllUser } from "../../store/AllUser/AllUser";

export default function AllUser() {
  const allUsers = useSelector((state: any) => state.allUser.AllUser);
  const isOpened = useSelector((state: any) => state.states.isOpenDropDown);
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

  return (
    <div className={`pt-[65px] px-4 absolute w-full ${!isOpened ? "left-[16rem]" : "left-[.2rem]"}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">All Users Table</h2>
        <p className="text-center text-gray-600">All users are listed below</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border text-sm md:text-base text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-200 dark:bg-gray-700">
            <tr>
              <th className="p-3 whitespace-nowrap">UserName</th>
              <th className="p-3 whitespace-nowrap">Category</th>
              <th className="p-3 whitespace-nowrap">Email</th>
              <th className="p-3 whitespace-nowrap">Message</th>
              <th className="p-3 whitespace-nowrap">Created At</th>
              <th className="p-3 whitespace-nowrap">Delete</th>
              <th className="p-3 whitespace-nowrap">Edit</th>
            </tr>
          </thead>
          <tbody>
            {allUsers?.data?.map((person: Alluser, index: number) => (
              <tr key={index} className="border-b hover:bg-orange-100 dark:hover:bg-orange-400">
                <td className="p-3">{person.username}</td>
                <td className="p-3">{person.category}</td>
                <td className="p-3">{person.email}</td>
                <td className="p-3">{person.bioMessage}</td>
                <td className="p-3">{new Date(person.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(person._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
                <td className="p-3">
                  <button
                    // Replace below with edit logic
                    onClick={() => alert("Edit logic here")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
