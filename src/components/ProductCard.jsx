import { Link } from "react-router-dom";

function ProductCard({ item }) {
  return (
    <div className="card">
      <img src={item.img} alt={item.name} />

      <div>
        <h4>{item.name}</h4>

        <div className="meta">
          <div>
            <div className="price">${item.discountedPrice?.toFixed(2) || item.price}</div>
            {item.discount > 0 && (
              <div className="discount">{item.discount}% off</div>
            )}
          </div>

          <Link to={`/product/${item._id}`}>
            <button className="btn">View Product</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;