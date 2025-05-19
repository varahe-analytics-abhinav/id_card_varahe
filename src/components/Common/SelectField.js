import { FormHelperText } from '@mui/material';
import { useField } from 'formik';
import React from 'react';
import Select from 'react-select';


const customStyles = {
    control: (provided, state) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '40px',
        height: '40px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
        ...provided,
        height: '40px',
        padding: '0 6px'
    }),

    input: (provided, state) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorSeparator: state => ({
        display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
        ...provided,
        height: '40px',
    }),
    menuPortal: base => ({ ...base, zIndex: 999999 })
};

export default function SelectField({ ...props }) {
    const [meta] = useField(props);
    return (
        <>
            <Select
                menuPortalTarget={document.body}
                styles={customStyles}
                menuPosition={'fixed'}
                isSearchable={true}
                {...props}
            />
            {(meta.touched && meta.error) && <FormHelperText style={{ 'fontSize': '12px', 'color': 'rgb(244, 67, 54)' }}>{meta.touched && meta.error}</FormHelperText>}
        </>
    )
}