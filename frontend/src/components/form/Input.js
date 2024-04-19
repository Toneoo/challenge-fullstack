function Input({type, text, name, placeholder, onChange, value}) {
    
    return (
        <>
            <label htmlFor={name}>{text}</label>
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                className="form-control"
            />
        </>

    )
}

export default Input
