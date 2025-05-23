import React from "react";

const CardProduct = ({ imageSrc, name, price, onBuy }) => {
  return (
    <div className="card-product border p-4 rounded-md shadow-lg flex flex-col items-center text-center">
      <img
        className="product-image w-full h-64 object-cover rounded-md mb-4"
        src={imageSrc}
        alt="Product Image"
      />
      <p className="product-name mb-4 font-medium">{name}</p>
      <p className="product-price text-xl font-semibold mb-4">
        ${price.toFixed(2)}
      </p>
      <button
        className="buy-now bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700"
        onClick={() => onBuy(price, name)} // Call onBuy with price and name
      >
        Buy Now
      </button>
    </div> 
  );
};

export default CardProduct;
