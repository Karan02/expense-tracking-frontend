import {
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Spinner,
  Tag,
  Button,
  Input,
} from '@chakra-ui/react';
import { useAppSelector } from '../redux/hooks';
import { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import ExpenseFilterForm from './ExpenseFilterForm';
import { REACT_APP_API_URL } from "../../variables.json";
interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  status: string;
}

export default function ExpenseList() {
  const user = useAppSelector(state => state.auth.user);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {


    fetchExpenses({});
  }, [user]);
    const fetchExpenses = async (filters: {
      category?: string;
      startDate?: string;
      endDate?: string;
    }) => {
      try {
        
          const params = new URLSearchParams(filters as any).toString();

    const res = await fetch(`${REACT_APP_API_URL}/api/expenses?${params}`, {
      headers: {
        'x-user': JSON.stringify(user)
      }
    });

  const data = await res.json();
  setExpenses(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected') => {
  await fetch(`${REACT_APP_API_URL}/api/expenses/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-user': JSON.stringify(user)
    },
    body: JSON.stringify({ status })
  });
  fetchExpenses({})
};


  return (
    <Box p={5}>
      <>
      <Heading size="lg">Expenses<Button ml={5} onClick={() => navigate("/login")}>Log Out</Button></Heading>
      <Text mt={2}>Welcome, {user?.name} ({user?.role})</Text>
      <Button mt="5" mb="5" onClick={()=>navigate('/add')}>Add Expense</Button><br />
      {user?.role == "admin" ? <Button mt="3" mb="3" mr={"3"} onClick={()=>navigate('/dashboard')}>Analytics</Button>:""}
     </>
     <> 
      <ExpenseFilterForm onFilter={fetchExpenses} />
    </>
      {loading ? (
        <Spinner ml={20} mt={35} />
      ) : (
        <Table mt={24} variant="simple">
          <Thead>
            <Tr>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Description</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              {user?.role == "admin" ? <Th>Approve/Reject</Th>:<></>}
            </Tr>
          </Thead>
          <Tbody>
            {expenses.map(exp => (
              <Tr key={exp.id}>
                <Td>${exp.amount.toFixed(2)}</Td>
                <Td>{exp.category}</Td>
                <Td>{exp.description}</Td>
                <Td>{new Date(exp.date).toLocaleDateString()}</Td>
                <Td>
                  <Tag colorScheme={
                    exp.status === 'approved'
                      ? 'green'
                      : exp.status === 'rejected'
                      ? 'red'
                      : 'yellow'
                  }>
                    {exp.status}
                  </Tag>
                </Td>
                {user?.role === 'admin' && exp.status === 'pending' && (
                <Td>
                  <Button mr={3} onClick={() => handleUpdateStatus(exp.id, 'approved')}>Approve</Button>
                  <Button onClick={() => handleUpdateStatus(exp.id, 'rejected')}>Reject</Button>
                </Td>
              )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
}