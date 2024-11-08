import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

function NoteList({ notes, onDelete, onEdit }) {
    return (
        <ListGroup>
            {notes.map((note) => (
                <Card key={note.id} className="mb-3">
                    <Card.Body>
                        <Card.Title>{note.title}</Card.Title>
                        <Card.Text>{note.content}</Card.Text>
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="primary"
                                className="me-2"
                                onClick={() => onEdit(note)}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => onDelete(note.id)}
                            >
                                Delete
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            ))}
        </ListGroup>
    );
}

export default NoteList;
