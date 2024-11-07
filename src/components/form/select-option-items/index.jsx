import React from 'react';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';

import { DragEndFields } from '../../../utils/index';

const SelectOptionsItems = ({ selectOptions, setSelectOptions, setOptionValue, setEditingOptionIndex, editingOptionIndex }) => {

    const handleDragEnd = (result) => {
        if (editingOptionIndex) return
        DragEndFields(result, selectOptions, setSelectOptions);
    };

    const handleEditOption = (index) => {
        setOptionValue(selectOptions[index]);
        setEditingOptionIndex(index);
    };

    const handleRemoveOption = (index) => {
        const updatedOptions = [...selectOptions];
        updatedOptions.splice(index, 1);
        setSelectOptions(updatedOptions);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="options">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-2">
                        {selectOptions && selectOptions.map((option, index) => (
                            <Draggable
                                isDragDisabled={editingOptionIndex !== null}
                                key={option}
                                draggableId={option}
                                index={index}>
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-2"
                                    >
                                        <button type="button" onClick={() => handleEditOption(index)} className="btn btn-main mx-2">
                                            <MdEdit />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveOption(index)}
                                            className="btn btn-danger mr-2"
                                        >
                                            <MdDelete />
                                        </button>
                                        <span className="p-2 border rounded mx-2">{option}</span>
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default SelectOptionsItems;