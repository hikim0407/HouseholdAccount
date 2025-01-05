import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// AG Grid 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

const Grid = ({
    rowData=[],
    columnDefs=[],
    defaultColDef={},
    pagination=true,
    paginationPageSize=20,
}) => {
    return (
        <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            theme="legacy"
        />
    )
};

export default Grid;