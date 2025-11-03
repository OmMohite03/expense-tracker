import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "./transactionsSlice";
import { toast } from "react-hot-toast";


const schema = yup.object().shape({
  type: yup.string().required("Please select type"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .required("Amount is required"),
  description: yup.string().max(150, "Description too long"),
  category: yup.string().required("Please enter category"),
  date: yup
    .date()
    .typeError("Please select a valid date")
    .required("Please select a date"),
});


function TransactionForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.transactions);

const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isValid },
} = useForm({
  resolver: yupResolver(schema),
  mode: "onChange", 
});


  const onSubmit = async (data) => {
  try {
    await dispatch(addTransaction(data)).unwrap();
    reset();
    toast.success("Transaction added successfully!");
  } catch (err) {
    console.error("Error adding transaction:", err);
    toast.error("Failed to add transaction."); 
  }
};


  return (
    <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add Transaction</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Type */}
        <div>
          <label className="block text-gray-700">Type</label>
          <select
            {...register("type")}
            className={`w-full border rounded-md p-2 ${
              errors.type ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            {...register("amount")}
            className={`w-full border rounded-md p-2 ${
              errors.amount ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter amount"
          />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <input
            type="text"
            {...register("description")}
            className="w-full border rounded-md p-2"
            placeholder="Optional"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            {...register("category")}
            className={`w-full border rounded-md p-2 ${
              errors.category ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="e.g. salary, groceries"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            {...register("date")}
            className={`w-full border rounded-md p-2 ${
              errors.date ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        {/* Submit */}
      <button
        type="submit"
        disabled={!isValid || loading}
        className={`w-full py-2 rounded-md text-white ${
          !isValid || loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>


        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default TransactionForm;
