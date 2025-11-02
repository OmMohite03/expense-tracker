import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ['#16a34a','#ef4444'];

const ChartComp = () => {
  const { list } = useSelector(s => s.transactions);
  const income = list.filter(t=>t.type==='income').reduce((s,a)=>s+a.amount,0);
  const expense = list.filter(t=>t.type==='expense').reduce((s,a)=>s+a.amount,0);

  const data = [
    { name: 'Income', value: income },
    { name: 'Expense', value: expense }
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="mb-2 font-medium">Income vs Expense</h3>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
              {data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComp;
