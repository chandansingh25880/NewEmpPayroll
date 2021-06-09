const { authorise } = require('../validations/employee.js');
const employeeService = require('../service/employee.js');

class Controll {

/**
     * @description Create and save the new Employee Data after validation
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    create = (req, res) => {
        console.log("create method to save data")
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                message: validationResult.error.details[0].message
            });
        }
        let userData = req.body;
        employeeService.create(userData, (error, resultdata) => {
            if (error) {
                return res.status(500).send({
                    message: "Error occured while creating Employee",
                    error: error.message
                 });
            }
            res.send({
                data: resultdata,
                message: "Employee Data Inserted successfully"
            })
        })
    }

   /**
     * @description find all the Employee Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findAllEmployees = (req, res) => {
        employeeService.findAllEmployees((error, EmployeeData) => {
            if (error) {
                logger.error("Some error occured when fetching Data")
                return res.status(500).send({
                    message: "Some error occured when fetching Data"
                });
            }
            res.send(EmployeeData)
        })
    };

 /**
     * @description find one the Employee Data
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    findOneData = (req, res) => {
        let employeObjectId=req.params.employeeId;
        employeeService.findDataId(employeObjectId, (error, userData) => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + employeId
                    });
                }

                return res.status(500).send({
                    message: "Error retrieving employee with id " + employeId
                });
            }
            if (userData)
                res.send(userData);
            else {
                return res.status(404).send({
                    message: "Employee not found with id " + req.params.employeeId
                });
            }
        })
    }

 /**
     * @description find one the Employee Data and Delete
     * @param req is request sent from http
     * @param res is used to send the Response
     */
    delete = (req, res) => {
        let employeObjectId=req.params.employeeId;
        employeeService.deleteDataUsingId(employeObjectId, error => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + employeId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving employee with id " + employeId
                });
            }
            res.send({ message: "Employee deleted successfully!" });
        })
    };

   /**
      * @description update Employee Data by using Id after the data validation
      * @param req is request sent from http
      * @param res is used to send the Response
      */
    update = (req, res) => {
        var validationResult = authorise.validate(req.body);
        if (validationResult.error) {
            return res.status(400).send({
                message: validationResult.error.details[0].message
            });
        }
        let userData = req.body;
        let existingUserId=req.params.employeeId;
        employeeService.updateByID(existingUserId, userData, (error, resultData) => {
            if (error) {
                if (error.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Employee not found with id " + existingUserId
                    });
                }
                return res.status(500).send({
                    message: "Error occured while the updating employeeID with " + existingUserId
                });
            }
            res.send({
                message: "Employee Data updated successfully",
                data: resultData
            })
        })
    };

    /**
     * @description to login the Employee Data
     * @param req is request sent from http having emailId and Password
     * @param res is used to send the Response
     */
     login = (req, res) => {
        let credentials = req.body;
        employeeService.checkLoginDetails(credentials, (error, data) => {
            if (error) {
                return res.status(404).send({
                    success: false,
                    message: error
                });
            }
            res.send({
                success: true,
                message: "loged in successfully",
                token: data
            });
        })
    }
}

module.exports = new Controll();
    