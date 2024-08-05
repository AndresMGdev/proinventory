"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Modal from "@/components/ui/Modal";
import { useInputHook } from "@/hooks/use-input-hook";
import { loginUserService } from "@/services/auth";

const LoginPage = () => {
  let [user, setUser] = useState(null);
  let { value: emailValue, bind: emailBind } = useInputHook('');
  let { value: passwordValue, bind: passwordBind } = useInputHook('');

  const [message, setMessage] = useState({ text: '', type: '' });

  const router = useRouter();


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authUser") || "{}");
    if (userData && userData.email) {
      router.push("/product");
    }
  }, [router]);
  useEffect(() => {
    user && loginUser();
  }, [user]);

  const loginUser = () => {
    loginUserService(user)
      .then(response => {
        if (response) {
          localStorage.setItem('userToken', response.data.data);
          setMessage({ text: response.data.message, type: 'alert alert-success' });

          setTimeout(() => {
            router.push('/');
          }, 1000);
        }
      })
      .catch(err => {
        setMessage({ text: err.response.data, type: 'alert alert-error' });
      })
  }

  const getDataFormMyForm = (event) => {
    event.preventDefault();
    const form = event.target;

    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessage({ text: 'Por favor, diligencia todos los campos', type: 'alert alert-error' });
      return;
    }
    const userLogin = {
      email: emailValue,
      password: passwordValue
    };
    setUser(userLogin)
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const user = registeredUsers.find(user => user.email === emailValue && user.password === encodeBase64(passwordValue) && user.isDelete !== true);
    if (user) {
      localStorage.setItem('loggedUser', JSON.stringify(user));
      setMessage({ text: 'Inicio de sesión exitoso', type: 'alert alert-success' });
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } else {
      localStorage.removeItem('loggedUser');
      setMessage({ text: 'Correo electrónico o contraseña incorrectos', type: 'alert alert-warning' });
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={getDataFormMyForm} noValidate>
            <h2 className="card-title">Inicio de sesión de usuarios:</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electronico:</span>
              </label>
              <input type="email" id="email" name="email" placeholder="Ingresa tu email" required className="input input-bordered w-full" {...emailBind} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña/Password:</span>
              </label>
              <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required className="input input-bordered w-full"  {...passwordBind} />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </div>
            {message.text && (
              <div className="w-[50%] mx-auto my-2">
                <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
              </div>)}
          </form>
          <span className="align-items-center text-center">o</span>
          <div className=" mt-4 mb-4 align-items-center text-center">
            <Link href="/auth/register">
              <button className="btn btn-outline">
                Registrarse
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Modal id="my_modal_4" title="¡Has iniciado sesión correctamente!" />
    </>
  );
};
export default LoginPage;
