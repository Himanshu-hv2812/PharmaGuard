# PharmaGuard: Pharmacogenomic Risk Prediction System

**RIFT 2026 HACKATHON** 
**Track:** Health Tech Track / Pharmacogenomics / Explainable AI Track

## 🔗 Mandatory Links
* **Live Deployed Web Application URL:**  https://capable-dodol-6eca80.netlify.app/) 
* **LinkedIn Video Demonstration:** https://www.linkedin.com/posts/jai-ganesh-689246333_pharmaguard-shadowcoders-rifthackathon-activity-7430439836529893376-8lo-?utm_source=share&utm_medium=member_android&rcm=ACoAAFPc-EkBaFzu3OyvkQ49lbGdfdQlc1HGtB0
* **Hashtags:** #RIFT2026 #PharmaGuard #Pharmacogenomics #AIinHealthcare

## 🚨 Problem Overview
* Adverse drug reactions kill over 100,000 Americans annually. 
* Many of these deaths are preventable through pharmacogenomic testing, which analyzes how genetic variants affect drug metabolism.

## 💡 Architecture Overview & Core Challenge
This AI-powered web application analyzes patient genetic data (VCF files) and drug names to predict personalized pharmacogenomic risks. It provides clinically actionable recommendations accompanied by LLM-generated explanations. 

The system achieves this by:
* Parsing authentic VCF files (Variant Call Format), which is the industry standard for genomic data.
* Identifying pharmacogenomic variants across 6 critical genes: CYP2D6, CYP2C19, CYP2C9, SLCO1B1, TPMT, and DPYD.
* Predicting drug-specific risks categorized as Safe, Adjust Dosage, Toxic, Ineffective, or Unknown.
* Generating clinical explanations using LLMs that feature specific variant citations and biological mechanisms.
* Providing dosing recommendations that are aligned with CPIC guidelines.

## 📥 Input Requirements
* **VCF File Upload:** Accepts `.vcf` format (Variant Call Format v4.2) up to 5 MB in size.
* **File Structure:** Must be a standard VCF containing INFO tags such as GENE, STAR, and RS.
* **Drug Name Input:** Accepts single or comma-separated multiple drugs via a text input field or dropdown selection.
* **Supported Drugs:** CODEINE, WARFARIN, CLOPIDOGREL, SIMVASTATIN, AZATHIOPRINE, FLUOROURACIL.

## 📤 Output Requirements & Schema
The application MUST generate structured JSON output matching an EXACT schema. The exact fields include:
* `"patient_id"` and `"drug"`.
* `"timestamp"` and `"risk_assessment"`.
* `"confidence_score"` and `"pharmacogenomic_profile"` (including `primary_gene`, `diplotype`, and `phenotype`).
* `"detected_variants"` featuring the `rsid`.
* `"llm_generated_explanation"`.

## ⚙️ Installation Instructions & Tech Stack
* Clone this comprehensive public GitHub repository containing all source code.
* Install dependencies using the provided `requirements.txt` or `package.json`.
* Configure environment variables utilizing the included `.env.example` file.

## 🚀 API Docs & Usage Examples
* **File Upload:** Utilize the drag-and-drop or file picker interface to upload a validated VCF file.
* **Visual Presentation:** The results display features color-coded risk labels where Green equals Safe, Yellow equals Adjust, and Red equals Toxic/Ineffective.
* **Detailed Information:** Users can interact with expandable sections for detailed information and utilize downloadable JSON output with copy-to-clipboard functionality.
* **Error Handling:** The system provides clear error messages for invalid VCF files and graceful handling of missing annotations.# PharmaGuard: Pharmacogenomic Risk Prediction System

**RIFT 2026 HACKATHON** 
**Track:** Health Tech Track / Pharmacogenomics / Explainable AI Track

## 🔗 Mandatory Links
* **Live Deployed Web Application URL:** [Insert Public URL Here - Supported platforms: Vercel, Netlify, Render, AWS, GCP, Azure]
* **LinkedIn Video Demonstration:** [Insert 2-5 min Video Link Here tagging RIFT official LinkedIn page]
* **Hashtags:** #RIFT2026 #PharmaGuard #Pharmacogenomics #AIinHealthcare

## 🚨 Problem Overview
* Adverse drug reactions kill over 100,000 Americans annually. 
* Many of these deaths are preventable through pharmacogenomic testing, which analyzes how genetic variants affect drug metabolism.

## 💡 Architecture Overview & Core Challenge
This AI-powered web application analyzes patient genetic data (VCF files) and drug names to predict personalized pharmacogenomic risks. It provides clinically actionable recommendations accompanied by LLM-generated explanations. 

The system achieves this by:
* Parsing authentic VCF files (Variant Call Format), which is the industry standard for genomic data.
* Identifying pharmacogenomic variants across 6 critical genes: CYP2D6, CYP2C19, CYP2C9, SLCO1B1, TPMT, and DPYD.
* Predicting drug-specific risks categorized as Safe, Adjust Dosage, Toxic, Ineffective, or Unknown.
* Generating clinical explanations using LLMs that feature specific variant citations and biological mechanisms.
* Providing dosing recommendations that are aligned with CPIC guidelines.

## 📥 Input Requirements
* **VCF File Upload:** Accepts `.vcf` format (Variant Call Format v4.2) up to 5 MB in size.
* **File Structure:** Must be a standard VCF containing INFO tags such as GENE, STAR, and RS.
* **Drug Name Input:** Accepts single or comma-separated multiple drugs via a text input field or dropdown selection.
* **Supported Drugs:** CODEINE, WARFARIN, CLOPIDOGREL, SIMVASTATIN, AZATHIOPRINE, FLUOROURACIL.

## 📤 Output Requirements & Schema
The application MUST generate structured JSON output matching an EXACT schema. The exact fields include:
* `"patient_id"` and `"drug"`.
* `"timestamp"` and `"risk_assessment"`.
* `"confidence_score"` and `"pharmacogenomic_profile"` (including `primary_gene`, `diplotype`, and `phenotype`).
* `"detected_variants"` featuring the `rsid`.
* `"llm_generated_explanation"`.

## ⚙️ Installation Instructions & Tech Stack
* Clone this comprehensive public GitHub repository containing all source code.
* Install dependencies using the provided `requirements.txt` or `package.json`.
* Configure environment variables utilizing the included `.env.example` file.

## 🚀 API Docs & Usage Examples
* **File Upload:** Utilize the drag-and-drop or file picker interface to upload a validated VCF file.
* **Visual Presentation:** The results display features color-coded risk labels where Green equals Safe, Yellow equals Adjust, and Red equals Toxic/Ineffective.
* **Detailed Information:** Users can interact with expandable sections for detailed information and utilize downloadable JSON output with copy-to-clipboard functionality.
* **Error Handling:** The system provides clear error messages for invalid VCF files and graceful handling of missing annotations.
