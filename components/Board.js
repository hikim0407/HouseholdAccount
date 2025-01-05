// components/Board.js
import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import styles from '../styles/Board.module.css';

const DraggableComponent = ({ component, onDragEnd, viewType }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'COMPONENT',
        item: { id: component.id, name: component.name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div ref={drag} className={viewType === "list" ? styles.sidelist : styles.component} style={{ opacity: isDragging ? 0.5 : 1 }}>
            {component.name}
        </div>
    );
};

const Board = () => {
    const [availableComponents, setAvailableComponents] = useState([
        { id: '1', name: '컴포넌트 A' },
        { id: '2', name: '컴포넌트 B' },
        { id: '3', name: '컴포넌트 C' },
        { id: '4', name: '컴포넌트 D' },
        { id: '5', name: '컴포넌트 E' },
        { id: '6', name: '컴포넌트 F' },
        { id: '7', name: '컴포넌트 G' },
        { id: '8', name: '컴포넌트 H' },
        { id: '9', name: '컴포넌트 I' },
        { id: '10', name: '컴포넌트 J' },
        { id: '11', name: '컴포넌트 K' },
        { id: '12', name: '컴포넌트 L' },
    ]);
    const [componentsInBoard, setComponentsInBoard] = useState([]);

    const [, boardDrop] = useDrop({
        accept: 'COMPONENT',
        drop: (item) => {
            const isInBoard = componentsInBoard.some(comp => comp.id === item.id);
            if(!isInBoard) {
                setComponentsInBoard([...componentsInBoard, { id: item.id, name: item.name }]);
                setAvailableComponents(availableComponents.filter(component => component.id !== item.id));
            }
        },
    });
    const [, sideDrop] = useDrop({
        accept: 'COMPONENT',
        drop: (item) => {
            const isInAvailable = availableComponents.some(comp => comp.id === item.id);
            if(!isInAvailable) {
                setComponentsInBoard(componentsInBoard.filter(component => component.id !== item.id));
                setAvailableComponents([...availableComponents, { id: item.id, name: item.name }]);
            }
        },
    });

    return (
        <div className={styles.container}>
            <div ref={boardDrop} className={styles.board}>
                {Array.from({ length: 9 }, (_, index) => (
                    <div key={index} className={styles.gridCell}>
                        {componentsInBoard[index] && (
                            <DraggableComponent 
                                component={componentsInBoard[index]} 
                                viewType="component" 
                            />
                        )}
                    </div>
                ))}
            </div>
            <div ref={sideDrop} className={styles.sidearea}>
                {availableComponents.map((component) => (
                    <DraggableComponent 
                        key={component.id} 
                        component={component} 
                        viewType="list"
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
