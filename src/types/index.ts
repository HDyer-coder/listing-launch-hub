export interface AgentProfile {
    uid: string;
    email: string;
    displayName: string;
    brokerage: string;
    phone: string;
    photoUrl?: string;
    branding: {
        primaryColor: string;
        logoUrl?: string;
    };
}

export interface PropertyDetails {
    address: string;
    city: string;
    state: string;
    zip: string;
    price: number;
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    lotSize?: number;
    yearBuilt?: number;
    propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family' | 'Land';
    description?: string; // Initial raw notes
    features: string[];
    neighborhoodNotes?: string;
    agentName?: string;
    agentBrokerage?: string;
}

export interface MediaAsset {
    id: string;
    url: string;
    type: 'image' | 'video' | 'floorplan';
    caption?: string;
    tag?: 'front' | 'kitchen' | 'living' | 'master' | 'exterior' | 'other';
}

export interface GeneratedContent {
    mlsDescription: string;
    socialPosts: {
        instagram: {
            caption: string;
            hashtags: string[];
        };
        facebook: string;
        linkedin: string;
    };
    flyerUrl?: string;
    brochureUrl?: string;
}

export interface Listing {
    id: string;
    userId: string;
    status: 'draft' | 'generated' | 'published';
    propertyDetails: PropertyDetails;
    media: MediaAsset[];
    generatedContent?: GeneratedContent;
    createdAt: number; // Timestamp
    updatedAt: number; // Timestamp
}
