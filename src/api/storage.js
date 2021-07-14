import axios from "@/api/axios";

const getStorage = () => {
  return axios.get("api/v1/project/");
};
const putCompanieItem = (companie) => {
  return axios.put("/api/companies/", {
    amount: companie.amount,
    avg_consumption: companie.avg_consumption,
    critical: companie.critical,
    days_left: companie.days_left,
    for_order: companie.for_order,
    id: companie.id,
    company_id: companie.company_id,
    product_title: companie.product_title,
    unit: companie.unit,
  });
};
const putComment = (companie) => {
  return axios.put("/api/companies/comment", {
    company_id: companie.company_id,
    comment: companie.comment,
  });
};
const getCompanieItem = (apiUrl) => {
  return axios.get(`/api/companies/${apiUrl}`);
};
const getCompanieNet = (apiUrl) => {
  return axios.get(`/api/companies/${apiUrl.apiUrl}`);
};
const putStorage = () => {
  return axios.get("api/v1/project/");
};

export default {
  getStorage,
  putStorage,
  putComment,
  putCompanieItem,
  getCompanieItem,
  getCompanieNet,
};
