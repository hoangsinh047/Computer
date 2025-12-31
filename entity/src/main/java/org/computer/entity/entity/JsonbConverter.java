package org.computer.entity.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Converter(autoApply = false)
public class JsonbConverter implements AttributeConverter<Object, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(Object attribute) {
        if (attribute == null) return null;
        try {
            return MAPPER.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to convert object to JSON string", e);
        }
    }

    @Override
    public Object convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        try {
            return MAPPER.readValue(dbData, Object.class);
        } catch (JsonProcessingException e) {
            throw new IllegalStateException("Failed to convert JSON string to object", e);
        }
    }
}

