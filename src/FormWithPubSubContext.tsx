import React, { useEffect } from 'react';
import createPubSubContext from './createPubSubContext';
import { slowFunc } from './slowFunc';

interface FormStore {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}
const initialState: FormStore = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
};
const { Provider, useStore } = createPubSubContext<FormStore>(initialState);

const FormInput = ({
  value,
  label,
}: {
  value: keyof FormStore;
  label: string;
}) => {
  const [fieldValue, setStore] = useStore((store) => store[value]);
  return (
    <div className="formField">
      <label>
        <b>{label}</b>:{' '}
        <input
          type={value === 'email' ? 'email' : 'text'}
          value={fieldValue}
          onChange={(e) => setStore({ [value]: e.target.value })}
        />
      </label>
    </div>
  );
};

const ShowValue = ({ value }: { value: keyof FormStore }) => {
  const [fieldValue] = useStore((store) => store[value]);
  return (
    <span>
      {value}: {fieldValue}
    </span>
  );
};

const FormFields = () => (
  <form>
    <FormInput value="firstName" label="First Name" />
    <FormInput value="lastName" label="Last Name" />
    <FormInput value="email" label="Email" />
    <FormInput value="phoneNumber" label="Phone Number" />
    <FormInput value="address" label="Address" />
  </form>
);

const FormValues = () => (
  <section>
    <p>
      The firstName is: <ShowValue value="firstName" />
    </p>
    <p>
      The lastName is: <ShowValue value="lastName" />
    </p>
    <p>
      The email is: <ShowValue value="email" />
    </p>
    <p>
      The phoneNumber is: <ShowValue value="phoneNumber" />
    </p>
    <p>
      The address is: <ShowValue value="address" />
    </p>
  </section>
);

export const FormWithSubscriptionContext = () => {
  useEffect(() => {
    console.time('re-render FormWithSubscriptionContext');
    slowFunc();
    console.timeEnd('re-render FormWithSubscriptionContext');
  });

  return (
    <Provider>
      <section>
        <h2>Patient Information with Subscription Context</h2>
        <FormFields />
        <FormValues />
      </section>
    </Provider>
  );
};
