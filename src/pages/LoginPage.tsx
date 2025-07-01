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
      id: "4a3d440b-fd1c-4d2b-b220-818d62ff03b7",
      name: "John Doe",
      role:"employee",
   
    };
    const mockAdmin = {
      id:"670d1ed8-ecce-4592-87eb-1e5a8995d303",
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
