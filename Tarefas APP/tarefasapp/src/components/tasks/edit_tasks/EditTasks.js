import React, { useState } from "react";
   import Modal from 'react-bootstrap/Modal';
   import Button from 'react-bootstrap/Button';
   import Form from 'react-bootstrap/Form';
   import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
   
   function EditTask(props) {

     const [title, editTitle] = useState('');
     const [show, editShow] = useState('');

   
     const handleUpdate = (async () => {
       await fetch(`http://localhost:3001/tasks`,
         {
           method: 'PATCH',
           headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json'
           },
           body: JSON.stringify({
             task: { title: title, done: false} 
           })
         }
       )
       editShow(false)
       editTitle(title)
       props.loadTasks();
        });
   
     return (
       <div>
         <a className="edit" href="#">
           <FontAwesomeIcon icon="pencil-alt" onClick={e => editShow(true)} variant="dark" />
         </a>
   
         <Modal show={show || false} onHide={e => editShow(false)}>
           <Modal.Header closeButton>
             <Modal.Title>Alterar Tarefa</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             <Form.Control type="email" placeholder= { title } onChange={e => editTitle(e.target.value)} />
           </Modal.Body>
           <Modal.Footer>
             <Button variant="secondary" onClick={e => editShow(false)}>
               Cancelar
             </Button>
             <form onSubmit={handleUpdate}>
               <Button variant="dark" type="submit">
                 Salvar
               </Button>
             </form>
           </Modal.Footer>
         </Modal>
       </div>
     );
   }
   
   export default EditTask;