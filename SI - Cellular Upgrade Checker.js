//Script include to check whether users are eligible for upgrade
var cellularUpgradeChecker = Class.create();
//Call Ajax processor so users can still load form before answer comes back
cellularUpgradeChecker.prototype = Object.extendsObject(AbstractAjaxProcessor, {

	checkNum: function() {
		//Mobile sys id that has to be passed in the client script
		var mobileSysID = this.getParameter('sysparm_item');

		if(mobileSysID) {
			//Query the phone number table
			var mobileNum = new GlideRecord('u_cmdb_ci_phone_number');
			mobileNum.get(mobileSysID);
			//Declare an object to package up the data about the number
			var cellularPackage = {};
			cellularPackage.var1 = mobileNum.getValue('name');
			cellularPackage.var2 = mobileNum.getValue('u_upgrade_date');
			//Convert the array to a JSON object
			var json = new JSON();
			var data = json.encode(cellularPackage);

		}

		return data;

	},

	getDate: function() {
		var mobileSysID = this.getParameter('sysparm_item');


		if(mobileSysID) {
			var mobileNum = new GlideRecord('u_cmdb_ci_phone_number');
			mobileNum.get(mobileSysID);
			var cellularPackage = {};
			cellularPackage.var1 = mobileNum.getValue('name');
			cellularPackage.var2 = mobileNum.getValue('u_upgrade_date');
			var json = new JSON();
			var data = json.encode(cellularPackage);

		}

		return data;

	},

	type: 'cellularUpgradeChecker'
});
