package com.mySociety.repository;

import com.mySociety.model.orm.ResidentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResidentRepository extends JpaRepository<ResidentEntity, Integer> {
    Optional<ResidentEntity> findByUserUserId(Integer userId);
}