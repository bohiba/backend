const CompanyLoadModel = require('../models/companyLoadModel')

class CompanyLoadService {
    static async createCompanyLoad(
        id,
        consignerName,
        consigneeLogo,
        consignerLocation,
        consigneeDetails,) {
            try {
                const companyLoad = new CompanyLoadModel({id,
                    consignerName,
                    consigneeLogo,
                    consignerLocation,
                    consigneeDetails,});
                    
                    return await companyLoad.save();

            } catch (error) {
                console.log(`Company load while saving\nError: ${error}`);
            }
        }
}