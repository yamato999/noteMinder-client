import { createContext, useContext, useState } from 'react';

// Создаем контекст
const NoteContext = createContext();

// Создаем провайдер для контекста, который будет использоваться в корневом компоненте
export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};

// Создаем хук для использования контекста в других компонентах
export const useNoteContext = () => useContext(NoteContext);
