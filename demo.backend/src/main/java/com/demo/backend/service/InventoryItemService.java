package com.demo.backend.service;

import com.demo.backend.dto.InventoryItemDto;
import com.demo.backend.entity.InventoryItem;
import com.demo.backend.exception.ResourceNotFoundException;
import com.demo.backend.repository.InventoryItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryItemService {

    private final InventoryItemRepository repository;

    public InventoryItemService(InventoryItemRepository repository) {
        this.repository = repository;
    }

    public List<InventoryItem> getAll() {
        return repository.findAll();
    }

    public InventoryItem getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("InventoryItem not found with id: " + id));
    }

    public InventoryItem create(InventoryItemDto dto) {
        InventoryItem item = new InventoryItem();
        item.setName(dto.getName());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        return repository.save(item);
    }

    public InventoryItem update(Long id, InventoryItemDto dto) {
        InventoryItem item = getById(id);
        item.setName(dto.getName());
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        return repository.save(item);
    }

    public void delete(Long id) {
        InventoryItem item = getById(id);
        repository.delete(item);
    }
}
