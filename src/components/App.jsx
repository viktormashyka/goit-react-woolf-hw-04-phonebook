import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('phoneContacts'));
    if (Array.isArray(parsedContacts) && parsedContacts?.length > 0) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('phoneContacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  const handleDelete = id => {
    setContacts(prevContacts => prevContacts.filter(item => item.id !== id));
  };

  const onAddContact = newContact => {
    if (
      contacts.some(
        contact =>
          contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase()
      )
    ) {
      toast.info(`Contact "${newContact.name}" is already in contacts`);
      return;
    }

    setContacts(prevContacts => [
      ...prevContacts,
      { ...newContact, id: nanoid() },
    ]);
  };

  const filteredContacts = filterContacts();
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={filter} onChange={handleChange} />
      <ContactList
        filteredContacts={filteredContacts}
        handleDelete={handleDelete}
      />
      <ToastContainer />
    </div>
  );
};
