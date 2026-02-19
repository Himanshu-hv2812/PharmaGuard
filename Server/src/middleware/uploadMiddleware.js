const multer = require('multer');
const path = require('path');

// Configure where and how to save the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Saves files to your uploads/ folder
    },
    filename: function (req, file, cb) {
        // Renames file to prevent overwriting: timestamp-originalName.vcf
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the strict VCF filter
const fileFilter = (req, file, cb) => {
    // Check extension
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.vcf') {
        return cb(new Error('Only .vcf files are allowed'), false);
    }
    cb(null, true);
};

// Initialize Multer with the 5MB limit
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB in bytes
    }
});

module.exports = upload;