import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/RegistroUsuarios">Registro de Usuarios</Link>
          </li>
          <li>
            <Link to="/IniciarSesion">Inicio de sesion</Link>
          </li>
        </ul>
      </nav>
      {/* Aquí se renderizan las rutas anidadas */}
      <Outlet />
    </div>
  );
};

export default Layout;
