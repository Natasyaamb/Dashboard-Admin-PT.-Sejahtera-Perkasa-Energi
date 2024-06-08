import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

const validation = Yup.object({
  name:Yup.string().min(2).max(5).required("name is required!"),
  lastname:Yup.string().min(2).max(5).required("last name is required!"),
})

const initialValues = {
  name:"",
  lastname:"",
}


const RegistrationNew = (()=>{

  const {values,errors,handleSubmit,handleChange,handleBlur,resetForm} = useFormik(
{
  initialValues,
  validationSchema:validation,
  onSubmit: (values,action)=>{
    console.log(values);
    console.log(action);
  }
}    
  );

  return(
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        name - <input type="name" id="name" value={values.name} onChange={handleChange} onBlur={handleBlur}/><br/>
        {errors.name}
        </div>
        <div>
        last name - <input type="lastname" id="lastname" 
        value={values.lastname}
        onChange={handleChange}
        onBlur={handleBlur}/>
        {errors.lastname}
        </div>
        <div>
        <input type="submit" id="submit"/>
        </div>
      </form>
    </div>
  );


});

export default RegistrationNew;