"use client";
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
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

export const CustomLegend = ({ className, data }) => {
  return (
    <div className={`${className} ml-2 w-full`}>
      <table className="w-full border-collapse">
        <tbody>
          {data.map((entry, index) => (
            <tr key={`legend-${index}`} className="h-6">
              <td className="p-0 align-middle">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 mr-2"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              </td>
              <td className="p-0 align-middle">
                <span className="text-sm font-medium whitespace-nowrap">
                  {entry.value}%
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const ReportsAndStatistics = () => {
  const dataPie = [
    { name: "Информатика", value: 50 },
    { name: "Экономика", value: 10 },
    { name: "Менеджмент", value: 3 },
    { name: "Робототехника ", value: 15 },
    { name: "Математика", value: 7 },
    { name: "Физика", value: 5 },
  ];

  const dataBar = [
    { name: "Пн", value: 90 },
    { name: "Вт", value: 70 },
    { name: "Ср", value: 85 },
    { name: "Чт", value: 60 },
    { name: "Пт", value: 40 },
    { name: "Сб", value: 20 },
    { name: "Вс", value: 10 },
  ];

  return (
    <MainCardInfo>
      <h2 className="text-gray-700 font-bold text-2xl sm:text-3xl">
        Статистика
      </h2>

      {/* Адаптивные карточки */}
      <div className="flex flex-wrap justify-center gap-6 mb-6">
        <MiniCardStats
          title="Пользователи"
          value={324}
          minValue={17}
          stateNumberCard={stateCard.up}
        />
        <MiniCardStats
          title="Ср. кол-во запросов"
          value={60}
          minValue={12}
          stateNumberCard={stateCard.down}
        />
        <MiniCardStats
          title="Ср. время сеанса"
          value={"80 мин."}
          minValue={"2 мин."}
          stateNumberCard={stateCard.down}
        />
      </div>

      {/* Блок графиков */}
      <div className="flex flex-col lg:flex-row gap-6 p-2 sm:p-4">
        {/* Круговая диаграмма */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md border border-[#F0F0F0]">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            ДИАГРАММА ВОСТРЕБОВАННОСТИ
          </h3>
          <div className="flex flex-col sm:flex-row items-center h-[250px] sm:h-[300px]">
            <div className="w-full sm:w-2/3 h-48 sm:h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataPie}
                    labelLine={false}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#000"
                    strokeWidth={0}
                    paddingAngle={5}
                  >
                    {dataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Просмотры"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend
              data={dataPie}
              className="w-full sm:w-1/3 mt-4 sm:mt-0"
            />
          </div>
        </div>

        {/* Столбчатая диаграмма */}
        <div className="w-full lg:w-1/2 bg-white p-4 rounded-lg shadow-md border border-[#F0F0F0]">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            ПОСЕЩАЕМОСТЬ САЙТА
          </h3>
          <div className="h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dataBar}
                margin={{
                  top: 5,
                  right: 5,
                  left: 5,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickSize={10} />
                <YAxis tickSize={10} />
                <Tooltip
                  formatter={(value) => [value, "Человек"]}
                  labelFormatter={(name) => `День: ${name}`}
                />
                <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  {dataBar.map((entry, index) => (
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
      </div>
    </MainCardInfo>
  );
};
