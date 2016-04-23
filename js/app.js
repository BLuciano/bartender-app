$(function(){
  var preferences;

  var Question = function(question, property) {
    this.question = question;
    this.property = property;
  };

  var Ingredient = function(category, ingredient){
    this.category = category;
    this.ingredient = ingredient;
  };

  var Pantry = function(name){
    this.name = name;
    this.ingredients = {};
  };

  Pantry.prototype = {
    constructor : Pantry,

    //Adds ingredients to the pantry
    addIngredient : function(currIng){
      this.ingredients[currIng.category] = currIng.ingredient;
    },

    //Grabs all possible ingredients and chooses three random ones.
    getIngredients : function(preferences){
      var currIngrs = [], finalIngrs = [];

      for(var i = 0; i < preferences.length; i++){
        currIngrs.push(this.ingredients[preferences[i]]);
      }
      currIngrs = currIngrs.join(',').split(',');

      for(var i = 0; i<3; i++){
        var num = Math.floor(Math.random() * currIngrs.length);
        finalIngrs.push(currIngrs.splice(num, 1));
      }
      return finalIngrs;
    }
  };

  var Bartender = function(name){
    this.name = name;
    this.questions = [];
  };

  Bartender.prototype = {
    constructor: Bartender,
    
    //Adds questions for the bartender to ask
    addQuestion : function(question) {
      this.questions.push(question);
    },

    //Displays the questions to the user
    askQuestions : function() {
      var html = "";
      for (var i=0; i<this.questions.length; i++) {
        html+= this.questions[i].question; 
        html+= " <input type='checkbox' class='option' name='preference'";
        html+= "value='" + this.questions[i].property + "'/><br/>";
      }
      html+= "<input type='submit' value='Make a Drink!'>";
      $('.drinkForm').html(html);
    },

    nameDrink : function() {
      var name = "";
      var words = {
        nouns : ['Parrot', 'Booty', 'Sea-Dog', 'Tides'],
        adjs : ['Wicked', 'Infamous', 'Fluffy', 'Cruel']
      }; 
      name+= words.adjs[Math.floor(Math.random() * words.adjs.length)];
      name+= " " + words.nouns[Math.floor(Math.random() * words.nouns.length)];
      return name;
    },

    //Adds the current user preferences to be used to make drinks
    addPreferences : function(preferences){
      this.preferences = preferences;
    },

    //Creates a drink based on the preferences set by user
    createDrink : function(pantry){
      var drink = {
        ingredients : pantry.getIngredients(this.preferences),
        name : this.nameDrink()
      };
      drink.ingredients = drink.ingredients.join(', ');
      $('.message').html('<p>The ' + drink.name + 
        ' has the following ingredients: <br/>' + drink.ingredients + '</p>');
    }
  };

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

  //Opens drinks questions form
  $('.order').click(function(){
    joe.askQuestions();
    $(".message").html("");
    $('.drinkForm').show();
  });

  //Grabs users drink preferences and attaches them to bartender object
  $('.drinkForm').submit(function(e){
    e.preventDefault();
    var pref = [];
    var opts = $('.drinkForm input:checked');

    $.each(opts, function(index, opt){
      pref.push(opt.defaultValue);
    });

    if(pref.length === 0){
      $(".message").html("Please select at least one option!");
      return;
    }
    $(".message").html("");
    $('.drinkForm').hide();
    joe.addPreferences(pref);
    joe.createDrink(drinkPantry);
  });
});