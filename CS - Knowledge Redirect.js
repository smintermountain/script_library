//If users select education as the option from an associated variable, they will get a field message that directs them to the knowledge base.
function onChange(control, oldValue, newValue, isLoading) {

   if (!isLoading) {
      if (newValue) {
         if (newValue != oldValue) {
            if (g_form.getValue('options' = 'education') {
              g_form.showFieldMsg('options',"<a href=https://intermountain.service-now.com/$knowledge.do>Click here</a>",'info',true);
            } else {
			g_form.hideFieldMsg('options',true);
			}
         }
      }
   }
}


//Second way to do it using a callback function and a getValue()
function onChange(control, oldValue, newValue, isLoading) {
   var choice = g_form.getValue('options', notes); // doAlert is our callback function
}
function notes(choice) { //reference is passed into callback as first arguments
  if (newValue = 'education'){
    g_form.showFieldMsg('options',"<a href=https://intermountain.service-now.com/$knowledge.do>Click here</a>",'info',true);
}
else{
g_form.hideFieldMsg('options',true);
}
}
