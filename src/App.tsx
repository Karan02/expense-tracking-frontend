import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ExpenseList from './pages/ExpenseList';
import { useAppSelector } from './redux/hooks';
import AddExpense from './pages/AddExpense';
import Dashboard from './pages/Dashboard';

function App() {
  const user = useAppSelector(state => state.auth.user);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/add" element={<AddExpense />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/expenses"
        element={user ? <ExpenseList /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;