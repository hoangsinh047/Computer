package org.computer.backend.repository.address;

import org.computer.entity.entity.Address;

import java.util.List;
import java.util.UUID;

public interface AddressRepositoryCustom {
    List<Address> findByUserIdCustom(UUID userId);
}

