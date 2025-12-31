package org.computer.backend.repository.address;

import org.springframework.data.jpa.repository.JpaRepository;
import org.computer.entity.entity.Address;

import java.util.List;
import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {
    List<Address> findByUserId(UUID userId);
}

