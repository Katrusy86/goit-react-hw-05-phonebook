import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './contactForm.module.css'
import slideTransition from '../../transition/slide.module.css'
import { CSSTransition } from 'react-transition-group';
import Alert from '../alert/Alert'

class ContactForm extends Component{
    state = {
        name:'',
        number:'',
        isShow:false
    };


    handleChange = e =>{
        const {name,value}=e.target;
        this.setState({
            [name]:value,
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        (this.state.name !== '' && this.state.number !== '' )?(       
        this.props.onAddContact({...this.state})
        ): this.alertMessage();
        this.setState({
            name:'',
            number:''
        })
    };


    alertMessage = ()=> {
        this.setState (prevState=>({isShow:!prevState.isShow}))
    }


    render() {
        const {name, number, isShow}=this.state
            return (
                <>
                <CSSTransition
                    in={isShow}
                    timeout={500}
                    unmountOnExit
                    classNames={slideTransition}
                >
                <Alert/>
                </CSSTransition>
                <form className={styles.addContactForm} onSubmit = {this.handleSubmit}>
                    <label className={styles.label}> 
                        Name
                        <input className={styles.input__field} type="text" value = {name} name="name" onChange={this.handleChange} placeholder="Enter your name "/>
                    </label>
                    <label className={styles.label}> 
                        Number
                        <input className={styles.input__field} type="tel" value = {number} name="number" onChange={this.handleChange} placeholder="Enter your phone"/>
                    </label> 
                    <button className={styles.button} type="submit" onClick={this.props.onToggleFilter}>Add contact</button>
                    </form>
                </>
            )
            } 
}

ContactForm.propTypes = {
    name:PropTypes.string,
    number:PropTypes.number
}


export default ContactForm