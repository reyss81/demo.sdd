package com.demo.backend.service;

import com.demo.backend.dto.NoteDto;
import com.demo.backend.entity.Note;
import com.demo.backend.exception.ResourceNotFoundException;
import com.demo.backend.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    private final NoteRepository repository;

    public NoteService(NoteRepository repository) {
        this.repository = repository;
    }

    public List<Note> getAll() {
        return repository.findAll();
    }

    public Note getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Note not found with id: " + id));
    }

    public Note create(NoteDto dto) {
        Note note = new Note();
        note.setTitle(dto.getTitle());
        note.setContent(dto.getContent());
        return repository.save(note);
    }

    public Note update(Long id, NoteDto dto) {
        Note note = getById(id);
        note.setTitle(dto.getTitle());
        note.setContent(dto.getContent());
        return repository.save(note);
    }

    public void delete(Long id) {
        Note note = getById(id);
        repository.delete(note);
    }
}
