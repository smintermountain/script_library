
// To save a HashMap in the table in form of two fields
var sysID = current.variables.financial_class_exceptions.toString(); // Save SYSID
var finExcpTemp = current.variables.financial_class_exceptions.getDisplayValue(); // Save Display Name


// To fetch the HashMap for Display on the form
exceptionList = grCode.u_financial_class_exceptions.toString(); // Fetch the SYSID
exceptionName = grCode.u_financial_exceptions_list.toString();	// Fetch the display name
g_form.setValue("financial_class_exceptions", exceptionList, exceptionName); // Assign the value on the form field.



