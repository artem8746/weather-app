import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const toLocalTime = (ms: number, timezone: number, format = "hh:mm a") => {
  const sec = Math.floor(ms / 1000); // Convert milliseconds to seconds
  return dayjs
    .unix(sec)
    .utcOffset(timezone === 0 ? timezone : timezone / 60)
    .format(format);
};

export default toLocalTime;
