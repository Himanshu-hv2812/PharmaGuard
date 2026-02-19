const fs = require('fs');
const readline = require('readline');

// The 6 mandatory genes for the RIFT '26 Hackathon
const TARGET_GENES = ['CYP2D6', 'CYP2C19', 'CYP2C9', 'SLCO1B1', 'TPMT', 'DPYD'];

/**
 * Parses a VCF file and extracts variants matching the target genes.
 * @param {string} filePath - The path to the uploaded .vcf file
 * @returns {Promise<Array>} - An array of extracted gene variant objects
 */
const parseVCF = async (filePath) => {
    const extractedVariants = [];

    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        // Skip meta-information and header lines
        if (line.startsWith('#')) continue;

        const columns = line.split('\t');
        if (columns.length < 8) continue; // Invalid VCF line

        const infoColumn = columns[7];
        const idColumn = columns[2]; // Usually contains the rsID

        // Check if the INFO column contains any of our target genes
        const matchedGene = TARGET_GENES.find(gene => infoColumn.includes(`GENE=${gene}`));

        if (matchedGene) {
            // Extract the Star allele (e.g., STAR=*4) if it exists
            const starMatch = infoColumn.match(/STAR=(\*?\w+)/);
            const starAllele = starMatch ? starMatch[1] : 'Unknown';

            // Extract RS ID from either the ID column or INFO tag
            const rsMatch = infoColumn.match(/RS=(rs\d+)/);
            const rsId = rsMatch ? rsMatch[1] : (idColumn !== '.' ? idColumn : 'Unknown');

            extractedVariants.push({
                gene: matchedGene,
                rsid: rsId,
                variant: starAllele,
                raw_info: infoColumn
            });
        }
    }

    return extractedVariants;
};

module.exports = { parseVCF };