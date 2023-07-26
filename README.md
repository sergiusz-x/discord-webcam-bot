
# 📷 Discord Webcam Bot 📷

This project allows you to send photos from your USB webcam to Discord. It also allows to take interval photos every x seconds. Personally, I use it to watch my 🐇 when I'm away from home.


## 📔 Requirements 📔
- Node.js 16.6.0 or higher
- fswebcam (`sudo apt install fswebcam`)
- USB webcam


## ⚙️ Installation ⚙️

1. Clone the project

```bash
  git clone https://github.com/sergiusz-x/discord-webcam-bot.git
```

2. Install dependencies

```bash
  npm install
```

3. Change file name from `config_template.js` to `config.js` and configure it


4. Start the bot

```bash
  node index.js
```

**If everything has started correctly, you can run the bot via pm2**

5. Install pm2
```bash
  npm install pm2 -g
``` 

6. Start the bot via pm2
```bash
  pm2 start index.js -n webcambot
``` 

7. Go to Discord and check if bot is online, then test command `/camlist`

8. Set camera with `/setcamera` command 

9. Take photo with `/photo` command
## 💻 Preview 💻

![Preview](https://media.discordapp.net/attachments/1133735893715386438/1133736441348894850/image.png?width=556&height=702)