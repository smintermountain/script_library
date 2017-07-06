function onLoad(){
//Don't make any variables read only if user has the admin role
	if (g_user.hasRole('admin')) {
		return;
	} else try{
		//if the user doesn't have the admin role, set all variables on the form to read-only
		//this function is not documented
	g_form.setVariablesReadOnly(true);

   }
   catch(e){
		 //No error handling for this script
	 }
}
