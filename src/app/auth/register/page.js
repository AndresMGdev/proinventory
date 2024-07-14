"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    const modal = document.getElementById("my_modal_6");
    modal.showModal();

    localStorage.setItem(data.email, JSON.stringify(data));

    router.push("/auth/login");
  });

  const onConfirm = () => {
    const modal = document.getElementById("my_modal_6");
    modal.close();
  };

  return (
    <>
      <div className="hero min-h-[90vh] bg-base-200">
        <div className="card shrink-0 w-[100%] shadow-2xl bg-base-100">
          <form className="card-body items-center" onSubmit={onSubmit}>
            <h2 className="card-title">Register / Registrarse</h2>
            <div className="lg:flex items-stretch">
              <div className="f1 lg:mr-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="Email"
                    className={`input input-bordered ${
                      errors.email ? "input-error" : ""
                    }`}
                  />
                  {errors.email && (
                    <span className="text-red-500">{`${errors.email.message}`}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Name"
                    className={`input input-bordered ${
                      errors.name ? "input-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <span className="text-red-500">{`${errors.name.message}`}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Lastname</span>
                  </label>
                  <input
                    {...register("lastname", {
                      required: "Lastname is required",
                    })}
                    type="text"
                    placeholder="Lastname"
                    className={`input input-bordered ${
                      errors.lastname ? "input-error" : ""
                    }`}
                  />
                  {errors.lastname && (
                    <span className="text-red-500">{`${errors.lastname.message}`}</span>
                  )}
                </div>
              </div>
              <div className="f2 lg:mr-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">ID</span>
                  </label>
                  <div className="flex">
                    <select
                      {...register("typeId", {
                        required: {
                          value: true,
                          message: "Type ID is required",
                        },
                      })}
                      className={`select select-bordered w-auto ${
                        errors.typeId ? "select-error" : ""
                      }`}
                    >
                      <option disabled value="">
                        Type
                      </option>
                      <option value="TI">TI</option>
                      <option value="RC">RC</option>
                      <option value="CC">CC</option>
                      <option value="CE">CE</option>
                      <option value="CI">CI</option>
                      <option value="DNI">DNI</option>
                    </select>
                    <input
                      {...register("identification", {
                        required: "ID Number is required",
                      })}
                      type="text"
                      placeholder="ID Number"
                      className={`input input-bordered ml-2 ${
                        errors.identification ? "input-error" : ""
                      }`}
                    />
                  </div>
                  <div className="flex">
                    {errors.typeId && (
                      <span className="text-red-500">{`${errors.typeId.message}`}</span>
                    )}
                    {errors.identification && (
                      <span className="text-red-500">
                        -{`${errors.identification.message}`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Number Phone</span>
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone Number is required",
                    })}
                    type="text"
                    placeholder="Phone Number"
                    className={`input input-bordered ${
                      errors.phone ? "input-error" : ""
                    }`}
                  />
                  {errors.phone && (
                    <span className="text-red-500">{`${errors.phone.message}`}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Address</span>
                  </label>
                  <input
                    {...register("address", {
                      required: "Address is required",
                    })}
                    type="text"
                    placeholder="Address"
                    className={`input input-bordered ${
                      errors.address ? "input-error" : ""
                    }`}
                  />
                  {errors.address && (
                    <span className="text-red-500">{`${errors.address.message}`}</span>
                  )}
                </div>
              </div>
              <div className="f3">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must have at least 8 characters",
                      },
                    })}
                    type="password"
                    placeholder="Password"
                    className={`input input-bordered ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                  {errors.password && (
                    <span className="text-red-500">{`${errors.password.message}`}</span>
                  )}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type="password"
                    placeholder="Confirm Password"
                    className={`input input-bordered ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
                  )}
                </div>
                <div className="form-control mt-9">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Modal
        id="my_modal_6"
        title="¡Te has registrado con éxito!"
        onConfirm={onConfirm}
      />
    </>
  );
};

export default RegisterPage;
