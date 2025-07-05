package com.mySociety.model.orm;

import jakarta.persistence.*;

@Entity
@Table(name = "resident")
public class ResidentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resident_id")
    private Integer residentId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    @OneToOne
    @JoinColumn(name = "flat_id", nullable = false)
    private FlatEntity flat;

    @Column(name = "is_owner", nullable = false)
    private Boolean isOwner;

    // Getters and Setters
    public Integer getResidentId() {
        return residentId;
    }

    public void setResidentId(Integer residentId) {
        this.residentId = residentId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public FlatEntity getFlat() {
        return flat;
    }

    public void setFlat(FlatEntity flat) {
        this.flat = flat;
    }

    public Boolean getIsOwner() {
        return isOwner;
    }

    public void setIsOwner(Boolean isOwner) {
        this.isOwner = isOwner;
    }
}