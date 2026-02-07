# How to Update Quotes

This system allows you to easily update the quotes on your website directly from your Google Sheet.

## 1. Update the Google Sheet
Add your new quotes to the [Google Sheet](https://docs.google.com/spreadsheets/d/1u82fkDCYseizqTrZZfEjw3WcooUlFimvkf1AtGfM6dY).
- **Format:** Column A for Quote, Column B for Writer Name.
- You can add as many quotes as you like.

## 2. Run the Update Script
Open your terminal in the project folder and run:

```bash
npm run update-quotes
```

This will:
1.  Fetch the latest data from your Google Sheet.
2.  Update the `quotes.js` file automatically.

## 3. Deploy to GitHub
To update the live website, run:

```bash
git add .
git commit -m "Update quotes"
git push
```

Your website will automatically update in a few minutes!

## Automation
I have also added a shortcut command:

```bash
npm run deploy
```

This will run the update script, add files, commit, and push in one go.
