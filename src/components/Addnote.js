import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote() {
    const context= useContext(noteContext);
    const {addNote}= context;
    const [note, setNote]=useState({title:"", description:"", tag:""});
    const handleAddNote=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                    <input name="title" className="form-control form-control-lg" type="text" placeholder="Title" aria-label=".form-control-lg example" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <input name="description" className="form-control form-control-lg" type="text" placeholder="Enter note here" aria-label=".form-control-lg example" onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputTag" className="form-label">Tag</label>
                    <input name="tag" className="form-control form-control-lg" type="text" placeholder="tag" aria-label=".form-control-lg example" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleAddNote} >Save</button>
            </form>
    </div>
  )
}
