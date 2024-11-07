import React from 'react';

const TextComponent = ({item, register})=>{
    return (
            <input className='form-control input-theme ' {...register(item.name)}/>
    );
}

const TextAreaComponent = ({item, register})=>{
    return (
            <textarea className='form-control input-theme' {...register(item.name)}/>
    );
}

const SelectComponent = ({item, register})=>{
    return (
            <select className='form-control input-theme' {...register(item.name)}>
                {item.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
    );
}

const BooleanComponent = ({item, register})=>{
    return (
            <input type="checkbox" id={item.name} {...register(item.name)}/>
    );
}

const QuestionItem = ({item, register}) => {
    if (item.type==="text") return <TextComponent item={item} register={register}/>
    if (item.type==="textarea") return <TextAreaComponent item={item} register={register}/>
    if (item.type==="select") return <SelectComponent item={item} register={register}/>
    if (item.type==="boolean") return <BooleanComponent item={item} register={register}/>
};

export default QuestionItem;