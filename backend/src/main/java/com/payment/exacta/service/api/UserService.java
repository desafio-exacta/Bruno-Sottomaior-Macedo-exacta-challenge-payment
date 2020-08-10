package com.payment.exacta.service.api;


import com.payment.exacta.rest.model.UserRequestParameter;
import com.payment.exacta.rest.model.UserResponseParameter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {

  Mono<UserResponseParameter> createUser(String username, UserRequestParameter userRequestParameter);

  Mono<UserResponseParameter> findById(Long id);

  Flux<UserResponseParameter> findAll();

  Mono<Void> deleteById(Long id);
}
