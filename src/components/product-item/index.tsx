import { Product } from "@/models";
import Image from "next/image";
import { FC } from "react";

interface ProductItemProps {
  product: Product;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-5 bg-red-100 p-5 rounded-md">
      <div className="flex gap-5 justify-between">
        <div>
          {product.id} - {product.title}
        </div>

        <div className="w-12 h-12">
          <Image
            src={product.image}
            width={100}
            height={50}
            alt={product.title}
          />
        </div>
      </div>

      <div>
        Price: {product.price} - Rating: {product.rating?.rate}
      </div>
    </div>
  );
};

export default ProductItem;
