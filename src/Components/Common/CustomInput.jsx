import React from 'react'

const CustomInput = ({text,type,name,onChange,errors}) => {
  return (
    <>
    <input
            className="form-control mt-4"
            placeholder={text}
            type={type}
            name={name}
            onChange={onChange}
          />
          {errors && 
          <div className="alert alert-danger" role="alert"  >
            {errors}
          </div>
                }
    
    </>
  )
}

export default CustomInput