'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { useState, useEffect } from 'react';
// import { fetchProductsData } from '@/services/product';

export const MenuProduct = () => {

    // const [countPro, setCountPro] = useState(0);

    // useEffect(() => {
    //     const getProducts = async () => {
    //         try {
    //             const productsData = await fetchProductsData();
    //             if (productsData) {
    //                 setCountPro(productsData.length);
    //             } 
    //         } catch (err) {
    //             console.error('Failed to fetch product data');
    //         }
    //     };

    //     getProducts();
    // }, []);

    const pathname = usePathname();
    return (
        <div className="mx-3 fixed top-[90%]">
            <ul className="menu flex-row bg-base-200 lg:menu-horizontal rounded-box">
                <li>
                    <Link href="/product" className={`${pathname === '/product' ? 'active' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 2048 2048">
                            <g fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2">
                                <path d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354zm0 640l177-89l-463-265l-211 106zm315-157l182-91l-497-249l-149 75zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288zm-640 710v-455l-384-192v454zm64-566l369-184l-369-185l-369 185zm576-1l448-224l448 224v527l-448 224l-448-224zm384 576v-305l-256-128v305zm384-128v-305l-256 128v305zm-320-288l241-121l-241-120l-241 120z" />
                            </g>
                        </svg>
                        Products
                        {/* <span className="badge badge-sm">{countPro}</span> */}
                    </Link>
                </li>
                <li>
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 2048 2048">
                            <g
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2">
                                <path d="M896 1537V936L256 616v880l544 273l-31 127l-641-320V472L960 57l832 415v270q-70 11-128 45V616l-640 320v473zM754 302l584 334l247-124l-625-313zm206 523l240-120l-584-334l-281 141zm888 71q42 0 78 15t64 41t42 63t16 79q0 39-15 76t-43 65l-717 717l-377 94l94-377l717-716q29-29 65-43t76-14m51 249q21-21 21-51q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692l-34 135l135-34z" />
                            </g>
                        </svg>
                        Create
                    </a>
                </li>
            </ul>
        </div>
    )
}
