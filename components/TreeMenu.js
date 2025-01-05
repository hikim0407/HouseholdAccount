import { useState } from "react";
import styles from "./TreeMenu.module.css";

export default function TreeMenu( {menu, onMenuClick} ) {
    return (
        <div>
            {menu.map((item, idx) => {
                return <TreeNode 
                            key={idx} 
                            item={item}
                            onMenuClick={onMenuClick}
                        ></TreeNode>
            })}
        </div>
    )
}

function TreeNode({item, onMenuClick}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.treeNode}>
            <div className={styles.treeNodeTitle} onClick={handleToggle}>{item.title}</div>

            {isOpen && item.children && (
                <div className={styles.treeNodeChildren}>
                    {item.children.map((child, idx) => {
                        return (
                            <div key={idx}>
                                <a className={styles.childLink}
                                    onClick={() => onMenuClick(child)}
                                >
                                    {child.title}
                                </a>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}