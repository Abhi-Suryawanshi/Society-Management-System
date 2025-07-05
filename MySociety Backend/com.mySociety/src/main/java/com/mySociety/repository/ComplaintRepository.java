package com.mySociety.repository;

import com.mySociety.model.orm.ComplaintEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends JpaRepository<ComplaintEntity, Integer> {
    List<ComplaintEntity> findByResidentResidentId(Integer residentId);
    List<ComplaintEntity> findAllByOrderByCreatedAtDesc();
}