import { Box, Button, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useAppSelector } from '../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from "../../variables.json"
interface AnalyticsData {
  category: string;
  total: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function Dashboard() {
  const user = useAppSelector(state => state.auth.user || localStorage.getItem("user"));
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [total,setTotal] = useState<Number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${REACT_APP_API_URL}/api/analytics`, {
        headers: { 'x-user': JSON.stringify(user) },
      });
      const json = await res.json();
      setData(json.category);
      setTotal(json.total);
    };
    fetchData();
  }, [user]);

  return (
    <>
    <Box p={5}>
    <Button onClick={() => navigate('/expenses')}>Back</Button>
      <Heading size="lg" mb={4}>Expense Analytics</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
    </>
  );
}