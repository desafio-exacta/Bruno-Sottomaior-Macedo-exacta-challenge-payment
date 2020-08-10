package com.payment.exacta.rest.api;

import com.payment.exacta.rest.model.PaymentRequestParameter;
import com.payment.exacta.rest.model.PaymentResponseParameter;
import com.payment.exacta.service.api.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:8081", maxAge = 3600)
@RestController
@RequestMapping("/payment")
@Slf4j
public class PaymentController {

    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<PaymentResponseParameter> createPayment(@RequestBody PaymentRequestParameter paymentRequestParameter) {
        return paymentService.createPayment(paymentRequestParameter);
    }

    @GetMapping
    public Flux<PaymentResponseParameter> findAll() {
        return paymentService.findAll();
    }

    @DeleteMapping("{id}")
    public Mono<Void> deleteById(@PathVariable("id") Long id) {
        return paymentService.deleteById(id);
    }

    @DeleteMapping
    public Mono<Void> deleteAll() {
        return paymentService.deleteAll();
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<PaymentResponseParameter>> findById(@PathVariable("id") Long id) {
        return paymentService.findById(id)
                .map(userResponseParameter -> ResponseEntity.ok().body(userResponseParameter));
    }

    @GetMapping("name")
    public Flux<PaymentResponseParameter> findByName(@RequestParam String q) {
        return paymentService.findByNameLike(q);
    }
}
