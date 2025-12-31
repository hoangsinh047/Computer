package org.computer.entity.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * DTO for Category entity (includes minimal parent/children ids)
 */
public class CategoryDto extends BaseDto {
    private String name;
    private UUID parentId;
    private List<UUID> childrenIds = new ArrayList<>();

    public CategoryDto() {
    }

    public CategoryDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String name, UUID parentId) {
        super(id, createdAt, updatedAt);
        this.name = name;
        this.parentId = parentId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getParentId() {
        return parentId;
    }

    public void setParentId(UUID parentId) {
        this.parentId = parentId;
    }

    public List<UUID> getChildrenIds() {
        return childrenIds;
    }

    public void setChildrenIds(List<UUID> childrenIds) {
        this.childrenIds = childrenIds;
    }

    @Override
    public String toString() {
        return "CategoryDto{" +
                "id=" + getId() +
                ", name='" + name + '\'' +
                ", parentId=" + parentId +
                '}';
    }
}

