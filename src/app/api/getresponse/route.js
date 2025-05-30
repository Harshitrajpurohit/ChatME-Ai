import gemeniApi from "@/app/api/GetApi/gemeni";

export async function GET(){
    return new Response(JSON.stringify({"error": "Nice try. This route isn't meant for direct access." }),{
        status:200
    })
}

export async function POST(request) {
  const data = await request.json();
  const userMessage = data.message;

  try {

    const apiResponse = await gemeniApi(userMessage)
    return Response.json({ reply: apiResponse });

  } catch (error) {
    return Response.json({ reply: "Chatbot is not Working, Try Again Leter." },{
      status:404
    });
  }
}
