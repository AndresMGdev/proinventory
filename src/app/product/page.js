'use client'
import Link from 'next/link';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { getAllUsersService } from "@/services/users";
import { validateTokenExp } from "@/helpers/helpers";
import UsersTable from "@/components/user/UsersTable";
const ProductsPage = () => {
    let [registeredUsers, setRegisteredUsers] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const tokenIsValid = validateTokenExp(sessionStorage.getItem('userToken'))
        if (tokenIsValid) {
            registeredUsers === null && getAllUsers();
        } else {
            setTimeout(() => {
                router.push('/options');
            }, 1000);
        }
    }, []);

    const getAllUsers = async () => {
        getAllUsersService(sessionStorage.getItem('userToken'))
            .then(response => {
                if (response) {
                    setRegisteredUsers(response.data.data);
                }
            })
            .catch(err => console.log(err));
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
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Correo</th>
                                        <th>Nombre(s)</th>
                                        <th>Apellido(s)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredUsers && registeredUsers.length > 0 ? (
                                        registeredUsers.map(user => (
                                            <UsersTable
                                                key={user.id}
                                                email={user.email}
                                                name={user.first_name}
                                                lastname={user.last_name}
                                            />
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center">No existen usuarios registrados</td>
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
