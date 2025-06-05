import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DiaryDateCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <div className="flex justify-center">
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="yyyy-MM-dd"
        className="border border-gray-300 p-2 rounded text-center"
      />
    </div>
  );
};

export default DiaryDateCalendar;
