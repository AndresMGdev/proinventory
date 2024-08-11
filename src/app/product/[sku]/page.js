'use client';
import { getProductBySkuService, updateProductService, deleteProductService } from "@/services/products";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateTokenExp, formatCurrency, validateNumber, wordToCapitalize, validateNegativeAndPositiveNumber } from "@/helpers/helpers";
import Modal from "@/components/ui/Modal";
import { useInputHook } from "@/hooks/use-input-hook";

const ProductPage = (props) => {
  let [productEdited, setProductEdited] = useState(null);

  const [product, setProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formEvent, setFormEvent] = useState(null);
  const [messageEdit, setMessageEdit] = useState({ text: '', type: '' });
  const [message, setMessage] = useState({ text: '', type: '' });

  const router = useRouter();

  const { value: productNameValue, bind: productNameBind, setValue: setValueName, error: productNameError, setError: setProductNameError } = useInputHook('');
  const { value: productTypeValue, bind: productTypeBind, setValue: setValueProductType, error: productTypeError, setError: setProductTypeError } = useInputHook('');
  const { value: quantityValue, bind: quantityBind, setValue: setValueQuantity, error: quantityError, setError: setQuantityError } = useInputHook('');
  const { value: priceValue, bind: priceBind, setValue: setValuePrice, error: priceError, setError: setPriceError } = useInputHook('');
  const { value: supplierValue, bind: supplierBind, setValue: setValueSupplier, error: supplierError, setError: setSupplierError } = useInputHook('');
  const { value: latitudeValue, bind: latitudeBind, setValue: setValueLatitude, error: latitudeError, setError: setLatitudeError } = useInputHook('');
  const { value: longitudeValue, bind: longitudeBind, setValue: setValueLongitude, error: longitudeError, setError: setLongitudeError } = useInputHook('');

  const productsTypeList = [
    { id: 1, name: 'Electrónica', },
    { id: 2, name: 'Ropa' },
    { id: 3, name: 'Alimentos' },
    { id: 4, name: 'Muebles' },
    { id: 5, name: 'Libros' },
    { id: 6, name: 'Juguetes' },
    { id: 7, name: 'Automotriz' },
    { id: 8, name: 'Deportes' }
  ];

  useEffect(() => {
    const tokenIsValid = validateTokenExp(sessionStorage.getItem('userToken'))
    if (tokenIsValid) {
      product && getProductBySku();
    } else {
      setTimeout(() => {
        sessionStorage.removeItem('userToken');
        router.push('/options');
      }, 1000);
    }
  }, []);


  useEffect(() => {
    setValueName(product.name || '');
    setValueProductType(product.product_type || '');
    setValueQuantity(product.quantity || '');
    setValuePrice(product.price || '');
    setValueSupplier(product.supplier);
    setValueLatitude(product.latitude);
    setValueLongitude(product.longitude);
  }, [product]);

  useEffect(() => {
    productEdited && updateProduct();
  }, [productEdited]);

  const getProductBySku = async () => {
    getProductBySkuService(props.params.sku, sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          setProduct(response.data.data);
        }
      })
      .catch(err=> {
        setMessageEdit({ text: err.response.data, type: 'alert alert-error'})
        setTimeout(() => {
          router.push('/product');
        }, 1000);
        
      });
  };

  const updateProduct = () => {
    updateProductService(product.sku, productEdited, sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          setMessageEdit({ text: response.data.message, type: 'alert alert-success' });

          setTimeout(() => {
            setMessageEdit({ text: '' })
          }, 3000);
          setIsEditing(false);
          getProductBySku();
        }
      })
      .catch(err => {
        setMessageEdit({ text: err.response.data, type: 'alert alert-error' });
        setTimeout(() => {
          setMessageEdit({ text: '' })
        }, 3000);
      })
  }

  const handleEditSaveClick = (event) => {
    event.preventDefault();
    const form = event.target;
    let valid = true;

    if (productNameValue.length < 4) {
      setProductNameError('El nombre del producto debe tener al menos 4 caracteres.');
      valid = false;
    }
    if (!productTypeValue) {
      setProductTypeError('El tipo de producto es requerido.');
      valid = false;
    }

    if (!validateNumber(quantityValue)) {
      setQuantityError('La cantidad debe ser numérica y positiva.');
      valid = false;
    }
    if (quantityValue <= 0) {
      setQuantityError('La cantidad debe ser superior a cero.');
      valid = false;
    }

    if (priceValue <= 0) {
      setPriceError('El precio debe ser mayor a cero.');
      valid = false;
    }

    if (supplierValue.length < 4) {
      setSupplierError('El proveedor debe tener al menos 4 caracteres.');
      valid = false;
    }
    if (!validateNegativeAndPositiveNumber(latitudeValue)) {
      setLatitudeError('La latitud debe ser numerico.');
      valid = false;
    }
    if (latitudeValue == 0) {
      setLatitudeError('La latitud debe ser diferente a cero.');
      valid = false;
    }
    if (!validateNegativeAndPositiveNumber(longitudeValue)) {
      setLongitudeError('La longitud debe ser numerico.');
      valid = false;
    }
    if (longitudeValue == 0) {
      setLongitudeError('La longitud debe ser diferente a cero.');
      valid = false;
    }
    if (form.checkValidity() === false) {
      form.classList.add('was-validated');
      setMessageEdit({ text: 'Por favor, diligencia todos los campos.', type: 'alert alert-error' });
      return;
    }
    if (valid) {

      const productEdited = {
        name: wordToCapitalize(productNameValue),
        product_type: productTypeValue,
        quantity: quantityValue,
        price: priceValue,
        supplier: supplierValue,
        latitude: latitudeValue,
        longitude: longitudeValue
      };
      setProductEdited(productEdited);
    }
  };

  const deleteProduct = () => {
    deleteProductService(product.sku, sessionStorage.getItem('userToken'))
      .then(response => {
        if (response) {
          setMessage({ text: 'Producto eliminado con éxito', type: 'alert alert-success' });
          setTimeout(() => {
            router.push('/product');
          }, 3000);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  const handleEditClick = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const handleEditCancelClick = (event) => {
    event.preventDefault();
    setIsEditing(false);
  };

  const onConfirm = () => {
    document.getElementById('modal_product_edit').close();
    if (formEvent) {
      getDataFormMyForm(formEvent);
    }
  };
  const onCancel = () => {
    document.getElementById('modal_product_edit').close();
    setMessage({ text: 'Edicición cancelada.', type: 'alert alert-warning' });
  }

  const handleShowModalDeleteAcount = (event) => {
    event.preventDefault();
    setFormEvent(event);
    document.getElementById('modal_delete_product').showModal();
  };


  const handleConfirmDeleteProduct = () => {
    document.getElementById('modal_delete_product').close();
    if (formEvent) {
      deleteProduct();
    }
  };

  const handleCancelDeleteProduct = () => {
    document.getElementById('modal_delete_product').close();
    setMessage({ text: 'Eliminación de producto cancelada.', type: 'alert alert-warning' });
    setTimeout(() => {
      setMessage({ text: '' })
    }, 3000);
  };
  return (
    <div className="hero min-h-[85vh] bg-base-200">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body items-center" onSubmit={handleEditSaveClick} noValidate>
          <h2 className="card-title">Detalle producto</h2>
          <div className="items-stretch">

            <div className="m-8">
              <label className="font-bold">Nombre: </label>
              {isEditing ? (
                <>
                  <input type="text" id="name" name="name" placeholder="Ingresa el nombre del producto" required className="input input-bordered w-full"  {...productNameBind} value={productNameValue} />
                  {productNameError && <span className="text-red-500 text-sm">{productNameError}</span>}
                </>
              ) : (
                <label className="ml-2">{product.name}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Tipo de producto: </label>
              {isEditing ? (
                <>
                  <select id="documentType" name="documentType" className="select select-bordered w-full" required  {...productTypeBind} value={productTypeValue}>
                    <option disabled value="">Seleccione un tipo de producto</option>
                    {productsTypeList.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name}
                      </option>
                    ))}
                  </select>
                  {productTypeError && <span className="text-red-500 text-sm">{productTypeError}</span>}
                </>
              ) : (
                <label className="ml-2">{productsTypeList.find(productType => productType.id == product.product_type)?.name || 'No disponible'}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Cantidad: </label>
              {isEditing ? (
                <>
                  <input name="quantity" type="number" placeholder="Ingresa la cantidad del producto" className="input input-bordered w-full" required {...quantityBind} value={quantityValue} />
                  {quantityError && <span className="text-red-500 text-sm">{quantityError}</span>}
                </>
              ) : (
                <label className="ml-2">{product.quantity}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Precio: </label>
              {isEditing ? (
                <>
                  <input name="phone" type="number" placeholder="Ingresa el precio del producto" className="input input-bordered w-full" required {...priceBind} value={priceValue} />
                  {priceError && <span className="text-red-500 text-sm">{priceError}</span>}
                  <span className="text-sm text-center">{formatCurrency(priceValue)}</span>
                </>
              ) : (
                <label className="ml-2">{formatCurrency(product.price)}</label>
              )}

            </div>
            <div className="m-8">
              <label className="font-bold">Proveedor: </label>

              {isEditing ? (
                <>
                  <input name="address" type="text" placeholder="Ingresa el proveedor del producto" className="input input-bordered w-full" required {...supplierBind} value={supplierValue} />
                  {supplierError && <span className="text-red-500 text-sm">{supplierError}</span>}
                </>
              ) : (
                <label className="ml-2">{product.supplier}</label>
              )}
            </div>
            <div className="m-8">
              <label className="font-bold">Latitud: </label>
              {isEditing ? (
                <>
                  <input type="number" placeholder="Ingresa la latitud" className="input input-bordered w-full" required {...latitudeBind} value={latitudeValue} />
                  {latitudeError && <span className="text-red-500 text-sm">{latitudeError}</span>}
                </>
              ) : (
                <label className="ml-2">{product.latitude}</label>
              )}

            </div>
            <div className="m-8">
              <label className="font-bold">Longitude: </label>
              {isEditing ? (
                <>
                  <input type="number" placeholder="Ingresa la longitud" className="input input-bordered w-full" required {...longitudeBind} value={longitudeValue} />
                  {longitudeError && <span className="text-red-500 text-sm">{longitudeError}</span>}
                </>
              ) : (
                <label className="ml-2">{product.longitude}</label>
              )}

            </div>
            <div className="m-8">
              <label className=" font-bold"> SKU: </label>
              <label className="ml-2"> {product.sku}</label>
            </div>
            {messageEdit.text && (
              <div className="w-[60%] mx-auto my-2">
                <div role="alert" className={`pl-[20%] ${messageEdit.type}`}>{messageEdit.text}</div>
              </div>)}
            <div className="form-control mt-9 text-center">
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
                <>
                  <div className="form-control mt-9 text-center">
                    <button onClick={handleEditClick} className="btn btn-active btn-accent mb-2">
                      Editar
                    </button>
                    <button onClick={handleShowModalDeleteAcount} className="btn btn-error mt-2">
                      Eliminar producto
                    </button>
                  </div>
                  {message.text && (
                    <div className="w-[60%] mx-auto my-2">
                      <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
                    </div>)}
                </>
              )}
            </div>

          </div>
        </form>
      </div >
      <Modal
        id="modal_delete_product"
        title="Confirmación de eliminación de producto"
        message="¿Está seguro de que desea eliminar este producto?"
        onConfirm={handleConfirmDeleteProduct}
        onCancel={handleCancelDeleteProduct}
      />
    </div >
  );
};

export default ProductPage;
