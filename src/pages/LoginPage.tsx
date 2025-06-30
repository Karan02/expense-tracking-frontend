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
      id: "ec259d54-b234-478c-a757-713b85e1ad58",
      name: "John Doe",
      role:"employee",
   
    };
    const mockAdmin = {
      id:"087de20b-2840-4f43-8d6c-ca0051e5ffb1",
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
