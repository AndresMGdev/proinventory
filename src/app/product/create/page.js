"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import { useInputHook } from "@/hooks/use-input-hook";
import { wordToCapitalize, validateNumber, formatCurrency } from "@/helpers/helpers";

const CreatePage = () => {
    let [product, setProduct] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [formEvent, setFormEvent] = useState(null);
    const [skuValue, setSkuValue] = useState('SKU-');

    const router = useRouter();

    const { value: productNameValue, bind: productNameBind, error: productNameError, setError: setProductNameError } = useInputHook('');
    const { value: productTypeValue, bind: productTypeBind, error: documentTypeError, setError: setProductTypeError } = useInputHook('');
    const { value: quantityValue, bind: quantityBind, error: quantityError, setError: setQuantityError } = useInputHook('');
    const { value: priceValue, bind: priceBind, error: priceError, setError: setPriceError } = useInputHook('');
    const { value: supplierValue, bind: supplierBind, error: supplierError, setError: setSupplierError } = useInputHook('');
    const { value: latitudeValue, bind: latitudeBind, error: latitudeError, setError: setLatitudeError } = useInputHook('');
    const { value: longitudeValue, bind: longitudeBind, error: longitudeError, setError: setLongitudeError } = useInputHook('');

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
        const sku = generateSku();
        setSkuValue(sku);
    }, [productTypeValue, supplierValue]);

    useEffect(() => {
        product && console.log('Producto registrado', product);
    }, [product]);


    const getDataFormMyForm = (event) => {
        const form = event.target;
        event.preventDefault();
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
            setQuantityError('La cantidad debe ser numérico.');
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
        if (latitudeValue == 0) {
            setLatitudeError('La latitud debe ser diferente a cero.');
            valid = false;
        }
        if (longitudeValue == 0) {
            setLongitudeError('La longitud debe ser diferente a cero.');
            valid = false;
        }
        if (form.checkValidity() === false) {
            form.classList.add('was-validated');
            setMessage({ text: 'Por favor, diligencia todos los campos.', type: 'alert alert-error' });
            return;
        }
        if (valid) {

            const newProduct = {
                name: wordToCapitalize(productNameValue),
                product_type: productTypeValue,
                quantity: quantityValue,
                price: priceValue,
                supplier: supplierValue,
                latitude: latitudeValue,
                longitude: longitudeValue,
                sku: skuValue
            };

            setProduct(newProduct);
        }
    };

    const generateSku = () => {
        if (!productTypeValue || !supplierValue) return 'SKU-';

        const productType = productsTypeList.find(item => item.id === parseInt(productTypeValue));
        const productTypeCode = productType ? productType.name.substring(0, 3).toUpperCase() : 'XXX';
        return `${productTypeCode}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}-${supplierValue.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    }

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
        <div className="hero min-h-[85vh] bg-base-200">
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body items-center" onSubmit={handleShowModal} noValidate>
                    <h2 className="card-title">Crear producto</h2>
                    <div className="items-stretch">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Nombre:</span>
                            </label>
                            <input type="text" id="name" name="name" placeholder="Ingresa el nombre del producto" required className="input input-bordered w-full" {...productNameBind} />
                            {productNameError && <span className="text-red-500 text-sm">{productNameError}</span>}
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Tipo de producto:</span>
                            </label>
                            <div className="">
                                <select id="documentType" name="documentType" className="select select-bordered w-full" required value={productTypeValue} {...productTypeBind}>
                                    <option disabled value="">Seleccione un tipo de producto</option>
                                    {productsTypeList.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.name}
                                        </option>
                                    ))}
                                </select>
                                {documentTypeError && <span className="text-red-500 text-sm">{documentTypeError}</span>}
                                <label className="label">
                                    <span className="label-text">Cantidad:</span>
                                </label>
                                <input name="quantity" type="number" placeholder="Ingresa la cantidad del producto" className="input input-bordered w-full" required {...quantityBind} />
                                {quantityError && <span className="text-red-500 text-sm">{quantityError}</span>}
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Precio:</span>
                            </label>
                            <input name="phone" type="number" placeholder="Ingresa el precio del producto" className="input input-bordered w-full" required {...priceBind} />
                            {priceError && <span className="text-red-500 text-sm">{priceError}</span>}
                            <span className="text-sm text-center">{formatCurrency(priceValue)}</span>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Proveedor:</span>
                            </label>
                            <input name="address" type="text" placeholder="Ingresa el proveedor del producto" className="input input-bordered w-full" required {...supplierBind} />
                            {supplierError && <span className="text-red-500 text-sm">{supplierError}</span>}
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Latitud:</span>
                            </label>
                            <input type="text" placeholder="Ingresa la latitud" className="input input-bordered w-full" required {...latitudeBind} />
                            {latitudeError && <span className="text-red-500 text-sm">{latitudeError}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Longitude:</span>
                            </label>
                            <input type="text" placeholder="Ingresa la longitud" className="input input-bordered w-full" required {...longitudeBind} />
                            {longitudeError && <span className="text-red-500 text-sm">{longitudeError}</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">SKU: {skuValue}</span>
                            </label>
                        </div>
                        <div className="form-control mt-9">
                            <button type="submit" className="btn btn-primary">
                                Crear producto
                            </button>
                            {message.text && (
                                <div className="w-[60%] mx-auto my-2">
                                    <div role="alert" className={`pl-[20%] ${message.type}`}>{message.text}</div>
                                </div>)}
                        </div>

                    </div>
                </form>
            </div>

            <Modal
                id="modal_register"
                title="Confirmación de Registro"
                message="¿Está seguro de que deseas registrar este producto?"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </div>
    )
}

export default CreatePage;