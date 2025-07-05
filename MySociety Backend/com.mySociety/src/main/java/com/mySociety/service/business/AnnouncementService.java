package com.mySociety.service.business;

import com.mySociety.model.orm.AnnouncementEntity;
import com.mySociety.model.orm.UserEntity;
import com.mySociety.model.view.AnnouncementView;
import com.mySociety.repository.AnnouncementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;

    @Autowired
    public AnnouncementService(AnnouncementRepository announcementRepository) {
        this.announcementRepository = announcementRepository;
    }

    public AnnouncementEntity createAnnouncement(AnnouncementView view, UserEntity user) {
        AnnouncementEntity announcement = new AnnouncementEntity();
        announcement.setTitle(view.getTitle());
        announcement.setContent(view.getContent());
        announcement.setCreatedAt(new Date());
        announcement.setCreatedBy(user);
        return announcementRepository.save(announcement);
    }

    public List<AnnouncementView> getAllAnnouncements() {
        return announcementRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::convertToView)
                .collect(Collectors.toList());
    }

    private AnnouncementView convertToView(AnnouncementEntity entity) {
        AnnouncementView view = new AnnouncementView();
        view.setId(entity.getAnnouncementId());
        view.setTitle(entity.getTitle());
        view.setContent(entity.getContent());
        view.setCreatedAt(entity.getCreatedAt());
        view.setCreatedBy(entity.getCreatedBy().getFullName());
        return view;
    }
}