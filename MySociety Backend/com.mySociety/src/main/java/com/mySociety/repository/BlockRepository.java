package com.mySociety.repository;

import com.mySociety.model.orm.BlockEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlockRepository extends JpaRepository<BlockEntity, Integer> {
}