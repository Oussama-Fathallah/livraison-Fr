package com.app.livraison.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import jakarta.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private Double price;
    private String imageUrl;
    private Double averageRating;
    
    @ElementCollection
    private List<String> ingredients;

    @ManyToMany(mappedBy = "meals")
    @JsonIgnore
    private List<Order> orders;


    @ManyToOne
    @JoinColumn(name = "restaurant_id") // Clé étrangère dans la table Meal
    private Restaurant restaurant;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
