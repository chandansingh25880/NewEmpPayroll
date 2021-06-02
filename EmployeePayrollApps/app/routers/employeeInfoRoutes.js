const EmployeeController = require('../controllers/employeeInfoController.js')

module.exports = (app) => {
     
    
     app.post('/add', EmployeeController.create);
 
     // retrieve all employeeInfo
     app.get('/getData',EmployeeController.findAll);
 
     // retrieve one employee info using ID
     app.get('/findId:employeeInfoId', EmployeeController.findOne);
 /*
     // updating a employeeInfo using ID
     app.put('/update/:employeeInfoId', EmployeeController.UpdateEmployeeInfo);
 
     // delete a employee info using ID
     app.delete('/delete/:employeeInfoId', EmployeeController.DeleteEmployeeInfo);
     */
}