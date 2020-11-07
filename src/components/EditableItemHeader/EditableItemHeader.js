import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Item } from "semantic-ui-react";

import './EditableItemHeader.css';

const EditableItemHeader = ({ title, completed, onSubmitNewTitle }) => {
    const [name, setName] = useState(title);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            document.activeElement.blur();
        }
    };

    const handleBlur = () => {
        if (name !== title) {
            onSubmitNewTitle(name);
        }
    };

    return (
        <Item.Description className={completed ? "strikethrough" : undefined}>
            <Input
                transparent
                fluid
                value={name}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                onBlur={handleBlur}
            />
        </Item.Description>
    );
};

EditableItemHeader.propTypes = {
    title: PropTypes.string,
    completed: PropTypes.bool,
    onSubmitNewTitle: PropTypes.func,
}

export default EditableItemHeader;
