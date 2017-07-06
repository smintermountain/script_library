//This goes in the advanced portion of the ACL
//It calls a script include and passes the current record (service line in this case)
//The script include manipulates it to return one result.
//

var manager = new CWTAccessManager(current.u_service_line);
var owner = manager.is_service_line_owner();
//If it's a new record it will automatically set to true
if (current.isNewRecord() )
    answer = true;
//If return of script include is true set to true
else if (current.isValidRecord() && owner == true)
    answer = true;
else
    answer = false;
