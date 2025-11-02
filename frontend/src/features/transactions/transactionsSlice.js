import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_URL; // e.g. http://localhost:5000/api

export const fetchTransactions = createAsyncThunk(
  "transactions/fetch",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`${API}/transactions${params ? `?${params}` : ""}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "transactions/add",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API}/transactions`, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API}/transactions/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (s) => { s.status = "loading"; })
      .addCase(fetchTransactions.fulfilled, (s, a) => { s.status = "succeeded"; s.list = a.payload; })
      .addCase(fetchTransactions.rejected, (s, a) => { s.status = "failed"; s.error = a.payload; })

      .addCase(addTransaction.fulfilled, (s, a) => { s.list.unshift(a.payload); })
      .addCase(addTransaction.rejected, (s, a) => { s.error = a.payload; })

      .addCase(deleteTransaction.fulfilled, (s, a) => {
        s.list = s.list.filter((t) => t._id !== a.payload);
      })
      .addCase(deleteTransaction.rejected, (s, a) => { s.error = a.payload; });
  },
});

export default transactionsSlice.reducer;
