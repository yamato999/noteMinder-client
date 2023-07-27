import { useContext } from 'react';
import { useState } from 'react'
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable  } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

//components
import ChatBot from '../chatbot/Chatbot';
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';
import TagsInput from './TagsInput'

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {
    const getNotes = async () => {
        try {
          const token = localStorage.getItem('token');; // Здесь нужно указать ваш JWT токен
          const response = await fetch('https://fastapi-ian5.onrender.com/notes/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Добавление заголовка авторизации
            }
          });
      
          if (response.ok) {
            const data = await response.json();
            // Обработка полученных заметок и отображение на странице
            console.log(data)
            setNotes(data)
          } else {
            throw new Error('Request failed');
          }
        } catch (error) {
          console.error(error);
          // Обработка ошибки
        }
      };
      
      // Вызов функции при загрузке страницы
      window.addEventListener('load', getNotes);
      


    const { notes, setNotes } = useContext(DataContext);
    const [noteTitle, setNoteTitle] = useState('');
    function setNote(value) {
        setNoteTitle(value)
    }

    const onDragEnd = (result) => {
        if (!result.destination) 
          return;
    
        const items = reorder(notes, result.source.index, result.destination.index);
        setNotes(items);
    }
    console.log(notes)
    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <TagsInput color="blue" values={[]} onChange={tags => console.log(tags)} />
                <Form setNote={setNote}/>
                
                { notes.length > 0 ? 
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <Grid container style={{ marginTop: 16}}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                {
                                    
                                    notes.map((note, index) => (
                                        <Draggable key={note.id} draggableId={note.id} index={index}>
                                            {(provided, snapshot) => (
                                                <Grid ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    item
                                                >
                                                    
                                                    <Note note={note} noteTitle ={noteTitle}/>
                                                    
                                                </Grid>
                                                
                                            )}
                                        </Draggable >
                                    ))
                                }
                                </Grid>
                                
                            )}
                        </Droppable >
                    </DragDropContext>
                    
                : <EmptyNotes /> }
                <ChatBot notes={notes}/>
            </Box>
        </Box>
    )
}

export default Notes;
