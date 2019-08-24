import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'formik'

import styles from './Form.module.css'

const Form = (props) => {
  return (
    <div className={styles.wrapper}>  
      <span className={styles.title}>{props.title}</span>
      { props.type !== 'select' ? (
        <Field className={styles.input} type={props.type} name={props.name} />
      ) : (
        <Field className={styles.radioGroup} name={props.name}>
          { ({ field }) => (
            <div className={styles.radioGroup}>
              { props.options.map((option, index) => (
                <div key={`${field.name}-${option.value}`} className={`${styles.radio} ${index > 0 && styles.radioMargin}`}>
                  <div
                    className={`${styles.radioInput} ${field.value === option.value && styles.checked}`}
                    onClick={() => { field.onChange({ target: { name: field.name, value: option.value } }) }}
                  />
                  <span className={styles.radioTitle}>{option.title}</span>
                </div>
              ))}
            </div>
          )}
        </Field>
      )}
    </div>
  )
}

Form.propTypes = {
  title: PropTypes.string,
}

export default Form