import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getDatabase, onValue, ref, remove, set } from 'firebase/database';
import { app } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { MessegesService } from './messeges.service';
import { createUserWithEmailAndPassword, getAuth, sendSignInLinkToEmail, signInWithEmailAndPassword, updatePassword, updateProfile } from 'firebase/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any; // Save logged in user data
  public userToken!: string;
  database = getDatabase(app);
  cities: any;
  obs: any = new Observable();
  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private messegesService: MessegesService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState
    .subscribe((user) => {
      if (user) {
        this.userData = user
        this.getDataFromDatabase(this.userData);        
        const token = user.getIdToken();
        token.then(symbol => this.userToken = symbol);
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
    
  }

  isLogged(): boolean{
    const isLogged = localStorage.getItem('user');
    return isLogged === 'null'? false : true;
  }

  getDataFromDatabase(user: any){
    
    if(user){
      onValue(ref(this.database, 'userProfile/' + user.multiFactor.user.uid), (snapshot) => {
        const data = snapshot.val();
        if(this.cities === undefined) this.cities = data;
          else {
            this.cities = undefined;
            this.cities = data;
          }
      })
      
    }
  }

  removeCity(name: string){
    this.afAuth.authState
    .subscribe(user => {
      if(user){
        onValue(ref(this.database, 'userProfile/' + user.uid), (snapshot)=> {
          for (const iterator in snapshot.val()) {
            if(iterator === 'cities'){
              for (const [key, val] of Object.entries(snapshot.val()[iterator])) {                
                let cityName: any = val
                if(name.toLowerCase() === cityName.toString().toLowerCase()){
                  // console.log('userProfile/' + user.uid + '/cities/' + key + '/' +val)
                  set(ref(this.database, 'userProfile/' + user.uid + '/cities/' + key), null)
                  .then(() => {
                    // Data saved successfully!
                    this.messegesService.getToast('Succesfully removed!', 200);
                  })
                  .catch((error) => {
                    // The write failed...
                    console.log(error)
                  });
                }
              }
            }
            
          }
        })
      }

    })
  }

  getUserId(){
    return this.userData.multifactor.user.uid;
  }

  getUserData(){
    return this.userData;
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            localStorage.setItem('user', JSON.stringify(this.userData));
            this.router.navigate(['main']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string, name: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth,email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        const userAuth = getAuth();
       signInWithEmailAndPassword(userAuth,email,password).then(res => {
        updateProfile(userAuth.currentUser!,{
          displayName: name
        }).then(() => {
          updatePassword(userAuth.currentUser!, password).then(()=> {
            //needs to add user to database
            this.addNewUser(auth.currentUser!.uid, name);
            this.userData = userAuth.currentUser!;
            localStorage.setItem('user', JSON.stringify(this.userData));
            this.router.navigateByUrl('main');
          })
        }).catch(err => console.log(err))
       })
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  addNewUser(userId: string, name: string){
    const db = this.database;
    const reffer = ref(db, 'userProfile/' + userId);
    const key: any = reffer.key
    const newUser = {
      username: name,
      cities: {}
    }
    set(reffer, newUser);
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail(email: string, pass: string) {
    // return this.afAuth.currentUser
    //   .then((u: any) => u.sendEmailVerification())
    //   .then((r) => {
    //     console.log(r)
    //     // this.router.navigate(['verify-email-address']);        
    //   });
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: 'https://minimus.gopr-service.com.ua',
      // This must be true.
      handleCodeInApp: true,
      
      dynamicLinkDomain: 'gopr-service.com.ua'
    };
    const user = auth.getAuth()
    sendSignInLinkToEmail(user, email,actionCodeSettings).then(res => {
      console.log(res)
    })
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    console.log(passwordResetEmail)
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
        setTimeout(()=> {
          this.router.navigate(['main']);
  
        }, 1500)
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ? true : false;
  }
  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res) => {
      setTimeout(()=> {
        this.router.navigate(['main']);

      }, 1500)
    });
  }
  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['main']);
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `userProfile/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    }).then(result => {
      console.log(result)
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    });
  }
}