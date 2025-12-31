package org.computer.backend.service.payment;

import org.computer.entity.entity.Payment;

import java.util.Optional;
import java.util.UUID;

public interface PaymentService {
    Optional<Payment> findById(UUID id);
    Optional<Payment> findByOrderId(UUID orderId);
    Payment save(Payment payment);
}

