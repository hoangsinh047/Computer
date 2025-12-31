package org.computer.backend.service.address;

import org.computer.backend.repository.address.AddressRepository;
import org.computer.entity.entity.Address;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional(readOnly = true)
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    public AddressServiceImpl(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    @Override
    public Optional<Address> findById(UUID id) {
        return addressRepository.findById(id);
    }

    @Override
    public List<Address> findByUserId(UUID userId) {
        return addressRepository.findByUserId(userId);
    }

    @Override
    @Transactional
    public Address save(Address address) {
        return addressRepository.save(address);
    }

    @Override
    @Transactional
    public void deleteById(UUID id) {
        addressRepository.deleteById(id);
    }
}

