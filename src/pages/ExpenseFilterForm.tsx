// import React, { useState } from 'react';
// import {
//   Box,
//   Input,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Heading,
//   useColorModeValue,
//   Select,
// } from '@chakra-ui/react';

// type Props = {
//   onFilter: (filters: {
//     category?: string;
//     startDate?: string;
//     endDate?: string;
//   }) => void;
// };

// const ExpenseFilterForm: React.FC<Props> = ({ onFilter }) => {
//     const [category, setCategory] = useState('');
//     const formRef = React.useRef<HTMLFormElement>(null);
    
//     const handleReset = () => {
//         formRef.current?.reset(); // Reset input fields
//         onFilter({});             // Fetch all expenses
//     };

//   return (
//     <Box
//       bg={useColorModeValue('gray.50', 'gray.700')}
//       p={4}
//       rounded="md"
//       boxShadow="md"
//       mb={6}
//       maxWidth={350}
//       maxHeight={440}
//       position={'absolute'}
//       top={'5'}
//       right={'5'}
//     >
//       <Heading as="h3" size="md" mb={4}>
//         Filter Expenses
//       </Heading>
//       <form
//         onSubmit={(e) => {
//         e.preventDefault();

//         const formData = new FormData(e.currentTarget);
//         const cate = category || formData.get('category') as string;
//         const startDate = formData.get('startDate') as string;
//         const endDate = formData.get('endDate') as string;

//         onFilter({
//         category: cate || undefined,
//         startDate: startDate || undefined,
//         endDate: endDate || undefined,
//         });
//         }}
//       >
//         <Flex flexWrap="wrap"
//          align="center" gap={4}
//         >
//           <FormControl>
//             <FormLabel>Category</FormLabel>
//             <Select placeholder="Select category" value={category} onChange={e => setCategory(e.target.value)}>
//             <option value="Food">Food</option>
//             <option value="Travel">Travel</option>
//             <option value="Office">Office</option>
//             <option value="Other">Other</option>
//           </Select>
//           </FormControl>

//           <FormControl>
//             <FormLabel>Start Date</FormLabel>
//             <Input type="date" name="startDate" />
//           </FormControl>

//           <FormControl>
//             <FormLabel>End Date</FormLabel>
//             <Input type="date" name="endDate" />
//           </FormControl>

//           <FormControl alignSelf="end">
//             <Button type="submit" colorScheme="teal" mt={1}>
//               Filter
//             </Button>
//             <Button ml={2} onClick={handleReset} variant="outline">
//               Reset
//             </Button>
//           </FormControl>
//         </Flex>
//       </form>
//     </Box>
//   );
// };

// export default ExpenseFilterForm;
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
} from '@chakra-ui/react';
import React, { useState, useRef } from 'react';

const ExpenseFilterPopover = ({ onFilter }: { onFilter: (filters: any) => void }) => {
  const [category, setCategory] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(formRef.current!);
    onFilter({
      category,
      startDate: data.get('startDate') || undefined,
      endDate: data.get('endDate') || undefined,
    });
  };

  const handleReset = () => {
    setCategory('');
    formRef.current?.reset();
    onFilter({});
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button colorScheme="teal">Filter Expenses</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>Filter Expenses</PopoverHeader>
        <PopoverBody>
          <form ref={formRef} onSubmit={handleSubmit}>
            <Flex direction="column" gap={3}>
              <FormControl>
                <FormLabel>Category</FormLabel>
                <Select
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Select category"
                >
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Start Date</FormLabel>
                <Input type="date" name="startDate" />
              </FormControl>

              <FormControl>
                <FormLabel>End Date</FormLabel>
                <Input type="date" name="endDate" />
              </FormControl>

              <Flex justify="space-between" mt={2}>
                <Button type="submit" colorScheme="teal" size="sm">
                  Apply
                </Button>
                <Button onClick={handleReset} size="sm" variant="outline">
                  Reset
                </Button>
              </Flex>
            </Flex>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ExpenseFilterPopover;
