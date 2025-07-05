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
@RequestMapping("/admin")
public class AdminController {
    private final AnnouncementService announcementService;
    private final FacilityService facilityService;
    private final BookingService bookingService;
    private final ComplaintService complaintService;
    private final MaintenanceService maintenanceService;
    private final UserService userService;

    @Autowired
    public AdminController(AnnouncementService announcementService,
                         FacilityService facilityService,
                         BookingService bookingService,
                         ComplaintService complaintService,
                         MaintenanceService maintenanceService,
                         UserService userService) {
        this.announcementService = announcementService;
        this.facilityService = facilityService;
        this.bookingService = bookingService;
        this.complaintService = complaintService;
        this.maintenanceService = maintenanceService;
        this.userService = userService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model, @AuthenticationPrincipal UserEntity user) {
        model.addAttribute("user", user);
        return "admin/dashboard";
    }

    // Announcement Management
    @GetMapping("/announcements")
    public String announcements(Model model) {
        List<AnnouncementView> announcements = announcementService.getAllAnnouncements();
        model.addAttribute("announcements", announcements);
        model.addAttribute("newAnnouncement", new AnnouncementView());
        return "admin/announcements";
    }

    @PostMapping("/announcements")
    public String createAnnouncement(@ModelAttribute("newAnnouncement") AnnouncementView announcement,
                                   @AuthenticationPrincipal UserEntity user) {
        announcementService.createAnnouncement(announcement, user);
        return "redirect:/admin/announcements";
    }

    // Facility Management
    @GetMapping("/facilities")
    public String facilities(Model model) {
        List<FacilityView> facilities = facilityService.getAllFacilities();
        model.addAttribute("facilities", facilities);
        model.addAttribute("newFacility", new FacilityView());
        return "admin/facilities";
    }

    @PostMapping("/facilities")
    public String createFacility(@ModelAttribute("newFacility") FacilityView facility) {
        facilityService.createFacility(facility);
        return "redirect:/admin/facilities";
    }

    // Booking Management
    @GetMapping("/bookings")
    public String bookings(Model model) {
        List<BookingView> bookings = bookingService.getAllBookings();
        model.addAttribute("bookings", bookings);
        return "admin/bookings";
    }

    @PostMapping("/bookings/{id}/approve")
    public String approveBooking(@PathVariable Integer id) {
        bookingService.updateBookingStatus(id, "APPROVED");
        return "redirect:/admin/bookings";
    }

    @PostMapping("/bookings/{id}/reject")
    public String rejectBooking(@PathVariable Integer id) {
        bookingService.updateBookingStatus(id, "REJECTED");
        return "redirect:/admin/bookings";
    }

    // Complaint Management
    @GetMapping("/complaints")
    public String complaints(Model model) {
        List<ComplaintView> complaints = complaintService.getAllComplaints();
        model.addAttribute("complaints", complaints);
        return "admin/complaints";
    }

    @PostMapping("/complaints/{id}/resolve")
    public String resolveComplaint(@PathVariable Integer id,
                                 @RequestParam String resolutionDetails) {
        complaintService.updateComplaintStatus(id, "RESOLVED", resolutionDetails);
        return "redirect:/admin/complaints";
    }

    // Maintenance Management
    @GetMapping("/maintenance")
    public String maintenance(Model model) {
        List<MaintenanceView> maintenanceRecords = maintenanceService.getAllMaintenance();
        model.addAttribute("maintenanceRecords", maintenanceRecords);
        model.addAttribute("newMaintenance", new MaintenanceView());
        return "admin/maintenance";
    }

    @PostMapping("/maintenance")
    public String createMaintenance(@ModelAttribute("newMaintenance") MaintenanceView maintenance) {
        maintenanceService.createMaintenance(maintenance);
        return "redirect:/admin/maintenance";
    }

    // User Management
    @GetMapping("/users")
    public String users(Model model) {
        List<UserView> users = userService.getAllUsers();
        model.addAttribute("users", users);
        model.addAttribute("newUser", new UserRegistration());
        return "admin/users";
    }

    @PostMapping("/users")
    public String createUser(@ModelAttribute("newUser") UserRegistration registration) {
        userService.registerUser(registration, false);
        return "redirect:/admin/users";
    }
}