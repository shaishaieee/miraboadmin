import { FaRobot } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const Dashboard = () => {

  const [filter, setFilter] = useState("days");

  //const for API Backend

  const [totalUser, setTotalUser] = useState([]);
  const [totalAds, setTotalAds] = useState([]);
  const [totalGpt, setTotalGpt] = useState([]);




  // const [chartData, setChartData] = useState({
  //   categories: [],
  //   series: [],
  // });

  //Function to fetch box data

  const fetchTotalUser = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/user-count')
      setTotalUser(response.data); // Assume API returns { users: 150, ads: 109, chatResponses: 290 }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchTotalAds = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/ads-count')
      setTotalAds(response.data); // Assume API returns { users: 150, ads: 109, chatResponses: 290 }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const fetchTotalGpt = async () => {
    try {
      const response = await axios.get('https://reuvindevs.com/liff/public/api/v1/prompt-count')
      setTotalGpt(response.data); // Assume API returns { users: 150, ads: 109, chatResponses: 290 }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Function to fetch chart data
  // const fetchChartData = async () => {
  //   try {
  //     const response = await axios.get(`YOUR_BACKEND_API_URL/chart?filter=${filter}`); // API should return data based on filter
  //     setChartData(response.data); // Assume API returns { categories: [...], series: [...] }
  //   } catch (error) {
  //     console.error("Error fetching chart data:", error);
  //   }
  // };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchTotalUser();
  }, []);
  useEffect(() => {
    fetchTotalAds();
  }, []);
  useEffect(() => {
    fetchTotalGpt();
  }, []);

  // // Fetch chart data whenever filter changes
  // useEffect(() => {
  //   fetchChartData();
  // }, [filter]);


  const data = {
    days: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: [
        { name: "Total Users", data: [20, 30, 50, 70, 90, 100, 120] },
        { name: "Total Ads", data: [5, 15, 25, 35, 45, 55, 65] },
        { name: "Total Chat Responses", data: [10, 20, 30, 40, 50, 60, 70] },
      ],
    },
    weeks: {
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
      series: [
        { name: "Total Users", data: [200, 300, 400, 500] },
        { name: "Total Ads", data: [50, 100, 150, 200] },
        { name: "Total Chat Responses", data: [100, 200, 300, 400] },
      ],
    },
    months: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
      series: [
        { name: "Total Users", data: [1000, 1200, 1500, 1700, 2000] },
        { name: "Total Ads", data: [300, 400, 500, 600, 700] },
        { name: "Total Chat Responses", data: [500, 600, 700, 800, 900] },
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
          <div className="w-full max-w-[1200px] mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-[12px]">
              {/* Box 1 */}
              <div className="flex justify-between h-[90px] w-[380px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--blue)]">
                <div className="box-text">
                  <h1 className="mb-[5px] text-white font-bold">
                       {totalUser}
                  </h1>
                  <h4 className="font-semibold text-white">ミニアプリユーザー総数</h4>
                </div>
                <i className="text-[60px] text-[var(--darkblue)]">
                  <FaUsersLine />
                </i>
              </div>

              {/* Box 2 */}
              <div className="flex justify-between h-[90px] w-[380px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--green)]">
                <div className="box-text">
                  <h1 className="mb-[5px] text-white font-bold">
                       {totalAds}
                  </h1>
                  <h4 className="font-semibold text-white">ミニアプリ広告再生回数合計</h4>
                </div>
                <i className="text-[60px] text-[var(--darkgreen)]">
                  <RiAdvertisementFill />
                </i>
              </div>

              {/* Box 3 */}
              <div className="flex justify-between h-[90px] w-[380px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--yellow)]">
                <div className="box-text">
                  <h1 className="mb-[5px] text-white font-bold">
                       {totalGpt}
                  </h1>
                  <h4 className="font-semibold text-white">総GPT応答</h4>
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
              Days
            </button>
            <button onClick={() => setFilter("weeks")} className={`px-4 py-2 rounded ${filter === "weeks" ? "bg-[var(--bgc-sidenav)] text-white" : "bg-gray-200"}`}>
              Weeks
            </button>
            <button onClick={() => setFilter("months")} className={`px-4 py-2 rounded ${filter === "months" ? "bg-[var(--bgc-sidenav)] text-white" : "bg-gray-200"}`}>
              Months
            </button>
          </div>
          <Chart options={options} series={data[filter].series} type="line" height={350} />
        </div>

        </div>
      </>
    );
  };
  
  export default Dashboard;