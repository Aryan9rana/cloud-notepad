import React ,{useContext, useEffect, useRef, useState} from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
  let navigate= useNavigate();

    const context= useContext(noteContext);
    const {notes,getAllNotes,editNote}= context;
    const [note, setNote]=useState({id:"", etitle:"",edescription:"", etag:""});
    useEffect(()=>{
      if(localStorage.getItem('token'))
        getAllNotes();
      else{
        navigate('/login');
      }
        // eslint-disable-next-line
    },[])
    const ref=useRef(null);
    const refClose=useRef(null);
    const updateNote=(currentNote)=>{
        ref.current.click();
        setNote({id: currentNote._id, etitle:currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
    }
    const handleAddNote=(e)=>{
        e.preventDefault();
        try{
          editNote(note.etitle, note.edescription, note.etag,note.id);
        refClose.current.click();
        props.showAlert("success", "note edited");
      }
      catch(err){
        props.showAlert("danger", err.message);
      }
    }
    const onChange=(e)=>{
         setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <>
    <Addnote showAlert={props.showAlert}/>
<button ref={ref} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#exampleModal">
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                    <input name="etitle" className="form-control form-control-lg" type="text" placeholder="Title" aria-label=".form-control-lg example" onChange={onChange} value={note.etitle} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <input name="edescription" className="form-control form-control-lg" type="text" placeholder="Enter note here" aria-label=".form-control-lg example" onChange={onChange}value={note.edescription} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputTag" className="form-label">Tag</label>
                    <input name="etag" className="form-control form-control-lg" type="text" placeholder="tag" aria-label=".form-control-lg example" onChange={onChange} value={note.etag}/>
                </div>
            </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.edescription.length<5 || note.etitle.length<3} className="btn btn-primary" onClick={handleAddNote}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    {notes.length===0?<div className='container'>No Notes to Display</div>: ""}
    <div className='row my-3'>
      {notes.map((note)=>{
          return <NoteItem key={note._id} updateNote= {updateNote} note={note} showAlert={props.showAlert}/>
        })}
    </div>
        </>
  )
}
