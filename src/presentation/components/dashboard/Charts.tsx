import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from "recharts";
import type { ChartData } from "../../../types";

const COLORS = ["#16a34a", "#86efac", "#15803d", "#bbf7d0"];

interface TransportChartProps {
  data: ChartData[];
}

export const TransportChart = ({ data }: TransportChartProps) => (
  <div className="col-lg-4 col-md-6 col-12 mb-3">
    <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
      <h6 className="mb-3 text-center fw-semibold">🚗 Transporte utilizado</h6>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={75}
            label={(entry: any) => entry.value > 0 ? `${entry.name}: ${entry.value}` : ''}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

interface EnergyChartProps {
  data: ChartData[];
}

export const EnergyChart = ({ data }: EnergyChartProps) => (
  <div className="col-lg-4 col-md-6 col-12 mb-3">
    <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
      <h6 className="mb-3 text-center fw-semibold">💡 Consumo eléctrico</h6>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="name" stroke="#9ca3af" tick={{ fontSize: 12 }} />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
          />
          <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

interface WeeklyTrendChartProps {
  data: Array<{ date: string; count: number }>;
}

export const WeeklyTrendChart = ({ data }: WeeklyTrendChartProps) => (
  <div className="col-lg-4 col-md-12 col-12 mb-3">
    <div className="bg-dark p-4 rounded-4 shadow-lg h-100">
      <h6 className="mb-3 text-center fw-semibold">📊 Tendencia semanal</h6>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9ca3af" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#9ca3af" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Registros"
            dot={{ fill: '#22c55e', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
);
