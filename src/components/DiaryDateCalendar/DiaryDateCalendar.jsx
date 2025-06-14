import s from "./DiaryDateCalendar.module.css";
import DatePicker from "react-datepicker";

import newCalendarIcon from "../../assets/icons/calendar.svg?url";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { setDate } from "../../redux/products/products-slice";

const DiaryDateCalendar = ({ location }) => {
  const { date } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [dateObject, setDateObject] = useState(() => new Date());

  useEffect(() => {
    if (!dateObject) return;
    dispatch(setDate(dateObject.toISOString().slice(0, 10)));
  }, [dispatch, dateObject]);

  useEffect(() => {
    if (!date) return;
    setDateObject(new Date(date));
  }, [dispatch, date]);

  const diaryCalendar = location === "diary";
  const sidebarCalendar = location === "sidebar";

  return (
    <>
      {diaryCalendar && (
        <div className={s.block}>
          <DatePicker
            className={s.diaryCalendar}
            dateFormat="dd.MM.yyyy"
            maxDate={new Date()}
            selected={dateObject}
            onChange={(date) => setDateObject(date)}
          />
          <img src={newCalendarIcon} alt="Calendar icon" className={s.icon} />
        </div>
      )}

      {sidebarCalendar && (
        <div className={s.box}>
          <DatePicker
            className={s.sidebarCalendar}
            dateFormat="dd/MM/yyyy"
            maxDate={new Date()}
            selected={dateObject}
            onChange={(date) => setDateObject(date)}
          />
        </div>
      )}
    </>
  );
};

DiaryDateCalendar.propTypes = {
  location: PropTypes.string.isRequired,
};

export default DiaryDateCalendar;
