var Question = function(question, property) {
  this.question = question;
  this.property = property;
}

var Ingredient = function(category, ingredient){
  this.category = category;
  this.ingredient = ingredient;
}

var Pantry = function(name){
  this.name = name;
  this.ingredients = [];
}

Pantry.prototype.addIngredient = function(ingredient){
  this.ingredients.push(ingredient);
}

var Bartender = function(name){
  this.name = name;
  this.questions = [];
}

Bartender.prototype.addQuestion = function(question) {
  this.questions.push(question);
}

Bartender.prototype.askQuestions = function() {
  var answer, preferences = [];
  for (var i=0; i<this.questions.length; i++) {
    answer = prompt(this.questions[i].question);
    if (answer === 'y') {
      preferences.push(this.questions[i].property);
    }
  }
  return preferences;
}

var joe = new Bartender("Joe");
var drinkPantry = new Pantry("Drinks Pantry");

var newQ = new Question('Do ye like yer drinks strong?', 'strong');
joe.addQuestion(newQ);
var newQ = new Question('Do ye like it with a salty tang?', 'salty');
joe.addQuestion(newQ);
var newQ = new Question('Are ye a lubber who likes it bitter?', 'bitter');
joe.addQuestion(newQ);
var newQ = new Question('Would ye like a bit of sweetness with yer poison?', 'sweet');
joe.addQuestion(newQ);
var newQ = new Question('Are ye one for a fruity finish?', 'fruity');
joe.addQuestion(newQ);

var newIng = new Ingredient('strong', ['Glug of rum', 'slug of whisky', 'splash of gin']);
drinkPantry.addIngredient(newIng);
var newIng = new Ingredient('salty', ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
drinkPantry.addIngredient(newIng);
var newIng = new Ingredient('bitter', ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
drinkPantry.addIngredient(newIng);
var newIng = new Ingredient('sweet', ['Sugar cube', 'spoonful of honey', 'splash of cola']);
drinkPantry.addIngredient(newIng);
var newIng = new Ingredient('fruity', ['Slice of orange', 'dash of cassis', 'cherry on top']);
drinkPantry.addIngredient(newIng);



