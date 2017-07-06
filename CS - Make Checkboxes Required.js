function onSubmit() {

 // ------------------------------
 // Set Checkbox Parameters Here
 // ------------------------------
 // List of Checkbox variable names
 var requiredCheckboxList = 'phone_device_agreement_check,payroll_deduction_agreement';
 // Number of checkboxes to be required
 var requiredCheckboxCount = 2;
 // Section Title - Name of label used to block them all together
 var sectionTitle = 'mySection';

// ------------------------------
// Run Script
// ------------------------------
//Get a true/false value on whether the proper number of checkboxes are checked
 var response = checkboxCheck(requiredCheckboxList, requiredCheckboxCount);
 if (!response) {
   //Alert telling people that they haven't checked enough boxes, and stop submitting the request
   alert('You must click the checkbox marked "I Agree" in each section it appears before submitting your request.');
   return false;
 }
}
//Function called to actually check that the boxes are checked
function checkboxCheck (requiredCheckboxArray, myCount) {
 requiredCheckboxArray = requiredCheckboxArray.split(',');
 var answer = false;
 var match = 0;
 for (i=0; i < requiredCheckboxArray.length; i++) {
   //checking the array to verify that the answer is true in the checkbox
if (g_form.getValue(requiredCheckboxArray[i]) == 'true') {
 match ++;
//if the number of checked boxes is greater than or = to the required number set the answer to true
//and stop the loop
 if (match >= myCount) {
answer = true;
break;
 }
}
 }
 return answer;
}
