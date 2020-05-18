import React, { Component } from 'react'
import { uuid } from 'uuidv4';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactList/ContactList';
import Filter from './filter/Filter'
import { CSSTransition } from 'react-transition-group';
import {FadeInLeft} from './animal/FadeInLeft';
import fadeTransition  from '../transition/fade.module.css'
import Notification from './alert/Notification'
import slideTransition from '../transition/slide.module.css'



const filterContact = (contacts,filter) => {
    return contacts.filter(contact=>contact.name.toLowerCase().includes(filter.toLowerCase()))
}

class App extends Component {
    state = {
        contacts: [],
        filter: '',
        name:'',
        isOpen:false,
        isShow:false,
      }

// ==================localStorage===============
    componentDidMount(){
        const persistedContact = localStorage.getItem('contacts');

        if(persistedContact) {
            const contacts = JSON.parse(persistedContact);
            this.setState({contacts})
        }
    }
    
    componentDidUpdate(prevProps,prevState){
        if(prevState.contacts !== this.state.contacts){
        localStorage.setItem('contacts',JSON.stringify(this.state.contacts))
        }
    }

// ==================================================

    addContact = (contact) => {
        const contactToAdd = {
            ...contact,
            id: uuid(),
        }
        const {name} = contact
        this.getName(name)
        const findContact = this.state.contacts.find(((contact) => contact.name === name))
        // console.log(findContact)
        if(!findContact) {        
        this.setState(prevState => ({
            contacts:[...prevState.contacts, contactToAdd]
        }))} else this.setState(prevState=>({isShow:!prevState.isShow}))
    };


    deleteContact = id => {
        this.setState(prevState =>({
            contacts:prevState.contacts.filter(contact => contact.id !== id)
        }))
    }

    filterContact = (e) => {
        this.setState({
            filter: e.target.value
        })
    }

    toggleFilter = ()=> {
        this.setState (state=>({isOpen:!state.isOpen}))
    }

    getName =(name)=>this.setState({name})

   render() {
       const {contacts,filter,isShow,name}=this.state
       const filteredContacts = filterContact(contacts,filter);
    //    console.log(filteredContacts);
        return (
            <>
                <CSSTransition
                    in={isShow}
                    timeout={500}
                    unmountOnExit
                    classNames={slideTransition}
                >
                <Notification name={name}/>
            </CSSTransition>
            <div>
                    <FadeInLeft> <h1>Phonebook</h1> </FadeInLeft>
                <ContactForm onAddContact={this.addContact} onToggleFilter={this.toggleFilter}/>
                
                <h2>Contacts</h2>
                 <CSSTransition in={contacts.length>1} timeout={250} unmountOnExit classNames={fadeTransition}>
                    <Filter value={filter} onFilterContact = {this.filterContact} />
                </CSSTransition> 
                <ContactList items={filteredContacts} onDeleteContact = {this.deleteContact} />
            </div>
            </>
        )
   }   
}

export default App