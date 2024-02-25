import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

export default function Addnote(props) {
    const context= useContext(noteContext);
    const {addNote}= context;
    const [note, setNote]=useState({title:"", description:"", tag:""});
    const handleAddNote=(e)=>{
        e.preventDefault();
        try{
            addNote(note.title, note.description, note.tag);
        document.getElementById("myForm").reset();
        props.showAlert("success", "note added successfully");
    }
    catch(err){
        props.showAlert("danger", "note not added");
    }
    }
    const onChange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div>
            <form id='myForm'>
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
                <button disabled={note.description.length<5  || note.title.length<3} type="submit" className="btn btn-primary" onClick={handleAddNote} >Save</button>
            </form>
    </div>
  )
}
