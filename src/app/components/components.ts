import { Component, Injectable, OnInit } from '@angular/core';

// Define a service
@Injectable({
  providedIn: 'root',
})
export class MyService {
  doSomething() {
    console.log('Service method called');
  }
}

// Define base component B
@Component({
  selector: 'app-b',
  template: '<p>Component B</p>',
})
export class BComponent implements OnInit {
  ngOnInit() {
    this.someMethod();
  }

  someMethod() {
    console.log('Base component method');
  }
}

// Define derived component A
@Component({
  selector: 'app-a',
  template: '<p>Component A</p>',
})
export class AComponent extends BComponent {
  constructor(private myService: MyService) {
    super();
    console.log('AComponent constructor:', this.myService); // This should log the service instance
  }

  override ngOnInit() {
    console.log('AComponent ngOnInit');
    // Perform logic specific to AComponent
    if (this.myService) {
      this.myService.doSomething();
    } else {
      console.error('myService is undefined in ngOnInit');
    }

    // Call the base class ngOnInit method
    super.ngOnInit();
  }

  // Override someMethod from BComponent
  override someMethod() {
    console.log('Derived component method');
    console.log('Service in someMethod:', this.myService); // Check if this is undefined
    if (this.myService) {
      this.myService.doSomething(); // You can access myService here if it is defined
    } else {
      console.error('myService is undefined in someMethod');
    }
  }
}
