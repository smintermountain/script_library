//Role granting script to add the role directly to a user. This should not be used
//in production as it doesnt add users to a group it direct assigns the role

//Query active users from the sys_user table
var rec = new GlideRecord('sys_user');
rec.addQuery('active','true');
rec.query();
while(rec.next()){
  //Create a new role relationship record for this user

  //Table for user to role relationship M2M table
  var rec1 = new GlideRecord('sys_user_has_role');
  //sys_id for the admin role
  var roleName = '2831a114c611228501d4ea6c309d626d';
  rec1.initialize();
  rec1.user = rec.sys_id;
  rec1.role = roleName;
  rec1.setWorkflow(false);
  rec1.insert();
}
