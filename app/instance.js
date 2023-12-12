import axios from "axios";

const url =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_DEV_INSTANCE}`
    : `${process.env.NEXT_PUBLIC_PROD_INSTANCE}`;

const instance = axios.create({
  baseURL: url,
});

export default instance;
