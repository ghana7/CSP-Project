var inputNum;
var range = 25;
var minConfidence = 0.0001;
var iterations = 3;
var negatives = false;
var outputElement = document.getElementById("outputNumber");
var ops = ["add","subtract","multiply","divide","exponent","sin","cos","tan"];
function calculate() {
	inputNum = document.getElementById("inputNumber").value;
	var num = Number(inputNum);
	
	var number;
	for(var i = 0; i < 1000000; i++) {
		number = generate(Math.floor(Math.random() * iterations) + 1,range);
		var error = number.getValue()/num;
		if(error > 1.00 - minConfidence && error < 1.00 + minConfidence) {
			outputElement.innerHTML += number.getString() + "\t\t\t" + error + "<br>";
			console.log("answer");
			//break;
		}
	}
	console.log("done");
	
	
}

function generate(iter,ran) {
	var outputNumber = new simpleNumber(Math.floor(Math.random() * ran));
	for(var i = 0; i < iter; i++) {
		if(Math.random() < .5) {
			outputNumber = new complexNumber(outputNumber, new simpleNumber(Math.floor(Math.random() * ran)), ops[Math.floor(Math.random() * 8)]);
		} else {
			outputNumber = new complexNumber(new simpleNumber(Math.floor(Math.random() * ran)), outputNumber, ops[Math.floor(Math.random() * 8)]);
		}
	}
	return outputNumber;
}
class complexNumber {
	constructor(num, num2, op) {
		this.num = num;
		this.num2 = num2;
		this.op = op;
	}
	
	getValue() {
		var value1 = this.num.getValue();
		var value2 = this.num2.getValue();
		switch(this.op) {
			case "add":
				return value1 + value2;
				break;
			case "subtract":
				return value1 - value2;
				break;
			case "multiply":
				return value1 * value2;
				break;
			case "divide":
				return value1 / value2;
				break;
			case "exponent":
				return Math.pow(value1,value2);
				break;
			case "sin":
				return value1 * Math.sin(value2);
				break;
			case "cos":
				return value1 * Math.cos(value2);
				break;
			case "tan":
				return value1 * Math.tan(value2);
				break;
		}
	}
	
	getString() {
		switch(this.op) {
			case "add":
				return "" + this.num.getString() + "+" + this.num2.getString();
				break;
			case "subtract":
				return "" + this.num.getString() + "-" + this.num2.getString();
				break;
			case "multiply":
				return "" + this.num.getString() + "*" + this.num2.getString();
				break;
			case "divide":
				return "" + this.num.getString() + "/" + this.num2.getString();
				break;
			case "exponent":
				return "" + this.num.getString() + "^" + this.num2.getString();
				break;
			case "sin":
				return "" + this.num.getString() + "sin(" + this.num2.getString() + ")";
				break;
			case "cos":
				return "" + this.num.getString() + "cos(" + this.num2.getString() + ")";
				break;
			case "tan":
				return "" + this.num.getString() + "tan(" + this.num2.getString() + ")";
				break;
		}
	}
}

class simpleNumber {
	constructor(num) {
		this.num = num;
	}
	getValue() {
		return this.num;
	}
	getString() {
		return ("" + this.num);
	}
}