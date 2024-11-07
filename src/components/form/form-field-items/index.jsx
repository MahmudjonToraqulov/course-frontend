import React from 'react';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { MdDelete, MdEdit } from 'react-icons/md';
import {useTranslation} from "react-i18next";

import { DragEndFields } from '../../../utils/index';


const FormFieldItems = ({ formFields, setFormFields, setFieldName, setFieldType, setEditingIndex, setSelectOptions, setFieldHidden, editingIndex, setForm }) => {

    const {t} = useTranslation()

    const handleDragEnd = (result) => {
        if (editingIndex) return
        DragEndFields(result, formFields, setFormFields);
    };

    const handleEditField = (index) => {
        const fieldToEdit = formFields[index];
        setFieldName(fieldToEdit.name);
        setFieldType(fieldToEdit.type);
        setFieldHidden(fieldToEdit.hidden);
        setEditingIndex(index);
        if (fieldToEdit.type === 'select') {
            setSelectOptions(fieldToEdit.options || []);
        }
    };

    const handleDeleteFieldInDB = (index) => {
        setForm(prevState => ({
            ...prevState,
            deletedFields: [...(prevState.deletedFields || []), formFields[index].id]
        }));
    };

    const handleRemoveField = (index) => {
        if (editingIndex!==null) return
        if (formFields[index].id) handleDeleteFieldInDB(index)
        const updatedFields = [...formFields];
        updatedFields.splice(index, 1);
        setFormFields(updatedFields);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="formFields">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-2">
                        {formFields.map((field, index) => (
                            <Draggable
                                isDragDisabled={editingIndex !== null}
                                key={field.name}
                                draggableId={field.name}
                                index={index}>
                                {(provided) => (
                                    <li
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="mb-2 rounded"
                                    >
                                        <button type="button" onClick={() => handleEditField(index)} className="btn btn-main mx-2">
                                            <MdEdit />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveField(index)}
                                            className="btn btn-danger"
                                        >
                                            <MdDelete />
                                        </button>
                                        <span className="p-2 rounded">
                                            {field.name} ({t(field.type)})
                                        </span>
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

export default FormFieldItems;