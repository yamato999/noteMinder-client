import { useState, useRef, useContext } from "react";

import { Box, TextField, ClickAwayListener } from "@mui/material";
import { styled } from "@mui/material/styles";
import { v4 as uuid } from "uuid";

import { DataContext } from "../../context/DataProvider";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
  border-color: #e0e0e0;
  width: 600px;
  border-radius: 8px;
  min-height: 30px;
  padding: 10px 15px;
`;

const note = {
  id: "",
  heading: "",
  text: "",
};

const Form = ({ setNote }) => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNote, setAddNote] = useState({ ...note, id: uuid() });
  const [noteTitle, setNoteTitle] = useState("");

  const { setNotes } = useContext(DataContext);

  const containerRef = useRef();

  const token = localStorage.getItem("token");
  const sendDescriptionToServer = async (description) => {
    try {
      const response = await fetch("https://fastapi-ian5.onrender.com/notes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        const data = await response.json();
        setNoteTitle(data.note_id);
        //data.note_id - обратиться к переменной - тайтл
        return data;
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // Обработка ошибки
    }
  };

  const handleClickAway = async () => {
    setShowTextField(false);
    containerRef.current.style.minheight = "30px";
    setAddNote({ ...note, id: uuid() });

    if (addNote.heading || addNote.text) {
      // Отправка описания на API сервера
      const response = await sendDescriptionToServer(addNote.text);
      setNote(response.note_id);
      console.log(addNote);
      // Установка полученного заголовка заметки
      setNotes((prevArr) => [
        { ...addNote, title: response.title },
        ...prevArr,
      ]);
    }
  };

  const onTextAreaClick = () => {
    setShowTextField(true);
    containerRef.current.style.minheight = "70px";
  };

  const onTextChange = (e) => {
    let changedNote = { ...addNote, [e.target.name]: e.target.value };
    setAddNote(changedNote);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Container ref={containerRef}>
        {/*{   showTextField &&           //убираю поле тайтл при клике
                    <TextField 
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => onTextChange(e)}
                        name='heading'
                        value={addNote.heading}
                    />
                }  */}
        <TextField
          placeholder="Take a note..."
          multiline
          maxRows={Infinity}
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onClick={onTextAreaClick}
          onChange={(e) => onTextChange(e)}
          name="text"
          value={addNote.text}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleClickAway();
            }
          }}
        />
      </Container>
    </ClickAwayListener>
  );
};

export default Form;
