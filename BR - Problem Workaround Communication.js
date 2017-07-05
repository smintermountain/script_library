//This script will copy the workaround for a problem to the incidents associated to it

//This will update the current record
current.update();
//This calls the workaround function
workaround();


function workaround(){
//Take the current number of the record and query the incident table
    var num = current.number;
    var incident = new GlideRecord("incident");
    incident.addQuery("problem_id", "=", current.sys_id);
    incident.addQuery("incident_state", "<", 6);
    incident.query();
    while (incident.next()) {
        incident.comments = (num + ' ' + current.work_around.getJournalEntry(1));
        incident.update();
    }
    //Message successful completion of the workaround and redirect back to current record instead of navigating away
    gs.addInfoMessage('Workaround communicated');
    action.setRedirectURL(current);
}

current.update();
workaround();

function workaround(){
	var num = current.number;
	var incident_id = new GlideRecord("task_rel_task");
	incident_id.addQuery("child", "=", current.sys_id);
	incident_id.query();

	while (incident_id.next()) {
		var incident = new GlideRecord("incident");
		incident.addQuery("sys_id", "=", incident_id.parent);
		incident.addQuery("incident_state", "<", 6);
		incident.query();

		while (incident.next()) {
			incident.comments = ('Workaround for ' + num + ' is: ' + current.work_around);
			incident.update();
		}

	}

	gs.addInfoMessage('Workaround communicated');
	action.setRedirectURL(current);
}
