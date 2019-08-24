import React, { Component } from 'react'
import { Formik } from 'formik'
import Form from 'components/Form'

import styles from './Register.module.css'

const strings = {
  title: 'Tell me about yourself'
}

const formPattern = [
  {
    name: 'firstName',
    type: 'text',
    title: 'First Name',
  },
  {
    name: 'lastName',
    type: 'text',
    title: 'Last Name',
  },
  {
    name: 'gender',
    type: 'select',
    title: 'Gender',
    options: [
      { title: 'Male', value: 'male' },
      { title: 'Female', value: 'female' },
    ],
  },
  {
    name: 'dateOfBirth',
    type: 'date',
    title: 'Date of Birth'
  },
  {
    name: 'tel',
    type: 'tel',
    title: 'Tel.',
  },
  {
    name: 'email',
    type: 'email',
    title: 'Email',
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
    this.onRegisterSuccess(values)
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
        >
          { ({ handleSubmit }) => (
            <>
              <div className={styles.formContent}>
                { formPattern.map(form => (
                  <Form  key={form.name} {...form} />
                ))}
              </div>
              <button className={styles.submitButton} onClick={handleSubmit}>Send</button>
            </>
          )}
        </Formik>
      </div>
    )
  }
}

export default Register