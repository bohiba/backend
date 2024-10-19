
const axios = require('axios');
const { logger } = require("../utils/logger");
const { vehicleDetailsModel } = require('../models/vehicle_model');
const { response } = require('express');

class VehicleMiddleware {
    static async getVehicleDetails({ vehicleNumber }) {
        const options = {
            method: 'POST',
            url: 'https://rto-vehicle-information-verification-india.p.rapidapi.com/api/v1/rc/vehicleinfo',
            headers: {
              'x-rapidapi-key': '2e2ae9ff29msheb98b94768a91aap11f2dejsn2fc324a9eea8',
              'x-rapidapi-host': 'rto-vehicle-information-verification-india.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {
              reg_no: vehicleNumber,
              consent: 'Y',
              consent_text: 'I hear by declare my consent agreement for fetching my information via AITAN Labs API'
            }
          };

        try {
        	const resObject = await axios.request(options);
            if (resObject.status === 200) {
                let vehicleObject = resObject.data[`result`];
                let insuranceObject = vehicleObject[`vehicle_insurance_details`];
                let puccObject = vehicleObject[`vehicle_pucc_details`];
                let permitObject = vehicleObject[`permit_details`];
                return {
                    code: resObject.status,
                    success: true,
                    vehicleDetails: {
                        ownerName: vehicleObject[`owner_name`],
                        vehicleClassDesc: vehicleObject[`vehicle_class_desc`],
                        model: vehicleObject[`model`],
                        bodyType: vehicleObject[`body_type`],
                        engineNumber: vehicleObject[`chassis_no`],
                        chassisNumber: vehicleObject[`chassis_no`],
                        manufacturer: vehicleObject[`vehicle_manufacturer_name`],
                        unladenWeight: vehicleObject[`unladen_weight`],
                        vehicleGrossWeight: vehicleObject[`vehicle_gross_weight`],
                        color: vehicleObject[`color`],
                        vehicleCategory: vehicleObject[`vehicle_catg`],
                        panNumber: vehicleObject[`pan_no`],
                        vehicleInsuranceValidity: {
                            insuranceValidFrom: insuranceObject[`insurance_from`],
                            insuranceValidTill: insuranceObject[`insurance_upto`],
                            insuranceCompany: insuranceObject[`insurance_company_name`],
                            policyNumber: insuranceObject[`policy_no`],
                        },
                        permitValidity: {
                            permitValidFrom: permitObject[`permit_valid_from`],
                            permitValidTill: permitObject[`permit_valid_upto`],
                            permitType: permitObject[`permit_type`],
                            permitNumber: permitObject[`pmt_no`],
                        },
                        puccValidity: {
                            puccValidFrom: puccObject[`pucc_from`],
                            puccValidTill: puccObject[`pucc_upto`],
                            puccCenterNumber: puccObject[`pucc_centreno`],
                            puccNumber: puccObject[`pucc_no`],
                        },
                    }
                }
            }
        } catch (error) {
            console.log(error)
            return {
                code: error.status,
                status: false,
                error: error.message,
            }
        	
        }
    }

    /* Demo Code */
    static async getDemoApi() {
        const options = {
          method: 'GET',
          url: 'https://api.restful-api.dev/objects/1/',
        // url: 'https://api.restful-api.dev/invalid-url',
          headers: {
            'Content-Type': 'application/json'
          }
        };
        
        try {
        	let resObject = await axios.request(options);
            if (`name` in resObject.data) {
                return {
                    code: resObject.status,
                    success: true,
                    message: resObject.data 
                }
            } 
        } catch (error) {
            if (error.response.data.status === 404) {
                return {
                    code: error.response.data.status,
                    success: false,
                    message: `${error.response.data.path} ${error.response.data.error}`,
                }
            } else {
                return {
                    code: error.response.data.status,
                    success: false,
                    message: `${error.response.data.error}`,
                }
            }
        }
    }
}

module.exports = VehicleMiddleware;