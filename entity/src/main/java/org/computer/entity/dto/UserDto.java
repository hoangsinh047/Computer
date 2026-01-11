package org.computer.entity.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.computer.entity.entity.Role;
import org.computer.entity.dto.AddressDto;

/**
 * DTO for User entity
 */
public class UserDto extends BaseDto {
    private String username;
    private String email;
    private Role role;
    private List<AddressDto> addresses = new ArrayList<>();
    private String phone;


    public UserDto() {
    }

    public UserDto(UUID id, java.time.Instant createdAt, java.time.Instant updatedAt, String username, String email, Role role, String phone) {
        super(id, createdAt, updatedAt);
        this.username = username;
        this.email = email;
        this.role = role;
        this.phone = phone;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<AddressDto> getAddresses() {
        return addresses;
    }

    public void setAddresses(List<AddressDto> addresses) {
        this.addresses = addresses;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "UserDto{" +
                "id=" + getId() +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", role=" + role +
                '}';
    }
}
