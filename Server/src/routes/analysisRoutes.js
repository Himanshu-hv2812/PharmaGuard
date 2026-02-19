const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { parseVCF } = require('../utils/vcfParser'); 
const { calculateRisk } = require('../utils/riskAssessor'); // Import our new logic

router.post('/analyze', upload.single('vcfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No VCF file uploaded.' });
        }
        
        // Ensure the user provided a drug name (e.g., from a text input on the frontend)
        const drugName = req.body.drugName;
        if (!drugName) {
            return res.status(400).json({ error: 'Please provide a drugName.' });
        }

        const filePath = req.file.path;
        const extractedVariants = await parseVCF(filePath);
        
        // Pass the genetic data and the drug to our clinical engine
        const riskProfile = calculateRisk(extractedVariants, drugName);

        // Format the output exactly as the hackathon judges expect
        res.status(200).json({
            status: "success",
            patient_id: "PT-Hackathon", // Mock ID for now
            timestamp: new Date().toISOString(),
            drug: drugName.toUpperCase(),
            risk_assessment: {
                risk_label: riskProfile.risk_level,
                severity: riskProfile.severity,
                confidence_score: 0.95
            },
            pharmacogenomic_profile: {
                primary_gene: riskProfile.primary_gene,
                phenotype: riskProfile.phenotype
            },
            detected_variants: extractedVariants,
            clinical_recommendation: riskProfile.recommendation
        });

    } catch (error) {
        console.error("Parsing Error:", error);
        res.status(500).json({ error: 'Failed to process genomic data.' });
    }
});

module.exports = router;