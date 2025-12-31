package org.computer.entity.dto;

import java.util.UUID;

/**
 * DTO for Address entity
 */
public class AddressDto extends BaseDto {
    private String line1;
    private String line2;
    private String city;
    private String state;
    private String postalCode;
    private UUID userId;

    public AddressDto() {
    }

    public AddressDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String line1, String city, UUID userId) {
        super(id, createdAt, updatedAt);
        this.line1 = line1;
        this.city = city;
        this.userId = userId;
    }

    public String getLine1() {
        return line1;
    }

    public void setLine1(String line1) {
        this.line1 = line1;
    }

    public String getLine2() {
        return line2;
    }

    public void setLine2(String line2) {
        this.line2 = line2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "AddressDto{" +
                "id=" + getId() +
                ", line1='" + line1 + '\'' +
                ", city='" + city + '\'' +
                ", userId=" + userId +
                '}';
    }
}

