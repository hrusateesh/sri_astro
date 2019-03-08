package com.sa.dao.pojo;

import java.util.Date;

import javax.persistence.*;

/**
 * The <code>AbstractDomainClass</code>
 *
 * @author Sateesh G
 * @version 1.0
 * @since 1.0
 */
@MappedSuperclass
public class AbstractDomainClass {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;

    private Date dateCreated;
    private Date lastUpdated;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public Date getLastUpdated() {
        return lastUpdated;
    }

    @PreUpdate
    @PrePersist
    public void updateTimeStamps() {
        lastUpdated = new Date();
        if (dateCreated==null) {
            dateCreated = new Date();
        }
    }
}