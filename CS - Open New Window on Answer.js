function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading) {
		return;
	}
	//Checking to see if the value from the checked variable in this case is no
	if (newValue == 'No') {
		kbOpen(); //run the function
	} else {
		g_form.hideFieldMsg('options',true);
	}
}
function kbOpen() {
	//Setup the URL for the current window
	var realUrl = window.location.protocol + '//' + window.location.host + '/' + './com.glideapp.servicecatalog_cat_item_view.do?v=1&sysparm_id=b9987e834ff0d200af76d0af0310c726';
	//Alert the user they are about to be sent to another page
	alert('You must first order and receive the scanner.  You will now be redirected to the scanner order page.');
	//Send the user to a new page
	window.location = realUrl;
	}
