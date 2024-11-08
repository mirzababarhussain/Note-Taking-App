import React, { useState, useEffect } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function NoteForm({ noteData, onSave, resetForm }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (noteData) {
            setTitle(noteData.title);
            setContent(noteData.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [noteData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ id: noteData?.id, title, content });
        resetForm(); 
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formContent" className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                        <Button variant="secondary" className="me-2" onClick={resetForm}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            {noteData ? 'Update Note' : 'Add Note'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default NoteForm;
