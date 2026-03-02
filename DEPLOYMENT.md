# Deployment Instructies - PromotieMeester.nl

## 📦 Wat uploaden naar de server

### Bestanden die naar de ROOT van promotiemeester.nl moeten:

1. **Alle bestanden uit `/dist` folder:**
   - `index.html` → wordt promotiemeester.nl/
   - `/assets` folder → bevat CSS en JS

2. **PHP signup handler:**
   - `signup.php` → wordt promotiemeester.nl/signup.php

3. **Images en assets:**
   - `promotiemeester.png` (logo)
   - `seo-meester-screenshot.png`
   - `social-media-meester-screenshot.png`

## 🚀 Deployment Stappen

### Via FTP/SFTP (bijv. FileZilla):

1. **Connect naar server:**
   - Host: promotiemeester.nl
   - Port: 21 (FTP) of 22 (SFTP)
   - Username: [jouw FTP username]
   - Password: [jouw FTP password]

2. **Upload bestanden:**
   ```
   /public_html/                    (of /www/ of /htdocs/)
   ├── index.html                   (van dist/)
   ├── signup.php                   (van public/)
   ├── promotiemeester.png          (van dist/)
   ├── seo-meester-screenshot.png   (van dist/)
   ├── social-media-meester-screenshot.png (van dist/)
   └── assets/                      (hele folder van dist/assets/)
       ├── index-DermKo2J.css
       └── index-9UaYeHyR.js
   ```

3. **Bestandspermissies instellen:**
   - `signup.php`: 644 (rw-r--r--)
   - Maak een `rate_limit.json` bestand aan: 666 (rw-rw-rw-)
   - Maak een `signups.log` bestand aan: 666 (rw-rw-rw-)

### Via cPanel:

1. Log in op cPanel
2. Ga naar **File Manager**
3. Navigeer naar `/public_html/`
4. Upload alle bestanden via **Upload** knop
5. Extract indien nodig

## ✅ Verificatie

Na deployment, test:

1. **Website laden:**
   - Open https://promotiemeester.nl
   - Controleer of logo en screenshots zichtbaar zijn
   - Test dark/light mode toggle

2. **Signup functionaliteit:**
   - Klik op "Start met SEO Meester"
   - Vul email in
   - Klik "Aanmelden voor early access"
   - Check of je success bericht ziet
   - Controleer je email (check spam folder)
   - Check info@promotiemeester.nl voor notificatie

3. **Spam beveiliging testen:**
   - Probeer 4x snel achter elkaar aan te melden
   - 4e poging moet geblokkeerd worden met "Te veel aanvragen"

## 🔒 Security Features Actief

✅ **Honeypot field** - Bots die hidden field invullen worden geblokkeerd
✅ **Rate limiting** - Max 3 submits per IP per uur
✅ **Timestamp check** - Formulier moet minimaal 2 seconden open zijn
✅ **Email validatie** - Alleen geldige email adressen
✅ **CORS headers** - Veilige cross-origin communicatie

## 📧 Email Configuratie

De PHP `mail()` functie wordt gebruikt. Als emails niet aankomen:

1. **Check hosting mail configuratie:**
   - Zorg dat PHP mail() enabled is
   - Sommige hosts vereisen SMTP authenticatie

2. **Alternatief: SMTP configuratie (PHPMailer):**
   - Voeg PHPMailer library toe
   - Configureer SMTP credentials
   - Update signup.php om PHPMailer te gebruiken

3. **SPF/DKIM records:**
   - Voeg SPF record toe aan DNS
   - Configureer DKIM voor betere deliverability

## 📊 Logs & Monitoring

- **Signups log:** `signups.log` - Alle aanmeldingen worden hier gelogd
- **Rate limit:** `rate_limit.json` - IP tracking voor spam preventie

Check deze bestanden regelmatig:
```bash
tail -f signups.log
cat rate_limit.json
```

## 🔄 Updates Uitrollen

Bij code wijzigingen:

1. Maak wijzigingen in React code
2. Run `npm run build`
3. Upload nieuwe files uit `/dist` folder
4. Hard refresh browser (Ctrl+F5)

## 🆘 Troubleshooting

### "Succesvol aangemeld" maar geen email ontvangen:

1. Check spam folder
2. Controleer of PHP mail() werkt: test met simpel PHP script
3. Check server logs: `/var/log/mail.log`
4. Vraag hosting support om mail functie te checken

### 403 Forbidden error op signup.php:

1. Check bestandspermissies (moet 644 zijn)
2. Check .htaccess voor blocking rules
3. Zorg dat PHP enabled is voor .php files

### "Verdachte activiteit gedetecteerd":

1. Dit is de anti-bot beveiliging
2. Wacht minimaal 2 seconden voordat je submit
3. Gebruik een echte browser (geen curl/wget)

### Rate limit te strikt:

1. Open `signup.php`
2. Wijzig regel: `if (count($ipAttempts) >= 3)` naar hoger getal
3. Wijzig regel: `$hourAgo = $now - 3600;` naar langer interval

## 📱 Contact

Voor support: info@promotiemeester.nl
