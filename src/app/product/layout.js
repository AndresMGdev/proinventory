import { MenuProduct } from "@/components/product/MenuProduct";


export default function Layout({ children }) {
  return (
    <>
      {children}
      <MenuProduct />
    </>
  );
}