package org.computer.entity.dto;

import java.util.UUID;

/**
 * DTO for AuditLog
 */
public class AuditLogDto extends BaseDto {
    private String action;
    private String entityName;
    private String entityId;
    private String details;
    private UUID userId;

    public AuditLogDto() {
    }

    public AuditLogDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String action, String entityName) {
        super(id, createdAt, updatedAt);
        this.action = action;
        this.entityName = entityName;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityId() {
        return entityId;
    }

    public void setEntityId(String entityId) {
        this.entityId = entityId;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "AuditLogDto{" +
                "id=" + getId() +
                ", action='" + action + '\'' +
                ", entityName='" + entityName + '\'' +
                '}';
    }
}

