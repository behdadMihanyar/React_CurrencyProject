/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaLongArrowAltUp } from "react-icons/fa";

const Gold = () => {
  const [data, setData] = useState([]);
  const [filterCoin, setFilterCoin] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const req = await fetch(
          "https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeOmyTOvQelQcZdcQwNrggWfbKJKTu"
        );
        const res = await req.json();
        setData(res.gold);
        setFilterCoin(res.gold.reverse());
      };
      getData();
    } catch (error) {
      console.log("error fetching data", error.message);
    }
  }, []);
  return (
    <div>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {filterCoin.map((para) => (
          <div
            className="border p-4 rounded-lg shadow-md hover:bg-amber-100 transition-all duration-300 ease-in-out text-zinc-600 hover:scale-105"
            key={para.name}
          >
            <h2 className="text-xl font-semibold text-zinc-800">{para.name}</h2>
            <p className="text-lg flex flex-row content-center">
              تومان {para.price.toLocaleString()}
              <FaLongArrowAltUp color="green" fontSize="20px" />
            </p>
            <p className="text-sm text-gray-500">
              {para.time} {para.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gold;
