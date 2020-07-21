import React, { Component } from 'react';
   import Row from 'react-bootstrap/Row';
   import Col from 'react-bootstrap/Col';
   import List from './list/List';
   import CreateTask from './create_tasks/CreateTasks';
   
   class Tasks extends Component {
      constructor(props) {
        super(props);
        this.state = {
          tasks: []
        };
        this.loadTasks = this.loadTasks.bind(this);
      }
      
      async loadTasks() {
        let response = await fetch(`http://localhost:3001/tasks`);
        const tasks = await response.json();
        this.setState({ tasks: tasks });
      }
      
      componentDidMount() {
        this.loadTasks();
      }

    render() {
       return (
         <Row>
           <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
             <p className="title">A Fazer</p>
             <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done !== true)}/>
             <CreateTask loadTasks={this.loadTasks}/>
           </Col>
           <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
             <p className="title">Feito</p>
             <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done === true)}/>
           </Col>
         </Row>
       );
     }
   }
   
   export default Tasks;