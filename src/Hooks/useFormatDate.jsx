import React from 'react'
import moment from "moment";

const useFormatDate = (date) => {
  if (date) return moment(date).format("HH:mm");
  return "No date";
};

export default useFormatDate