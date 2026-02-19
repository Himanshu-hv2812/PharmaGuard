const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { parseVCF } = require('../utils/vcfParser'); 
const { calculateRisk } = require('../utils/riskAssessor');
const { generateClinicalExplanation } = require('../utils/llmService');

// 1. Notice the path is '/' and 'protect' is inserted right before 'upload'
router.post('/', protect, upload.single('vcfFile'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No VCF file uploaded.' });
        }
        
        const drugName = req.body.drugName;
        if (!drugName) {
            return res.status(400).json({ error: 'Please provide a drugName.' });
        }

        const filePath = req.file.path;
        
        // Step A: Parse the VCF File
        const extractedVariants = await parseVCF(filePath);
        
        // Step B: Calculate the Risk Level
        const riskProfile = calculateRisk(extractedVariants, drugName);

        // Step C: Ask AI for the Biological Explanation
        const aiExplanation = await generateClinicalExplanation(riskProfile, drugName);

        // Step D: Send the final payload back to the frontend
        res.status(200).json({
            status: "success",
            patient_id: "PT-Hackathon", 
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
            clinical_recommendation: riskProfile.recommendation,
            llm_generated_explanation: aiExplanation 
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        res.status(500).json({ error: 'Failed to process genomic data.' });
    }
});

module.exports = router;