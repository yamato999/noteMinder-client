import { useState, useEffect } from "react";
import "./TagsInput.css"

const token = localStorage.getItem('token');
const TagsInput = ({ values, onChange, color }) => {
    const [tag, setTag] = useState('')
    const [tags, setTags] = useState(values)

    useEffect(() => {
        sendDataToServer(tags);
      }, [tags]); 

    const sendDataToServer = async (tags) => {
        try {
          const response = await fetch('https://fastapi-ian5.onrender.com/notes/values/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(tags)
          });
      
          if (response.ok) {
            // Данные успешно отправлены на сервер
            console.log('Данные успешно отправлены');
          } else {
            // Обработка ошибки, если что-то пошло не так
            console.log('Ошибка при отправке данных');
          }
        } catch (error) {
          console.error('Ошибка при выполнении запроса:', error);
        }
      };

    const handleChange = e => {
        const { value } = e.target
        setTag(value)

        
        
    }

    const handleKeyDown = e => {
        const { key } = e
        const newTag = tag.trim()

        if ((key === ',' || key === 'Enter' || key === 'Tab') && newTag.length && !tags.includes(newTag)) {
            e.preventDefault()
            setTags(prevTags => {
                const latesTags = [...prevTags, newTag]
                onChange(latesTags)
                return latesTags
                
            });
            setTag('')
            
        } else if (key === 'Backspace' && !newTag.length && tags.length) {
            e.preventDefault()

            const tagsCopy = [...tags]
            const lastTag = tagsCopy.pop()

            setTags(tagsCopy)
            console.log(tags)
            onChange(tagsCopy)
            setTag(lastTag)
        }
        
    }

    const removeTag = index => {
        setTags(prevTags => {
            const latestTags = prevTags.filter((tag, i) => i !== index)
            onChange(latestTags)
            return latestTags
        })
    }

    const getColor = () => {
        const colors = ['color-default', 'color-green', 'color-red', 'color-blue', 'color-yellow']

        return colors.includes(`color-${color}`) ? `color-${color}` : `color-default`
    }

    return (
        <div className="tags-input-wrapper">
            {tags.map((tag, index) => (
                <div key={index} className={`tag-item ${getColor()}`}>
                    <span className="title">{tag}</span>
                    <button className="remove-btn" onClick={() => removeTag(index)}>&times;</button>
                </div>
            ))}
            <input value={tag} onChange={handleChange} className="tag-input" onKeyDown={handleKeyDown} />
        </div>
    )
}

export default TagsInput