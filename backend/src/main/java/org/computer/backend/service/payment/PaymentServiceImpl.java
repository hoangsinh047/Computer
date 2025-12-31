package org.computer.backend.service.payment;

import org.computer.backend.repository.payment.PaymentRepository;
import org.computer.entity.entity.Payment;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Optional<Payment> findById(UUID id) {
        return paymentRepository.findById(id);
    }

    @Override
    public Optional<Payment> findByOrderId(UUID orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    @Override
    @Transactional
    public Payment save(Payment payment) {
        return paymentRepository.save(payment);
    }
}

