import { useState } from 'react';

export default function registerForm({ onRegister }) {
  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  return (
    <form
      onSubmit={(e) => {
        onRegister(e, {
          firstName: firstNameValue,
          lastName: lastNameValue,
          email: emailValue,
          password: passwordValue,
        });
      }}
    >
      <label htmlFor="firstName">First Name:</label>
      <input
        name="firstName"
        id="firstName"
        type="text"
        required
        onChange={(e) => setFirstNameValue(e.target.value)}
      />


      <label htmlFor="lastName">Last Name:</label>
      <input
        name="lastName"
        id="lastName"
        type="text"
        required
        onChange={(e) => setLastNameValue(e.target.value)}
      />


      <label htmlFor="email">Email:</label>
      <input
        name="email"
        id="email"
        type="text"
        required
        onChange={(e) => setEmailValue(e.target.value)}
      />

      <label htmlFor="password">Password:</label>
      <input
        name="password"
        id="password"
        type="password"
        required
        onChange={(e) => setPasswordValue(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
  );
}
