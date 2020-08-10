package com.payment.exacta.entity.dao;

import com.payment.exacta.entity.constant.commons.CollectionName;
import com.payment.exacta.entity.constant.fields.PaymentField;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name= CollectionName.PAYMENT)
public class Payment extends BaseEntity {

    public static final Long serialVersionUID = 1L;

    @Column(name= PaymentField.NAME)
    public String name;

    @Column(name = PaymentField.DESCRIPTION)
    public String description;

    @Column(name=PaymentField.VALUE)
    public BigDecimal value;

    @Column(name = PaymentField.DATE_TIME)
    public Date date;

    @Column(name=PaymentField.TAGS)
    public String tags;

}
