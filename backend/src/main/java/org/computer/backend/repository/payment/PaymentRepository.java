package org.computer.backend.repository.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Payment;

import java.util.UUID;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    Optional<Payment> findByOrderId(UUID orderId);
}

