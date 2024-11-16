package com.app.livraison.service;


import com.app.livraison.entities.Order;
import com.app.livraison.repositorie.CommentRepository;
import com.app.livraison.repositorie.OrderRepository;
import com.app.livraison.entities.Comment;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final CommentRepository commentRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Comment addCommentToOrder(Long orderId, Comment comment) {
        Order order = orderRepository.findById(orderId).orElse(null);
        if (order != null) {
            comment.setOrder(order);
            return commentRepository.save(comment);
        }
        return null;
    }
}
