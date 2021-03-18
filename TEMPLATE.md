# Template features

## Readme

You need to replace the following text on the README.md:
- `#CHANGE_ITUNES_APP_STORE_LINK` itunes app store link to your app
- `#CHANGE_GOOGLE_PLAY_STORE_LINK` goole play link to your app
- `#CHANGE_PROMOTIONAL_SCREENSHOT` image link showing the app main use
- `#CHANGE_OVERVIEW_SCREENSHOT` image link showing other screens

If you did not set a remote url at the beginning you need to replace the following at README.md and CONTRIBUTING.md:
- `#CHANGE_GITHUB_USER`
- `#CHANGE_GITHUB_REPO`

## Generate release keystore

Get a 16 byte url-safe password [here](https://generate.plus/en/base64) and use it in both the alias and the keystore. Store this password in a safe location.

Create keystore:
```sh
"%JAVA_HOME%\bin\keytool" -genkeypair -v -keystore android/app/release.keystore -alias Pokedex -keyalg RSA -keysize 2048 -validity 10000
```
Convert to new standard:
```sh
"%JAVA_HOME%\bin\keytool" -importkeystore -srckeystore android/app/release.keystore -destkeystore android/app/release.jks -deststoretype pkcs12
```
Remove old keystore:
```sh
rm android/app/release.keystore
```

## Github
Go to your repository settings.

Under `Options` change the merge options to the following:
- ✅ Allow merge commits
- 🔲 Allow squash merging
- 🔲 Allow rebase merging

Under `Branches` and a new rule for `main` and `beta`:
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
  - ✅ Require branches to be up to date before merging
- ✅ Include administrators

### Secrets

The actions uses a number of secrets described bellow, you can install the [github CLI](https://cli.github.com/) and run the commands to automagically set/update them.

Release type (⚠️At least one must be `true` to run the [android](.github/workflows/android.yml) workflow):
- `UPLOAD_TO_RELEASE` set to `true` to build APK and upload to releases page
  ```sh
  gh secret set UPLOAD_TO_RELEASE -b "true"
  ```
- `UPLOAD_TO_GOOGLE` set to `true` to build AAB and upload to google play
  ```sh
  gh secret set UPLOAD_TO_GOOGLE -b "false"
  ```

GitHub:
- `PERSONAL_TOKEN` token with access to repo and workflows;
  ```sh
  gh secret set PERSONAL_TOKEN -b "PASTE_TOKEN"
  ```

Git GPG key, find out more [here](https://github.com/crazy-max/ghaction-import-gpg):
- `GPG_PRIVATE_KEY` to verify commits and tags;
  ```sh
  gpg --armor --export-secret-key YOUR@EMAIL.COM | gh secret set GPG_PRIVATE_KEY
  ```
- `GPG_PASSPHRASE` to authenticate the gpg;
  ```sh
  gh secret set GPG_PASSPHRASE -b "PASTE_GPG_PASSPHRASE"
  ```

App Signing config:
- `RELEASE_JKS` keystore that signs the app:
  ```sh
  openssl base64 -in android/app/release.jks | gh secret set RELEASE_JKS
  ```
- `RELEASE_KEY_ALIAS` the alias used to sign the keystore;
  ```sh
  gh secret set RELEASE_KEY_ALIAS -b "PASTE_KEY_ALIAS"
  ```
- `RELEASE_KEY_PASSWORD` the password used for both the alias and the keystore;
  ```sh
  gh secret set RELEASE_KEY_PASSWORD -b "PASTE_KEY_PASSWORD"
  ```

Google Play:
- `GOOGLE_SERVICES` config file for google services:
  ```sh
  openssl base64 -in android/app/google-services.json | gh secret set GOOGLE_SERVICES
  ```
- `GOOGLE_PLAY_SERVICE_ACCOUNT` config file that allows upload to Google Play:
  ```sh
  openssl base64 -in pc-api-0000000000000000000-123-000000000000.json | gh secret set GOOGLE_PLAY_SERVICE_ACCOUNT
  ```

Dotenv:
- `DOTENV_STAGING` dotenv file used during **staging** builds:
  ```sh
  openssl base64 -in .env.staging | gh secret set DOTENV_STAGING
  ```
- `DOTENV_PROD` dotenv file used during **production** builds:
  ```sh
  openssl base64 -in .env.production | gh secret set DOTENV_PROD
  ```

You can edit the commands bellow and set/update the main secrets in one go:

```sh
gh secret set PERSONAL_TOKEN -b "PASTE_TOKEN"
gh secret set UPLOAD_TO_RELEASE -b "true"
gh secret set UPLOAD_TO_GOOGLE -b "false"
gh secret set RELEASE_KEY_ALIAS -b "PASTE_KEY_ALIAS"
gh secret set RELEASE_KEY_PASSWORD -b "PASTE_KEY_PASSWORD"
openssl base64 -in android/app/release.jks | gh secret set RELEASE_JKS
gh secret set GPG_PASSPHRASE -b "PASTE_GPG_PASSPHRASE"
gpg --armor --export-secret-key YOUR@EMAIL.COM | gh secret set GPG_PRIVATE_KEY
```
