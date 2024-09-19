/*
 * Add new pet route
 */
//TODO:: swagger doc yet to be made
router.post(
    "/add-new-pet",
    requireAuth,
    multerUploadMiddleware(uploadPetFilesImage),
    // validate.addNewPet,
    controller.addNewPet
);

const multer = require("multer");

/**
 * multer upload middleware method
 * @param req 
 * @param res  
 * @param next  
 * @returns 
*/
exports.multerUploadMiddleware = (multerUploadFunction) => {
    return (req, res, next) =>
        multerUploadFunction(req, res, err => {
            // handle Multer error
            if (req.fileValidationError) {
                return res.status(201).send({
                    statusCode: 201,
                    errors: {
                        msg: req.fileValidationError
                    }
                })
            }
            // else if (!req.file) {
            //     return res.status(201).send({
            //         statusCode: 201,
            //         message: "Please select an image to upload"
            //     }) 
            // }
            else if (err instanceof multer.MulterError) {
                console.log("multer error");
                return res.status(201).send({
                    statusCode: 201,
                    errors: {
                        msg: err
                    } 
                })
            }
            else if (err) {
                console.log("here error");
                return res.status(201).send({
                    statusCode: 201,
                    errors: {
                        msg: err
                    } 
                })
            }

            next();
        });
}

const multer = require('multer');
const fs = require("fs");
const { petPictureMaxFileSize } = require('../../storage/fileSize');
const { v4: uuidv4 } = require('uuid');
const { petDocuments } = require('../../../files-path/pet/path');

/*
 * pet files storage configuration
*/
let petFilesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dir = petDocuments;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + file.originalname);
    }
});


/*
 * pet files uploader configuration
*/
let petFilesUploader = multer({
    storage: petFilesStorage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname == 'pet_image') {
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                cb(null, true);
            }
            else {
                cb(null, false);
                req.fileValidationError = {
                    fieldname: file.fieldname,
                    error: 'Only .png, .jpg and .jpeg type formats are allowed'
                }
                return cb(new Error('Only .png, .jpg and .jpeg type formats are allowed'));
            }
        } else {
            if (
                file.mimetype == 'image/png' ||
                file.mimetype == 'image/jpg' ||
                file.mimetype == 'image/jpeg' || 
                file.mimetype == 'application/pdf' ||
                file.mimetype == 'application/vnd.ms-excel' ||
                file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.mimetype == 'text/csv' ||
                file.mimetype == 'application/msword' ||
                file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ) {
                cb(null, true);
            }
            else {
                cb(null, false);
                req.fileValidationError = {
                    fieldname: file.fieldname,
                    error: 'Only .png, .jpg, .jpeg, .pdf, .xls, .xlsx, .csv, .doc and .docx file formats are allowed'
                }
                return cb(new Error('Only .png, .jpg, .jpeg, .pdf, .xls, .xlsx, .csv, .doc and .docx file formats are allowed'));
            }
            // cb(null, false);
            // req.fileValidationError = {
            //     fieldname: file.fieldname,
            //     error: 'This field name is not allowed.'
            // };
            // return cb(new Error('This field name is not allowed.'));
        }
    },
    limits: { fileSize: petPictureMaxFileSize }
});


/*
 * pet files upload image configuration
*/
exports.uploadPetFilesImage = petFilesUploader.any(); 

let forClinic;
            let petImage = '';
            let petDocuments = [];

            req.files.findIndex((ele, i) => {
                if (ele.fieldname === 'pet_image') {
                    const imagePath = process.env.BACK_URL + ele.path.replace(/\\/g, '/');
                    petImage = imagePath;
                } else {
                    const imagePath = process.env.BACK_URL + ele.path.replace(/\\/g, '/');
                    // petDocuments.push(imagePath);
                    petDocuments.push({
                        pet_document: imagePath,
                        document_format_type: fileFormatType(ele.mimetype)
                    });
                }
            });
// unlink or delete file
if (req.files) {
            req.files.findIndex((ele, i) => {
                unlinkFile(ele.path);
            });
        }
