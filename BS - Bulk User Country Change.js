//Change the country of all users in the system to a single value

//Query the sys_user table to set a value of US for every user in the system
var gr = new GlideRecord("sys_user");
gr.query();
while(gr.next())  {
  gr.country.setValue("US");
  //Forces no other workflows to fire with this change 
  //xMatters will bog down the system with changes to user records if you don't do this
  gr.setWorkflow(false);
  gr.update();
}
