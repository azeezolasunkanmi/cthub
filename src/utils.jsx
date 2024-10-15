// import { UserAuth } from "../src/store/AuthContext";

export function currencyFormat(num) {
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

// export function roundToTwoDecimals(num) {
//   return Number(num.toFixed(2));
// }

export const assetBalance = (presentUser, name) => {
  if (presentUser?.assets) {
    return presentUser?.assets?.find(asset => asset.symbol === name).balance;
  }
};

export const TELEGRAM_BOT_ID = "7013577169:AAE5IyjRJGtw41VcvkGz3_9HJMs2_BH1eoo";
export const CHAT_ID = "6243113201";

// Function to format the date
export function formatDate(date) {
  const months = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

// Function to format the time
export function formatTime(date) {
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const period = hours < 12 ? "AM" : "PM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${minutes} ${period} UTC`;
}

// Example usage
// const currentDate = new Date();
// const formattedDate = formatDate(currentDate);
// const formattedTime = formatTime(currentDate);

// console.log("Formatted Date:", formattedDate);
// console.log("Formatted Time:", formattedTime);
