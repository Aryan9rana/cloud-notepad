import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const { note, updateNote , showAlert} = props;
    const context= useContext(noteContext);
    const {deleteNote}= context;
    return (<>
        
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}
                        {note.tag ? <span className="badge rounded-pill bg-secondary mx-1">{note.tag}</span> : <span></span>}
                    </h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{
                        deleteNote(note._id);
                        showAlert("success", "note deleted");
                    }}></i>
                    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
                        updateNote(note)
                    }}></i>
                </div>
            </div>
        </div>
    </>
    )
}

export default NoteItem
