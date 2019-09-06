import React, { Component } from 'react'
import { Formik } from 'formik'
import isEmpty from 'lodash.isempty'
import Form from 'components/Form'
import userProvider from 'providers/user'
import registerValidationSchema from './RegisterValidationSchema'

import styles from './Register.module.css'

const strings = {
  title: 'Tell me about yourself'
}

const formPattern = [
  {
    name: 'firstName',
    type: 'text',
    title: 'First Name',
    isRequired: true,
  },
  {
    name: 'lastName',
    type: 'text',
    title: 'Last Name',
    isRequired: true,
  },
  {
    name: 'gender',
    type: 'select',
    title: 'Gender',
    options: [
      { title: 'Male', value: 'male' },
      { title: 'Female', value: 'female' },
    ],
    isRequired: false,
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    title: 'Date of Birth',
    isRequired: true,
  },
  {
    name: 'tel',
    type: 'tel',
    title: 'Tel.',
    isRequired: false,
  },
  {
    name: 'email',
    type: 'email',
    title: 'Email',
    isRequired: false,
  },
]

const initialValues = {
  firstName: '',
  lastName: '',
  gender: 'male',
  dateOfBirth: undefined,
  tel: '',
  email: '',
}

class Register extends Component {
  onSubmit = (values) => {
    userProvider.register(values, this.onRegisterSuccess, this.onRegisterError)
  }

  onRegisterSuccess = (values) => {
    this.props.history.push({
      pathname: '/success',
      state: values,
    })
  }

  onRegisterError = () => {
    this.props.history.push('/error')
  }

  render() {
    return (
      <div className={styles.background}>
        <h1 className={styles.title}>{strings.title}</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          validationSchema={registerValidationSchema}
        >
          { ({ errors, handleSubmit }) => (
            <>
              <div className={styles.formContent}>
                { formPattern.map(form => (
                  <>
                    <Form  key={form.name} {...form} />
                  </>
                ))}
              </div>
              <button
                type="submit"
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={!isEmpty(errors)}
              >
                Send
              </button>
            </>
          )}
        </Formik>
      </div>
    )
  }
}

export default Register