sudo apt-get update
sudo apt-get install -y nodejs npm

sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash
sudo apt-get install nodejs -y

cd BeAWinner/
npm install
npm run dev