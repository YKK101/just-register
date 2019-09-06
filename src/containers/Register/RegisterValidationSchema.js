import * as Yup from 'yup'

const RegisterValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  dateOfBirth: Yup.date().required('Required'),
  email: Yup.string().email('Invalid Email'),
})

export default RegisterValidationSchema