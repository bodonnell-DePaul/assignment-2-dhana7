// Dhanalakshmi
import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import todos from './todoItems'; 


const getColorVariant = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const differenceInDays = (due - today) / (1000 * 60 * 60 * 24);

    if (differenceInDays > 7) return 'primary';    // More than 7 days
    if (differenceInDays > 4) return 'success';    // Between 4 and 7 days
    if (differenceInDays > 2) return 'warning';    // Between 2 and 4 days
    return 'danger';                               // Less than 2 days
};

const ToDoList = () => {
    const [todoItems, setTodoItems] = useState(todos);

    const handleDescriptionEdit = (index, newDescription) => {
        const updatedItems = [...todoItems];
        updatedItems[index].description = newDescription;
        setTodoItems(updatedItems);
    };

    const handleDueDateEdit = (index, newDueDate) => {
        const updatedItems = [...todoItems];
        updatedItems[index].dueDate = newDueDate;
        setTodoItems(updatedItems);
    };

    return (
        <Container>
            <h1>Assignment 2: Dhana ToDo List</h1>

            {}
            <Tab.Container id="todo-list-tabs" defaultActiveKey="#todo0">
                <Row>
                    <Col sm={4}>
                        <ListGroup>
                            {todoItems.map((todo, index) => (
                                <ListGroup.Item 
                                    action 
                                    href={`#todo${index}`} 
                                    key={index} 
                                    variant={getColorVariant(todo.dueDate)}
                                >
                                    {todo.title}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>

                    <Col sm={8}>
                        <Tab.Content>
                            {todoItems.map((todo, index) => (
                                <Tab.Pane eventKey={`#todo${index}`} key={index}>
                                    <h3>{todo.title}</h3>
                                    <p
                                        contentEditable
                                        onBlur={(e) => handleDescriptionEdit(index, e.target.innerText)}
                                    >
                                        {todo.description}
                                    </p>
                                    <Form.Group controlId="formDueDate">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={todo.dueDate}
                                            onChange={(e) => handleDueDateEdit(index, e.target.value)}
                                        />
                                    </Form.Group>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

            {}
            <Form>
                <Form.Group controlId="formNewTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter new ToDo title" />
                </Form.Group>

                <Form.Group controlId="formNewDueDate">
                    <Form.Label>Due Date</Form.Label>
                    <Form.Control type="date" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Add New ToDo
                </Button>
            </Form>
        </Container>
    );
};

export default ToDoList;