import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from '@reduxjs/toolkit';

// Check if localStorage is available before accessing it
const initialState = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('data')) || [
  {
    id: "1",
    firstName: "fenil",
    lastName: "gajjar",
    email: "fenil@gmail.com",
  },
  {
    id: "2",
    firstName: "dhaval",
    lastName: "gajjar",
    email: "dhaval@gmail.com",
  },
  {
    id: "3",
    firstName: "rajiv",
    lastName: "gajjar",
    email: "rajiv@gmail.com",
  },
];

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      addData: (state, action) => {
        const newData = { ...action.payload, id: nanoid() }; // Generate unique id
        state.push(newData);
        if (typeof window !== 'undefined') {
          localStorage.setItem('data', JSON.stringify(state));
        }
      },
      updateData: (state, action) => {
        const { id, firstName, lastName, email } = action.payload;
        const index = state.findIndex(item => item.id === id);
        if (index !== -1) {
          state[index] = { id, firstName, lastName, email };
          if (typeof window !== 'undefined') {
            localStorage.setItem('data', JSON.stringify(state));
          }
        }
      },
    deleteData: (state, action) => {
        const idToDelete = action.payload.id; // Extract the id from the payload object
        const newState = state.filter(item => item.id !== idToDelete);
        if (typeof window !== 'undefined') {
          localStorage.setItem('data', JSON.stringify(newState));
        }
        return newState;
      }      
  }
});

export const { addData, updateData, deleteData } = dataSlice.actions;
export default dataSlice.reducer;
