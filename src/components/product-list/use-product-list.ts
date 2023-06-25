import axiosClient from "@/api-client/axiosClient";
import { Product } from "@/models";
import { useEffect, useState } from "react";
import { FilterParams } from "./filter";

const useProductList = (filter: FilterParams) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      if (filter.page === 1) {
        setIsEnd(false);
      }

      try {
        const res = await axiosClient.get("/products", {
          params: {
            limit: filter.limit,
            page: filter.page,
            title: filter.name,
          },
        });

        const data = res.data.data;

        if (data.length === 0) {
          setIsEnd(true);
        }

        if (filter.page === 1) {
          setProducts(data);
        } else {
          setProducts((prev) => [...prev, ...data]);
        }
      } catch (error) {
        console.log("error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter]);

  return {
    products,
    loading,
    isEnd,
  };
};

export default useProductList;
