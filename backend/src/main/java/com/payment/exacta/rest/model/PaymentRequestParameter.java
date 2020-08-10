package com.payment.exacta.rest.model;

import com.payment.exacta.entity.constant.fields.PaymentField;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequestParameter implements Serializable {

    private static final long serialVersionUID = 1L;

    public String name;

    public String description;

    public BigDecimal value;

    public Date date;

    public String tags;
}
