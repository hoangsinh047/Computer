package org.computer.backend.service.audit;

import org.computer.entity.entity.AuditLog;

import java.util.List;
import java.util.UUID;

public interface AuditLogService {
    AuditLog save(AuditLog log);
    List<AuditLog> findAll();
}

