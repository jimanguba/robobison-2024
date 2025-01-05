import { s3 } from "@/lib/aws";

// Upload file to aws s3
export async function POST(req) {
  // if (req.method !== "POST") return res.status(405).json;
  const body = await req.json();
  const { fileName, fileType, uid } = body;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${uid}/catAva/${fileName}`,
    ContentType: fileType,
    Expires: 60, // 1 minute expiration
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    return new Response(JSON.stringify({ url: url }), { status: 200 });
  } catch (error) {
    console.error("Error generating pre-signed URL:", error);

    return new Response(
      JSON.stringify({ error: "Failed to generate pre-signed URL" }),
      { status: 500 }
    );
  }
}
