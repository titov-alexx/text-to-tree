import { ChangeEvent, useState } from 'react';

export const useUserInput = () => {
  const [userInput, setUserInput] = useState('');

  const onUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return { userInput, onUserInputChange, isEmpty:  userInput.trim() === ''};
};
