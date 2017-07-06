//onChange script to check the selected date value against a specific date

function onChange(control, oldValue, newValue, isLoading) {
	if (isLoading || newValue == '') {
		return;
	}

	//Start a new system date with the date() function
	var dt1WkDate = new Date();
	//Set the checkDate variable to our current system time + 7 days
	var checkDate = new Date(dt1WkDate.setDate(dt1WkDate.getDate() + 7));

	//Use the date() function to convert the sting value of the selected date to a date object
	var chosenDate = new Date(newValue.toString());

	//Compare the two dates, this can be done in multiple ways depending on requirements
	if(chosenDate < checkDate){
		alert('Date must be 7 days after current date.');
		g_form.setValue('change_date', '');
	} else if (new Date(newValue).toString() == 'Invalid Date' || newValue.toString().length < 10) {
		alert('Please select or insert a valid date.');
		g_form.setValue('change_date', '');
	}
}
