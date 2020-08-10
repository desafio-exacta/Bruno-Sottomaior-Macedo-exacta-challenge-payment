package com.payment.exacta.service.api;

import com.payment.exacta.rest.model.PaymentRequestParameter;
import com.payment.exacta.rest.model.PaymentResponseParameter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface PaymentService {
    Mono<PaymentResponseParameter> createPayment(PaymentRequestParameter userRequestParameter);

    Mono<PaymentResponseParameter> findById(Long id);

    Flux<PaymentResponseParameter> findAll();

    Mono<Void> deleteById(Long id);

    Flux<PaymentResponseParameter> findByNameLike(String name);

    Mono<Void> deleteAll();
}
