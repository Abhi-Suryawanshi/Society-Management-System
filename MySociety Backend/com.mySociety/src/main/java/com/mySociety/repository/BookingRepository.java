package com.mySociety.repository;

import com.mySociety.model.orm.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Integer> {
    List<BookingEntity> findByResidentResidentId(Integer residentId);
    List<BookingEntity> findByFacilityFacilityId(Integer facilityId);
    List<BookingEntity> findByBookingDateAndFacilityFacilityIdAndStatusNot(Date bookingDate, Integer facilityId, String status);
}