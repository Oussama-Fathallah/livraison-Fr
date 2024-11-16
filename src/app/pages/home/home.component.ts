import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import du Router

interface Restaurant {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  rating: number;
  logoRestau: string;
}

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];
  categories: Category[] = [];

  // Ajout du Router dans le constructeur
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchRestaurants();
    this.fetchCategories();
  }

  // Fonction pour récupérer les restaurants avec le token JWT
  fetchRestaurants(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token non trouvé');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Restaurant[]>('http://localhost:8080/api/restaurants', { headers })
      .subscribe(
        (data) => {
          this.restaurants = data;
        },
        (error) => {
          console.error('Erreur lors de la récupération des restaurants', error);
        }
      );
  }

  // Fonction pour récupérer les catégories
  fetchCategories(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<Category[]>('http://localhost:8080/api/categories', { headers }).subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  // Méthode pour rediriger vers les détails du restaurant
  viewRestaurantDetails(id: number): void {
    this.router.navigate(['/restaurant', id]);

  }
  
}
