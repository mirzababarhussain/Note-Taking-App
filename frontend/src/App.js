import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import { fetchNotes, createNote, updateNote, deleteNote } from './api/noteApi';
import { Container, Row, Col, Button, InputGroup, Alert } from 'react-bootstrap';

function App() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchNotes(page, searchQuery).then((res) => {
            setNotes(res.data.data);
            setTotalPages(res.data.last_page);
        });
    }, [page, searchQuery]);

    const handleCreate = async (noteData) => {
        const newNote = await createNote(noteData);
        setNotes([...notes, newNote.data]);
        setAlertMessage('Note created successfully!');
        setAlertVariant('success');
        clearAlert();
    };

    const handleUpdate = async (noteData) => {
        const updatedNote = await updateNote(noteData.id, noteData);
        setNotes(notes.map(note => note.id === updatedNote.data.id ? updatedNote.data : note));
        setAlertMessage('Note updated successfully!');
        setAlertVariant('success');
        clearAlert();
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
        setAlertMessage('Note deleted successfully!');
        setAlertVariant('danger');
        clearAlert();
    };

    const clearAlert = () => {
        setTimeout(() => setAlertMessage(''), 3000); // Clear alert after 3 seconds
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPage(1); // Reset to first page when searching
    };

    return (
        <Container className="my-4">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <h4 className="text-center mb-4">Note-Taking Application<br/>Crafted by: Babar Hussain Mughal</h4>

                    {/* Alert Message */}
                    {alertMessage && (
                        <Alert variant={alertVariant} onClose={() => setAlertMessage('')} dismissible>
                            {alertMessage}
                        </Alert>
                    )}

                    {/* Search Input */}
                    <InputGroup className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search notes..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </InputGroup>

                  
                    <NoteForm
                        noteData={selectedNote}
                        onSave={(note) => {
                            if (selectedNote) {
                                handleUpdate(note);
                            } else {
                                handleCreate(note);
                            }
                            setSelectedNote(null); 
                        }}
                        resetForm={() => setSelectedNote(null)} 
                    />

                    <NoteList
                        notes={notes}
                        onDelete={handleDelete}
                        onEdit={(note) => setSelectedNote(note)} 
                    />

                   
                    <div className="d-flex justify-content-between mt-4">
                        <Button
                            variant="secondary"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span>Page {page} of {totalPages}</span>
                        <Button
                            variant="secondary"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
