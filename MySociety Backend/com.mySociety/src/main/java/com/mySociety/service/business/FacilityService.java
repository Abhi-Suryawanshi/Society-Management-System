package com.mySociety.service.business;

import com.mySociety.model.orm.FacilityEntity;
import com.mySociety.model.view.FacilityView;
import com.mySociety.repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacilityService {
    private final FacilityRepository facilityRepository;

    @Autowired
    public FacilityService(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    public FacilityEntity createFacility(FacilityView view) {
        FacilityEntity facility = new FacilityEntity();
        facility.setName(view.getName());
        facility.setDescription(view.getDescription());
        facility.setLocation(view.getLocation());
        facility.setCapacity(view.getCapacity());
        facility.setIsAvailable(true);
        return facilityRepository.save(facility);
    }

    public List<FacilityView> getAllFacilities() {
        return facilityRepository.findAll().stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public List<FacilityView> getAvailableFacilities() {
        return facilityRepository.findByIsAvailableTrue().stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    private FacilityView convertToView(FacilityEntity entity) {
        FacilityView view = new FacilityView();
        view.setId(entity.getFacilityId());
        view.setName(entity.getName());
        view.setDescription(entity.getDescription());
        view.setLocation(entity.getLocation());
        view.setCapacity(entity.getCapacity());
        view.setAvailable(entity.getIsAvailable());
        return view;
    }
}