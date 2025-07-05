package com.mySociety.model.orm;

import jakarta.persistence.*;

@Entity
@Table(name = "flat")
public class FlatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flat_id")
    private Integer flatId;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "floor", nullable = false)
    private Integer floor;

    @Column(name = "area")
    private Double area;

    @ManyToOne
    @JoinColumn(name = "block_id", nullable = false)
    private BlockEntity block;

    @OneToOne(mappedBy = "flat", cascade = CascadeType.ALL)
    private ResidentEntity resident;

    // Getters and Setters
    public Integer getFlatId() {
        return flatId;
    }

    public void setFlatId(Integer flatId) {
        this.flatId = flatId;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Double getArea() {
        return area;
    }

    public void setArea(Double area) {
        this.area = area;
    }

    public BlockEntity getBlock() {
        return block;
    }

    public void setBlock(BlockEntity block) {
        this.block = block;
    }

    public ResidentEntity getResident() {
        return resident;
    }

    public void setResident(ResidentEntity resident) {
        this.resident = resident;
    }
}