import React from 'react';
import DataTable from 'react-data-table-component';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const sortIcon = <KeyboardArrowDownIcon />;

const customStyles = {
    table: {
        style: {
            border: '1px solid #dee2e6',
            // borderBottomColor: '1px solid #1111',
            lineHeight: 1.5,


        },
    },
    rows: {
        style: {
            minHeight: '100px', // override the row height
            fontSize: '16px',
            padding: '5px',
            backgroundColor: '#fbfafa',
            borderBottomWidth: '0.5px'
        },
        stripedStyle: {
            color: "#f9f9f9",
            backgroundColor: "#f6f6f6"
        }
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: '#dee2e6',
            color: '#343a40',
            fontWeight: 700,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            padding: '0.75rem',
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            color: '#737c85',
            minHeight: '36px'
        },
    },
};

function DataTableBase(props) {
    return (
        <DataTable
            pagination
            
            sortIcon={sortIcon}
            dense
            
            striped
            {...props}
            customStyles={customStyles}
        />
    );
}

export default DataTableBase;