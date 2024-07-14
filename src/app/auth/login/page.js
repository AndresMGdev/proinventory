"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/components/ui/Modal";

const LoginPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("authUser") || "{}");
    if (userData && userData.email) {
      router.push("/product");
    }
  }, [router]);

  const onSubmit = (data) => {
    const userDataJson = localStorage.getItem(data.email);
    if (userDataJson) {
      const userData = JSON.parse(userDataJson);

      if (userData.password === data.password) {
        const modal = document.getElementById("my_modal_4");
        modal.showModal();

        setTimeout(() => {
          const modal = document.getElementById("my_modal_4");
          modal.close();
          localStorage.setItem("authUser", JSON.stringify(userData));
          router.push("/");
        }, 1500);
      } else {
        console.log("Email or Password is not matching with our record 2");
      }
    } else {
      console.log("Email or Password is not matching with our record 1");
    }
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className="card-title">Login / Ingresar</h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>

      <Modal id="my_modal_4" title="¡Has iniciado sesión correctamente!" />
    </>
  );
};
export default LoginPage;
