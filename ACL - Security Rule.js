var manager = new CWTAccessManager(current.u_service_line);
var owner = manager.is_service_line_owner();
//this makes it so all 3 fields show up on a new record.
if (current.isNewRecord() )
    answer = true;
else if (current.isValidRecord() && owner == true)
    answer = true;
else
    answer = false;



037adcd84fade200af76d0af0310c7a1
0d0d04184fade200af76d0af0310c7bf
