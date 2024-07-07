'use client'

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Modal from "./Modal";

const Header = () => {
    const pathname = usePathname();
    const router = useRouter();
    const shouldShowProductLink = !pathname.startsWith('/product');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userData, setUserData] = useState(null); // Estado para el usuario logueado

    useEffect(() => {
        // Verificar si localStorage está disponible
        if (typeof window !== 'undefined') {
            const storedUserData = localStorage.getItem('authUser');
            if (storedUserData) {
                setUserData(JSON.parse(storedUserData));
            }
        }
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authUser');
            const modal = document.getElementById('my_modal_5');
            modal.close();
            setTimeout(() => {
                router.push('/auth/login');
            }, 1000);
        }
    };

    const handleOpenModal = () => {
        const modal = document.getElementById('my_modal_5');
        modal.showModal();
    };

    const handleCancel = () => {
        console.log('Cancelled');
        const modal = document.getElementById('my_modal_5');
        modal.close();
    };

    return (
        <>
            <header className="navbar bg-base-100 shadow shadow-indigo-500/50 fixed z-40 w-full">
                <div className="flex-1">
                    <Link href="/" className="btn btn-ghost text-xl">
                        ProStock
                    </Link>
                </div>
                <div className="flex-none">
                    <button
                        onClick={toggleMobileMenu}
                        className="btn btn-ghost btn-circle lg:hidden"
                        aria-label="Menu Options Navigate"
                        name="menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </button>
                    <ul className={`menu max-lg:absolute max-lg:right-2 max-lg:top-14 max-lg:mt-3 max-lg:z-[10] max-lg:p-2 lg:menu-horizontal lg:px-1 max-lg:shadow max-lg:bg-base-100 max-lg:rounded-box max-lg:w-52 ${mobileMenuOpen ? '' : 'hidden'}`}>
                        <li>
                            <Link href="/" className={`${pathname === '/' ? 'active' : ''}`}>
                                Home
                            </Link>
                        </li>
                        {userData && (
                            <li>
                                <Link href="/profile" className={`${pathname === '/profile' ? 'active' : ''}`}>
                                    Profile
                                </Link>
                            </li>
                        )}
                        {shouldShowProductLink && userData && (
                            <li>
                                <Link href="/product">
                                    Product
                                </Link>
                            </li>
                        )}
                        {pathname !== '/auth/login' && !userData && (
                            <li>
                                <Link href="/auth/login">
                                    Login
                                </Link>
                            </li>
                        )}
                        {pathname !== '/auth/register' && !userData && (
                            <li>
                                <Link href="/auth/register">
                                    Register
                                </Link>
                            </li>
                        )}
                        <li>
                            <details className="z-40">
                                <summary>
                                    ⚙️
                                </summary>
                                <ul className="p-2 bg-base-100 rounded-t-none">
                                    {userData && (
                                        <li><button onClick={handleOpenModal}>Logout</button></li>
                                    )}
                                    <li><ThemeToggle /></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </header>
            <Modal
                id="my_modal_5"
                title="Are you sure you want to log out?"
                message="When you leave you can log back in, your data is safe with us!"
                onConfirm={handleLogout}
                onCancel={handleCancel}
            />
        </>
    );
};

export default Header;
