function onBefore(current, previous) {
	//This function will be automatically called when this rule is processed.
	//gs.addInfoMessage("hello world");

	//declare variables to get the comments last journal entry and the ritm number
	var message = current.comments;
	var ritm = current.sys_id;

	//gs.addInfoMessage("approval comments " + comments);
	//gs.addInfoMessage("RITM " +ritm);
	//query the RITM table to get the info from the RITM number found above
	var target = new GlideRecord('sysapprover_approval');
	target.addQuery('sysapproval', ritm);
  var states = target.addQuery('state', 'Hold');
  states.addOrCondition('state', 'Requested');
	target.query();
	//gs.addInfoMessage("Target " +target.description);
	//If last journaled comments exist copy them from approval task comments to RITM comments
	while (target.next()) {

		target[comments].setJournalEntry('message');
		//target.setWorkflow(false);
		target.update();

	}
}

//This script will copy comments from approval tasks to the RITM comments and thus notify the user of the last comment
//12-30-2015 TC


function onBefore(current, previous) {
	//This function will be automatically called when this rule is processed.
	//gs.addInfoMessage("hello world");

	//declare variables to get the comments last journal entry and the ritm number
	var fieldName = "comments_and_work_notes";
	var comments = current.comments;
	var ritm = current.sysapproval;

	//gs.addInfoMessage("approval comments " + comments);
	//gs.addInfoMessage("RITM " +ritm);
	//query the RITM table to get the info from the RITM number found above
	var target = new GlideRecord('sc_req_item');
	target.addQuery('sys_id', ritm);
	target.query();
	//gs.addInfoMessage("Target " +target.description);
	//If last journaled comments exist copy them from approval task comments to RITM comments
	while (target.next()) {

		target.comments = comments;
		//target.setWorkflow(false);
		target.update();

	}
}

//This script will copy comments from approval tasks to the RITM comments and thus notify the user of the last comment
//12-30-2015 TC


function onBefore(current, previous) {
	//This function will be automatically called when this rule is processed.
	//gs.addInfoMessage("hello world");

	//declare variables to get the comments last journal entry and the ritm number
	var fieldName = "comments_and_work_notes";
	var message = current.comments;
	var ritm = current.sysapproval;

	//gs.addInfoMessage("approval comments " + comments);
	//gs.addInfoMessage("RITM " +ritm);
	//query the RITM table to get the info from the RITM number found above
	var target = new GlideRecord('sc_req_item');
	target.addQuery('sys_id', ritm);
	target.query();
	//gs.addInfoMessage("Target " +target.description);
	//If last journaled comments exist copy them from approval task comments to RITM comments
	while (target.next()) {

		target[fieldName].setJournalEntry(message);
		//target.setWorkflow(false);
		target.update();

	}
}
