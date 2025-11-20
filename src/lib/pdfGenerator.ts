import jsPDF from 'jspdf';
import { Listing } from '@/types';

export function generatePropertyFlyer(listing: Listing): void {
    const doc = new jsPDF();
    const { propertyDetails, generatedContent } = listing;

    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('PROPERTY LISTING', 105, 20, { align: 'center' });

    // Address
    doc.setFontSize(16);
    doc.text(propertyDetails.address, 105, 35, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`${propertyDetails.city}, ${propertyDetails.state} ${propertyDetails.zip}`, 105, 42, { align: 'center' });

    // Price
    doc.setFontSize(18);
    doc.setTextColor(59, 130, 246); // Blue accent
    doc.text(`$${propertyDetails.price.toLocaleString()}`, 105, 55, { align: 'center' });
    doc.setTextColor(0, 0, 0); // Reset to black

    // Property Details
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    let y = 70;

    doc.text(`Bedrooms: ${propertyDetails.bedrooms}`, 20, y);
    doc.text(`Bathrooms: ${propertyDetails.bathrooms}`, 80, y);
    doc.text(`Sq Ft: ${propertyDetails.squareFeet.toLocaleString()}`, 140, y);
    y += 10;

    if (propertyDetails.lotSize) {
        doc.text(`Lot Size: ${propertyDetails.lotSize.toLocaleString()} sq ft`, 20, y);
        y += 7;
    }

    if (propertyDetails.yearBuilt) {
        doc.text(`Year Built: ${propertyDetails.yearBuilt}`, 20, y);
        y += 7;
    }

    doc.text(`Property Type: ${propertyDetails.propertyType}`, 20, y);
    y += 15;

    // Features
    if (propertyDetails.features && propertyDetails.features.length > 0) {
        doc.setFont('helvetica', 'bold');
        doc.text('Features:', 20, y);
        y += 7;
        doc.setFont('helvetica', 'normal');

        propertyDetails.features.forEach((feature, index) => {
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
            doc.text(`• ${feature}`, 25, y);
            y += 6;
        });
        y += 10;
    }

    // Description
    if (generatedContent?.mlsDescription) {
        if (y > 200) {
            doc.addPage();
            y = 20;
        }

        doc.setFont('helvetica', 'bold');
        doc.text('Description:', 20, y);
        y += 7;
        doc.setFont('helvetica', 'normal');

        const splitDescription = doc.splitTextToSize(generatedContent.mlsDescription, 170);
        splitDescription.forEach((line: string) => {
            if (y > 280) {
                doc.addPage();
                y = 20;
            }
            doc.text(line, 20, y);
            y += 6;
        });
    }


    // Footer with agent info
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);

        // Agent info at bottom
        if (propertyDetails.agentName || propertyDetails.agentBrokerage) {
            let agentY = 280;
            doc.setFont('helvetica', 'bold');
            if (propertyDetails.agentName) {
                doc.text(propertyDetails.agentName, 105, agentY, { align: 'center' });
                agentY += 4;
            }
            doc.setFont('helvetica', 'normal');
            if (propertyDetails.agentBrokerage) {
                doc.text(propertyDetails.agentBrokerage, 105, agentY, { align: 'center' });
            }
        }

        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
    }

    // Download
    const filename = `${propertyDetails.address.replace(/\s+/g, '_')}_Flyer.pdf`;
    doc.save(filename);
}

export function generateOpenHouseSheet(listing: Listing): void {
    const doc = new jsPDF();
    const { propertyDetails } = listing;

    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('OPEN HOUSE', 105, 30, { align: 'center' });

    // Address
    doc.setFontSize(16);
    doc.text(propertyDetails.address, 105, 50, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`${propertyDetails.city}, ${propertyDetails.state}`, 105, 60, { align: 'center' });

    // Price
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246);
    doc.text(`$${propertyDetails.price.toLocaleString()}`, 105, 80, { align: 'center' });
    doc.setTextColor(0, 0, 0);

    // Quick Details
    doc.setFontSize(14);
    const details = `${propertyDetails.bedrooms} Bed | ${propertyDetails.bathrooms} Bath | ${propertyDetails.squareFeet.toLocaleString()} Sq Ft`;
    doc.text(details, 105, 100, { align: 'center' });

    // Sign-in sheet
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('VISITOR SIGN-IN', 20, 130);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);

    // Table header
    doc.line(20, 140, 190, 140);
    doc.text('Name', 25, 145);
    doc.text('Email', 80, 145);
    doc.text('Phone', 140, 145);
    doc.line(20, 148, 190, 148);

    // Sign-in lines
    let y = 158;
    for (let i = 0; i < 15; i++) {
        doc.line(20, y, 190, y);
        y += 10;
    }

    // Agent info at bottom
    if (propertyDetails.agentName || propertyDetails.agentBrokerage) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0);
        let agentY = 270;
        if (propertyDetails.agentName) {
            doc.text(`Listing Agent: ${propertyDetails.agentName}`, 105, agentY, { align: 'center' });
            agentY += 5;
        }
        doc.setFont('helvetica', 'normal');
        if (propertyDetails.agentBrokerage) {
            doc.text(propertyDetails.agentBrokerage, 105, agentY, { align: 'center' });
        }
    }

    // Download
    const filename = `${propertyDetails.address.replace(/\s+/g, '_')}_OpenHouse.pdf`;
    doc.save(filename);
}
