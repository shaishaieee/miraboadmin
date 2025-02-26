import { FaRobot, FaUsers } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { RiAdvertisementFill } from "react-icons/ri";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../utils/context";
import ApexCharts from 'react-apexcharts';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const context = userContext();
  const [totalUser, setTotalUser] = useState(null);
  const [totalAds, setTotalAds] = useState([]);
  const [totalGpt, setTotalGpt] = useState([]);
  const [totalLineUser, setTotalLineUser] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState({ start: "", end: "", key: 0 });
  const [filteredData, setFilteredData] = useState({
    user_count: [],
    ads_count: [],
    result_count: [],
    answers_count: [],
  });

  console.log(filteredData);

  const token = localStorage.getItem("token");

  const getLatestWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDayOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    return {
      start: firstDayOfWeek.toISOString().split("T")[0],
      end: lastDayOfWeek.toISOString().split("T")[0],
    };
  };


  const fetchData = useCallback(async () => {


    if (!token) {
      console.error("No token found");
      setLoading(false);
      return;
    }


    const start = selectedDateRange.start || getLatestWeek().start;
    const end = selectedDateRange.end || getLatestWeek().end;

    const apiUrl = import.meta.env.VITE_API_URL; // Import Url Source from .env

    try {
      const [userRes, adsRes, gptRes, lineUserRes] = await Promise.all([
        axios.get(`${apiUrl}/v1/user-count`, {
          params: { start_date: start, end_date: end },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/v1/ads-count`, {
          params: { start_date: start, end_date: end },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/v1/prompt-count`, {
          params: { start_date: start, end_date: end },
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/v1/answer-count`, {
          params: { start_date: start, end_date: end },
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // console.log("User Response:", userRes.data);
      // console.log("Ads Response:", adsRes.data);
      // console.log("GPT Response:", gptRes.data);
      // console.log("Line User Response:", lineUserRes.data);

      setTotalUser(userRes.data.user_count || 0);
      setTotalAds(adsRes.data.ads_count || 0);
      setTotalGpt(gptRes.data.result_count || 0);
      setTotalLineUser(lineUserRes.data.answers_count || 0);

      setFilteredData({
        user_count: userRes.data.records || [],
        ads_count: adsRes.data.records || [],
        result_count: gptRes.data.records || [],
        answers_count: lineUserRes.data.records || [],
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedDateRange, token]);

  const updateChartData = useCallback(() => {
    if (!filteredData.ads_count.length) return;

    const adminsData = [];
    const adsData = [];
    const chatResponsesData = [];
    const usersData = [];
    const categories = [];

    filteredData.ads_count.forEach((entry) => {
      const date = entry.date;

      const userEntry = filteredData.user_count?.find((item) => item.date === date) || { user_count: 0 };
      const gptEntry = filteredData.result_count?.find((item) => item.date === date) || { result_count: 0 };
      const lineUserEntry = filteredData.answers_count?.find((item) => item.date === date) || { answers_count: 0 };

      adminsData.push(userEntry.user_count || 0);
      adsData.push(entry.ads_count || 0);
      chatResponsesData.push(gptEntry.result_count || 0);
      usersData.push(lineUserEntry.answers_count || 0);
      categories.push(date);
    });

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      series: [
        { name: "Total Admins", data: adminsData },
        { name: "Total Played Ads", data: adsData },
        { name: "Total Chat Responses", data: chatResponsesData },
        { name: "Total Users", data: usersData },
      ],
      xaxis: { categories },
    }));

    console.log("Updated Chart Data:", { adminsData, adsData, chatResponsesData, usersData, categories });

  }, [filteredData]);

  useEffect(() => {
    fetchData();
  }, [selectedDateRange]);

  useEffect(() => {
    updateChartData();
  }, [filteredData, updateChartData]);

  useEffect(() => {
    if (calendarVisible) {
      flatpickr("#calendar", {
        mode: "range",
        dateFormat: "Y-m-d",
        onClose: (selectedDates) => {
          if (selectedDates.length === 2) {
            setSelectedDateRange({
              start: selectedDates[0].toISOString().split("T")[0],
              end: selectedDates[1].toISOString().split("T")[0],
              key: Date.now(),
            });
          }
        }
      });
    }
  }, [calendarVisible]);

  const [chartOptions, setChartOptions] = useState({
    chart: { type: "line", height: 350 },
    series: [
      { name: "Total Admins", data: [] },
      { name: "Total Played Ads", data: [] },
      { name: "Total Chat Responses", data: [] },
      { name: "Total Users", data: [] },
    ],
    xaxis: { categories: [] },
    title: { text: "Line Chatbot Chart" },
  });

  return (
    <div className="h-screen overflow-y-auto">
      {loading ? (
          <div className="flex flex-col justify-center items-center w-[calc(100vw-250px)] h-full">
            <div className="loader"></div>
            <div>Loading...</div>
          </div>
      ) : (
          <div>
            <h1 className="font-semibold ml-[20px] mb-5">ダッシュボード</h1>


            <div className="w-full max-w-[1200px] mx-auto ml-5">
              <div className="flex flex-wrap justify-center items-center gap-[12px]">
                {/* Box 1 */}
                <div className="flex justify-between h-[100px] min-w-[290px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--blue)]">
                  <div className="box-text">
                    <h1 className="mb-[5px] text-white text-3xl font-bold">{totalUser}</h1>
                    <h4 className="font-semibold text-white">管理者の総数</h4>
                  </div>
                  <i className="text-[60px] text-[var(--darkblue)]">
                    <FaUsers />
                  </i>
                </div>

                {/* Box 2 */}
                <div className="flex justify-between h-[100px] min-w-[290px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--green)]">
                  <div className="box-text">
                    <h1 className="mb-[5px] text-white text-3xl font-bold">{totalAds}</h1>
                    <h4 className="font-semibold text-white">総ミニアプリ広告再生数</h4>
                  </div>
                  <i className="text-[60px] text-[var(--darkgreen)]">
                    <RiAdvertisementFill />
                  </i>
                </div>

                {/* Box 3 */}
                <div className="flex justify-between h-[100px] min-w-[290px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--yellow)]">
                  <div className="box-text">
                    <h1 className="mb-[5px] text-white text-3xl font-bold">{totalGpt}</h1>
                    <h4 className="font-semibold text-white">総GPT応答数</h4>
                  </div>
                  <i className="text-[60px] text-[var(--darkyellow)]">
                    <FaRobot />
                  </i>
                </div>

                {/* Box 4 */}
                <div className="flex justify-between h-[100px] min-w-[290px] rounded-[5px] p-[15px] shadow-2xl bg-[var(--red)]">
                  <div className="box-text">
                    <h1 className="mb-[5px] text-white text-3xl font-bold">{totalLineUser}</h1>
                    <h4 className="font-semibold text-white">総ユーザー数</h4>
                  </div>
                  <i className="text-[60px] text-[var(--darkred)]">
                    <FaUsersLine />
                  </i>
                </div>
              </div>
            </div>

          
            <div className="mb-20 mt-10 shadow-2xl p-6 max-w-4xl mx-auto relative">
              <div
                onClick={() => setCalendarVisible(!calendarVisible)}
                className="absolute top-6 right-4 cursor-pointer text-3xl text-[var(--bgc-sidenav)] z-10">
                <FaCalendarAlt />
              </div>

              {calendarVisible && (
                <div className="absolute top-16 right-4 z-20 bg-white rounded-lg shadow-lg p-4 w-85 border">
                  <input id="calendar" className="border p-2 rounded-md w-full" placeholder="Select Date Range" />
                </div>
              )}




              <div className="mt-10 p-6 rounded-lg shadow-lg">
                <ApexCharts
                  options={chartOptions}
                  series={chartOptions.series}
                  type="line"
                  height={350}
                />
              </div>
            </div>
          </div>
     )}    
    </div>
  );
};

export default Dashboard;