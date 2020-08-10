import http from '../http-common';

class PaymentService {

    getAll() {
        return http.get('/payment');
    }

    get(id) {
        return http.get(`/payment/${id}`);
    }

    create(data) {
        return http.post('/payment/', data);
    }

    delete(id) {
        return http.delete(`/payment/${id}`);
    }

    deleteAll() {
        return http.delete(`/payment`);
    }

    findByName(name) {
        return http.get(`/payment/name?q=${name}`);
    }
}

export default new PaymentService();