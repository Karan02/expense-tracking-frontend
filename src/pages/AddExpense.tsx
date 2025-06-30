import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
  Popover,
  Heading
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

export default function AddExpense() {
  const user = useAppSelector(state => state.auth.user);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = { amount: parseFloat(amount), category, description, date };
    try {
      const res = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user': JSON.stringify(user),
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast({ title: 'Expense added', status: 'success' });
        navigate('/expenses');
      } else {
        const err = await res.json();
        toast({ title: 'Error', description: err.message, status: 'error' });
      }
    } catch (err) {
      toast({ title: 'Error submitting expense', status: 'error' });
    }
  };

  return (
    <>
    <Popover>
  <Box maxW="md" mx="auto" mt={10}>
      <Heading size="md" mb={4}>Add New Expense</Heading>
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Select placeholder="Select category" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea value={description} onChange={e => setDescription(e.target.value)} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmit} width="full">Submit</Button>
      </VStack>
    </Box>
</Popover>
    
    </>
  );
}