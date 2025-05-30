import { PdfReader } from "pdfreader";
import { Readable } from "stream";

export async function POST(req) {
  try {
    // Get the form data from the request
    const formData = await req.formData();
    const file = formData.get("file"); // Must match the key used in FormData

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: "No valid PDF file provided" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Convert the file to a buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Create a readable stream from the buffer for pdfreader
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signal end of stream

    // Parse the PDF
    let pdfText = "";
    await new Promise((resolve, reject) => {
      new PdfReader().parseBuffer(buffer, (err, item) => {
        if (err) {
          console.error("PDF parsing error:", err);
          reject(err);
        } else if (!item) {
          resolve(); // End of file
        } else if (item.text) {
          pdfText += item.text + " "; // Accumulate text
        }
      });
    });

    return new Response(JSON.stringify({ text: pdfText.trim() }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in /api/parsepdf:", error);
    return new Response(
      JSON.stringify({ error: "PDF parsing failed" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}