"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useInputHook } from "@/hooks/use-input-hook";
import { useForm } from "react-hook-form";
import { createUserService } from "@/services/users";
import { wordToCapitalize, validateEmail, validateNumber } from "@/helpers/helpers";

const RegisterPage = () => {
  let [user, setUser] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formEvent, setFormEvent] = useState(null);

  const router = useRouter();

  const documentsTypeList = [
    { id: 1, name: 'Cédula de Ciudadanía (CC)', },
    { id: 2, name: 'Tarjeta de Identidad (TI)' },
    { id: 3, name: 'Registro Civil (RC)' },
    { id: 4, name: 'Cédula de Extranjería (CE)' },
    { id: 5, name: 'Carnét de Identidad (CI)' },
    { id: 6, name: 'Documento Nacional de Identidad (DNI)' }
  ];


  const { value: emailValue, bind: emailBind, error: emailError, setError: setEmailError } = useInputHook('');
  const { value: firstNameValue, bind: firstNameBind, error: firstNameError, setError: setFirstNameError } = useInputHook('');
  const { value: lastNameValue, bind: lastNameBind, error: lastNameError, setError: setLastNameError } = useInputHook('');
  const { value: documentTypeValue, bind: documentTypeBind, error: documentTypeError, setError: setDocumentTypeError } = useInputHook('');
  const { value: documentIdValue, bind: documentIdBind, error: documentIdError, setError: setDocumentIdError } = useInputHook('');
  const { value: phoneValue, bind: phoneBind, error: phoneError, setError: setPhoneError } = useInputHook('');
  const { value: addressValue, bind: addressBind, error: addressError, setError: setAddressError } = useInputHook('');
  const { value: passwordValue, bind: passwordBind, error: passwordError, setError: setPasswordError } = useInputHook('');

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
    let valid = true;
    if (!validateEmail(emailValue)) {
      setEmailError('El correo electrónico no es válido.');
      valid = false;
    }

    if (firstNameValue.length < 4) {
      setFirstNameError('El nombre debe tener al menos 4 caracteres.');
      valid = false;
    }

    if (lastNameValue.length < 4) {
      setLastNameError('El apellido debe tener al menos 4 caracteres.');
      valid = false;
    }

    if (!documentTypeValue) {
      setDocumentTypeError('El tipo de identificación es requerido.');
      valid = false;
    }

    if (!validateNumber(documentIdValue)) {
      setDocumentIdError('El número de documento debe ser numérico.');
      valid = false;
    }

    if (documentIdValue.length < 6 || documentIdValue.length > 10) {
      setDocumentIdError('El número de documento debe tener entre 6 y 10 caracteres.');
      valid = false;
    }

    if (!validateNumber(phoneValue)) {
      setPhoneError('El teléfono debe ser numérico.');
      valid = false;
    }
    if (phoneValue.length !== 10) {
      setPhoneError('El teléfono debe tener 10 caracteres.');
      valid = false;
    }

    if (addressValue.length < 5) {
      setAddressError('La dirección debe tener al menos 5 caracteres.');
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
    if (valid) {

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
    }
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
    <div className="w-[100%]">
      <div className="hero min-h-[85vh] bg-base-200">
        <div className="card shrink-0 w-[100%] shadow-2xl bg-base-100">
          <form className="card-body items-center" onSubmit={handleShowModal} noValidate>
            <h2 className="card-title">Registrarse</h2>
            <div className="lg:flex items-stretch">
              <div className="lg:mr-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Correo electronico:</span>
                  </label>
                  <input type="email" id="email" name="email" placeholder="Ingresa tu email" required className="input input-bordered w-full" {...emailBind} />
                  {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nombre(s):</span>
                  </label>
                  <input type="text" id="firstName" name="firstName" placeholder="Ingresa tus nombres" required className="input input-bordered w-full" {...firstNameBind} />
                  {firstNameError && <span className="text-red-500 text-sm">{firstNameError}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Apellido(s):</span>
                  </label>
                  <input name="lastName" type="text" placeholder="Ingresa tus apellidos" required className="input input-bordered w-full" {...lastNameBind} />
                  {lastNameError && <span className="text-red-500 text-sm">{lastNameError}</span>}
                </div>
              </div>
              <div className="lg:mr-2">
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
                    {documentTypeError && <span className="text-red-500 text-sm">{documentTypeError}</span>}
                    <label className="label">
                      <span className="label-text">Número o ID de identificación:</span>
                    </label>
                    <input name="documentId" type="number" placeholder="Ingresa tu numero de documento" className="input input-bordered w-full" required {...documentIdBind} />
                    {documentIdError && <span className="text-red-500 text-sm">{documentIdError}</span>}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Teléfono:</span>
                  </label>
                  <input name="phone" type="number" placeholder="Ingresa tu numero telefonico" className="input input-bordered w-full" required {...phoneBind} />
                  {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Dirección:</span>
                  </label>
                  <input name="address" type="text" placeholder="Ingresa tu dirección de residencia" className="input input-bordered w-full" required {...addressBind} />
                  {addressError && <span className="text-red-500 text-sm">{addressError}</span>}
                </div>
              </div>
              <div className="">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Contraseña/Password:</span>
                  </label>
                  <input type="password" placeholder="Ingresa tu contraseña" className="input input-bordered w-full" required {...passwordBind} />
                  {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
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
