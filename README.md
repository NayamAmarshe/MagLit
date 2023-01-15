<div align="center"><a href="https://vercel.com/?utm_source=mag-lit&utm_campaign=oss"><img src="https://user-images.githubusercontent.com/25067102/178521042-fc564081-9b44-4988-aa80-eb53f57642d5.svg" /></a>

MagLit has been sponsored by Vercel. Many thanks!

</div>
<div align="center"><img src="https://user-images.githubusercontent.com/25067102/165503689-d1d9eb36-7f00-423b-bf38-89698deb9d3e.jpg" />
</div>

<div align="center">
<h1>Mag🔥Lit</h1>

🔥 MagLit - A **super fast** and **easy-to-use** **Free** and **Open Source Privacy Respecting Encrypted** Magnet/HTTP(s) Link Shortener with **Password Protection** 🔥

### https://maglit.me

</div>

# 🔥 Featured on [Awesome Open Source](https://awesomeopensource.com/) and [Awesome Privacy](https://github.com/pluja/awesome-privacy#link-shorteners)

## MagLit Features

✅ 100% Easy to use\
✅ 100% Free and Open Source\
✅ 100% Encrypted\
✅ 100% Private\
✅ 0% Personal Data stored

New Features  
🆕 MagLit now supports custom links!  
🆕 MagLit now lets you generate QR Codes for your lit links!

**WYSIWYG:** [MagLit builds are fully verifiable: The code in this repository is the same code that's deployed on MagLit.me, Nothing added, nothing ripped, so you know it's 100% trusted ;) ](https://github.com/NayamAmarshe/MagLit/deployments)

## Self Hosting

### Firebase Setup

MagLit uses Firebase Firestore as a database. You must first create a new Firebase project as described below. 

1. Navigate to the [Firebase Console](https://console.firebase.google.com/) (requires Google Sign-in)
2. You should see a _Welcome to Firebase!_ screen with a button to _Create a project_ - this launches the 3-step wizard:
    1. Name your project, e.g. `maglit`
    2. Enable Google Analytics for the project
    3. Select an existing GA account or create a new one (likely) - name it something useful, like `maglit`.
3. Google will now create your project, click _Continue_ when ready.
4. In the Firebase project console, add a "Web" app by clicking the appropriate icon (looks like `</>`)
5. Give it a name ... `maglit` seems appropriate!
    1. _Firebase Hosting_ is _*not*_ required for this.
6. Click _Register app_
7. Firebase will now display all the keys and other configuration variables you need to run MagLit, copy everything provided in `firebaseConfig` - this will go in your `.env.local` or in your `docker-compose.yml`.
8. Before Firebase | Firestore can be used, the Firestore API in the new project needs to be enabled
    1. Visit `https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=<messagingSenderId>` - replace `<messagingSenderId>` with the appropriate value, or navigate to the _Google Cloud Firestore API_ in the [GCP console](https://console.cloud.google.com).
    2. Click _Enable_.
9. You'll also need to create your Firestore DB or you'll get an error like `The database (default) does not exist for project <projectId>`
    1. Visit `https://console.cloud.google.com/datastore/setup?project=<projectId>` - replace `<projectId>` with the appropriate, e.g. `maglit-aaaaa`
    2. On the _Select a Cloud Firestore mode_ page, click _Select Native Mode_, then select an appropriate location (e.g. `us-east-4` for N. Virginia).
10. Finally, you'll need to setup Firebase Rules to allow access to your Firestore - navigate to `https://console.firebase.google.com/u/0/project/<projectId>/firestore/rules` or:
    1. In the [Firebase Console](https://console.firebase.google.com/) for your project, expand the _Build_ left navigation and click _Firestore Database_
    2. In the tab navigation, click _Rules_
11. Change `if false` to `if true` (TODO: this doesn't seem secure), click Publish to activate the change.

That's it, your Firebase | Firestore DB is now setup and ready to use.

Now, create a file with the name `.env.local` in root directory of the project and fill the details as mentioned in `.env.local.example`. Alternatively, fill out the `docker-compose.yml` ENV vars accordingly.

### Build and Deploy

Clone the project and install dependencies using:

```bash
npm install
```

You need npm or yarn installed for this.

Then, run the development server:

```bash
npm run dev
```

**DOCKER:**

```
# TO BUILD IMAGE
npm run build-docker-image

# TO START THE DOCKER IMAGE SERVER
npm run start-docker-image
```

You can also use a pre-built image (supports amd64 and arm64), which contains the code that resides on `main`:

```
docker pull ghcr.io/nayamamarshe/maglit:main
```

The `docker-compose` file is setup to use the remote image. Just remember to fill the firebase environment variables. You can start using docker compose with:

```
docker compose up -d
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/xxxxxx](http://localhost:3000/api/xxxxxx). This endpoint can be edited in `pages/api/xxxxxx.js`.

The `pages/api` directory is mapped to `/api/*`. Read more about [API routes](https://nextjs.org/docs/api-routes/introduction).

## If you like the project

ETH (ERC-20) Wallet: **0x14858f5334ea1014e68212c2d4b32792d137f256**

<a href="https://www.buymeacoffee.com/fossisthefuture">
<img alt="bmc-button" src="https://user-images.githubusercontent.com/25067102/154570688-9e143f2b-fee3-4b05-a9d2-a7a3013b2b51.png" />
</a>

### 🔥 https://maglit.me 🔥
