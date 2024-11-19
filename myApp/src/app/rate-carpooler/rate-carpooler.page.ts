import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisService } from '../avis.service';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-rate-carpooler',
  templateUrl: './rate-carpooler.page.html',
  styleUrls: ['./rate-carpooler.page.scss'],
})
export class RateCarpoolerPage implements OnInit {
  rating: number = 0;
  reviewContent: string = '';
  carpoolerId: string = ''; 
  stars: number[] = [1, 2, 3, 4, 5]; 
  auteur: string='';
  covoitureur: any = {}; 
  reviews: any[] = []; 
  reviewCount: number = 0;
  controlsVisible: boolean = true;
    displayedReviews: any[] = [];
  currentIndex: number = 0;
  stars2: number[] = [1, 2, 3, 4, 5];
  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute , private avisService : AvisService,private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.carpoolerId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    // Get passenger (auteur) ID from localStorage
    this.auteur = localStorage.getItem('id') || ''; 
    this.fetchCarpoolerDetails();
    this.fetchReviews();
    this.getReviewCount();
  }
  starsArray(type: string, rating: number): any[] {
    if (type === 'selected') {
      // Return an array with the number of selected stars
      return this.stars2.filter(star => star <= rating);
    } else if (type === 'unselected') {
      // Return an array for unselected stars
      return this.stars.filter(star => star > rating);
    }
    return [];
  }
  setRating(star: number) {
    this.rating = star;
  }

  submitReview() {
    if (!this.rating || !this.reviewContent) {
      return; // Prevent submission if no rating or content
    }
  
    const reviewData = {
      contenue: this.reviewContent,
      note: this.rating,
      datepublication: new Date(),
      auteur: this.auteur,
      covoitureur: this.carpoolerId,
    };
  
    this.avisService.submitReview(reviewData).subscribe(
      (response) => {
        console.log('Review submitted successfully', response);
  
        // Add the new review to the reviews array
        const newReview = {
          ...reviewData,
          auteur: { name: 'Your Name', lastname: 'Your Lastname' }, // Optionally update with fetched user details
          datePublication: new Date(),
        };
        this.reviews.unshift(newReview);
  
        // Update the displayed reviews directly without limit
        this.displayedReviews = this.reviews; // Display all reviews
  
        // Reset the carousel index
        this.currentIndex = 0;
  
        // Clear the input fields
        this.reviewContent = '';
        this.rating = 0;
      },
      (error) => {
        console.error('Error submitting review:', error);
      }
    );
  }
  

  fetchCarpoolerDetails() {
    const carpoolerId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log(carpoolerId)

    this.utilisateurService.getUserById(carpoolerId).subscribe({
      next: (data) => {
        this.covoitureur = data; 
      },
      error: (err) => {
        console.error('Error fetching carpooler details:', err);
      },
    });
  }

  fetchReviews() {
    this.avisService.getAllReviewsByCarpoolerId(this.carpoolerId).subscribe(
      (data) => {
        this.reviews = data; 
        this.displayedReviews = this.reviews; 
      },
      (error) => {
        console.error('Error fetching reviews:', error);
      }
    );
  }
  

  // loadMoreReviews() {
  //   const currentLength = this.displayedReviews.length;
  //   const nextReviews = this.reviews.slice(currentLength, currentLength + this.limit);
  //   this.displayedReviews = [...this.displayedReviews, ...nextReviews];
  // }

  // Get the count of reviews for the carpooler
  getReviewCount() {
    this.avisService.count(this.carpoolerId).subscribe(
      (data) => {
        this.reviewCount = data.count; // Store the review count
      },
      (error) => {
        console.error('Error fetching review count:', error);
      }
    );
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.displayedReviews.length) % this.displayedReviews.length;
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.displayedReviews.length;
  }

}