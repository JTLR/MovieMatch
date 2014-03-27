
var counter = 1;

Handlebars.registerHelper('ifCond', function(v1, options) {


  if(counter % v1 == 0) {
  	counter++;
    return options.fn(this);
  } else {
counter++;

  return options.inverse(this);
}

});