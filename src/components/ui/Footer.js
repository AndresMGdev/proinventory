const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="py-6 text-center bg-base-100 z-40 w-full">
            <p>Derechos de Autor &copy; {currentYear}. Todos los derechos reservados.</p>
        </footer>
    );
}

export default Footer;