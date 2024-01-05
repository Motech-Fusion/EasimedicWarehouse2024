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
  PhoneFormControl: FormControl = new FormControl();
  SurnameFormControl: FormControl = new FormControl();
  BioFormControl: FormControl = new FormControl();
  PasswordFormControl: FormControl = new FormControl();
  ConfirmPasswordFormControl: FormControl = new FormControl();
  options = [
    { id: "Doctors", label: "Medical Doctor" },
    { id: "Sangoma", label: "Sangoma" },
    { id: "TowTrucks", label: "Tow truck driver" },
    { id: "Security", label: "Security" },
  ];
  bio: string = "";
  phone: string = "";
  username: string = "";
  fullNames: string = "";
  password: string = "";
  confirmPassword: string = "";
  selectedUserType: string | null = null;
  ServiceProviderTypeFormControl: FormControl = new FormControl();
  ServiceProviderCategoryContentFormControl: FormControl = new FormControl();
  providerType: string = "";

  constructor(private firestore: Firestore, public router: Router) {}
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
    this.PasswordFormControl.valueChanges.subscribe((value) => {
      this.password = value;
    });
    this.ConfirmPasswordFormControl.valueChanges.subscribe((value) => {
      this.confirmPassword = value;
    });
    this.ServiceProviderTypeFormControl.valueChanges.subscribe((value) => {
      this.providerType = value;
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
      const userCollection = collection(this.firestore, collectionName);

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
        address: "",
        approved: "",
        closed: [],
        description: this.bio,
        experience: 0,
        fee: 0,
        fullname: this.fullNames,
        image: "",
        latitude: "",
        location: {},
        open: [],
        plan: "Basic",
        qualification: "",
        regDate: moment().format("DD-MM-YYYY"),
        street: "",
        type: type,
        // username: username,
        // name: name,
        // phone: phone,
        // password: { ciphertext, key },
        // notificationToken: token,
        // image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
        // bio: '',
        // friends: [],
        // blocked: [],
        // location: {},
        // requests: [],
        // language: 'English',
        // dob: dob,
        // created: moment().format('DD-MM-YYYY'),
        // availability: 'online',
        // InterestedIn: '',
        // suspended: false,
        // melachatFor:this.selectedOption
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
      await this.registerUserInFirestore(
        this.phone,
        this.username,
        this.fullNames,
        this.password,
        "",
        "",
        this.selectedOption as string
      );

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
      }

      // Registration successful, navigate to the next screen
      this.router.navigate(["authentication/login"]);
    } catch (error) {
      // Handle errors or show messages as needed
    }
  }

  GoToLogin() {
    this.router.navigate(["authentication/login"]);
  }
}
