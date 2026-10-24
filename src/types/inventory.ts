export interface VehicleImage {
  url: string;
  fallbackUrl?: string;
  alt: string;
  caption?: string;
}

export interface Vehicle {
  id: string;
  year: number;
  make: string;
  model: string;
  trim?: string;
  bodyStyle: 'Sedan' | 'SUV' | 'Coupe' | 'Truck' | 'Wagon';
  description: string;
  engine: string;
  titleStatus: 'Clean title' | 'Title coming in' | 'Contact for details';
  price: string;
  mileage: string;
  transmission: string;
  drivetrain?: string;
  exteriorColor?: string;
  interiorColor?: string;
  fuelType?: string;
  availability: 'Confirm with seller' | 'In Stock';
  ctaText: string;
  images: VehicleImage[];
  featured: boolean;
  instagramReference: {
    account: string;
    postCaptionExcerpt: string;
    url: string;
  };
}

export interface VehicleFilter {
  searchQuery: string;
  year: string;
  titleStatus: string;
  bodyStyle: string;
  sortBy: 'year-desc' | 'year-asc' | 'make-asc';
}

export interface InquiryFormData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  vehicleOfInterest: string;
  message: string;
  submittedAt?: string;
}
