"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useInputHook } from "@/hooks/use-input-hook";
import { createUserService } from "@/services/users";
import { wordToCapitalize, encodeBase64 } from "@/helpers/helpers";

const RegisterPage = () => {
  let [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const router = useRouter();
  const [formEvent, setFormEvent] = useState(null);
  const [documentsTypeList] = useState([
    { id: 1, name: 'Cédula de Ciudadanía (CC)' },
    { id: 2, name: 'Tarjeta de Identidad (TI)' },
    { id: 3, name: 'Registro Civil (RC)' },
    { id: 4, name: 'Cédula de Extranjería (CE)' },
    { id: 5, name: 'Carné de Identidad (CI)' },
    { id: 6, name: 'Documento Nacional de Identidad (DNI)' }
  ]);


  let { value: emailValue, bind: emailBind } = useInputHook('');
  let { value: firstNameValue, bind: firstNameBind } = useInputHook('');
  let { value: lastNameValue, bind: lastNameBind } = useInputHook('');
  let { value: documentTypeValue, bind: documentTypeBind } = useInputHook('');
  let { value: documentIdValue, bind: documentIdBind } = useInputHook('');
  let { value: phoneValue, bind: phoneBind } = useInputHook('');
  let { value: addressValue, bind: addressBind } = useInputHook('');
  let { value: passwordValue, bind: passwordBind } = useInputHook('');

  useEffect(() => {
    user && registerUser();
  }, [user]);

  const registerUser = () => {
    createUserService(user)
      .then(response => {
        if (response) {
          setMessage({ text: response.data.message, type: 'alert alert-success' });

          setTimeout(() => {
              router.push('/auth/login');
          }, 1000);
        }
      })
      .catch(err => {
        setMessage({ text: err.response.data, type: 'alert alert-error' });
      })
  }
  const getDataFormMyForm = (event) => {
    const form = event.target;
    event.preventDefault();
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessage({ text: 'Por favor, diligencia todos los campos', type: 'alert alert-error' });
      return;
    }

    const newUser = {
      email: emailValue,
      first_name: wordToCapitalize(firstNameValue),
      last_name: wordToCapitalize(lastNameValue),
      document_type: documentTypeValue,
      document_id: documentIdValue,
      phone: phoneValue,
      address: addressValue,
      password: passwordValue
    };

    setUser(newUser);
  };

  const handleShowModal = (event) => {
    event.preventDefault();
    setFormEvent(event);
    document.getElementById('modal_register').showModal();
  };

  const onConfirm = () => {
    document.getElementById('modal_register').close();
    if (formEvent) {
      getDataFormMyForm(formEvent);
    }
  };
  const onCancel = () => {
    document.getElementById('modal_register').close();
    setMessage({ text: 'Registro cancelado.', type: 'alert alert-warning' });
  }

  return (
    <div className="w-[100%]" noValidate>
      <div className="hero min-h-[90vh] bg-base-200">
        <div className="card shrink-0 w-[100%] shadow-2xl bg-base-100">
          <form className="card-body items-center" onSubmit={handleShowModal} noValidate>
            <h2 className="card-title">Registrarse</h2>
            <div className="lg:flex items-stretch">
              <div className="f1 lg:mr-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Correo electronico:</span>
                  </label>
                  <input type="email" id="email" name="email" placeholder="Ingresa tu email" required className="input input-bordered w-full" {...emailBind} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre(s):</span>
                  </label>
                  <input type="text" id="firstName" name="firstName" placeholder="Ingresa tus nombres" required className="input input-bordered w-full" {...firstNameBind} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apellido(s):</span>
                  </label>
                  <input name="lastName" type="text" placeholder="Ingresa tus apellidos" required className="input input-bordered w-full" {...lastNameBind} />
                </div>
              </div>
              <div className="f2 lg:mr-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tipo de identificación:</span>
                  </label>
                  <div className="flex">
                    <select id="documentType" name="documentType" className="select select-bordered w-full" required value={documentTypeValue} {...documentTypeBind}>
                      <option disabled value="">Seleccione un tipo de identificación</option>
                      {documentsTypeList.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.name}
                        </option>
                      ))}
                    </select>
                    <label className="label">
                      <span className="label-text">Número o ID de identificación:</span>
                    </label>
                    <input name="documentId" type="number" placeholder="Ingresa tu numero de documento" className="input input-bordered w-full" required {...documentIdBind} />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Teléfono:</span>
                  </label>
                  <input name="phone" type="number" placeholder="Ingresa tu numero telefonico" className="input input-bordered w-full" required {...phoneBind} />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Dirección:</span>
                  </label>
                  <input name="address" type="text" placeholder="Ingresa tu dirección de residencia" className="input input-bordered w-full" required {...addressBind} />
                </div>
              </div>
              <div className="f3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contraseña/Password:</span>
                  </label>
                  <input type="password" placeholder="Ingresa tu contraseña" className="input input-bordered w-full" required {...passwordBind} />
                </div>
                <div className="form-control mt-9">
                  <button type="submit" className="btn btn-primary">
                    Registrarme
                  </button>
                  {message.text && (
                    <div className="w-[60%] mx-auto my-2">
                      <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
                    </div>)}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        id="modal_register"
        title="Confirmación de Registro"
        message="¿Está seguro de que desea registrarse con la información proporcionada?"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </div>
  );
};

export default RegisterPage;
