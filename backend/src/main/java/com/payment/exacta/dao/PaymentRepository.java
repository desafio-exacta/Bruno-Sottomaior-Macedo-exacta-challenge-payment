package com.payment.exacta.dao;

import com.payment.exacta.entity.dao.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PaymentRepository  extends JpaRepository<Payment, Long>, JpaSpecificationExecutor<Payment> {


    List<Payment> findPaymentByNameLike(String name);

    @Query("select p from Payment p WHERE upper(p.name) like upper(concat('%', ?1,'%'))")
    List<Payment> findByName(String name);

}
