# How to Run Your Listing Launch App (Super Simple Guide)

## What You Need First
- A computer with internet
- That's basically it! We'll get everything else together.

## Step 1: Get Firebase Set Up (This is like your app's brain)

1. **Go to Firebase**: Open your browser and go to [https://firebase.google.com](https://firebase.google.com)
2. **Sign in** with your Google account
3. **Click "Get Started"** or "Go to Console"
4. **Create a new project**:
   - Click "Add Project" or the "+" button
   - Name it whatever you want (like "my-listing-app")
   - Click through the steps (you can turn off Google Analytics if you want)
   - Wait for it to finish creating (takes like 30 seconds)

5. **Set up Authentication** (this lets people log in):
   - On the left sidebar, click "Authentication"
   - Click "Get Started"
   - Click on "Google" in the sign-in methods
   - Toggle it ON (the switch should turn blue)
   - Click "Save"

6. **Set up Firestore** (this is your database):
   - On the left sidebar, click "Firestore Database"
   - Click "Create Database"
   - Choose "Start in test mode" (makes it easier for now)
   - Pick a location close to you
   - Click "Enable"

7. **Get your special codes** (these connect your app to Firebase):
   - Click the gear icon ⚙️ next to "Project Overview" at the top
   - Click "Project Settings"
   - Scroll down to "Your apps" section
   - Click the `</>` icon (it says "Web")
   - Give it a nickname like "listing-app"
   - Click "Register app"
   - You'll see a bunch of code - **DON'T CLOSE THIS PAGE YET!**

## Step 2: Put Your Special Codes in the App

1. **Open your Terminal** (it's an app on your Mac - search for "Terminal" in Spotlight)

2. **Go to your app folder**. Type this and press Enter:
   ```
   cd Desktop/AntiGravity\ Test\ /listing-launch-hub
   ```

3. **Create a secret file** for your codes. Type this and press Enter:
   ```
   touch .env.local
   ```

4. **Open that file**. Type this and press Enter:
   ```
   open .env.local
   ```

5. **Copy this template** into the file that just opened:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=paste_your_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paste_your_domain_here
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=paste_your_project_id_here
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paste_your_bucket_here
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=paste_your_sender_id_here
   NEXT_PUBLIC_FIREBASE_APP_ID=paste_your_app_id_here
   ```

6. **Go back to Firebase** (that page you kept open) and copy each value:
   - Find `apiKey:` and copy the value (it's in quotes)
   - Replace `paste_your_key_here` with it
   - Do the same for all the other values
   - **Save the file** (Command + S)

## Step 3: Start Your App!

1. **In Terminal**, make sure you're still in the app folder (if you closed it, do Step 2.2 again)

2. **Type this and press Enter**:
   ```
   npm run dev
   ```

3. **Wait a few seconds**. You'll see some text appear. Look for a line that says:
   ```
   Local: http://localhost:3000
   ```

4. **Open your browser** and go to: `http://localhost:3000`

5. **You should see your app!** 🎉

## How to Use It

1. **Click "Sign in with Google"** on the first page
2. **Pick your Google account** and allow access
3. **You're in!** You'll see a dashboard
4. **Click "New Listing"** to create your first property listing
5. **Fill out the form** (4 steps - just follow along)
6. **Click "Generate Launch Package"** and watch the magic happen!

## If Something Goes Wrong

**"It says command not found"**
- You might need to install Node.js first. Go to [https://nodejs.org](https://nodejs.org) and download the LTS version

**"Firebase error" or "auth/invalid-api-key"**
- Double-check your `.env.local` file. Make sure there are NO spaces around the `=` signs
- Make sure you copied the values correctly from Firebase

**"The page won't load"**
- Make sure the Terminal is still running (don't close it!)
- Try refreshing the browser

## To Stop the App

- Go to Terminal and press `Control + C`
- To start it again, just do Step 3 again!

---

**That's it!** You now have a working real estate listing automation app. Pretty cool, right? 😎
