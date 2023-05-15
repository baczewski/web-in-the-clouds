import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import Note from './models/note-model';

dotenv.config();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

let nextId = 1;

const notes: Note[] = [];

// The userId cannot be claimed, cause we don't have access to login logic

app.post('/notes', (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!(title && description)) {
        return res.status(400).json({ message: 'Missing title or description.' });
    }

    const id = nextId;

    const note: Note = {
        id,
        title,
        description
    };

    notes.push(note);
    nextId = nextId + 1;

    return res.status(200).json({ message: 'Created note successfully.' });
});

app.delete('/notes/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Missing note id parameter.' });
    }

    const existingNoteIndex = notes.findIndex((note) => note.id === Number(id));

    if (existingNoteIndex === -1) {
        return res.status(400).json({ message: 'Note with given id does not exist.' });
    }

    notes.splice(existingNoteIndex, 1);

    return res.status(200).json({ message: 'Deleted note successfully.' });
});

app.patch('/notes/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Missing note id parameter.' });
    }

    const existingNoteIndex = notes.findIndex((note) => note.id === Number(id));

    if (existingNoteIndex === -1) {
        return res.status(400).json({ message: 'Note with given id does not exist.' });
    }

    if (title) {
        notes[existingNoteIndex].title = title;
    }

    if (description) {
        notes[existingNoteIndex].description = description;
    }

    return res.status(200).json({ note: notes[existingNoteIndex] });
});

app.get('/notes/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Missing note id parameter.' });
    }

    const foundNote = notes.find((note) => note.id === Number(id));

    if (!foundNote) {
        return res.status(404).json({ message: 'Note with given id does not exist.' });
    }

    return res.status(200).json({ note: foundNote });
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello dude');
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));