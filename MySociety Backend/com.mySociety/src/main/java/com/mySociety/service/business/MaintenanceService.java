package com.mySociety.service.business;

import com.mySociety.model.orm.FlatEntity;
import com.mySociety.model.orm.ResidentEntity;
import com.mySociety.model.orm.MaintenanceEntity;
import com.mySociety.model.view.MaintenanceView;
import com.mySociety.repository.FlatRepository;
import com.mySociety.repository.MaintenanceRepository;
import com.mySociety.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceService {
    private final MaintenanceRepository maintenanceRepository;
    private final FlatRepository flatRepository;
    private final ResidentRepository residentRepository;

    @Autowired
    public MaintenanceService(MaintenanceRepository maintenanceRepository,
                            FlatRepository flatRepository,
                            ResidentRepository residentRepository) {
        this.maintenanceRepository = maintenanceRepository;
        this.flatRepository = flatRepository;
        this.residentRepository = residentRepository;
    }

    public MaintenanceEntity createMaintenance(MaintenanceView view) {
        FlatEntity flat = flatRepository.findById(view.getFlatId())
                .orElseThrow(() -> new RuntimeException("Flat not found"));

        MaintenanceEntity maintenance = new MaintenanceEntity();
        maintenance.setFlat(flat);
        maintenance.setAmount(view.getAmount());
        maintenance.setDueDate(view.getDueDate());
        maintenance.setStatus("PENDING");
        maintenance.setDescription(view.getDescription());

        return maintenanceRepository.save(maintenance);
    }

    public List<MaintenanceView> getFlatMaintenance(Integer flatId) {
        return maintenanceRepository.findByFlatFlatId(flatId).stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public List<MaintenanceView> getUserMaintenance(Integer userId) {
        ResidentEntity resident = residentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        return maintenanceRepository.findByFlatFlatId(resident.getFlat().getFlatId()).stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public MaintenanceEntity updateMaintenancePayment(Integer maintenanceId) {
        MaintenanceEntity maintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new RuntimeException("Maintenance record not found"));

        maintenance.setStatus("PAID");
        maintenance.setPaidDate(new Date());
        return maintenanceRepository.save(maintenance);
    }

    private MaintenanceView convertToView(MaintenanceEntity entity) {
        MaintenanceView view = new MaintenanceView();
        view.setId(entity.getMaintenanceId());
        view.setFlatId(entity.getFlat().getFlatId());
        view.setFlatNumber(entity.getFlat().getNumber());
        view.setBlockName(entity.getFlat().getBlock().getName());
        view.setAmount(entity.getAmount());
        view.setDueDate(entity.getDueDate());
        view.setPaidDate(entity.getPaidDate());
        view.setStatus(entity.getStatus());
        view.setDescription(entity.getDescription());
        return view;
    }
    
    public List<MaintenanceView> getAllMaintenance() {
        return maintenanceRepository.findAll().stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }
}