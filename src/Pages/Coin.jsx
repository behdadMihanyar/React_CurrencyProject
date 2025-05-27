/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinById } from "../services/CryptoApi";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useCoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import Sidebar from "../components/Sidebar";

const Coin = () => {
  const { coins, setCoins } = useCoinContext();
  const [type, setType] = useState("prices");
  const [coin, setCoin] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const getCoin = async () => {
      const req = await fetch(getCoinById(id));
      const res = await req.json();
      setCoin(res[type]);
    };
    getCoin();
  }, [id]);
  if (!coin) return null;
  const chart = coin.map((item) => {
    return {
      date: item[0],
      [type]: item[1],
    };
  });
  const [filteredCoin] = coins.filter((coin) => coin.id === id);
  console.log(filteredCoin);

  return (
    <div className=" overflow-x-scroll scrollbar-hide">
      <div className="w-full">
        <div className="flex justify-center items-center flex-col mt-5">
          <p className="text-center mt-5 font-bold text-3xl text-blue-700">
            {filteredCoin.id.toUpperCase()}
          </p>
        </div>

        <div
          style={{
            width: "1000px",
            height: "400px",
            margin: "100px auto",
            direction: "ltr",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={400} height={400} data={chart}>
              <Line
                type="monotone"
                dataKey={type}
                stroke="#3874ff"
                strokeWidth="2px"
              />
              <CartesianGrid stroke="#404042" />
              <YAxis name={type} domain={["auto", "auto"]} />
              <XAxis name="date" hide />
              <Legend />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
          <Sidebar filteredCoin={filteredCoin} />
          <Link to="/cryptoPrice">
            <span className="flex items-center gap-2 text-blue-600 hover:font-bold hover:txt-blue-800">
              <GoArrowLeft />
              صفحه قبل
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Coin;
