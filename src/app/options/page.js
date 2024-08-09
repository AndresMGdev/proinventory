'use client'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

import { validateTokenExp } from "@/helpers/helpers";
export default function OptionsPage() {
    const router = useRouter();
    useEffect(() => {
        const tokenIsValid = validateTokenExp(sessionStorage.getItem('userToken'))
        if (tokenIsValid) {
            router.push('/');
        }
    }, []);


    return (
        <div className="hero min-h-[85vh] bg-base-200 ">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body ">
            <h2 className="card-title text-center">Si no tienes una cuenta, puedes registrarte.</h2>
            <h2 className="card-title text-center">O si ya cuentas con una puedes iniciar sesión.</h2>
            <div className="form-control text-center">
            <Link href="/auth/register">
              <button className="btn btn-outline">
                Registrarse
              </button>
            </Link>
            </div>
            <span className="align-items-center text-center">o</span>
            <div className="form-control text-center">
            <Link href="/auth/login">
              <button className="btn btn-outline">
                Iniciar sesión
              </button>
            </Link>
            </div>
          </form>
        </div>
      </div>
    );
}
