import Image from "next/image";
import Modal from "../ui/Modal";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useInputHook } from "@/hooks/use-input-hook";

const Profile = ({
  email,
  name,
  lastname,
  identification,
  typeId,
  phone,
  address,
}) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const router = useRouter();
  let { value: passwordOldValue, bind: passwordOldBind } = useInputHook('');
  let { value: passwordNewValue, bind: passwordNewBind } = useInputHook('');
  let { value: passwordVerificationNewValue, bind: passwordVerificationNewBind } = useInputHook('');

  const [userLogged, setUserLogged] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [messageEdit, setMessageEdit] = useState({ text: '', type: '' });
  const [formEvent, setFormEvent] = useState(null);
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("authUser");
    if (storedUserData) {
      setUserLogged(JSON.parse(storedUserData));
    }
  }, []);
  useEffect(() => {
    setValueFirtsName(userLogged.name || '');
    setValuelastname(userLogged.lastname || '');
    setValuetypeId(userLogged.typeId || '');
    setValueAddress(userLogged.address || '');
  }, [userLogged]);

  let { value: nameValue, bind: nameBind, setValue: setValueFirtsName } = useInputHook('');
  let { value: lastnameValue, bind: lastnameBind, setValue: setValuelastname } = useInputHook('');
  let { value: typeIdValue, bind: typeIdBind, setValue: setValuetypeId } = useInputHook('');
  let { value: addressValue, bind: addressBind, setValue: setValueAddress } = useInputHook('');

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
  const handleEditSaveClick = (event) => {
    event.preventDefault();
    const registeredUser = JSON.parse(sessionStorage.getItem(userLogged.email)) || [];

    userLogged.name = nameValue;
    registeredUser.name = nameValue;
    userLogged.lastname = lastnameValue;
    registeredUser.lastname = lastnameValue;
    userLogged.typeId = typeIdValue;
    registeredUser.typeId = typeIdValue;
    userLogged.address = addressValue;
    registeredUser.address = addressValue;
    sessionStorage.setItem(userLogged.email, JSON.stringify(registeredUser));
    sessionStorage.setItem('authUser', JSON.stringify(userLogged));
    setMessageEdit({ text: 'Usuario editado correctamente.', type: 'alert alert-success' });

    setTimeout(() => {
      setMessageEdit({ text: '' })
    }, 3000);
    setIsEditing(false);
  };

  const changePasswordUser = (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessage({ text: 'Por favor, diligencia todos los campos', type: 'alert alert-error' });
      return;
    }
    if (passwordOldValue !== userLogged.password) {
      setMessage({ text: 'La contraseña actual no corresponde con la contraseña anterior.', type: 'alert alert-error' });
      return;
    }
    if (passwordNewValue === passwordVerificationNewValue) {
      if (passwordOldValue === passwordNewValue) {
        setMessage({ text: 'La contraseña nueva no puede ser identica a la actual.', type: 'alert alert-error' });
        return;
      }
    } else {
      setMessage({ text: 'La confirmación de la contraseña y la nueva contraseña no son iguales.', type: 'alert alert-error' });
      return;
    }

    const registeredUser = JSON.parse(sessionStorage.getItem(userLogged.email)) || [];

    registeredUser.password = passwordNewValue;
    registeredUser.confirmPassword = passwordVerificationNewValue;

    sessionStorage.setItem(userLogged.email, JSON.stringify(registeredUser));

    setMessage({ text: 'Contraseña actualizada con éxito', type: 'alert alert-success' });
    sessionStorage.removeItem('authUser');
    setTimeout(() => {
      router.push('/auth/login');
    }, 1000);
  };

  const deleteUserAcount = () => {
    const registeredUser = JSON.parse(sessionStorage.getItem(userLogged.email)) || [];

      registeredUser.isDelete = true;

      sessionStorage.setItem(userLogged.email, JSON.stringify(registeredUser));

      setMessage({ text: 'Cuenta eliminada con éxito', type: 'alert alert-success' });
      sessionStorage.removeItem('authUser');
      setTimeout(() => {
        router.push('/auth/login');
      }, 1000);
  }

  const encodeBase64 = word => {
    let encodedStringBtoA = undefined;
    if (word !== null && word !== undefined && word.length > 0) {
      encodedStringBtoA = btoa(word);
    }
    return encodedStringBtoA;
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200 ">
        <div className="flex rounded-xl w-[50%] bg-base-100 shadow-xl my-4">
          <form noValidate className="w-1/2 p-4" onSubmit={handleEditSaveClick}>
            <h1 className="text-2xl mt-4 font-bold text-center">Información del usuario</h1>
            <div className="m-8">
              <label className="font-bold">Email:</label>
              <label className="ml-2">{userLogged.email}</label>
            </div>
            <div className="m-8">
              <label className="font-bold">Nombres(s):</label>
              {isEditing ? (
                <input type="text" id="name" name="name" placeholder="Ingresa tus nombres" required className="input input-bordered w-full"  {...nameBind} value={nameValue} />
              ) : (
                <label className="ml-2">{userLogged.name}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Apellido(s):</label>
              {isEditing ? (
                <input name="lastname" type="text" placeholder="Ingresa tus apellidos" required className="input input-bordered w-full" {...lastnameBind} value={lastnameValue} />
              ) : (
                <label className="ml-2">{userLogged.lastname}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Tipo de identificación:</label>
              {isEditing ? (
                <select
                id="documentType" name="documentType" className="select select-bordered w-full" required {...typeIdBind} value={typeIdValue}
                >
                  <option disabled value="">
                    Tipo de identificación:
                  </option>
                  <option value="TI">TI</option>
                  <option value="RC">RC</option>
                  <option value="CC">CC</option>
                  <option value="CE">CE</option>
                  <option value="CI">CI</option>
                  <option value="DNI">DNI</option>
                </select>
              ) : (
                <label>{typeId}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Número o Id de identificación:</label>
              <label className="ml-2">{userLogged.identification}</label>
            </div>
            <div className="m-8">
              <label className="font-bold">Teléfono:</label>
              <label className="ml-2">{userLogged.phone}</label>
            </div>
            <div className="m-8">
              <label className="font-bold">Dirección:</label>
              {isEditing ? (
                <input type="text" name="address" placeholder="Ingresa tu dirección de residencia" className="input input-bordered w-full" required {...addressBind} value={addressValue} />
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
            </div>
            <div className="form-control m-8">
              <label className="fw-bold">Contraseña/Password nueva:</label>
              <input type="password" placeholder="Password" className="input input-bordered w-full" required {...passwordNewBind} />
            </div>
            <div className="form-control m-8">
              <label className="fw-bold">Verificación Contraseña/Password nueva:</label>
              <input type="password" placeholder="Password" className="input input-bordered w-full" required {...passwordVerificationNewBind} />
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
          <dialog id="modal_change_password" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Confirmación de cambio de contraseña</h3>
              <p className="py-4">¿Está seguro de que desea cambiar la contraseña?</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-outline mb-4 mr-2" onClick={handleConfirm}>Confirmar</button>
                  <button className="btn btn-error mb-4 ml-2" onClick={handleCancel}>Cancelar</button>
                </form>
              </div>
            </div>
          </dialog>
          <dialog id="modal_delete_acount" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Eliminar cuenta</h3>
              <p className="py-4">¿Está seguro de que desea eliminar su cuenta?</p>
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn btn-outline mb-4 mr-2" onClick={handleConfirmDeleteAcount}>Confirmar</button>
                  <button className="btn btn-error mb-4 ml-2" onClick={handleCancelDeleteAcount}>Cancelar</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>

      </div>
    </>
  );
};

export default Profile;
