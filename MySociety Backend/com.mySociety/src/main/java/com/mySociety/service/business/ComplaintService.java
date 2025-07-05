package com.mySociety.service.business;

import com.mySociety.model.orm.ComplaintEntity;
import com.mySociety.model.orm.ResidentEntity;
import com.mySociety.model.view.ComplaintView;
import com.mySociety.repository.ComplaintRepository;
import com.mySociety.repository.ResidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final ResidentRepository residentRepository;

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository, 
                          ResidentRepository residentRepository) {
        this.complaintRepository = complaintRepository;
        this.residentRepository = residentRepository;
    }

    public ComplaintEntity createComplaint(ComplaintView view, Integer userId) {
        ResidentEntity resident = residentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        ComplaintEntity complaint = new ComplaintEntity();
        complaint.setResident(resident);
        complaint.setTitle(view.getTitle());
        complaint.setDescription(view.getDescription());
        complaint.setStatus("OPEN");
        complaint.setCreatedAt(new Date());

        return complaintRepository.save(complaint);
    }

    public List<ComplaintView> getUserComplaints(Integer userId) {
        ResidentEntity resident = residentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Resident not found"));

        return complaintRepository.findByResidentResidentId(resident.getResidentId()).stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public List<ComplaintView> getAllComplaints() {
        return complaintRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    public ComplaintEntity updateComplaintStatus(Integer complaintId, String status, String resolutionDetails) {
        ComplaintEntity complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status);
        if (status.equals("RESOLVED") || status.equals("CLOSED")) {
            complaint.setResolvedAt(new Date());
            complaint.setResolutionDetails(resolutionDetails);
        }
        return complaintRepository.save(complaint);
    }

    private ComplaintView convertToView(ComplaintEntity entity) {
        ComplaintView view = new ComplaintView();
        view.setId(entity.getComplaintId());
        view.setTitle(entity.getTitle());
        view.setDescription(entity.getDescription());
        view.setStatus(entity.getStatus());
        view.setCreatedAt(entity.getCreatedAt());
        view.setResolvedAt(entity.getResolvedAt());
        view.setResolutionDetails(entity.getResolutionDetails());
        view.setResidentId(entity.getResident().getResidentId());
        view.setResidentName(entity.getResident().getUser().getFullName());
        return view;
    }
}