import React, { useState, useContext, useEffect, useRef } from "react";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import noteContext from "../context/notes/noteContext";
import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes ,editNote} = context;
  let navigate=useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()  
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: ""
  });
  const rowStyle = {
    marginLeft: '100px', // Add left margin
    marginRight: '100px', // Add right margin
    marginTop: '10px', // Add top margin if desired
    marginBottom: '10px', // Add bottom margin if desired
    // Add any other custom styles here as needed
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id:currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
     
    });
    
  };
  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription)
    refClose.current.click();
    props.showAlert("Updated successfully","success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {" "}
              <form className="contaner my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                     minLength={3} required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={3} required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={ note.etitle.length<3|| note.edescription.length<3}
                onClick={handleClick}
                type="button" 
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" row my-3" style={rowStyle} >
        <h2>Your Notes</h2>
        <div className="conatiner mx-2">
        {notes.length===0 && ' No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
          )
        })}
      </div>
    </>
  );
};

export default Notes;
