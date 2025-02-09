import { FaRobot } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const Dashboard = () => {

  const [filter, setFilter] = useState("days");

  const [totalUser, setTotalUser] = useState(null);
  const [totalAds, setTotalAds] = useState([]);
  const [totalGpt, setTotalGpt] = useState([]);


  const fetchTotalUser = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/user-count')
      setTotalUser(response.data.user_counts);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchTotalAds = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/ads-count')
      setTotalAds(response.data.ads_counts);
      console.log(response.data.ads_counts); 
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchTotalGpt = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/prompt-count')
      setTotalGpt(response.data.result_counts);
      console.log(response.data); 
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchTotalUser();
  }, []);
  useEffect(() => {
    fetchTotalAds();
  }, []);
  useEffect(() => {
    fetchTotalGpt();
  }, []);

  const data = {
    days: {
      categories: ["月曜日", " 火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"],
      series: [
        { name: "総ユーザー数", data: [20, 30, 50, 70, 90, 100, 120] },
        { name: "総ミニアプリ広告再生数", data: [5, 15, 25, 35, 45, 55, 65] },
        { name: "総GPT応答数", data: [10, 20, 30, 40, 50, 60, 70] },
      ],
    },
    weeks: {
      categories: ["第1週", "第2週", "第3週", "第4週"],
      series: [
        { name: "総ユーザー数", data: [200, 300, 400, 500] },
        { name: "総ミニアプリ広告再生数", data: [50, 100, 150, 200] },
        { name: "総GPT応答数", data: [100, 200, 300, 400] },
      ],
    },
    months: {
      categories: ["1月", "2月", "3月", "4月", "5月"],
      series: [
        { name: "総ユーザー数", data: [1000, 1200, 1500, 1700, 2000] },
        { name: "総ミニアプリ広告再生数", data: [300, 400, 500, 600, 700] },
        { name: "総GPT応答数", data: [500, 600, 700, 800, 900] },
      ],
    },
  };

  const options = {
    chart: {
      type: "line",
      height: 350,
    },
    xaxis: {
      categories: data[filter].categories,
    },
    stroke: {
      curve: "smooth",
    },
  };
  
    return (
      <>
        <div>
          <h1 className="font-semibold ml-[20px] mb-5">ダッシュボード</h1>
          <div className="w-full max-w-[1200px] mx-auto ml-5">
            <div className="flex flex-wrap justify-center items-center gap-[12px]">
              {/* Box 1 */}
              <div className="flex justify-between h-[100px] w-[380px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--blue)]">
                <div className="box-text">
                  <h1 className="mb-[5px] text-white text-3xl font-bold">
                      {totalUser}
                  </h1>
                  <h4 className="font-semibold text-white">総ユーザー数</h4>
                </div>
                <i className="text-[60px] text-[var(--darkblue)]">
                  <FaUsersLine />
                </i>
              </div>

              {/* Box 2 */}
              <div className="flex justify-between h-[100px] w-[380px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--green)]">
                <div className="box-text">
                  <h1 className="mb-[5px] text-white text-3xl font-bold">
                       {totalAds}
                  </h1>
                  <h4 className="font-semibold text-white">総ミニアプリ広告再生数</h4>
                </div>
                <i className="text-[60px] text-[var(--darkgreen)]">
                  <RiAdvertisementFill />
                </i>
              </div>

              {/* Box 3 */}
              <div className="flex justify-between h-[100px] w-[380px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--yellow)]">
                <div className="box-text">
                  <h1 className="mb-[5px] text-white text-3xl font-bold">
                       {totalGpt}
                  </h1>
                  <h4 className="font-semibold text-white">総GPT応答数</h4>
                </div>
                <i className="text-[60px] text-[var(--darkyellow)]">
                  <FaRobot />
                </i>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-2xl w-full max-w-4xl mx-auto my-20">
          <div className="flex justify-center gap-4 mb-4">
            <button onClick={() => setFilter("days")} className={`px-4 py-2 rounded ${filter === "days" ? "bg-[var(--bgc-sidenav)] text-white" : "bg-gray-200"}`}>
            日別データ
            </button>
            <button onClick={() => setFilter("weeks")} className={`px-4 py-2 rounded ${filter === "weeks" ? "bg-[var(--bgc-sidenav)] text-white" : "bg-gray-200"}`}>
            週別データ
            </button>
            <button onClick={() => setFilter("months")} className={`px-4 py-2 rounded ${filter === "months" ? "bg-[var(--bgc-sidenav)] text-white" : "bg-gray-200"}`}>
            月別データ
            </button>
          </div>
          <Chart options={options} series={data[filter].series} type="line" height={350} />
        </div>

        </div>
      </>
    );
  };
  
  export default Dashboard;