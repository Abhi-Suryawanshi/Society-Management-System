package com.mySociety.controller;

import com.mySociety.model.orm.UserEntity;
import com.mySociety.model.view.*;
import com.mySociety.service.business.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/resident")
public class ResidentController {
    private final AnnouncementService announcementService;
    private final FacilityService facilityService;
    private final BookingService bookingService;
    private final ComplaintService complaintService;
    private final MaintenanceService maintenanceService;

    @Autowired
    public ResidentController(AnnouncementService announcementService,
                            FacilityService facilityService,
                            BookingService bookingService,
                            ComplaintService complaintService,
                            MaintenanceService maintenanceService) {
        this.announcementService = announcementService;
        this.facilityService = facilityService;
        this.bookingService = bookingService;
        this.complaintService = complaintService;
        this.maintenanceService = maintenanceService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model, @AuthenticationPrincipal UserEntity user) {
        model.addAttribute("user", user);
        return "resident/dashboard";
    }

    // Announcements
    @GetMapping("/announcements")
    public String announcements(Model model) {
        List<AnnouncementView> announcements = announcementService.getAllAnnouncements();
        model.addAttribute("announcements", announcements);
        return "resident/announcements";
    }

    // Facilities
    @GetMapping("/facilities")
    public String facilities(Model model) {
        List<FacilityView> facilities = facilityService.getAvailableFacilities();
        model.addAttribute("facilities", facilities);
        return "resident/facilities";
    }

    // Bookings
    @GetMapping("/bookings")
    public String bookings(Model model, @AuthenticationPrincipal UserEntity user) {
        List<BookingView> bookings = bookingService.getUserBookings(user.getUserId());
        model.addAttribute("bookings", bookings);
        model.addAttribute("newBooking", new BookingView());
        return "resident/bookings";
    }

    @PostMapping("/bookings")
    public String createBooking(@ModelAttribute("newBooking") BookingView booking,
                              @AuthenticationPrincipal UserEntity user) {
        bookingService.createBooking(booking, user.getUserId());
        return "redirect:/resident/bookings";
    }

    // Complaints
    @GetMapping("/complaints")
    public String complaints(Model model, @AuthenticationPrincipal UserEntity user) {
        List<ComplaintView> complaints = complaintService.getUserComplaints(user.getUserId());
        model.addAttribute("complaints", complaints);
        model.addAttribute("newComplaint", new ComplaintView());
        return "resident/complaints";
    }

    @PostMapping("/complaints")
    public String createComplaint(@ModelAttribute("newComplaint") ComplaintView complaint,
                                @AuthenticationPrincipal UserEntity user) {
        complaintService.createComplaint(complaint, user.getUserId());
        return "redirect:/resident/complaints";
    }

    // Maintenance
    @GetMapping("/maintenance")
    public String maintenance(Model model, @AuthenticationPrincipal UserEntity user) {
        List<MaintenanceView> maintenanceRecords = maintenanceService.getUserMaintenance(user.getUserId());
        model.addAttribute("maintenanceRecords", maintenanceRecords);
        return "resident/maintenance";
    }

    @PostMapping("/maintenance/{id}/pay")
    public String payMaintenance(@PathVariable Integer id) {
        maintenanceService.updateMaintenancePayment(id);
        return "redirect:/resident/maintenance";
    }
}