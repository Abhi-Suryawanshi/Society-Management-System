package com.mySociety.service.business;

import com.mySociety.model.orm.BookingEntity;
import com.mySociety.model.orm.FacilityEntity;
import com.mySociety.model.orm.ResidentEntity;
import com.mySociety.model.view.BookingView;
import com.mySociety.repository.BookingRepository;
import com.mySociety.repository.FacilityRepository;
import com.mySociety.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final FacilityRepository facilityRepository;
    private final ResidentRepository residentRepository;

    @Autowired
    public BookingService(BookingRepository bookingRepository, 
                         FacilityRepository facilityRepository,
                         ResidentRepository residentRepository) {
        this.bookingRepository = bookingRepository;
        this.facilityRepository = facilityRepository;
        this.residentRepository = residentRepository;
    }

    public BookingEntity createBooking(BookingView view, Integer userId) {
        ResidentEntity resident = residentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        FacilityEntity facility = facilityRepository.findById(view.getFacilityId())
                .orElseThrow(() -> new RuntimeException("Facility not found"));

        if (!facility.getIsAvailable()) {
            throw new RuntimeException("Facility is not available for booking");
        }

        // Check for conflicting bookings
        List<BookingEntity> conflicts = bookingRepository.findByBookingDateAndFacilityFacilityIdAndStatusNot(
                view.getBookingDate(), 
                view.getFacilityId(), 
                "REJECTED");

        for (BookingEntity existing : conflicts) {
            if (timeOverlap(existing.getStartTime(), existing.getEndTime(), view.getStartTime(), view.getEndTime())) {
                throw new RuntimeException("Facility is already booked for the selected time slot");
            }
        }

        BookingEntity booking = new BookingEntity();
        booking.setFacility(facility);
        booking.setResident(resident);
        booking.setBookingDate(view.getBookingDate());
        booking.setStartTime(view.getStartTime());
        booking.setEndTime(view.getEndTime());
        booking.setStatus("PENDING");
        booking.setCreatedAt(new Date());

        return bookingRepository.save(booking);
    }

    public List<BookingView> getUserBookings(Integer userId) {
        ResidentEntity resident = residentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        return bookingRepository.findByResidentResidentId(resident.getResidentId()).stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public List<BookingView> getAllBookings() {
        return bookingRepository.findAll().stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public BookingEntity updateBookingStatus(Integer bookingId, String status) {
        BookingEntity booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    private boolean timeOverlap(Date start1, Date end1, Date start2, Date end2) {
        return start1.before(end2) && start2.before(end1);
    }

    private BookingView convertToView(BookingEntity entity) {
        BookingView view = new BookingView();
        view.setId(entity.getBookingId());
        view.setFacilityId(entity.getFacility().getFacilityId());
        view.setFacilityName(entity.getFacility().getName());
        view.setResidentId(entity.getResident().getResidentId());
        view.setResidentName(entity.getResident().getUser().getFullName());
        view.setBookingDate(entity.getBookingDate());
        view.setStartTime(entity.getStartTime());
        view.setEndTime(entity.getEndTime());
        view.setStatus(entity.getStatus());
        view.setCreatedAt(entity.getCreatedAt());
        return view;
    }
}