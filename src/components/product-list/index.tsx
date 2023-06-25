"use client";

import { FC, useEffect, useState } from "react";

import axiosClient from "@/api-client/axiosClient";
import { Product } from "@/models";
import FilterComponent, { FilterParams } from "./filter";
import { Spin } from "antd";
import ProductItem from "../product-item";

const defaultFilterParams: FilterParams = {
  name: "",
  page: 1,
  limit: 10,
};

const ProductList: FC = () => {
  const [filter, setFilter] = useState<FilterParams>(defaultFilterParams);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const inCreasePage = () => {
    setFilter((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleLoadMore = () => {
    setTimeout(() => {
      inCreasePage();
      setLoading(true);
    }, 300);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      handleLoadMore();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

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

  const handleFilterChange = (filter: FilterParams) => {
    setFilter(filter);

    if (filter.page === 1) {
      setIsEnd(false);
    }
  };

  return (
    <div className="bg-blue-50 min-h-[150px] text-left px-5 max-w-md mx-auto">
      <div>Product List</div>

      <FilterComponent
        initialValues={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="flex justify-between">
        <div>
          page:
          <span className="text-red-500 m-3">{filter.page}</span>
          {loading && <Spin />}
        </div>
        <div>products length: {products.length}</div>
      </div>

      <div
        className="flex flex-col gap-3 h-[350px] overflow-y-scroll p-5 bg-white mt-5"
        onScroll={isEnd || loading ? undefined : handleScroll}
      >
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}

        {loading && <Spin />}

        {isEnd && <div className="text-center">End</div>}
      </div>
    </div>
  );
};

export default ProductList;
