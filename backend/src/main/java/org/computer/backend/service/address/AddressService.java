package org.computer.backend.service.address;

import org.computer.entity.entity.Address;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AddressService {
    Optional<Address> findById(UUID id);
    List<Address> findByUserId(UUID userId);
    Address save(Address address);
    void deleteById(UUID id);
}

