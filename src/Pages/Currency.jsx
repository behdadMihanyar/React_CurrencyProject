/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
const Currency = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [filterCoin, setFilterCoin] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const req = await fetch(
          "https://brsapi.ir/Api/Market/Gold_Currency.php?key=FreeOmyTOvQelQcZdcQwNrggWfbKJKTu"
        );
        const res = await req.json();
        setData(res.currency);
        setFilterCoin(res.currency);
      };
      getData();
    } catch (error) {
      console.log("error fetching data", error.message);
    }
  }, []);

  console.log(filterCoin);

  useEffect(() => {
    if (filter.length === 0) return setFilterCoin(data);
    setFilterCoin(data.filter((para) => para.name.startsWith(filter)));
  }, [filter]);
  return (
    <div className="mb-10">
      <div className="w-full flex justify-center mb-2">
        <input
          type="text"
          placeholder="جست و جو ..."
          className=" border mt-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="relative overflow-x-auto ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <tbody>
            {filterCoin.map((para) => (
              <tr className=" bg-white hover:bg-amber-200" key={para.name}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-black"
                >
                  {para.name}
                </th>
                <td className="px-6 py-4">
                  {` ${para.price.toLocaleString()}  ${para.unit} `}
                </td>
                <td className="px-6 py-4">{para.date}</td>
                <td className="px-6 py-4">{para.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Currency;
