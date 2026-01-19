import NavBar from '@/widgets/NavBAr/NavBar';
import { Outlet } from 'react-router';
import './Layout.css';

function Layout(): React.JSX.Element {
  return (
    <div className="app-layout">
      <NavBar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
