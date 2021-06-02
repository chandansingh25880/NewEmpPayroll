const employeeInfoModel = require('../models/employeeInfoModel.js');

class EmployeeInfoService {
 
    create = (employeeInfoData, callBack) => {
        employeeInfoModel.create(employeeInfoData, (error, data) => {
            if(error) {
                return callBack(error,null);
            }
            return callBack(null, data);
        })
    }

    findAll = (callBack) => {
        employeeInfoModel.findAll((error, data) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, data);
        })
    }
    
    findById = (employeeInfoDataId, callBack) => {
        employeeInfoModel.findById(employeeInfoDataId,(error, data) => {
            if(error){
                return callBack(error, null);
            }
            return callBack(null, data);
        })
    }

}

module.exports = new EmployeeInfoService();