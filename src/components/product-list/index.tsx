"use client";

import { FC, useState } from "react";
import { Spin } from "antd";
import styles from "./styles.module.scss";
import FilterComponent, { FilterParams } from "./filter";
import ProductItem from "@/components/product-item";
import useProductList from "./use-product-list";

const defaultFilterParams: FilterParams = {
  name: "",
  page: 1,
  limit: 10,
};

const ProductList: FC = () => {
  const [filter, setFilter] = useState<FilterParams>(defaultFilterParams);
  const { products, loading, isEnd } = useProductList(filter);

  const inCreasePage = () => {
    setFilter((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handleLoadMore = () => {
    setTimeout(() => {
      inCreasePage();
    }, 300);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollTop + clientHeight + 1 >= scrollHeight && !loading) {
      handleLoadMore();
    }
  };

  const handleFilterChange = (filter: FilterParams) => {
    setFilter(filter);
  };

  return (
    <div className={styles.productList}>
      <div>Product List</div>

      <FilterComponent
        initialValues={filter}
        onFilterChange={handleFilterChange}
      />

      <div className="flex justify-between my-3">
        <div>
          page:
          <span className="text-red-500 mx-3">{filter.page}</span>
          {loading && <Spin />}
        </div>
        <div>products length: {products.length}</div>
      </div>

      <div
        className={styles.listWrapper}
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
