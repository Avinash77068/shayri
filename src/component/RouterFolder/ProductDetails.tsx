import { Link, useParams } from "react-router-dom";
import profile from "../../assets/image/avinash.jpg";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { id } = useParams(); // ✅ assuming route is like: /product/:id
  const Alldata = useSelector((state: any) => state.secondStates.AllData);
  const product = Alldata?.data?.find((item: any) => item._id === id);
console.log(product);
  if (!product) {
    return (
      <div className="text-center text-white-600 max-w-[300px] text-2xl font-semibold flex items-center justify-center h-[60vh] w-full col-span-full">
        Product not found
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen p-3">
      <div className="hover:bg-slate-300 group bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 w-96 hover:border-indigo-600">
        <Link to="/" className="mb-4 inline-block">
          <svg
            className="w-6 h-6 rounded-full cursor-pointer"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.70714 13.2929L3.41424 8.00001L8.70714 2.70712L7.29292 1.29291L0.585815 8.00001L7.29292 14.7071L8.70714 13.2929Z"
              fill="black"
            ></path>
            <path
              d="M15.2071 13.2929L9.91424 8.00001L15.2071 2.70712L13.7929 1.29291L7.08582 8.00001L13.7929 14.7071L15.2071 13.2929Z"
              fill="black"
            ></path>
          </svg>
        </Link>

        <div className="flex flex-col items-center gap-5 mb-6">
          <img
            src={profile}
            alt="Avatar"
            className="object-contain w-[100px] h-[100px] rounded-full border-[5px] border-red-300 group-hover:border-blue-500"
          />

          <div className="flex gap-2 items-center">
            <h5 className="text-gray-900 font-medium transition duration-300">
              {product?.name}
            </h5>
            <span className="text-gray-500 text-sm">{product?.title}</span>
          </div>
        </div>

        <div className="flex items-center mb-6 gap-2 text-amber-500 group-hover:text-blue-500 transition duration-300 justify-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg
              key={index}
              className="w-5 h-5"
              viewBox="0 0 18 17"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z" />
            </svg>
          ))}
        </div>

        <p className="text-sm text-gray-500 leading-6 transition duration-300 group-hover:text-gray-800 text-justify">
          {product?.description}
        </p>
      </div>
    </div>
  );
}
