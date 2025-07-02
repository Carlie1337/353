"use client"

interface DocumentData {
  type: string
  recipientName: string
  purpose: string
  dateIssued: string
  issuedBy: string
  barangayName?: string
  barangayAddress?: string
}

export class PDFGenerator {
  static async generateBarangayCertificate(data: DocumentData): Promise<Blob> {
    // Create a simple HTML template for the certificate
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Barangay Certificate</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: #ccc;
            border-radius: 50%;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
          }
          .subtitle {
            font-size: 18px;
            margin: 5px 0;
          }
          .content {
            margin: 40px 0;
            line-height: 1.8;
          }
          .signature {
            margin-top: 60px;
            text-align: right;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            width: 200px;
            margin: 20px 0 5px auto;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo"></div>
          <div class="title">REPUBLIC OF THE PHILIPPINES</div>
          <div class="subtitle">Province of Davao del Sur</div>
          <div class="subtitle">City of Davao</div>
          <div class="subtitle">BARANGAY BUCANA</div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <h2>BARANGAY CERTIFICATE</h2>
        </div>
        
        <div class="content">
          <p><strong>TO WHOM IT MAY CONCERN:</strong></p>
          
          <p style="text-indent: 50px;">
            This is to certify that <strong>${data.recipientName}</strong> is a bonafide resident of 
            Barangay Bucana, Davao City, Davao del Sur.
          </p>
          
          <p style="text-indent: 50px;">
            This certification is issued for <strong>${data.purpose}</strong> and for whatever 
            legal purpose it may serve.
          </p>
          
          <p style="text-indent: 50px;">
            Issued this <strong>${data.dateIssued}</strong> at Barangay Bucana, Davao City, Philippines.
          </p>
        </div>
        
        <div class="signature">
          <div class="signature-line"></div>
          <div><strong>${data.issuedBy}</strong></div>
          <div>Barangay Captain</div>
        </div>
      </body>
      </html>
    `

    // Convert HTML to PDF (simplified version)
    // In a real implementation, you would use a library like jsPDF or Puppeteer
    const blob = new Blob([htmlContent], { type: "text/html" })
    return blob
  }

  static async generateCertificateOfResidency(data: DocumentData): Promise<Blob> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Certificate of Residency</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
          }
          .subtitle {
            font-size: 18px;
            margin: 5px 0;
          }
          .content {
            margin: 40px 0;
            line-height: 1.8;
          }
          .signature {
            margin-top: 60px;
            text-align: right;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            width: 200px;
            margin: 20px 0 5px auto;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">REPUBLIC OF THE PHILIPPINES</div>
          <div class="subtitle">Province of Davao del Sur</div>
          <div class="subtitle">City of Davao</div>
          <div class="subtitle">BARANGAY BUCANA</div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <h2>CERTIFICATE OF RESIDENCY</h2>
        </div>
        
        <div class="content">
          <p><strong>TO WHOM IT MAY CONCERN:</strong></p>
          
          <p style="text-indent: 50px;">
            This is to certify that <strong>${data.recipientName}</strong> is a resident of 
            Barangay Bucana, Davao City, Davao del Sur for the past years and is known to be 
            of good moral character and law-abiding citizen.
          </p>
          
          <p style="text-indent: 50px;">
            This certification is issued upon the request of the above-mentioned person for 
            <strong>${data.purpose}</strong> and for whatever legal purpose it may serve.
          </p>
          
          <p style="text-indent: 50px;">
            Issued this <strong>${data.dateIssued}</strong> at Barangay Bucana, Davao City, Philippines.
          </p>
        </div>
        
        <div class="signature">
          <div class="signature-line"></div>
          <div><strong>${data.issuedBy}</strong></div>
          <div>Barangay Captain</div>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: "text/html" })
    return blob
  }

  static async generateIndigencyCertificate(data: DocumentData): Promise<Blob> {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Certificate of Indigency</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 40px;
            background: white;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
          }
          .subtitle {
            font-size: 18px;
            margin: 5px 0;
          }
          .content {
            margin: 40px 0;
            line-height: 1.8;
          }
          .signature {
            margin-top: 60px;
            text-align: right;
          }
          .signature-line {
            border-bottom: 1px solid #000;
            width: 200px;
            margin: 20px 0 5px auto;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="title">REPUBLIC OF THE PHILIPPINES</div>
          <div class="subtitle">Province of Davao del Sur</div>
          <div class="subtitle">City of Davao</div>
          <div class="subtitle">BARANGAY BUCANA</div>
        </div>
        
        <div style="text-align: center; margin: 40px 0;">
          <h2>CERTIFICATE OF INDIGENCY</h2>
        </div>
        
        <div class="content">
          <p><strong>TO WHOM IT MAY CONCERN:</strong></p>
          
          <p style="text-indent: 50px;">
            This is to certify that <strong>${data.recipientName}</strong> is a bonafide resident of 
            Barangay Bucana, Davao City, Davao del Sur and belongs to the indigent family of this barangay.
          </p>
          
          <p style="text-indent: 50px;">
            This certification is issued upon the request of the above-mentioned person for 
            <strong>${data.purpose}</strong> and for whatever legal purpose it may serve.
          </p>
          
          <p style="text-indent: 50px;">
            Issued this <strong>${data.dateIssued}</strong> at Barangay Bucana, Davao City, Philippines.
          </p>
        </div>
        
        <div class="signature">
          <div class="signature-line"></div>
          <div><strong>${data.issuedBy}</strong></div>
          <div>Barangay Captain</div>
        </div>
      </body>
      </html>
    `

    const blob = new Blob([htmlContent], { type: "text/html" })
    return blob
  }

  static downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}

export default PDFGenerator
