'use client'
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getAllProductsService } from "@/services/products";
import { validateTokenExp } from "@/helpers/helpers";

const ProductsPage = () => {
    let [produtsRegistered, setProdutsRegistered] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const tokenIsValid = validateTokenExp(sessionStorage.getItem('userToken'))
        if (tokenIsValid) {
            produtsRegistered === null && getAllProducts();
        } else {
            setTimeout(() => {
                sessionStorage.removeItem('userToken');
                router.push('/options');
            }, 1000);
        }
    }, []);

    const getAllProducts = async () => {
        getAllProductsService(sessionStorage.getItem('userToken'))
            .then(response => {
                if (response) {
                    setProdutsRegistered(response.data.data);
                }
            })
            .catch(err => console.log(err));
    };

    const handleViewProduct = (productId, sku) => {
        router.push(`/product/${sku}`);
    };

    return (
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="hero-content text-center">
                <div className="card w-auto bg-base-100 shadow-xl">
                    <div className="card-body place-items-center">
                        <h2 className="card-title text-center">Registrar un producto en el sistema</h2>
                        <Link href="/product/create">
                            <button className="btn btn-outline">
                                Crear un producto
                            </button>
                        </Link>
                        <h2 className="card-title text-center">Productos registrados en el sistema</h2>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                <thead>
                                    <tr >
                                        <th>Nombre</th>
                                        <th>Cantidad disponible</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produtsRegistered && produtsRegistered.length > 0 ? (
                                        produtsRegistered.map(product => (
                                            <tr key={product.id}>
                                                <td>{product.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={() => handleViewProduct(product.id, product.sku)}>Ver detalle</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No existen productos registrados</td>
                                        </tr>
                                    )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductsPage;
