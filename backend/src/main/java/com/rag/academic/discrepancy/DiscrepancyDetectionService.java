package com.rag.academic.discrepancy;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DiscrepancyDetectionService {

    public List<DiscrepancyReport> detectDiscrepancies(UUID courseId) {
        return List.of();
    }
}
