import React from 'react'
import styles from './filter.module.css'

const Filter = ({value, onFilterContact}) => (
    <input className={styles.addContactForm} type="text" value={value} onChange={onFilterContact} placeholder="Find contacts by name"/>
);

export default Filter;