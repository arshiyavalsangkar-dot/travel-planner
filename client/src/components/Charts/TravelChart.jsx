import { useEffect, useState } from "react";
import axios from "axios";

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

import { motion } from "framer-motion";
import "./TravelChart.css";

export default function TravelChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/trips",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          const trips = res.data.trips;

          const monthlyTrips = {};

          trips.forEach((trip) => {
            const date = new Date(trip.startDate);

            const month = date.toLocaleString("en-US", {
              month: "short",
            });

            monthlyTrips[month] = (monthlyTrips[month] || 0) + 1;
          });

          const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];

          const chartData = months.map((month) => ({
            month,
            trips: monthlyTrips[month] || 0,
          }));

          setData(chartData);
        }
      } catch (error) {
        console.error("Error fetching trips for chart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <motion.div
      className="travel-chart-card"
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <div className="chart-header">
        <h2
          style={{
            color: "#111827",
            fontWeight: "700",
          }}
        >
          Travel Overview
        </h2>

        <p>Monthly Trips</p>
      </div>

      <div className="chart-container">
        {loading ? (
          <p>Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="tripGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#2563EB"
                    stopOpacity={0.45}
                  />

                  <stop
                    offset="95%"
                    stopColor="#2563EB"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis
                dataKey="month"
                stroke="#94a3b8"
              />

              <YAxis
                stroke="#94a3b8"
                allowDecimals={false}
              />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="trips"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#tripGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
}