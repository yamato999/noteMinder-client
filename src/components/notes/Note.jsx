import { useContext } from 'react';

import { Card, CardContent, CardActions, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';

import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`
const token = localStorage.getItem('token');
console.log(token)
const Note = ({ note, noteTitle }) => {

    const { notes, setNotes, setAcrchiveNotes, setDeleteNotes } = useContext(DataContext);

    const archiveNote = (note) => {
        const updatedNotes = notes.filter(data => data.id !== note.id);
        setNotes(updatedNotes);
        setAcrchiveNotes(prevArr => [note, ...prevArr]);
    }
    
    const deleteNote = async (note_id) => {
        try {
          const response = await fetch(`https://fastapi-ian5.onrender.com/notes/${note_id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
      
          if (response.ok) {
            setNotes((prevNotes) => prevNotes.filter((note) => note._id !== note_id));
            return response;
          } else {
            // Обработка ошибки, если заметка не была найдена
            const data = await response.json();
            throw new Error(data.detail);
          }
        } catch (error) {
          console.error('Error:', error.message);
          // Обработка других ошибок
          throw error;
        }
      };
      {console.log(note._id)}

    return (
        <StyledCard>
                <CardContent>
                <Typography>{note.title}</Typography>
                    <Typography>{note.description}</Typography>
                </CardContent>
                <CardActions>

                    <Delete 
                        fontSize="small"
                        onClick={() => deleteNote(note._id)}
                        
                    />
                </CardActions>
        </StyledCard>
    )
}

export default Note;