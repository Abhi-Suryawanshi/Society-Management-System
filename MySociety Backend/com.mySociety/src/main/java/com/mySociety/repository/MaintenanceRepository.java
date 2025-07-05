package com.mySociety.repository;

import com.mySociety.model.orm.MaintenanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRepository extends JpaRepository<MaintenanceEntity, Integer> {
    List<MaintenanceEntity> findByFlatFlatId(Integer flatId);
    List<MaintenanceEntity> findByFlatFlatIdAndStatus(Integer flatId, String status);
}