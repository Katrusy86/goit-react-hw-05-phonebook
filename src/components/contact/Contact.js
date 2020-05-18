import React from 'react'
import styles from './contact.module.css'


const Contact = ({name,number,onDeleteContact}) => (
    <div className={styles.phoneBookList}>
        <p className={styles.contact}>{name}</p>
        <p className={styles.contact}>{number}</p>
        <button className={styles.button} type="button" onClick={onDeleteContact}>Delete</button>
    </div>
);

export default Contact;