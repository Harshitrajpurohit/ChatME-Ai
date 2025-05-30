import gemeniApi from "@/app/api/GetApi/gemeni";

export async function GET() {
  return new Response(JSON.stringify({ "error": "Nice try. This route isn't meant for direct access." }), {
    status: 200
  })
}

export async function POST(request) {
  const data = await request.json();
  const uMessage = data.userMessage;
  const pdfData = data.parseData;

  try {
    const prompt = `
                  You are an experienced recruiter. Based on the resume provided below, 
                  respond to the following user query in a helpful and professional manner.

                  User Message:
                  ${uMessage}

                  Resume Text:
                  ${pdfData}  

                  Instructions:
                    - If the user query is detailed or has multiple questions, provide a comprehensive, multi-paragraph response.
                    - The user might specify how long they want your reply to be (for example, "in 30 lines" or "in 10 lines").
                    - Please **follow the user’s specified reply length exactly**.
                    - If no length is specified, keep the reply concise (around 10 lines).
                  `;

    const apiResponse = await gemeniApi(prompt)
    return Response.json({ reply: apiResponse });

  } catch (error) {
    return Response.json({ reply: "Oops! Something went wrong with the resume reviewer. Please try again in a little while." }, {
      status: 404
    });
  }

}

