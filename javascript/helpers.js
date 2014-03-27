var counter = 1;
var $return;

Handlebars.registerHelper('ifCond', function(v1, options) {
	if(counter % v1 == 0) {
		$return = options.fn(this);
	} else {
  		$return = options.inverse(this);
	}
	counter++;
	return $return;
});