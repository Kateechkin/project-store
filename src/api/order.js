import axios from "@/api/axios";

// const order = (order) => {
//   return axios.post("order/", {
//     comment: order.comment,
//     file: order.file,
//     items: order.items,
//   });
// };
const order = (order) => {
  return axios.post("/api/order/", order);
};
export default {
  order,
};
