package com.mySociety.repository;

import com.mySociety.model.orm.FacilityEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacilityRepository extends JpaRepository<FacilityEntity, Integer> {
    List<FacilityEntity> findByIsAvailableTrue();
}