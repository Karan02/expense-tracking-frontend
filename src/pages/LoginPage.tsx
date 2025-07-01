import { Box, Button, Input, VStack, Heading } from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_API_URL } from "../../variables.json"
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password,setPassword] = useState('');
   const navigate = useNavigate();
   const dispatch = useAppDispatch();

  const handleLogin = async () => {

    try {
      const res = await fetch(`${REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Login failed');
      }

      const data: LoginResponse = await res.json();

      // ✅ Save token in localStorage
      localStorage.setItem('token', data.token);
      dispatch(login(data.user));

      navigate('/expenses')
      return data.user;
    } catch (err: any) {
      console.log("Error",err)
    }
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
        <Input
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button disabled={email && password ? false:true} onClick={handleLogin} colorScheme="blue">
          Login
        </Button>
      </VStack>
    </Box>
  );
}
