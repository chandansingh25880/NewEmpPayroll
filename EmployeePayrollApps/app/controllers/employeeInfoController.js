const employee = require('../service/employeeInfoService.js');

class EmployeeInfoController {

    create = (req, res) => {

        console.log(req.body);
        const employeeInfoData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password

        }
        
        employee.create(employeeInfoData, (error, data) => {
            if (error) {
                return res.status(500).send({
                    message: "Some error is occurred while creating employee info"
                })
            }
            res.send({
    
                message: "Employee info added!",
                data: data
            })
        });
    }
    // Retrieve and return all employee payroll from the database.
    findAll = (req,res) => {
employee.findAll((error, data) => {

   if (error) {
                return res.status(500).send({
                    message: "Some error is occurred while fetching employee info"
                })
            }
            res.send({
    
                message: "fetch the data",
                data: data
            })
        })

}
 // retrieve one employee info using ID
 findOne = (req,res) => {
    let employeeInfoDataId = req.params.employeeInfoId ;
     employee.findById(employeeInfoDataId, (error, data) => {

        if (error) {
            return res.status(404).send({
                message: "employee info not found"

        })
     }
     res.send({
         message: "employee info found",
         data: data
     })
 })
}
}

module.exports = new EmployeeInfoController();