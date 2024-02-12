import { useState } from 'react';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export const ContactForm = ({ onAddContact }) => {
  const [contact, setContact] = useState(INITIAL_STATE);

  const handleChange = evt => {
    const { name, value } = evt.target;
    setContact(prevContact => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (onAddContact) {
      onAddContact({ ...contact });
    }

    setContact(INITIAL_STATE);
  };

  const { name, number } = contact;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          placeholder="Enter name"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          placeholder="Enter phone number"
          name="number"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
