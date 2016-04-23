$(function(){
  var preferences, worker;

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

  var Worker = function(name){
    this.name = name;
    this.questions = [];
  };

  Worker.prototype = {
    constructor: Worker,
    
    //Adds questions
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
      html+= "<input type='submit' value='Submit Order!'>";
      $('.qsForm').html(html);
    },

    //Adds the current user preferences to be used to make the order
    addPreferences : function(preferences){
      this.preferences = preferences;
    },
  };
  
  var Bartender = function(name){
    Worker.call(this, name);
  };
  Bartender.prototype = Object.create(Worker.prototype);
  Bartender.prototype.constructor = Bartender;
  
  //Names the drink from a random selection of nouns and adjs
  Bartender.prototype.nameDrink = function() {
    var name = "";
    var words = {
      nouns : ['Parrot', 'Booty', 'Sea-Dog', 'Tides'],
      adjs : ['Wicked', 'Infamous', 'Fluffy', 'Cruel']
    }; 
    name+= words.adjs[Math.floor(Math.random() * words.adjs.length)];
    name+= " " + words.nouns[Math.floor(Math.random() * words.nouns.length)];
    return name;
  };

  //Creates a drink based on the preferences set by user
  Bartender.prototype.createDrink = function(pantry){
    var drink = {
      ingredients : pantry.getIngredients(this.preferences),
      name : this.nameDrink()
    };
    drink.ingredients = drink.ingredients.join(', ');
    $('.message').html('<p>The ' + drink.name + 
      ' has the following ingredients: <br/>' + drink.ingredients + '</p>');
  };

  var Chef = function(name){
    Worker.call(this, name);
  };
  Chef.prototype = Object.create(Worker.prototype);
  Chef.prototype.constructor = Chef;

  //Names the drink from a random selection of nouns and adjs
  Chef.prototype.nameBurger = function() {
    var name = "";
    var words = {
      nouns : ['Buccaneer', 'Buns', 'Monkey', 'Plank'],
      adjs : ['Wicked', 'Juicy', 'Bloody', 'Gooey']
    }; 
    name+= words.adjs[Math.floor(Math.random() * words.adjs.length)];
    name+= " " + words.nouns[Math.floor(Math.random() * words.nouns.length)];
    return name;
  };

  //Creates a burger based on the preferences set by user
  Chef.prototype.createBurger = function(pantry){
    var burger = {
      ingredients : pantry.getIngredients(this.preferences),
      name : this.nameBurger()
    };
    burger.ingredients = burger.ingredients.join(', ');
    $('.message').html('<p>The ' + burger.name + 
      ' has the following ingredients: <br/>' + burger.ingredients + '</p>');
  };

  var bar = new Bartender("bar");
  var chef = new Chef("chef");
  var pantry = new Pantry("pantry");

  var newQ = new Question('Do ye like yer drinks strong?', 'strong');
  bar.addQuestion(newQ);
  var newQ = new Question('Do ye like it with a salty tang?', 'salty');
  bar.addQuestion(newQ);
  var newQ = new Question('Are ye a lubber who likes it bitter?', 'bitter');
  bar.addQuestion(newQ);
  var newQ = new Question('Would ye like a bit of sweetness with yer poison?', 'sweet');
  bar.addQuestion(newQ);
  var newQ = new Question('Are ye one for a fruity finish?', 'fruity');
  bar.addQuestion(newQ);

  var newQ = new Question('Do ye like yer burgers cheesy?', 'cheese');
  chef.addQuestion(newQ);
  var newQ = new Question('Do ye like it with a saucy tang?', 'sauce');
  chef.addQuestion(newQ);
  var newQ = new Question('Are ye a lubber who likes it spicy?', 'spicy');
  chef.addQuestion(newQ);
  var newQ = new Question('Do ye like yer burgers greasy?', 'greasy');
  chef.addQuestion(newQ);
  var newQ = new Question('Are ye one for a veggy finish?', 'veggies');
  chef.addQuestion(newQ);

  var newIng = new Ingredient('cheese', ['Pepperjack', 'Provolone', 'Mozzarella']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('sauce', ['Mayo', 'BBQ', 'Mustard']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('spicy', ['Jalapenos', 'chipotle', 'Habanero']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('greasy', ['Bacon', 'Eggs', 'Double Patty']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('veggies', ['Lettuce', 'Onions', 'Tomatoes']);
  pantry.addIngredient(newIng);

  var newIng = new Ingredient('strong', ['Glug of rum', 'slug of whisky', 'splash of gin']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('salty', ['Olive on a stick', 'salt-dusted rim', 'rasher of bacon']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('bitter', ['Shake of bitters', 'splash of tonic', 'twist of lemon peel']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('sweet', ['Sugar cube', 'spoonful of honey', 'splash of cola']);
  pantry.addIngredient(newIng);
  var newIng = new Ingredient('fruity', ['Slice of orange', 'dash of cassis', 'cherry on top']);
  pantry.addIngredient(newIng);

  //Opens drinks questions form
  $('.orderDrink').click(function(){
    worker = "bartender";
    bar.askQuestions();
    $(".message").html("");
    $('.qsForm').show();
  });

  //Opens burgers questions form
  $('.orderBurger').click(function(){
    worker = "chef";
    chef.askQuestions();
    $(".message").html("");
    $('.qsForm').show();
  });

  //Grabs users drink preferences and attaches them to bartender object
  $('.qsForm').submit(function(e){
    e.preventDefault();
    var pref = [];
    var opts = $('.qsForm input:checked');

    $.each(opts, function(index, opt){
      pref.push(opt.defaultValue);
    });

    if(pref.length === 0){
      $(".message").html("Please select at least one option!");
      return;
    }
    $(".message").html("");
    $('.qsForm').hide();
    if(worker === "chef"){
      chef.addPreferences(pref);
      chef.createBurger(pantry);
    } else {
      bar.addPreferences(pref);
      bar.createDrink(pantry);
    }
  });
});