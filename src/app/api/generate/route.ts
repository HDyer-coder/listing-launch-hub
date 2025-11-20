import { NextResponse } from "next/server";
import { GeneratedContent } from "@/types";

export async function POST(request: Request) {
    const body = await request.json();
    const { propertyDetails } = body;

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const address = propertyDetails.address || "this property";
    const features = propertyDetails.features?.join(", ") || "amazing features";

    const mockContent: GeneratedContent = {
        mlsDescription: `Welcome to ${address}, a stunning residence that perfectly blends luxury and comfort. This exceptional property boasts ${features}, offering a lifestyle of unparalleled convenience. As you step inside, you are greeted by an abundance of natural light and an open floor plan designed for modern living. The gourmet kitchen features top-of-the-line appliances, while the spacious master suite provides a private retreat. Don't miss the opportunity to own this masterpiece in a sought-after neighborhood.`,
        socialPosts: {
            instagram: {
                caption: `✨ Just Listed! ✨\n\nDiscover your dream home at ${address}. This beauty features ${features} and so much more! 🏡\n\nDM for a private tour! 👇`,
                hashtags: ["#JustListed", "#RealEstate", "#DreamHome", "#LuxuryLiving", "#NewListing"],
            },
            facebook: `We are excited to present our newest listing at ${address}! 🏡\n\nThis property has it all: ${features}. It's the perfect place to call home. Contact us today to schedule a viewing!`,
            linkedin: `Excited to announce a new addition to the market: ${address}. \n\nThis property represents a prime opportunity for buyers looking for ${features}. Please reach out for more details or to arrange a showing. #RealEstate #PropertyListing #MarketUpdate`,
        },
        flyerUrl: "#",
        brochureUrl: "#",
    };

    return NextResponse.json({ content: mockContent });
}
