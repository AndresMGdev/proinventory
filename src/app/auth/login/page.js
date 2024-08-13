"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import Modal from "@/components/ui/Modal";
import { useInputHook } from "@/hooks/use-input-hook";
import { loginUserService } from "@/services/auth";
import { validateEmail } from "@/helpers/helpers";
import { validateTokenExp } from "@/helpers/helpers";


const LoginPage = () => {
  let [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  const router = useRouter();

  let { value: emailValue, bind: emailBind, error: emailError, setError: setEmailError } = useInputHook('');
  let { value: passwordValue, bind: passwordBind, error: passwordError, setError: setPasswordError } = useInputHook('');

  useEffect(() => {
    const tokenIsValid = validateTokenExp(sessionStorage.getItem('userToken'))
    if (tokenIsValid) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [router]);

  useEffect(() => {
    user && loginUser();
  }, [user]);

  const loginUser = () => {
    loginUserService(user)
      .then(response => {
        if (response) {
          sessionStorage.setItem('userToken', response.data.data);
          setMessage({ text: response.data.message, type: 'alert alert-success' });
          window.dispatchEvent(new Event('userTokenChanged'));
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

    let valid = true;


    if (!validateEmail(emailValue)) {
      setEmailError('El correo electrónico no es válido.');
      valid = false;
    }

    if (passwordValue.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    }
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessage({ text: 'Por favor, diligencia todos los campos.', type: 'alert alert-error' });
      return;
    }
    if(valid){
      
      const userLogin = {
        email: emailValue,
        password: passwordValue
      };
      setUser(userLogin)
    }
  };
  return (
    <>
      <div className="hero min-h-[85vh] bg-base-200">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={getDataFormMyForm} noValidate>
            <h2 className="card-title">Inicio de sesión de usuarios:</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electronico:</span>
              </label>
              <input type="email" id="email" name="email" placeholder="Ingresa tu email" required className="input input-bordered w-full" {...emailBind} />
              {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Contraseña/Password:</span>
              </label>
              <input type="password" id="password" name="password" placeholder="Ingresa tu contraseña" required className="input input-bordered w-full"  {...passwordBind} />
              {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
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
