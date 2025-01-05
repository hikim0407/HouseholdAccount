import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SidebarLeft from '../components/SidebarLeft';
import MainContent from '../components/MainContent';
import Board from '../components/Board';
import styles from '../styles/Home.module.css';

const Home = () => {
    const [currentComponent, setCurrentComponent] = useState();
    const [openMenus, setOpenMenus] = useState({});

    useEffect(() => {
    }, [openMenus]);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.container}>
                <Header />
                <main className={styles.main}>
                    <SidebarLeft 
                        setCurrentComponent={setCurrentComponent} 
                        openMenus={openMenus} 
                        setOpenMenus={setOpenMenus}
                    />
                    <MainContent currentComponent={currentComponent} />
                </main>
                <Footer />
            </div>
        </DndProvider>
    );
};

export default Home;
