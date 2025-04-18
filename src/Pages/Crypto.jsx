/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useCoinContext } from "../context/CoinContext";
const Crypto = () => {
  const { coins, setCoins } = useCoinContext();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [currency, setCurrency] = useState("دلار");
  const [f, setF] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetChData = async () => {
      const req = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${
          currency === "دلار" ? "usd" : "eur"
        }&per_page=10&page=${page}&x_cg_demo_api_key=CG-BHBgZZ2Gm7hqeseDH8ZWiGbX`
      );
      const res = await req.json();
      setCoins(res);
      setF(res);
      setLoading(false);
      console.log("run second");
    };
    fetChData();
  }, [currency, page]);

  useEffect(() => {
    if (!search) {
      console.log("run first");
      console.log(coins);
      setF(coins);
    } else {
      setF(
        coins.filter((e) =>
          e.name.toLowerCase().startsWith(search.toLowerCase())
        )
      );
    }
  }, [search]);

  const prevHandler = () => {
    setLoading(true);
    if (page <= 1) return setLoading(false);
    setPage((prev) => prev - 1);
  };
  const nextHandler = () => {
    setLoading(true);
    if (page >= 10) return setLoading(false);
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <div className="flex justify-center gap-3 items-center my-5">
        <input
          type="text"
          placeholder="جستجو ..."
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-96 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCurrency(e.target.value)} value={currency}>
          <option>دلار</option>
          <option>یورو</option>
        </select>
      </div>
      {loading ? (
        <div className=" text-center mt-35">
          <ClipLoader color="orange" size={100} />
        </div>
      ) : (
        <TableCoin
          f={f}
          setF={setF}
          currency={currency}
          setCurrency={setCurrency}
        />
      )}
      <br />
      {!loading && (
        <div className="flex gap-3 items-center mt-3 justify-center my-14">
          <button
            onClick={prevHandler}
            className="bg-amber-600 rounded-md p-2 text-white hover:bg-amber-700 cursor-pointer"
          >
            قبلی
          </button>
          <p className={page === 1 ? "text-blue-700" : null}>1</p>
          <p className={page === 2 ? "text-blue-700" : null}>2</p>

          {page > 2 && page <= 8 && (
            <>
              <span>...</span>
              <p className="text-blue-700">{page}</p>
            </>
          )}
          <span>...</span>
          <p className={page === 9 ? "text-blue-700" : null}>9</p>
          <p className={page === 10 ? "text-blue-700" : null}>10</p>
          <button
            onClick={nextHandler}
            className="bg-amber-600 rounded-md p-2 text-white hover:bg-amber-700 cursor-pointer"
          >
            بعدی
          </button>
        </div>
      )}
    </div>
  );
};
export default Crypto;

const TableCoin = ({ f, setF, currency, setCurrency }) => {
  const navigate = useNavigate();
  const coinHandler = (coin) => {
    navigate(`/coin/${coin.id}`);
  };
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3 ">
              نام
            </th>
            <th scope="col" className="px-6 py-3">
              قیمت
            </th>
            <th scope="col" className="px-6 py-3">
              بروزرسانی
            </th>
            <th scope="col" className="px-6 py-3">
              سمبل
            </th>
          </tr>
        </thead>
        <tbody>
          {f.map((coin) => (
            <tr
              className="bg-white border-b  dark:border-gray-700 border-gray-200  hover:bg-amber-200"
              key={coin.id}
            >
              <th
                onClick={() => coinHandler(coin)}
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                <div className="flex cursor-pointer gap-3 items-center">
                  <img src={coin.image} className="w-7 mr-2" />
                  <p>{coin.name}</p>
                </div>
              </th>
              <td className="px-6 py-4">
                {coin.current_price.toLocaleString()}
                <span className="font-bold">
                  {currency === "دلار" ? " دلار" : " یورو"}
                </span>
              </td>
              <td className="px-6 py-4">{coin.last_updated}</td>
              <td className="px-6 py-4">{coin.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
