import React, { useState } from 'react';
import Grid from '../../common/Grid';

const Category = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [rowData, setRowData] = useState([]);

    const columnDefs = [
        { headerName: 'ID', field: 'id', sortable: true, filter: true },
        { headerName: '카테고리 명', field: 'name', sortable: true, filter: true },
    ];

    const handleSearch = () => {
        setRowData([
            { id: "c0001", name: '카테고리 1'},
            { id: "c0002", name: '카테고리 2'},
            { id: "c0003", name: '카테고리 3'},
        ]);
    };

    return (
        <div>
            <h2>카테고리 관리</h2>
            <div>
                <input
                    type="text"
                    placeholder="카테고리 명 검색"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ padding: '10px', width: '300px' }}
                />
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className="ag-theme-alpine" style={{ height: '400px', width: '600px' }}>
                <Grid
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={{filter:true, editable: true,}}
                    pagination={true}
                    paginationPageSize={20}
                    theme="legacy"
                />
            </div>
        </div>
    );
}

export default Category;