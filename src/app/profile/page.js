"use client";

import { useState, useEffect } from "react";
import { useInputHook } from "@/hooks/use-input-hook";

import { useRouter } from "next/navigation";

import { getUserByEmailService, updateUserPasswordService, updateUserService, deleteUserService } from "@/services/users";
import { validateTokenExp, getEmailUserLogged, wordToCapitalize, validateNumber } from "@/helpers/helpers";
import Modal from "@/components/ui/Modal";

const ProfilePage = () => {

  const [documentsTypeList] = useState([
    { id: 1, name: 'Cédula de Ciudadanía (CC)' },
    { id: 2, name: 'Tarjeta de Identidad (TI)' },
    { id: 3, name: 'Registro Civil (RC)' },
    { id: 4, name: 'Cédula de Extranjería (CE)' },
    { id: 5, name: 'Carnét de Identidad (CI)' },
    { id: 6, name: 'Documento Nacional de Identidad (DNI)' }
  ]);

  let [user, setUser] = useState(null);
  let [password, setPassword] = useState(null);

  const router = useRouter();

  const [userLogged, setUserLogged] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [messageEdit, setMessageEdit] = useState({ text: '', type: '' });
  const [formEvent, setFormEvent] = useState(null);



  let { value: nameValue, bind: nameBind, setValue: setValueFirtsName, error: nameError, setError: setNameError } = useInputHook('');
  let { value: lastnameValue, bind: lastnameBind, setValue: setValuelastname, error: lastNameError, setError: setLastNameError } = useInputHook('');
  let { value: phoneValue, bind: phoneBind, setValue: setValuePhone, error: phoneError, setError: setPhoneError } = useInputHook('');
  let { value: addressValue, bind: addressBind, setValue: setValueAddress, error: addressError, setError: setAddressError } = useInputHook('');

  let { value: passwordOldValue, bind: passwordOldBind, error: passwordOldError, setError: setPasswordOldError } = useInputHook('');
  let { value: passwordNewValue, bind: passwordNewBind, error: passwordNewError, setError: setPasswordNewError } = useInputHook('');
  let { value: passwordVerificationNewValue, bind: passwordVerificationNewBind, error: passwordVerificationNewError, setError: setPasswordVerificationNewError } = useInputHook('');

  useEffect(() => {
    const tokenIsValid = validateTokenExp(sessionStorage.getItem('userToken'))
    if (tokenIsValid) {
      userLogged && getUserByEmail();
    } else {
      setTimeout(() => {
        sessionStorage.removeItem('userToken');
        router.push('/options');
      }, 1000);
    }
  }, []);

  useEffect(() => {
    setValueFirtsName(userLogged.first_name || '');
    setValuelastname(userLogged.last_name || '');
    setValuePhone(userLogged.phone || '');
    setValueAddress(userLogged.address || '');
  }, [userLogged]);

  useEffect(() => {
    user && updateUser();
  }, [user]);

  useEffect(() => {
    password && updateUserPassword();
  }, [password]);



  const updateUser = () => {
    updateUserService(getEmailUserLogged(sessionStorage.getItem('userToken')), user, sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          setMessageEdit({ text: response.data.message, type: 'alert alert-success' });

          setTimeout(() => {
            setMessageEdit({ text: '' })
          }, 3000);
          setIsEditing(false);
          getUserByEmail();
        }
      })
      .catch(err => {
        setMessageEdit({ text: err.response.data, type: 'alert alert-error' });
        setTimeout(() => {
          setMessageEdit({ text: '' })
        }, 3000);
      })
  }

  const deleteUser = () => {
    deleteUserService(getEmailUserLogged(sessionStorage.getItem('userToken')), sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          sessionStorage.removeItem('userToken');
          setMessage({ text: 'Cuenta eliminada con éxito', type: 'alert alert-success' });
          setTimeout(() => {
            sessionStorage.removeItem('userToken');
            router.push('/options');
          }, 3000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const updateUserPassword = () => {
    updateUserPasswordService(getEmailUserLogged(sessionStorage.getItem('userToken')), password, sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          setMessage({ text: response.data.message, type: 'alert alert-success' });
          sessionStorage.removeItem('userToken');
          setMessage({ text: 'Contraseña actualizada con éxito', type: 'alert alert-success' });
          setTimeout(() => {
            sessionStorage.removeItem('userToken');
            router.push('/options');
          }, 3000);
        }
      })
      .catch(err => {
        setMessage({ text: err.response.data, type: 'alert alert-error' });
        setTimeout(() => {
          setMessage({ text: '' })
        }, 3000);
      })
  }

  const getUserByEmail = () => {
    const email = getEmailUserLogged(sessionStorage.getItem('userToken'))
    getUserByEmailService(email, sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          setUserLogged(response.data.data);
        }
      })
      .catch(error => console.log(error));
  }



  const handleShowModal = (event) => {
    event.preventDefault();
    setFormEvent(event);
    document.getElementById('modal_change_password').showModal();
  };

  const handleConfirm = () => {
    document.getElementById('modal_change_password').close();
    if (formEvent) {
      changePasswordUser(formEvent);
      setTimeout(() => {
        setMessage({ text: '' })
      }, 3000);
    }
  };

  const handleCancel = () => {
    document.getElementById('modal_change_password').close();
    setMessage({ text: 'Cambio de contraseña cancelado.', type: 'alert alert-warning' });
    setTimeout(() => {
      setMessage({ text: '' })
    }, 3000);
  };

  const handleEditSaveClick = (event) => {
    event.preventDefault();
    const form = event.target;

    let valid = true;

    if (nameValue.length < 4) {
      setNameError('El nombre debe tener al menos 4 caracteres.');
      valid = false;
    }

    if (lastnameValue.length < 4) {
      setLastNameError('El apellido debe tener al menos 4 caracteres.');
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
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessageEdit({ text: 'Por favor, diligencia todos los campos.', type: 'alert alert-error' });
      setTimeout(() => {
        setMessageEdit({ text: '' })
      }, 3000);
      return;
    }
    if (valid) {
      const userEdited = {
        first_name: wordToCapitalize(nameValue),
        last_name: wordToCapitalize(lastnameValue),
        phone: phoneValue,
        address: addressValue
      };
      setUser(userEdited)
    }
  };



  const handleShowModalDeleteAcount = (event) => {
    event.preventDefault();
    setFormEvent(event);
    document.getElementById('modal_delete_acount').showModal();
  };

  const handleConfirmDeleteAcount = () => {
    document.getElementById('modal_delete_acount').close();
    if (formEvent) {
      deleteUserAcount();
    }
  };

  const handleCancelDeleteAcount = () => {
    document.getElementById('modal_delete_acount').close();
    setMessage({ text: 'Eliminación de cuenta cancelada.', type: 'alert alert-warning' });
    setTimeout(() => {
      setMessage({ text: '' })
    }, 3000);
  };

  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleEditCancelClick = () => {
    setIsEditing(false);
  };


  const changePasswordUser = (event) => {
    event.preventDefault();
    const form = event.target;

    let valid = true;
    if (passwordNewValue.length < 8) {
      setPasswordNewError('La nueva contraseña debe tener al menos 8 caracteres.');
      valid = false;
    }
    if (passwordVerificationNewValue.length < 8) {
      setPasswordVerificationNewError('La confirmación de la nueva contraseña debe tener al menos 8 caracteres.');
      valid = false;
    }
    if (passwordOldValue.length < 8) {
      setPasswordOldError('La contraseña anterior debe tener al menos 8 caracteres.');
      valid = false;
    }
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessage({ text: 'Por favor, diligencia todos los campos', type: 'alert alert-error' });
      return;
    }

    if (passwordNewValue !== passwordVerificationNewValue) {
      setMessage({ text: 'La confirmación de la contraseña y la nueva contraseña no son iguales.', type: 'alert alert-error' });
      return;
    }
    if (valid) {
      const userPasswordEdited = {
        passwordOld: passwordOldValue,
        passwordNew: passwordNewValue,

      };
      setPassword(userPasswordEdited);
    }



  };

  const deleteUserAcount = () => {
    deleteUser();
  }

  return (
    <>
      <div className="hero min-h-[85vh] bg-base-200 ">
        <div className="flex rounded-xl w-[60%] bg-base-100 shadow-xl my-4">
          <form noValidate className="w-1/2 p-4" onSubmit={handleEditSaveClick}>
            <h1 className="text-2xl mt-4 font-bold text-center">Información del usuario</h1>
            <div className="m-8">
              <label className="font-bold">Email:</label>
              <label className="ml-2">{userLogged.email}</label>
            </div>
            <div className="m-8">
              <label className="font-bold">Nombres(s):</label>
              {isEditing ? (
                <>
                  <input type="text" id="name" name="name" placeholder="Ingresa tus nombres" required className="input input-bordered w-full"  {...nameBind} value={nameValue} />
                  {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
                </>
              ) : (
                <label className="ml-2">{userLogged.first_name}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Apellido(s):</label>
              {isEditing ? (
                <>
                  <input name="lastname" type="text" placeholder="Ingresa tus apellidos" required className="input input-bordered w-full" {...lastnameBind} value={lastnameValue} />
                  {lastNameError && <span className="text-red-500 text-sm">{lastNameError}</span>}
                </>
              ) : (
                <label className="ml-2">{userLogged.last_name}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Tipo de identificación:</label>
              <label>{documentsTypeList.find(documentType => documentType.id == userLogged.document_type)?.name || 'No disponible'}</label>
            </div>
            <div className="m-8">
              <label className="font-bold">Número o Id de identificación:</label>
              <label className="ml-2">{userLogged.document_id}</label>
            </div>
            <div className="m-8">
              <label className="font-bold">Teléfono:</label>
              {isEditing ? (
                <>
                  <input type="number" name="phone" placeholder="Ingresa tu numero telefonico" className="input input-bordered w-full" required {...phoneBind} value={phoneValue} />
                  {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
                </>
              ) : (
                <label className="ml-2">{userLogged.phone}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Dirección:</label>
              {isEditing ? (
                <>
                  <input type="text" name="address" placeholder="Ingresa tu dirección de residencia" className="input input-bordered w-full" required {...addressBind} value={addressValue} />
                  {addressError && <span className="text-red-500 text-sm">{addressError}</span>}
                </>
              ) : (
                <label className="ml-2">{userLogged.address}</label>
              )}
            </div>
            <div className="m-8 text-center">
              {isEditing ? (
                <div>
                  <button type="submit" className="btn btn-active btn-accent mr-4">
                    Guardar
                  </button>
                  <button onClick={handleEditCancelClick} className="btn btn-error">
                    Cancelar
                  </button>
                </div>


              ) : (
                <button onClick={handleEditClick} className="btn btn-active btn-accent">
                  Editar
                </button>
              )}
            </div>
            {messageEdit.text && (
              <div className="w-[60%] mx-auto my-2">
                <div role="alert" className={`pl-[20%] ${messageEdit.type}`}>{messageEdit.text}</div>
              </div>)}
          </form>

          <form className="w-2/2 p-4 " onSubmit={handleShowModal} noValidate>
            <h2 className="text-2xl mt-4 font-bold text-center"> Cambio de contraseña</h2>
            <div className="form-control m-8">
              <label className="fw-bold">Contraseña/Password anterior:</label>
              <input type="password" placeholder="Password" className="input input-bordered w-full" required {...passwordOldBind} />
              {passwordOldError && <span className="text-red-500 text-sm">{passwordOldError}</span>}
            </div>
            <div className="form-control m-8">
              <label className="fw-bold">Contraseña/Password nueva:</label>
              <input type="password" placeholder="Password" className="input input-bordered w-full" required {...passwordNewBind} />
              {passwordNewError && <span className="text-red-500 text-sm">{passwordNewError}</span>}
            </div>
            <div className="form-control m-8">
              <label className="fw-bold">Verificación Contraseña/Password nueva:</label>
              <input type="password" placeholder="Password" className="input input-bordered w-full" required {...passwordVerificationNewBind} />
              {passwordVerificationNewError && <span className="text-red-500 text-sm">{passwordVerificationNewError}</span>}
            </div>
            <div className="align-items-center text-center">
              <button className="btn btn-outline mb-2" type="submit">
                Cambiar contraseña
              </button>
            </div>

            <div className=" p-2  w-auto align-items-center text-center">
              <button className="btn btn-error mb-4" onClick={handleShowModalDeleteAcount}>
                Eliminar cuenta
              </button>
            </div>
            {message.text && (
              <div className="w-[60%] mx-auto my-2">
                <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
              </div>)}
          </form>
          <Modal
            id="modal_change_password"
            title="Confirmación de cambio de contraseña"
            message="¿Está seguro de que desea cambiar la contraseña?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />

          <Modal
            id="modal_delete_acount"
            title="Confirmación de eliminación de cuenta"
            message="¿Está seguro de que desea eliminar su cuenta?"
            onConfirm={handleConfirmDeleteAcount}
            onCancel={handleCancelDeleteAcount}
          />
        </div>

      </div>
    </>
  );
};

export default ProfilePage;
