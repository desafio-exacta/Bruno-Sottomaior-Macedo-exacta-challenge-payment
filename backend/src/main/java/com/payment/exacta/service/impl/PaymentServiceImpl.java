package com.payment.exacta.service.impl;

import com.payment.exacta.dao.PaymentRepository;
import com.payment.exacta.entity.dao.Payment;
import com.payment.exacta.libraries.BeanMapper;
import com.payment.exacta.rest.model.PaymentRequestParameter;
import com.payment.exacta.rest.model.PaymentResponseParameter;
import com.payment.exacta.service.api.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.naming.NotContextException;
import javax.transaction.Transactional;

@Service
@Transactional
@Slf4j
public class PaymentServiceImpl implements PaymentService {

    private PaymentRepository paymentRepository;

    public PaymentServiceImpl(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Mono<PaymentResponseParameter> createPayment(PaymentRequestParameter paymentRequestParameter) {
        Payment payment = BeanMapper.map(paymentRequestParameter, Payment.class);
        payment.setUsername(paymentRequestParameter.name);
        return Mono.just(paymentRepository.save(payment))
                .map(response -> com.payment.exacta.libraries.BeanMapper.map(response, PaymentResponseParameter.class))
                .switchIfEmpty(Mono.defer(() -> Mono.error(new Exception("Falha ao salvar os dados."))));
    }

    @Override
    public Mono<PaymentResponseParameter> findById(Long id) {
        return Mono.just(paymentRepository.findById(id))
                .flatMap(payment -> {
                    if (!payment.isPresent()){
                        return Mono.error(new Exception("Id não Existe."));
                    }
                    return Mono.just(BeanMapper.map(payment.get(), PaymentResponseParameter.class));
                });
    }

    @Override
    public Flux<PaymentResponseParameter> findAll() {
        return Flux.fromIterable(paymentRepository.findAll())
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotContextException("Não há pagamentos."))))
                .map(payment -> BeanMapper.map(payment, PaymentResponseParameter.class));
    }

    @Override
    public Mono<Void> deleteById(Long id) {
        paymentRepository.deleteById(id);
        return Mono.empty();
    }

    @Override
    public Flux<PaymentResponseParameter> findByNameLike(String name) {
        return Flux.fromIterable(paymentRepository.findByName(name))
                .switchIfEmpty(Mono.defer(() -> Mono.error(new NotContextException("Não há pagamentos."))))
                .map(payment -> BeanMapper.map(payment, PaymentResponseParameter.class));
    }

    @Override
    public Mono<Void> deleteAll() {
        paymentRepository.deleteAll();
        return Mono.empty();
    }
}
