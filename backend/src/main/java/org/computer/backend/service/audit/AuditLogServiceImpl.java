package org.computer.backend.service.audit;

import org.computer.backend.repository.audit.AuditLogRepository;
import org.computer.entity.entity.AuditLog;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class AuditLogServiceImpl implements AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogServiceImpl(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Override
    @Transactional
    public AuditLog save(AuditLog log) {
        return auditLogRepository.save(log);
    }

    @Override
    public List<AuditLog> findAll() {
        return auditLogRepository.findAll();
    }
}

