package com.payment.exacta.rest.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseParameter implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;

    private Long version;

    private Date createdDate;

    private String createdBy;

    private Date updatedDate;

    private String updatedBy;

    private Integer isDeleted;

    private String username;

    private String name;

    public String description;

    public BigDecimal value;

    public Date date;

    public String tags;
}
