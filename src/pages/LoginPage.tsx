import { Box, Button, Input, VStack, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    // Mock login
    const mockUser = {
      id: "faa4b11d-6731-4ab8-a52b-03c36e415819", //employee
      name: "John Doe",
      // role: email.includes('admin') ? "admin" : "employee",
      role:"employee",
   
    };
    const mockAdmin = {
      id:"54183616-f77f-4324-965c-bf937bc16dbc", //admin
      name: "John Doe",
      role:"admin"
    }
    dispatch(login(email.includes('admin')?mockAdmin:mockUser));
    navigate('/expenses');
  };

  return (
    <Box maxW="sm" mx="auto" mt="20">
      <VStack spacing={4}>
        <Heading size="md">Login</Heading>
        <Input
          placeholder="Enter email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Button onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      </VStack>
    </Box>
  );
}
