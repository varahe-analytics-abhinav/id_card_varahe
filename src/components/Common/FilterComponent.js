import React from "react";
import styled from "styled-components";

const Input = styled.input.attrs(props => ({
	type: "text",
	size: props.small ? 5 : undefined
}))`
  height: 40px;
  width: 200px;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  background-color: '#f6f6f659';
`;



const FilterComponent = ({ filterText, onFilter }) => (
	<>
    
		<Input
			className="form-control shadow-none search-input"
			id="search"
			type="text"
			placeholder="Filter data..."
			value={filterText}
			onChange={onFilter}
		/>
	</>
);

export default FilterComponent;