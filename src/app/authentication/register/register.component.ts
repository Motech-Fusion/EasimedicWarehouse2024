import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  Firestore,
  collectionData,
  collection,
  getDoc,
  query,
  where,
  orderBy,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "@angular/fire/firestore";
import * as moment from "moment";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";
import { AngularFireMessaging } from "@angular/fire/compat/messaging";

export interface IPractitioner {
  address: string;
  approved: boolean;
  closed: string[];
  description: string;
  experience: number;
  fee: number;
  fullname: string;
  image: string;
  latitude: string;
  location: {
    coords: {
      accuracy: number;
      altitude: number;
      altitudeAccuracy: number;
      heading: number;
      latitude: number;
      longitude: number;
      speed: number;
      timestamp: number;
    };
  };
  open: string[];
  plan: string;
  qualification: string;
  regDate: number;
  street: string;
  type: string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  selectedOption: string | null = null;
  PhoneContentFormControl: FormControl = new FormControl();
  UsernameFormControl: FormControl = new FormControl();
  FullNamesFormControl: FormControl = new FormControl();
  EmailFormControl: FormControl = new FormControl();
  PhoneFormControl: FormControl = new FormControl();
  SurnameFormControl: FormControl = new FormControl();
  BioFormControl: FormControl = new FormControl();
  PasswordFormControl: FormControl = new FormControl();
  ConfirmPasswordFormControl: FormControl = new FormControl();
  options:any = [
  ];
  bio: string = "";
  phone: string = "";
  username: string = "";
  fullNames: string = "";
  emailAddress: string = "";
  password: string = "";
  confirmPassword: string = "";
  selectedUserType: string | null = null;
  ServiceProviderTypeFormControl: FormControl = new FormControl();
  ServiceProviderCategoryContentFormControl: FormControl = new FormControl();
  providerType: string = "";
  providerCategory: string = "";
  showRegisterNotification: boolean = false;
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  workHours:any = {};
  carItems = [
    { id: 1, title: 'FLATBED TOW TRUCKS', description: 'flatbed tow trucks have a long metal flatbed with hydraulics that allows the bed to move up and down vertically',src:"https://i.pinimg.com/474x/6d/78/33/6d7833a7bafe60812e62a516d505b660.jpg" },
    { id: 2, title: 'WHEEL LIFT TOW TRUCKS', description: 'Wheel lift tow trucks are tow trucks that use a metal yoke to lift a vehicle’s front or rear wheels off the ground.',src:'https://t3.ftcdn.net/jpg/04/95/43/08/360_F_495430813_UBIa1LlNgtA8lHCbfTPOKPs4oT3snyUK.jpg' },
    { id: 3, title: 'HOOK AND CHAIN TOW TRUCKS', description: 'Hook and chain tow trucks are one of the oldest methods of vehicle towing, being both powerful and effective',src:'https://t3.ftcdn.net/jpg/03/53/41/22/360_F_353412240_tTnnhYyR7STEWoA05IOPBoVVbPhjZxAI.jpg' },
    // Add more items as needed
  ];
  selected: any;


