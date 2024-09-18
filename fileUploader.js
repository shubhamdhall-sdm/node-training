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
