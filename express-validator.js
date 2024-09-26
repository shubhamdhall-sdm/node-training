const { validationResult } = require("../../middleware/utils");
const { check } = require("express-validator");

/**
 * Validates addNewClinic request
 */
exports.addNewClinic = [
    check("added_by")
        .not()
        .isEmpty()
        .withMessage("Added By is required"),
    check("name")
        .not()
        .isEmpty()
        .withMessage("Clinic Name field is required"),
    check("specialities")
        .not()
        .isEmpty()
        .withMessage("Specialities field is required"),
    check("clinic_type")
        .not()
        .isEmpty()
        .withMessage("Clinic Type field is required"),
    check("email")
        .not()
        .isEmpty()
        .withMessage("Email is empty")
        .isEmail()
        .withMessage("Email field is required"),
    check("address")
        .not()
        .isEmpty()
        .withMessage("Address field is empty"),
    check("city")
        .not()
        .isEmpty()
        .withMessage("City field is empty"),
    check("state")
        .not()
        .isEmpty()
        .withMessage("State field is empty"),
    check("country")
        .not()
        .isEmpty()
        .withMessage("Country field is empty"),
    check("zipcode")
        .not()
        .isEmpty()
        .withMessage("Zip Code field is empty"),
    check("phone")
        .not()
        .isEmpty()
        .withMessage("Phone Number field is empty"),
    (req, res, next) => {
        validationResult(req, res, next);
    }
];
const { validationResult } = require("express-validator");
exports.validationResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    if (req.body.email) {
      req.body.email = req.body.email.toLowerCase();
    }
    return next();
  } catch (err) {
    return error;
  }
};
