package org.computer.backend.repository.audit;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.AuditLog;

import java.util.UUID;

public interface AuditLogRepository extends JpaRepository<AuditLog, UUID> {
}

