const axios = require('axios');
const { logger } = require('../utils/logger');
const { text } = require('body-parser');

class DriverMiddleware {
    static async getDriverDetails({ licenseNumber, dob }) {
        const options = {
            method: 'POST',
            url: 'https://driving-license-verification1.p.rapidapi.com/DL/DLDetails',
            headers: {
              'x-rapidapi-key': '2e2ae9ff29msheb98b94768a91aap11f2dejsn2fc324a9eea8',
              'x-rapidapi-host': 'driving-license-verification1.p.rapidapi.com',
              'Content-Type': 'application/json'
            },
            data: {
              method: 'dlvalidate',
              txn_id: '9ujh7gdhgs',
              clientid: '2222',
              consent: 'Y',
              dlnumber: licenseNumber,
              dob: dob
            }
          };
          
          try {
              const response = await axios.request(options);
              console.log(response.data);
              if (response.status === 200) {
                let driverObject = response.data[`Succeeded`][`data`][`result`];
                return {
                  code: response.status,
                  success: true,
                  message: {
                      licenseNumber: driverObject[`dl_no`],
                      driverImage: driverObject[`image`],
                      name: driverObject[`name`],
                      bloodGroup: driverObject[`blood_group`],
                      mobileNumber: driverObject[`mobile_number`],
                      permanentAddress: driverObject[`permanent_address`],
                      cov: driverObject[`cov`],  /// class of vehicle [LMV, MCWG, HMV, TRANS]
                      validity: {
                          nonTransport: {
                              validFrom: driverObject[`nt_validity_from`],
                              validTill: driverObject[`nt_validity_to`]
                          },
                          transport: {
                              validFrom: driverObject[`t_validity_from`],
                              validTill: driverObject[`t_validity_to`]
                          }
                      }
                  } 
                }
              }
          } catch (error) {
              console.error(error);
          }
    }
}

module.exports = DriverMiddleware;
