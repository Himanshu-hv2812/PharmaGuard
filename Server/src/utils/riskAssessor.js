// Import our medical knowledge base
const cpicData = require('../data/cpicKnowledgeBase.json');

/**
 * Calculates drug risk based on patient's genetic variants.
 * @param {Array} parsedVariants - The array of variants from your VCF parser
 * @param {String} targetDrug - The drug name input by the doctor
 * @returns {Object} - The risk assessment profile
 */
const calculateRisk = (parsedVariants, targetDrug) => {
    // Standardize the drug name for matching
    const drug = targetDrug.toUpperCase().trim();
    
    // Default assessment if no genetic conflict is found
    let assessment = {
        risk_level: "Safe",
        severity: "Low",
        recommendation: "Standard dosing guidelines apply. No specific genetic risk found in provided data.",
        primary_gene: "None detected",
        phenotype: "Normal Metabolizer",
        matched_variant: null
    };

    // Scan the patient's variants against our knowledge base
    for (const variant of parsedVariants) {
        const geneRules = cpicData[variant.gene];
        
        if (geneRules) {
            const alleleRules = geneRules[variant.variant];
            
            // If the patient has a variant that affects THIS specific drug
            if (alleleRules && alleleRules.drugs[drug]) {
                assessment.risk_level = alleleRules.drugs[drug].risk_level;
                assessment.recommendation = alleleRules.drugs[drug].recommendation;
                assessment.primary_gene = variant.gene;
                assessment.phenotype = alleleRules.phenotype;
                assessment.matched_variant = variant;
                
                // Set severity for UI color-coding
                if (assessment.risk_level === "Toxic" || assessment.risk_level === "Ineffective") {
                    assessment.severity = "High";
                } else if (assessment.risk_level === "Adjust Dosage") {
                    assessment.severity = "Medium";
                }
                
                break; // Stop searching once we find the primary interaction
            }
        }
    }

    return assessment;
};

module.exports = { calculateRisk };