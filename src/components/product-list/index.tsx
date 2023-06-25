"use client";
import axiosClient from "@/api-client/axiosClient";
import { FC, useEffect } from "react";

const ProductList: FC = () => {
  useEffect(() => {
    console.log("ProductList mounted");

    const fetchProducts = async () => {
      const res = await axiosClient.get("/hello");
      console.log(res);
    };
    fetchProducts();
  }, []);
  return <div>Product List</div>;
};

export default ProductList;
