export interface IUsersInterface {
    InterestedIn: string;
    availability: string;
    bio: string;
    blocked: string[];
    created: string;
    dob: string;
    friends: string[];
    image: string;
    language: string;
    location: Record<string, any>; // You can define a more specific type for location if needed.
    name: string;
    notificationToken: string;
    password: Record<string, any>; // You can define a more specific type for password if needed.
    phone: string;
    requests: string[];
    suspended: boolean;
    username: string;
    docId:string;
    unread:string,
    easiMedicFor:string,
    messages:string,
    fullname:string,
    operatingHours?:any,
    providerType?:any,
  }

  export interface IDoctorsInterface {
    InterestedIn: string;
    availability: string;
    bio: string;
    blocked: string[];
    created: string;
    dob: string;
    friends: string[];
    image: string;
    language: string;
    fullname: string;
    notificationToken: string;
    password: Record<string, any>; // You can define a more specific type for password if needed.
    phone: string;
    requests: string[];
    suspended: boolean;
    username: string;
    name: string;
    docId:string;
    unread:string,
    easiMedicFor:string,
    messages:string,
    regDate:string,
    latitude: string; // Replace with the appropriate type for latitude
    location: {
      timestamp: number;
      coords: {
        // Replace with the appropriate types for latitude and longitude
        latitude: string;
        longitude: string;
      };
    };
    open: string[];
    origin: {
      latitudeDelta: number;
      longitude: string; // Replace with the appropriate type for longitude
      latitude: string;  // Replace with the appropriate type for latitude
      longitudeDelta: number;
    };
    plan: string;
    qualification: string;
    street: string;
    type: string;
    experience: string;
    operatingHours?:any
    
  }