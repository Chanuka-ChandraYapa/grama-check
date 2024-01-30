import { jsPDF } from "jspdf";

interface UserDetails {
    user_name: string;
    user_address: string;
    grama_sevaka: string;
    grama_niladhari_name: string;
}

const doc = new jsPDF("landscape");

export const generatePDF = (userdetails: UserDetails) => {
    // set the doc title to "Grama Nildhari Certificate"
    doc.setProperties({ title: "Grama Nildhari Certificate" });
    doc.setFontSize(40);
    doc.setFont("Comic Sans");
    const text = "Grama Nildhari Certificate";
    const textWidth = doc.getTextDimensions(text).w;
    const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.text(text, centerX, 30);


    const imageWidth = 90;
    const imageHeight = 90;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX_img = (pageWidth - imageWidth) / 2;
    const centerY_img = (doc.internal.pageSize.getHeight() - imageHeight) / 2;
    doc.addImage("/images/badge_1.png", "PNG", centerX_img, centerY_img - 30, imageWidth, imageHeight, "alias1", "FAST");

    doc.setFontSize(20);
    const text2 = `This is to certify that ${userdetails.user_name} of ${userdetails.user_address}\n has been registered as a resident of this Grama Niladhari Division.`;
    const maxWidth = 200; // Maximum width for each line
    const lines = doc.splitTextToSize(text2, maxWidth);
    const lineHeight = 10; // Height between each line
    const startY = 140; // Starting Y position for the text

    lines.forEach((line: string, index: number) => {
        const textWidth = doc.getTextDimensions(line).w;
        const centerX = (doc.internal.pageSize.getWidth() - textWidth) / 2;
        const currentY = startY + index * lineHeight;
        doc.text(line, centerX, currentY);
    });

    const currentDate = new Date().toISOString().split('T')[0];
    const text3 = `Grama Niladhari Division: ${userdetails.grama_sevaka}\n\nDate of Issue: ${currentDate}`;
    doc.setFontSize(20);
    doc.text(text3, 20, 170);

    const text4 = `${userdetails.grama_niladhari_name}`;
    const text4Width = doc.getTextDimensions(text4).w;
    const text4X = doc.internal.pageSize.getWidth() - text4Width - 20;
    const text4Y = doc.internal.pageSize.getHeight() - 20;
    doc.text(text4, text4X, text4Y);

    doc.addImage("/images/sign.png", "PNG", 235, 160, 20, 20, "alias2", "SLOW");

    doc.addImage("/images/back.png", "PNG", 0, 0, 297, 210, "alias3", "SLOW");

    doc.output('dataurlnewwindow');
}
