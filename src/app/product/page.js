import Link from 'next/link';

const ProductsPage = () => {
  
    return (
        <div className="hero-content flex-col">
            <h1 className="text-center py-4">Products</h1>
            <ol className="grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {/* <li key={product.id} className="card m-4 bg-base-100 shadow-xl">
                        <Link href={`/product/${product.id}`} className="card-body p-6 no-underline">
                            <h2 className="lg:card-title text-bold">{product.name}</h2>
                            <p className="max-sm:text-xs sm:text-sm md:text-base">{product.supplier}</p>
                            <p className="max-sm:text-xs sm:text-sm md:text-base">Price: ${product.price.toFixed(2)}</p>
                        </Link>
                    </li> */}
            </ol>
        </div>
    );
}

export default ProductsPage;
