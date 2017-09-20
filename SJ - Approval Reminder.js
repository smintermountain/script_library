//debug function
function debug(msg) {
	var debugVal = true; //set to false to turn off debugging
	var debugSourceSuffix = "*** Script (IHC) Approval Reminder (catalog)";
	if (debugVal) {
		gs.log(msg, debugSourceSuffix);
	}
}

debug('Is this thing on?');
var allApprovers = [];
var dedupApprovers = [];
var reportSysID = 'a3a1436313fc4f0004337a404244b050';
// prod: a3a1436313fc4f0004337a404244b050 // Scheduled Execution of Approvals and Delegated Approvals Weekly Reminder (auto emailed report)
// dev: 508e248a13b9eec0a0e25d122244b04d // Scheduled Execution of My Approvals and Delegated Approvals Weekly Reminder

// Functions to change users, validate the change, and send the report
function changeReport(runas,recipients){
	var report = new GlideRecord('sysauto_report');
	report.addQuery('sys_id',reportSysID);
	report.setValue('run_as',runas);
	report.setValue('user_list',recipients);
	report.updateMultiple();
	}

function validateReport(runas,recipients){
	var report = new GlideRecord('sysauto_report');
	report.addQuery('sys_id',reportSysID);
	report.query();
	while(report.next()){
		reportRunAs = report.run_as;
	}
	debug('Row count is: '+report.getRowCount());
	debug('Lookup value: '+reportRunAs+' Passed value: '+runas);
	if(reportRunAs == runas){
		return 'succesful';
	}
	else{
		debug('RunAs match failed.');
		return 'failed';
	}
}
	
function sendReport(runas,recipients){
	var reportGlide = [];
	var report = new GlideRecord('sysauto_report');
	report.addQuery('sys_id',reportSysID);
	report.addQuery('run_as',runas);
	report.addQuery('user_list',recipients);
	report.query();
	while(report.next()){
		reportGlide.push(report);
	}
	// run the report
	var execute = SncTriggerSynchronizer.executeNow(reportGlide[0]);
	debug('Report sent. SYS ID is: '+execute);
	return execute;
}


//lookup approvals and push all approvers into an array
var approvals = new GlideRecord('sysapproval_approver');
approvals.addQuery('active',true);
approvals.addQuery('state','requested');
approvals.addQuery('source_table','sc_req_item');
//approvals.addQuery('approver','7482fc8f4f384600af76d0af0310c7ac'); //will f
//approvals.addQuery('approver','5f0470834f784600af76d0af0310c7c6'); //cheryl
//approvals.addQuery('approver','9e75f0474f784600af76d0af0310c7b5'); //will y
//approvals.addQuery('group','254bc99b4ff04300f5f3d49f0310c70d'); //icentra group has 7 users
//approvals.addQuery('group','b1e7b2a713a776c0a0e25d122244b0e8'); //another test group
//approvals.addQuery('created_by','lpabrigh');
approvals.query();
debug('Number of approvals is: '+approvals.getRowCount());
while (approvals.next()){
	allApprovers.push(approvals.approver.sys_id+'');
}
debug('Approvers list is: '+allApprovers.toString());
debug('All approvers length is: '+allApprovers.length);


//loop through approvers list and add to deduplicated list if not duplicate
for (i=0;i<allApprovers.length;i++){
	var duplicate = false;
	if(dedupApprovers.length === 0){
		dedupApprovers.push(allApprovers[i]+'');
	}
	if(dedupApprovers.length > 0){
		for (j=0;j<dedupApprovers.length;j++){
			if (dedupApprovers[j] == allApprovers[i]){
				duplicate = true;
			}
		}
		if(duplicate === true){
		debug('User is not unique and was skipped.');
		}
		if(duplicate === false){
		debug('Users is unique and added to list.');
		dedupApprovers.push(allApprovers[i]+'');
		}
	}
	debug('Duplicate is: '+duplicate);
}

debug('Unique users count: '+dedupApprovers.length);
debug('Unique users are: '+dedupApprovers);
debug('Unique user 0 is: '+dedupApprovers[0]);

//for each unique user, update the report, validate, and run it	
var failCount = 0;
for (k=0;k<dedupApprovers.length;k++){
	debug('User is: '+dedupApprovers[k]);
	changeReport(dedupApprovers[k],dedupApprovers[k]);
	debug('Report updated.');
	var validated = validateReport(dedupApprovers[k],dedupApprovers[k]);
	if(	validated == 'succesful'){
		debug('Validated? '+validated);
		var sendGR = sendReport(dedupApprovers[k],dedupApprovers[k]);
		var t = new Date().getTime();
		while (new Date().getTime() < t + 10000){}
	}
	else if( validated == 'failed'){
		changeReport(dedupApprovers[k],dedupApprovers[k]);
		failCount = failCount+1;
		debug('Sending failed');
		var validated2 = validateReport(dedupApprovers[k],dedupApprovers[k]);
		if(	validated2 == 'succesful'){
			debug('Validated is: '+validated);
			sendReport(dedupApprovers[k],dedupApprovers[k]);
			debug('Sent to user: '+dedupApprovers[k]);
		}
		else if(validated2 === 'failed'){
			failCount = failCount+1;
			debug('Sending failed attempt 2');
		}
	}
}

//send an xMatters message to Cheryl with the counts

 try { 
 var r = new sn_ws.RESTMessageV2('(IHC) xMatters Manual Trigger', 'post');
 r.setStringParameter('recipient', 'crnelson|Work Email');
 r.setStringParameter('subject', 'Approval Reminder Counts');
 r.setStringParameter('body', 'Pending approvals count: '+approvals.getRowCount()+'. Total approvers (users) count: '+dedupApprovers.length+'.');
 var response = r.execute();
 var responseBody = response.getBody();
 var httpStatus = response.getStatusCode();
	 debug('xMatters integration response: '+httpStatus+': '+responseBody);
}
catch(ex) {
 var message = ex.getMessage();
}
debug('Fail Count is: '+failCount);
debug('Script finished');
