const fs = require('fs');
const snoowrap = require('snoowrap');
const https = require('https');


// Read the config.txt file
const configFile = fs.readFileSync('../config.txt', 'utf-8');

// Split the content into lines
const lines = configFile.split('\n');

// Create an object to store the parameters
const config = {};

// Parse each line and store it in the config object
lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        config[key.trim()] = value.trim();
    }
});

// Access the username and password parameters
const username = config.username;
const password = config.password;
const userAgent = config.userAgent
const clientId = config.clientId
const clientSecret = config.clientSecret
const redditUsername = config.redditUsername
const redditPassword = config.redditPassword
const subreddits = config.subredditList


// const subredditList = config.subredditList ? config.subredditList.split(',') : [];
var subredditList=["memes","dankmemes",`2meirl4meirl`,`meme_irl`,"MemeEconomy","okbuddyretard","funny","comedymemes"]

const reddit = new snoowrap({
  userAgent: userAgent,
  clientId: clientId,
  clientSecret: clientSecret,
  username: redditUsername,
  password: redditPassword
});

let currentMemeIndex = 0;
let postedIds = [];

function downloadVideo(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
          .on('error', reject)
          .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

function savePostedId(postId) {
  try {
    if (fs.existsSync('./posted.json')) {
      const data = fs.readFileSync('./posted.json', 'utf8');
      postedIds = JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading posted.json:', err);
  }

  postedIds.push(postId);

  try {
    fs.writeFileSync('./posted.json', JSON.stringify(postedIds), 'utf8');
    console.log('Posted IDs saved to posted.json');
  } catch (err) {
    console.error('Error writing posted.json:', err);
  }
}

async function saveMeme(post) {
  try {
    const videoUrl = post.media.reddit_video.fallback_url;
    const videoFilename = 'meme.mp4';

    await downloadVideo(videoUrl, videoFilename);

    console.log('Meme saved:', videoFilename);
    savePostedId(post.id); // Save the current post ID to avoid duplicates
    clearInterval(myInterval); // Stop the interval
  } catch (err) {
    console.log('Error occurred while downloading meme:', err);
    currentMemeIndex++;
    getMemes();
  }
}

async function getMemes() {
  if (currentMemeIndex >= subredditList.length) {
    console.log('No valid memes found in any subreddit.');
    clearInterval(myInterval); // Stop the interval
    return;
  }

  const subredditName = subredditList[currentMemeIndex];
  const subreddit = reddit.getSubreddit(subredditName);

  try {
    const posts = await subreddit.getTop({ time: 'all', limit: 100 });
    const validPosts = posts.filter(
      (post) =>
        !postedIds.includes(post.id) &&
        post.media &&
        post.media.reddit_video &&
        post.media.reddit_video.fallback_url &&
        !post.url.endsWith('.gif')
    );

    if (validPosts.length > 0) {
      const randomPost = validPosts[Math.floor(Math.random() * validPosts.length)];
      console.log(`Processing meme from ${subredditName}`);
      await saveMeme(randomPost);
      var array = ["😂","👌","❤️","🔥","💥"]
      const rando = array[Math.floor(Math.random() * array.length)]; + array[Math.floor(Math.random() * array.length)];

var jsonData = `{\"cap\":\"${randomPost.title}\", \"emoji\":\"${rando}\", \"reddit\":\"${subredditName}\", \"type\":\"video\"}`;
var jsonObj = JSON.parse(jsonData);
console.log(jsonObj);

var jsonContent = JSON.stringify(jsonObj);

const fs = require('fs');

fs.writeFile("../out.json", jsonContent, 'utf8', function (err) {
  if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }
});



    } else {
      console.log(`No valid memes found in ${subredditName}. Searching next subreddit...`);
      currentMemeIndex++;
      getMemes();
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    currentMemeIndex++;
    getMemes(); // Retry fetching memes
  }
}

const myInterval = setInterval(getMemes, 5000);
