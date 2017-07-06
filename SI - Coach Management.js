var coachManagement = Class.create();
coachManagement.prototype = {
	initialize: function(employee) {
		this.userID = gs.getUserID();
		this.employID = employee;
	},
	getUsersCoached: function() {
		var grCoach = new GlideAggregate('x_inthe_employee_c_coaching_delegate_table');
		grCoach.addQuery('u_coach', this.userID);
		grCoach.addQuery('u_employee', this.employID);
		grCoach.addQuery('active', true);
		grCoach.addAggregate('COUNT');
		grCoach.query();

		var users = 0;

		if (grCoach.next()){
			users = grCoach.getAggregate('COUNT');
		}

		return users > 0;

	},
	getValidReasons: function() {
		var managerList = this._getManagerFromCoach();
		var grReasons = new GlideAggregate('x_inthe_employee_c_coaching_reasons_table');
		grReasons.addQuery('u_manager', managerList);
		grReasons.addQuery('active', true);
		grReasons.addAggregate('COUNT');
		grReasons.query();

		var reason_ct = 0;

		if(grReasons.next()){
			reason_ct = grReasons.getAggregate('COUNT');
		}
		return  reason_ct > 0;

	},
	usrFilter: function(){
		var userList ='';
		var grUser = new GlideRecord('x_inthe_employee_c_coaching_delegate_table');
		grUser.addQuery('u_coach', this.userID);
		grUser.query();
		while (grUser.next()) {
			if (userList.length > 0) {
				userList += (',' + grUser.u_employee);
			}
			else {
				userList = '' + grUser.u_employee;
			}
		}
		return 'manager='+this.userID+'^ORsys_idIN' + userList;
	},

	getReasons: function(){
		var managerList = this._getManagerFromCoach();
		var reasonList = '';
		var grReason = new GlideRecord('x_inthe_employee_c_coaching_reasons_table');
		grReason.addQuery('u_manager', "IN", managerList.join(","));
		grReason.query();
		while (grReason.next()) {
			if (reasonList.length > 0) {
				reasonList += (',' + grReason.sys_id);
			}
			else {
				reasonList = '' + grReason.sys_id;
			}
		}
		gs.info('***** Reason List From Function ' + reasonList);
		return 'u_manager='+this.userID+'^ORsys_idIN' + reasonList;
	},

	_getManagerFromCoach: function(){
		var manager = [];
		var coach = this.userID;

		var grManagerList = new GlideRecord('x_inthe_employee_c_coaching_delegate_table');
		grManagerList.addQuery('active', true);
		grManagerList.addQuery('u_coach', coach);
		grManagerList.query();

		while(grManagerList.next()){

			manager.push(grManagerList.u_employee.manager + "");
		}
		gs.info('***** Manager List From Private Function ' + manager);
		return manager;
	},


	type: 'coachManagement'
};
