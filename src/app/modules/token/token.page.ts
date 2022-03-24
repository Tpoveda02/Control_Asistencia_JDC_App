import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.page.html',
  styleUrls: ['./token.page.scss'],
})
export class TokenPage implements OnInit {

  constructor(private router:Router) { }
 
  ngOnInit() {
    
  }
  getCourse(){
    this.router.navigate(['/course']);
  }

}
