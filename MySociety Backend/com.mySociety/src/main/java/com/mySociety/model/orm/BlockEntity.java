package com.mySociety.model.orm;

import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "block")
public class BlockEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "block_id")
    private Integer blockId;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "block", cascade = CascadeType.ALL)
    private Set<FlatEntity> flats;

    // Getters and Setters
    public Integer getBlockId() {
        return blockId;
    }

    public void setBlockId(Integer blockId) {
        this.blockId = blockId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<FlatEntity> getFlats() {
        return flats;
    }

    public void setFlats(Set<FlatEntity> flats) {
        this.flats = flats;
    }
}