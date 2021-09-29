import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import DrawerMenu from './DrawerMenu/DrawerMenu';
import Footer from '../../components/Footer';


const DashboardLayout = () => {

    const [open, setOpen] = useState(true);
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    return (
        <>
            <Header
                open={open}
                handleDrawerOpen={handleDrawerOpen}
            />
            <DrawerMenu
                open={open}
                handleDrawerClose={handleDrawerClose}
            />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};

export default DashboardLayout;
