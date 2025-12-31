package org.computer.entity.dto;

import java.math.BigDecimal;
import java.util.UUID;

import org.computer.entity.entity.PaymentStatus;

/**
 * DTO for Payment
 */
public class PaymentDto extends BaseDto {
    private UUID orderId;
    private BigDecimal amount;
    private PaymentStatus status;
    private String transactionId;

    public PaymentDto() {
    }

    public PaymentDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, UUID orderId, BigDecimal amount, PaymentStatus status) {
        super(id, createdAt, updatedAt);
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
    }

    public UUID getOrderId() {
        return orderId;
    }

    public void setOrderId(UUID orderId) {
        this.orderId = orderId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public String toString() {
        return "PaymentDto{" +
                "id=" + getId() +
                ", orderId=" + orderId +
                ", amount=" + amount +
                ", status=" + status +
                '}';
    }
}

