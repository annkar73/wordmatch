import { NavLink, Outlet } from "react-router-dom";

const Layout = () => (
    <>
    <header>
        <nav>
            <NavLink to='/'>Hem</NavLink>
            <NavLink to='/matching-game'>Ordmatchning</NavLink>
            <NavLink to='/classic-memory'>Klassiskt memory</NavLink>
            <NavLink to='/manual'>Manual / FAQ</NavLink>
        </nav>
    </header>
    <main>
        <Outlet />
    </main>
    </>
);

export default Layout;