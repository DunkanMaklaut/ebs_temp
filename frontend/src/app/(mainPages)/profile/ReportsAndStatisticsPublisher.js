import React from "react";
import Image from "next/image";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";
import { MainCardInfo } from "./components/MainCardInfo";
import { MiniCardStats, stateCard } from "./stateCard";
export const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];
import { FiStar } from "react-icons/fi";
import { MdStar } from "react-icons/md";
const metricsData = [
  { title: "Просмотры", value: 56, change: 27, color: "#0088FE" },
  { title: "Ср. рейтинг", value: 4.8, change: 0.2, color: "#FFBB28" },
  {
    title: "Ср. время сеанса",
    value: "80 мин.",
    change: "2 мин.",
    color: "#FF8042",
  },
];

const pieChartData = [
  { name: "ФИТиКС", value: 50 },
  { name: "ФТНГ", value: 30 },
  { name: "РТФ", value: 10 },
  { name: "ФЭСиУ", value: 10 },
];

const lineChartData = [
  { month: "Январь", publications: 1 },
  { month: "Февраль", publications: 2 },
  { month: "Март", publications: 3 },
  { month: "Апрель", publications: 1 },
  { month: "Май", publications: 4 },
  { month: "Июнь", publications: 2 },
  { month: "Июль", publications: 3 },
  { month: "Август", publications: 1 },
  { month: "Сентябрь", publications: 5 },
  { month: "Октябрь", publications: 2 },
  { month: "Ноябрь", publications: 3 },
  { month: "Декабрь", publications: 6 },
];

const top5Data = [
  {
    rank: 1,
    cover: "/images/emptycover.jpg",
    title: "Программирование на Python",
    author: "Марк Лутц",
    rating: 5,
  },
  {
    rank: 2,
    cover: "/images/emptycover.jpg",
    title: "Изучаем C++ через программирование игр",
    author: "Майк Дойсон",
    rating: 4,
  },
  {
    rank: 3,
    cover: "/images/emptycover.jpg",
    title: "Программирование и алгоритмизация",
    author: "Т.А. Юрин",
    rating: 4,
  },
  {
    rank: 4,
    cover: "/images/emptycover.jpg",
    title: "Материаловедение: технология конструкционных материалов",
    author: "М.С. Корытов, В.В. Акимов",
    rating: 5,
  },
  {
    rank: 5,
    cover: "/images/emptycover.jpg",
    title: "Железобетонные и каменные конструкции",
    author: "А.А. Комлев, В.И. Святченко",
    rating: 4,
  },
];

export const ReportsAndStatisticsPublisher = () => {
  return (
    <MainCardInfo>
      {/* Заголовок */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Статистика</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Экспортировать
        </button>
      </div>

      {/* Метрики */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {metricsData.map((metric, index) => (
          <MiniCardStats
            key={index}
            title={metric.title}
            value={metric.value}
            minValue={metric.change}
            stateNumberCard={stateCard.up}
          />
        ))}
      </div>

      {/* Основной контент: диаграммы + топ-5 */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Левая часть: диаграммы */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Диаграмма просмотров */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-[#F0F0F0]">
            <h3 className="text-lg font-bold mb-4 text-center">
              ДИАГРАММА ПРОСМОТРОВ
            </h3>
            <div className="w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieChartData}
                    labelLine={false}
                    innerRadius={120}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#000"
                    strokeWidth={0}
                    paddingAngle={5}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Просмотры"]} />
                </PieChart>
              </ResponsiveContainer>
              <table className="w-full max-w-[350px] text-sm h-min">
                <thead>
                  <tr>
                    <th className="px-2 py-1">Направление</th>
                    <th className="px-2 py-1">Просмотры, %</th>
                  </tr>
                </thead>
                <tbody>
                  {pieChartData.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-100">
                      <td className="px-2 py-1 flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-sm"
                          style={{
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        />
                        <span>{entry.name}</span>
                      </td>
                      <td className="px-2 py-1">
                        <label className="w-full flex justify-center">
                          {entry.value}%
                        </label>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Столбчатый график динамики публикаций */}
          <div className="bg-white p-4 rounded-lg shadow-md border border-[#F0F0F0]">
            <h3 className="text-lg font-bold mb-4">
              СТОЛБЧАТЫЙ ГРАФИК ДИНАМИКИ ПУБЛИКАЦИЙ
            </h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={{ stroke: "#8884d8" }}
                  tickLine={{ stroke: "#8884d8" }}
                />
                <YAxis
                  offset={20}
                  axisLine={{ stroke: "#8884d8" }}
                  tickLine={{ stroke: "#8884d8" }}
                  label={
                    <div className="whitespace-nowrap rotate-[-90deg] origin-center text-black">
                      Количество публикаций
                    </div>
                  }
                />
                <Tooltip
                  formatter={(value, name) => [`${value} публикаций`]}
                  labelFormatter={(name) => `${name}`}
                />
                <Bar dataKey="publications" radius={[4, 4, 0, 0]}>
                  {lineChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Правая часть: топ-5 самых просматриваемых книг */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md border border-[#F0F0F0] sticky top-6">
            <h3 className="text-lg font-bold mb-4">
              ТОП-5 НАИБОЛЕЕ ПРОСМАТРИВАЕМЫХ
            </h3>
            <div className="space-y-4">
              {top5Data.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 border-b pb-4 last:border-none"
                >
                  <div className="w-16 h-19 rounded bg-gray-100 overflow-hidden">
                    <Image
                      width={100}
                      height={100}
                      src={item.cover}
                      alt={`${item.title} cover`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-base font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.author}</p>
                    <div className="flex items-center mt-2">
                      <span className="text-sm font-bold mr-1">
                        {item.rating}
                      </span>
                      {[...Array(5)].map((_, i) => {
                        return item.rating > i ? (
                          <MdStar key={i} className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <FiStar key={i} className="w-4 h-4 text-yellow-400" />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainCardInfo>
  );
};
