// components/SidebarLeft.js
import styles from '../styles/Sidebar.module.css';
import menuData from "../data/menu";
import dynamic from 'next/dynamic';

const loadComponent = (componentName) => {
    return dynamic(() => import(`../pages/${componentName}.js`), {
        loading: () => <div>Loading...</div>,
        ssr: false, // 클라이언트에서만 로드
    });

};

const SidebarLeft = ({setCurrentComponent, openMenus, setOpenMenus}) => {
    const toggleMenu = (title) => {
        setOpenMenus((prev) => ({
            ...prev, [title]: !prev[title]
        }));
    };

    const menuClick = (item) => {
        if(item.children && item.children.length > 0) {
            toggleMenu(item.title);
        } else {
            openMenu(item);
        }
    };

    const openMenu = (item) => {
        const Component = loadComponent(item.link);
        setCurrentComponent(<Component />);
    };

    const renderMenuNode = (item, level) => (
        <div key={item.id}>
            <div className={styles.menuItem}>
                <span className={styles[`level-${level}`]} onClick={() => menuClick(item)}>
                    {item.children ? (openMenus[item.title] ? '▲' : '▼') : null} {item.title}
                </span>
            </div>
            {item.children && openMenus[item.title] && renderMenu(item.children, level + 1)}
        </div>
    );

    const renderMenu = (menu, level = 0) => {
        return (
            <div className={styles.menuList}>
                {menu.map((item) => renderMenuNode(item, level))}
            </div>
        );
    };

    return (
        <aside className={styles.sidebar}>
            {renderMenu(menuData)}
        </aside>
    );
};

export default SidebarLeft;