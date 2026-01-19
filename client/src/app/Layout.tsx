import NavBar from '@/widgets/NavBAr/NavBar';
import { Outlet } from 'react-router';

function Layout(): React.JSX.Element {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
}

export default Layout;
