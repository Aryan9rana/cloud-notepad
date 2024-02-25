
import { useState } from 'react';
import NoteContext from './noteContext';
const NoteState=(props)=>{
    const host= "http://www.localhost:80";
    const notesInitial=[]
    const [notes, setNotes]= useState(notesInitial);
    const getAllNotes=async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token")
            },
          });
          const json= await response.json();
          setNotes(json);
    }
    const addNote=async(title, description, tag)=>{
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }, 
            body: JSON.stringify({title, description, tag}),
          });
        let note=await response.json();
        setNotes(notes.concat(note));
    }
    const deleteNote=async(id)=>{
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            }
          });
        const newNotes= notes.filter((note)=>{return note._id !== id});

        setNotes(newNotes);
    }
    const editNote= async(title, description, tag, id)=>{
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
              }, 
              body: JSON.stringify({title, description, tag}),
            })

            // eslint-disable-next-line
            const json= response.json();

            let newNotes= JSON.parse(JSON.stringify(notes));
        for(let i=0;i<newNotes.length; i++){
            if(newNotes[i]._id===id){
                newNotes[i].title= title;
                newNotes[i].description= description;
                newNotes[i].tag= tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes,getAllNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    );
}


export default NoteState;

  