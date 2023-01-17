import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { slowFunc } from './slowFunc';

type ContextType = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
};
const FormContext = React.createContext<ContextType | null>(null);

export const FormWrapper = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');

  useEffect(() => {
    console.time('re-render FormWrapper');
    slowFunc();
    console.timeEnd('re-render FormWrapper');
  });

  return (
    <FormContext.Provider
      value={{
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        setFirstName,
        setLastName,
        setEmail,
        setPhoneNumber,
        setAddress,
      }}
    >
      <FormWithContext />
    </FormContext.Provider>
  );
};

const FormWithContext = () => {
  const context = React.useContext(FormContext);
  if (!context) {
    throw new Error(
      'FormWithContext must be used within a FormContext.Provider'
    );
  }

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
  } = context;

  return (
    <section>
      <h2>Patient Information with Context</h2>
      <p>
        <b>First Name</b>:{' '}
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </p>
      <p>
        <b>Last Name</b>:{' '}
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </p>
      <p>
        <b>email</b>:{' '}
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </p>
      <p>
        <b>phoneNumber</b>:{' '}
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </p>
      <p>
        <b>address</b>:{' '}
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </p>

      <hr />

      <p>the firstName is: {firstName}</p>
      <p>the lastName is: {lastName}</p>
      <p>the email is: {email}</p>
      <p>the phoneNumber is: {phoneNumber}</p>
      <p>the address is: {address}</p>
    </section>
  );
};
