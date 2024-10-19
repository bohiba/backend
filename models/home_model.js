const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const ImageSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false,
    },
    altText: {
        type: String,
        required: false,
    },
    content: {
        type: String,
        required: false,
    }
});

const AddressSchema = new Schema({
    gateNo: String,
    address: String,
    district: String,
    state: String,
    pincode: String,
    country: String
});

const CompanyContactDetails = new Schema({
    mobileNumber: String,
    email: String,
});

const CompanyMetalDetails = new Schema({
    metal: String,
    price: String,
});

const CompanyVehicleDetails = new Schema({
    wheeler: String,
    total: String,
});

const FuelPumpDetails = new Schema({
    pumpName: String,
    fuelType: String,
    mapUrl: String,
});

const ScheduleDetails = new Schema({
    pumpName: String,
    mapUrl: String,
});

const ToSchema = new Schema({
    companyDetails: {
        companyName: String,
        gst: String,
        contactDetails: CompanyContactDetails,
        addressDetails: AddressSchema,
        materialDetails: CompanyMetalDetails,
        vehicleDetails: [ CompanyVehicleDetails ],
        fuelDetails: FuelPumpDetails,
        schedule: ScheduleDetails,
    },
});

const WishListSchema = new Schema({
    id: String,
    name: String,
    price: String,
    img: String,
    gst: String,
    wishlisted: Boolean,
    address: AddressSchema,
    to: [ToSchema],
});

const DriverDetails = new Schema({
     driverDetails: {
      driverName: String,
      liecenseNo: String,
      expiry: String,
      mobileNumber: String,
    },
});

const InsuranceDetails = new Schema({
    insuranceFrom: String,
    insuranceUpto: String,
    insuranceCompanyCode: Number,
    insuranceCompanyName: String,
    opdt: String,
    policyNo: String,
    vahanVerify: Boolean,
    regNo: String
});

const PuccDetails = new Schema({
    puccFrom: String,
    puccUpto: String,
    puccCentreNo: String,
    puccNo: String,
    opDt: String
});

const PermitDetails = new Schema({
    applNo: String,
    pmtNo: String,
    regNo: String,
    rcptNo: String,
    purpose: String,
    permitType: String,
    permitCatg: null,
    permitIssuedOn: String,
    permitValidFrom: String,
    permitValidUpto: String
});

const TaxDetails = new Schema({
    regNo: String,
    taxMode: String,
    paymentMode: String,
    taxAmt: Number,
    taxFine: Number,
    rcptDt: String,
    taxFrom: String,
    taxUpto: String,
    collectedBy: String,
    rcptNo: String,
});

const FinancerDetails = new Schema({
    hpType: String,
    financerName: String,
    financerAddressLine1: String,
    financerAddressLine2: String,
    financerAddressLine3: String,
    financerDistrict: Number,
    financerPincode: Number,
    financerState: String,
    hypothecationDt: String,
    opDt: String
});

const VehicleDetails = new Schema({
    regdNo: String,
    chassisNo: String,
    engineNo: String,
    vehicleManufacturerName: String,
    modelCode: String,
    model: String,
    bodyType: String,
    unladenWeight: Number,
    vehicleGrossWeight: Number,
    fuelDescr: String,
    color: String,
    manufacturingMon: Number,
    manufacturingYr: Number,
    normsDescr: String,
    wheelbase: Number,
    cubicCap: Number,
    insuranceDetails: InsuranceDetails,
    puccDetails: PuccDetails,
    permitDetails: PermitDetails,
    taxDetails: TaxDetails,
    financerDetails: FinancerDetails
});

const TopTipper = new Schema({
    id: String,
    driverDetails: DriverDetails,
    vehicleDetails: {
      regdNo: String,
      chassisNo: String,
      engineNo: String,
      vehicleManufacturerName: String,
      modelCode: String,
      model: String,
      bodyType: String,
      unladenWeight: Number,
      vehicleGrossWeight: Number,
      fuelDescr: String,
      color: String,
      manufacturingMon: Number,
      manufacturingYr: Number,
      normsDescr: String,
      wheelbase: Number,
      cubicCap: Number,
      insuranceDetails: InsuranceDetails,
      puccDetails: PuccDetails,
      permitDetails: PermitDetails,
      taxDetails: TaxDetails,
      financerDetails: FinancerDetails
    }
});

const HomeSchema = new Schema({
    images: [ ImageSchema  ],
    wishList: [ WishListSchema ],
    topTipper: [ TopTipper ],
});