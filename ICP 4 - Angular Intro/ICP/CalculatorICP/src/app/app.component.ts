import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Calculator';
  input = "";

  addInput(number) {
    number = number.target.textContent;
    if(number == 0 && this.input.length == 0) {
      //pass
    } else {
      this.input += number;
    }
    this.updateDisplay();
  };

  clear(option) {
    if(option == 1) {
      this.input = this.input.slice(0, -1);
    } else {
      this.input = "";
    }
    this.updateDisplay();
  };

  updateDisplay() {
    document.getElementById("results").innerHTML = this.input;
  };

  evaluate() {
    var total = eval(this.input);
    this.input = total;
    this.updateDisplay();
  };
};
