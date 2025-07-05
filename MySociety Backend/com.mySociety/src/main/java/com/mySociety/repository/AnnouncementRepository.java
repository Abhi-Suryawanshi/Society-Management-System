package com.mySociety.repository;

import com.mySociety.model.orm.AnnouncementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<AnnouncementEntity, Integer> {
    List<AnnouncementEntity> findAllByOrderByCreatedAtDesc();
}