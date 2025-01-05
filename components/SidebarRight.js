// components/SidebarRight.js
import React from 'react';
import { useDrag } from 'react-dnd';
import styles from '../styles/SidebarRight.module.css';

const SidebarRight = ({availableComponents, setAvailableComponents}) => {
    return (
        <div className={styles.sidebar}>
            <h3>사용 가능한 컴포넌트</h3>
            {availableComponents.map((component) => (
                <DraggableComponent 
                    key={component.id} 
                    component={component} 
                    onDragEnd={(id) => {
                        setAvailableComponents(prev => prev.filter(c => c.id !== id));
                    }}
                />
            ))}
        </div>
    );
};

const DraggableComponent = ({ component, onDragEnd }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'COMPONENT',
        item: { id: component.id, name: component.name },
        end: () => onDragEnd(component.id),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={styles.component} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {component.name}
        </div>
    );
};

export default SidebarRight;
