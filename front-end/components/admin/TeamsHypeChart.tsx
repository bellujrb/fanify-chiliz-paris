import React from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts';

interface TeamsHypeChartProps {
  mockHypeData: any[];
  homeTeamName: string;
  awayTeamName: string;
}

const TeamsHypeChart: React.FC<TeamsHypeChartProps> = ({ mockHypeData, homeTeamName, awayTeamName }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100">
      <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
        <span>Teams Hype</span>
        <span className="text-xs font-normal text-gray-400">(last days)</span>
      </h3>
      <div className="w-full h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockHypeData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar dataKey="homeHype" name={homeTeamName} fill="#f87171" barSize={18} radius={[4, 4, 0, 0]} />
            <Bar dataKey="awayHype" name={awayTeamName} fill="#60a5fa" barSize={18} radius={[4, 4, 0, 0]} />
            <Line type="monotone" dataKey="homeHype" name={homeTeamName + ' (line)'} stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="awayHype" name={awayTeamName + ' (line)'} stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeamsHypeChart; 