  constructor(private firestore: Firestore, public router: Router) {
    this.daysOfWeek.forEach(day => {
      this.workHours[day] = { start: '', end: '' };
    });
    this.options = [
      { id: "Doctors", label: "Medical Doctor" },
      { id: "Sangoma", label: "Sangoma" },
      { id: "TowTrucks", label: "Tow truck driver" },
      { id: "Security", label: "Security" },
      { id: "Emergency", label: "Emergency" },
    ];
  }
  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((params: any) => {
      // console.warn(params.comments);

      if (params) {
        this.selectedUserType = params.userType;
      }
    });
    // this.requestToken()
    this.BioFormControl.valueChanges.subscribe((value) => {
      this.bio = value;
    });
    this.PhoneFormControl.valueChanges.subscribe((value) => {
      this.phone = value;
    });
    this.UsernameFormControl.valueChanges.subscribe((value) => {
      this.username = value;
    });
    this.FullNamesFormControl.valueChanges.subscribe((value) => {
      this.fullNames = value;
    });
    this.EmailFormControl.valueChanges.subscribe((value) => {
      this.emailAddress = value;
    });
    this.PasswordFormControl.valueChanges.subscribe((value) => {
      this.password = value;
    });
    this.ConfirmPasswordFormControl.valueChanges.subscribe((value) => {
      this.confirmPassword = value;
    });
    this.ServiceProviderTypeFormControl.valueChanges.subscribe((value) => {
      this.providerType = value;
    });
    this.ServiceProviderCategoryContentFormControl.valueChanges.subscribe((value) => {
      this.providerCategory = value;
    });
  }

  onOptionChange(optionId: string): void {
    this.selectedOption = optionId;
    console.log(optionId);
  }

  async registerUserInFirestore(
    phone: string,
    username: string,
    name: string,
    password: string,
    token: string,
    dob: string,
    melaChatFor: string
  ): Promise<void> {
    try {
      const userCollection = collection(this.firestore, "Users");
      const doctorsCollection = collection(this.firestore, "Doctors");
      const sangomaCollection = collection(this.firestore, "Sangomas");
      const towTrucksCollection = collection(
        this.firestore,
        "TowTruckServices"
      );

      // Generate a random key for encryption
      let key = "";

      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (let i = 0; i < 10; i++) {
        key += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      // Encrypt the password
      const ciphertext = CryptoJS.AES.encrypt(password, key).toString();

      // Set user data in Firestore
      await addDoc(userCollection, {
        username: username,
        name: name,
        phone: phone,
        password: { ciphertext, key },
        notificationToken: token,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        bio: "",
        friends: [],
        blocked: [],
        location: {},
        requests: [],
        language: "English",
        dob: dob,
        created: moment().format("DD-MM-YYYY"),
        availability: "online",
        InterestedIn: "",
        suspended: false,
        easiMedicFor: this.selectedUserType,
        email: this.emailAddress,
      }).then(async (x) => {
        x.id;
        // if (this.providerType == "Doctors") {
        //   await setDoc(doc(doctorsCollection, x.id), {
        //     username: username,
        //     name: name,
        //     phone: phone,
        //     fullname: name,
        //     password: { ciphertext, key },
        //     notificationToken: token,
        //     image:
        //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        //     bio: "",
        //     friends: [],
        //     blocked: [],
        //     location: {},
        //     requests: [],
        //     language: "English",
        //     dob: dob,
        //     userId: x.id,
        //     created: moment().format("DD-MM-YYYY"),
        //     availability: "online",
        //     InterestedIn: "",
        //     suspended: false,
        //     easiMedicFor: this.selectedUserType,
        //   });
        // } else if (this.providerType == "Sangoma") {
        //   await setDoc(doc(sangomaCollection, x.id), {
        //     username: username,
        //     name: name,
        //     fullname: name,
        //     phone: phone,
        //     userId: x.id,
        //     password: { ciphertext, key },
        //     notificationToken: token,
        //     image:
        //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        //     bio: "",
        //     friends: [],
        //     blocked: [],
        //     location: {},
        //     requests: [],
        //     language: "English",
        //     dob: dob,
        //     created: moment().format("DD-MM-YYYY"),
        //     availability: "online",
        //     InterestedIn: "",
        //     suspended: false,
        //     easiMedicFor: this.selectedUserType,
        //   });
        // } else if (this.providerType == "TowTrucks") {
        //   await setDoc(doc(towTrucksCollection, x.id), {
        //     username: username,
        //     name: name,
        //     fullname: name,
        //     phone: phone,
        //     password: { ciphertext, key },
        //     notificationToken: token,
        //     image:
        //       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        //     bio: "",
        //     friends: [],
        //     blocked: [],
        //     location: {},
        //     requests: [],
        //     language: "English",
        //     dob: dob,
        //     created: moment().format("DD-MM-YYYY"),
        //     availability: "online",
        //     InterestedIn: "",
        //     suspended: false,
        //     easiMedicFor: this.selectedUserType,
        //   });
        // }
      });

      // Additional logic if needed
    } catch (error: any) {
      // Handle errors or show messages as needed
      console.error(error.message);
      throw error;
    }
  }

  async registerProviderUserInFirestore(
    phone: string,
    username: string,
    name: string,
    password: string,
    token: string,
    dob: string,
    collectionName: string,
    type: string
  ): Promise<void> {
    try {
      // const userCollection = collection(this.firestore, collectionName);
      const userCollection = collection(this.firestore, "Users");
      const doctorsCollection = collection(this.firestore, "Doctors");
      const sangomaCollection = collection(this.firestore, "Sangomas");
      const securityCollection = collection(this.firestore, "Security");
      const emergencyCollection = collection(this.firestore, "Emergency");
      const towTrucksCollection = collection(
        this.firestore,
        "TowTruckServices"
      );

      // Generate a random key for encryption
     // Generate a random key for encryption
     let key = "";

     const possible =
       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
     for (let i = 0; i < 10; i++) {
       key += possible.charAt(Math.floor(Math.random() * possible.length));
     }

     // Encrypt the password
     const ciphertext = CryptoJS.AES.encrypt(password, key).toString();

      // Set user data in Firestore
      await addDoc(userCollection, {
        username: username,
        name: name,
        phone: phone,
        password: { ciphertext, key },
        notificationToken: token,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        address: "",
        approved: "",
        closed: [],
        description: this.bio,
        experience: 0,
        fee: 0,
        fullname: this.fullNames,
        qualification:this.providerCategory,
        latitude: "",
        location: {},
        friends: [],
        blocked: [],
        requests: [],
        language: "English",
        open: [],
        plan: "Basic",
        regDate: moment().format("DD-MM-YYYY"),
        street: "",
        type: type,
        bio:this.bio,
        availability: "online",
        InterestedIn: "",
        suspended: false,
        easiMedicFor:this.selectedUserType,
        operatingHours:this.workHours,
        email: this.emailAddress,
        providerType:this.providerType
      }).then(async (x) => {
        x.id;
        if (this.providerType == "Doctors") {
          await setDoc(doc(doctorsCollection, x.id), {
            username: username,
            name: name,
            phone: phone,
            fullname: name,
            password: { ciphertext, key },
            notificationToken: token,
            image:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              description: this.bio,
              experience: 0,
            friends: [],
            blocked: [],
            location: {},
            requests: [],
            language: "English",
            dob: dob,
            userId: x.id,
            created: moment().format("DD-MM-YYYY"),
            availability: "online",
            InterestedIn: "",
            suspended: false,
            easiMedicFor: this.selectedUserType,
            operatingHours:this.workHours,
            qualification:this.providerCategory,
            email: this.emailAddress,
          });
        } else if (this.providerType == "Sangoma") {
          await setDoc(doc(sangomaCollection, x.id), {
            username: username,
            name: name,
            fullname: name,
            phone: phone,
            userId: x.id,
            password: { ciphertext, key },
            notificationToken: token,
            image:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              description: this.bio,
              experience: 0,
            friends: [],
            blocked: [],
            location: {},
            requests: [],
            language: "English",
            dob: dob,
            created: moment().format("DD-MM-YYYY"),
            availability: "online",
            InterestedIn: "",
            suspended: false,
            easiMedicFor: this.selectedUserType,
            qualification:this.providerCategory,
            email: this.emailAddress,
          });
        } else if (this.providerType == "TowTrucks") {
          await setDoc(doc(towTrucksCollection, x.id), {
            username: username,
            name: name,
            fullname: name,
            phone: phone,
            password: { ciphertext, key },
            notificationToken: token,
            image:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              description: this.bio,
              experience: 0,
            friends: [],
            blocked: [],
            location: {},
            requests: [],
            language: "English",
            dob: dob,
            created: moment().format("DD-MM-YYYY"),
            availability: "online",
            InterestedIn: "",
            suspended: false,
            easiMedicFor: this.selectedUserType,
            qualification:this.providerCategory,
            email: this.emailAddress,
          });
        }
         else if (this.providerType == "Security") {
          await setDoc(doc(securityCollection, x.id), {
            username: username,
            name: name,
            fullname: name,
            phone: phone,
            password: { ciphertext, key },
            notificationToken: token,
            image:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              description: this.bio,
              experience: 0,
            friends: [],
            blocked: [],
            location: {},
            requests: [],
            language: "English",
            dob: dob,
            created: moment().format("DD-MM-YYYY"),
            availability: "online",
            InterestedIn: "",
            suspended: false,
            easiMedicFor: this.selectedUserType,
            qualification:this.providerCategory,
            email: this.emailAddress,
          });
        }
         else if (this.providerType == "Emergency") {
          await setDoc(doc(emergencyCollection, x.id), {
            username: username,
            name: name,
            fullname: name,
            phone: phone,
            password: { ciphertext, key },
            notificationToken: token,
            image:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              description: this.bio,
              experience: 0,
            friends: [],
            blocked: [],
            location: {},
            requests: [],
            language: "English",
            dob: dob,
            created: moment().format("DD-MM-YYYY"),
            availability: "online",
            InterestedIn: "",
            suspended: false,
            easiMedicFor: this.selectedUserType,
            qualification:this.providerCategory,
            email: this.emailAddress,
          });
        }
      });

      // Additional logic if needed
    } catch (error: any) {
      // Handle errors or show messages as needed
      console.error(error.message);
      throw error;
    }
  }

  // Modify your handleSignup function to call the new function
  async handleSignup() {
    // Existing code...

    try {
      // Check if user already exists in Firestore (optional, you can uncomment if needed)

      // Register new user in Firestore
      if (this.selectedUserType == "Service Provider") {
        await this.registerProviderUserInFirestore(
          this.phone,
          this.username,
          this.fullNames,
          this.password,
          "",
          "",
          this.selectedOption as string,
          this.providerType
        );
      }else{
        await this.registerUserInFirestore(
          this.phone,
          this.username,
          this.fullNames,
          this.password,
          "",
          "",
          this.selectedOption as string
        );
      }


      // Registration successful, navigate to the next screen
      this.showRegisterNotification = true;
      setTimeout(() => {
        this.showRegisterNotification = false;
        this.router.navigate(["authentication/login"]);
      }, 4000);
    } catch (error) {
      // Handle errors or show messages as needed
    }
  }

  GoToLogin() {
    this.router.navigate(["authentication/login"]);
  }

  addHours(day: string, start: string, end: string) {
    this.workHours[day] = { start, end };
  }

  getKeys(object: {}) {
    return Object.keys(object);
  }

  selectItem(item: any) {
    this.selected = item;
    this.providerCategory = item.title;
  }
}
