import { FormWrapper } from './FormWithContext';
import { FormWithSubscriptionContext } from './FormWithPubSubContext';

export const App = () => {
  return (
    <main>
      <FormWrapper />

      <br />

      <FormWithSubscriptionContext />
    </main>
  );
};
