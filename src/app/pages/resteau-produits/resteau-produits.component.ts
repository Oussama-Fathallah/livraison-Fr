import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-resteau-produits',
  templateUrl: './resteau-produits.component.html',
  styleUrls: ['./resteau-produits.component.css']
})
export class ResteauProduitsComponent implements OnInit {
  restaurant: any = {};
  meals: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.fetchRestaurantDetails(id);
  }

  fetchRestaurantDetails(id: number): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    this.http.get<any>(`http://localhost:8080/api/restaurants/${id}`, { headers }).subscribe(
      (data) => {
        this.restaurant = data;
        this.meals = data.meals;
        console.log(this.meals); // Vérifiez ici que les meals sont bien récupérés
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du restaurant', error);
      }
    );
  }
  

  addToCart(meal: any): void {
    console.log('Ajouté au panier:', meal);
    // Logique pour ajouter au panier
  }
}
