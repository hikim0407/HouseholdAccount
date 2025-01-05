import { useState, useEffect } from "react";
import styles from "./Layout.module.css";
import TreeMenu from "./TreeMenu";
import menuData from "../data/menu";
import dynamic from "next/dynamic";

export default function Layout({children}) {
    const [windows, setWindows] = useState([]); // 열린 윈도우들을 관리
    const [activeWindow, setActiveWindow] = useState(null);
    const [mainDimensions, setMainDimensions] = useState({width: 0,height: 0});

    const handleMenuClick = (item) => {
        const existingWindow = windows.find((win) => win.link === item.link);
        if (existingWindow) {
            // 이미 열려 있는 윈도우가 있으면 해당 윈도우 활성화
            setActiveWindow(existingWindow.link);
        } else {
            // 새로운 윈도우 열기
            const DynamicComponent = dynamic(() => import(`../pages/${item.link}.js`), {
                loading: () => <p>로딩 중...</p>,
            });
            const newWindow = {
                link: item.link,
                title: item.title,
                component: DynamicComponent,
                isMaximized: false, // 최대화 상태
                position: { top: 50, left: 50 }, // 기본 위치
            };
            setWindows([...windows, newWindow]);
            setActiveWindow(item.link); // 새 윈도우를 활성화
        }
    };

    // 윈도우 최대화/최소화 처리
    const toggleWindowSize = (link) => {
        setWindows((prevWindows) =>
            prevWindows.map((win) => win.link === link ? { ...win, isMaximized: !win.isMaximized, position: { top: 0, left: 0 }}: win));
    };
    
    // 윈도우 닫기 처리
    const closeWindow = (link) => {
        setWindows(windows.filter((win) => win.link !== link));
    };

    // 컴포넌트가 마운트될 때 main 크기 업데이트
    useEffect(() => {
        // main 태그의 크기 업데이트 (윈도우 위치 제어)
        const updateMainDimensions = () => {
            const mainElement = document.querySelector(`.${styles.main}`);
            if (mainElement) {
                const { width, height } = mainElement.getBoundingClientRect();
                console.log("Main Dimensions:", { width, height }); // 확인용
                setMainDimensions({ width, height });
            }
        };
        updateMainDimensions();

        window.addEventListener("resize", updateMainDimensions);
        return () => {
            window.removeEventListener("resize", updateMainDimensions);
        };
    }, []);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>House Budget App</h1>
            </header>
            <div className={styles.main}>
                <aside className={styles.sidebar}>
                    <TreeMenu 
                        menu={menuData}
                        onMenuClick={handleMenuClick}
                    ></TreeMenu>
                </aside>
                <main className={styles.main}>
                    {windows.map((win) => {
                        console.log(win);
                        return (
                            <div
                                key={win.link}
                                className={`${styles.window} ${win.isMaximized ? styles.maximized : ""}`}
                                style={{
                                    zIndex: activeWindow === win.link ? 10 : 1,
                                    top: win.isMaximized ? 0 : win.position.top,
                                    left: win.isMaximized ? 0 : win.position.left,
                                    width: win.isMaximized ? mainDimensions.width : 400,
                                    height: win.isMaximized ? mainDimensions.height : 300,
                                }}
                            >
                                <div className={styles.windowHeader}>
                                    <h3>{win.title}</h3>
                                    <button className={styles.windowButton} onClick={() => toggleWindowSize(win.link)}>
                                        {win.isMaximized ? "최소화" : "최대화"}
                                    </button>
                                    <button className={styles.windowButton} onClick={() => closeWindow(win.link)}>닫기</button>
                                </div>
                                <div className={styles.windowBody}>
                                    <win.component />
                                </div>
                            </div>
                        )
                    })}
                </main>
                <aside className={styles.hiddenSidebar}>
                    Right sidebar
                </aside>
            </div>

            <footer className={styles.footer}>
                <p>&copy; 2024 House Budget App</p>
            </footer>
        </div>
    )
}