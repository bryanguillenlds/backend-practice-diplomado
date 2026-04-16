export default class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  createNote = async (req, res) => {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }
    try {
      const note = await this.noteService.createNote(payload);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getNoteByUserId = async (req, res) => {
    try {
      const notes = await this.noteService.getNoteByUserId(req.params.userId);
      res.status(200).json(notes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  getNoteById = async (req, res) => {
    try {
      const note = await this.noteService.getNoteById(req.params.id);
      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  updateNote = async (req, res) => {
    const payload = { ...req.body };
    if (req.file) {
      payload.image = `/uploads/${req.file.filename}`;
    }
    try {
      const note = await this.noteService.updateNote(req.params.id, payload);
      res.status(200).json(note);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  deleteNote = async (req, res) => {
    try {
      await this.noteService.deleteNote(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
