const fs = require('fs');
const snoowrap = require('snoowrap');
const https = require('https');
const request = require("request")



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
var subredditList=["cars","Cartalk","carporn","whatisthiscar","projectcar","spotted","AwesomeCarMods","Autocross"]

const reddit = new snoowrap({
  userAgent: userAgent,
  clientId: clientId,
  clientSecret: clientSecret,
  username: redditUsername,
  password: redditPassword
});

let currentMemeIndex = 0;
let postedIds = [];
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    // Use request module instead of https for better performance and error handling
    const options = {
      url: url,
      encoding: null // Set encoding to null to get a buffer instead of a string
    };
    request(options, (err, res, body) => {
      if (err) {
        // Handle request errors
        reject(err);
      } else if (res.statusCode === 200) {
        // Check the content type header to ensure it is an image
        const contentType = res.headers['content-type'];
        if (contentType && contentType.startsWith('image/')) {
          // Write the buffer to the file
          fs.writeFile(filepath, body, (err) => {
            if (err) {
              // Handle write errors
              reject(err);
            } else {
              // Resolve with the filepath
              resolve(filepath);
            }
          });
        } else {
          // Reject if the response is not an image
          reject(new Error(`Response is not an image: ${contentType}`));
        }
      } else {
        // Reject if the status code is not 200
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


function saveMeme(url, post) {
  const memeFilename = 'meme.jpg';

  downloadImage(url, memeFilename)
    .then(() => {
      console.log('Meme saved:', memeFilename);
      savePostedId(post.id); // Save the current post ID to avoid duplicates
      clearInterval(myInterval); // Stop the interval
    })
    .catch((err) => {
      console.log('Error occurred while downloading meme:', err);
      currentMemeIndex++;
      getMemes();
    });
}

function getMemes() {
  if (currentMemeIndex >= subredditList.length) {
    console.log('No valid memes found in any subreddit.');
    clearInterval(myInterval); // Stop the interval
    return;
  }

  const subredditName = subredditList[currentMemeIndex];
  const subreddit = reddit.getSubreddit(subredditName);

  subreddit.getTop().then(posts => {
    const validPosts = posts.filter(post => !postedIds.includes(post.id) && !post.is_video && !post.url.endsWith('.gif'));
    
    if (validPosts.length > 0) {
      const randomPost = validPosts[Math.floor(Math.random() * validPosts.length)];
      console.log(`Processing meme from ${subredditName}`);
      saveMeme(randomPost.url, randomPost);
      var array = ["🏎️","👌","❤️","🔥","🏎️💥"]
          const rando = array[Math.floor(Math.random() * array.length)]; + array[Math.floor(Math.random() * array.length)];
  
          var jsonData = `{\"cap\":\"${randomPost.title}\", \"emoji\":\"${rando}\", \"reddit\":\"${subredditName}\", \"type\":\"image\"}`;
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
  }).catch(error => {
    console.error('Error fetching posts:', error);
    currentMemeIndex++;
    getMemes(); // Retry fetching memes
  });
}

function Upload() {

  const { IgApiClient } = require('instagram-private-api');
const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));

(async () => {
  // Create an instance of the Instagram Private API client
  const ig = new IgApiClient();

  // Replace with your Instagram credentials
  ig.state.generateDevice('dumbass_kingg');

  // Replace with your Instagram login credentials
  await ig.account.login('dumbass_kingg', 'T@ra@kter333');

  // Array of file paths to your photos
  const photoPaths = [`./meme.jpg`];

  // Read caption from a text file
  var out = require("../out.json");
  if (out.reddit == "memes") {
    var posttype = "Dank";
    var Hash = "#dankmemes #memes #meme #memesdaily #funnymemes #funny #dank #edgymemes #offensivememes #lol #dankmeme #dailymemes #memepage #lmao #memestagram #follow #humor #comedy #bhfyp #lmfao😂😂😂😭 #offensivememes💦👀💯😂😂💎🔥😤💦👌💯😂🙏😂😂💎💎🔥😤💦👀👀";
  }
  if (out.reddit == "dankmemes") {
    var posttype = "Dank";
    var Hash = "#dankmemes #memes #meme #memesdaily #funnymemes #funny #dank #edgymemes #offensivememes #lol #dankmeme #dailymemes #memepage #lmao #memestagram #follow #humor #comedy #bhfyp #lmfao😂😂😂😭 #offensivememes💦👀💯😂😂💎🔥😤💦👌💯😂🙏😂😂💎💎🔥😤💦👀👀";
  }
  if (out.reddit == "me_irl") {
    var posttype = "Me IRL";
    var Hash = "#meirl #memes #dankmemes #offensivememes #funnymemes #memesdaily #ol #dailymemes #redditmemes #dankmemesdaily #spicymemes #irl #shitpost #me #memez #meme #dailydoseofmemes #memesfunny #pewdiepie #facebookmemes #pewdiepiememes #memesdrop #weeklymemes #lwiay #yiay #jacksfilms #dailymemesdrop #memesdailydrop #rarememes #instagramemes";
  }
  if (out.reddit == "2meirl4meirl") {
    var posttype = "Me IRL";
    var Hash = "#meirl #memes #dankmemes #offensivememes #funnymemes #memesdaily #ol #dailymemes #redditmemes #dankmemesdaily #spicymemes #irl #shitpost #me #memez #meme #dailydoseofmemes #memesfunny #pewdiepie #facebookmemes #pewdiepiememes #memesdrop #weeklymemes #lwiay #yiay #jacksfilms #dailymemesdrop #memesdailydrop #rarememes #instagramemes";
  }
  if (out.reddit == "MemeEconomy") {
    var posttype = "Dank";
    var Hash = "#memeeconomy #meme #memes #blackeconomy #o #dankmemes #resourcebasedeconomy #memesteti #creativeeconomy #globaleconomy #worldeconomy #circulareconomy #economyclass #greeneconomy #politicaleconomy #gifteconomy #useconomy #sharingeconomy #economyofstyle #memesforhomies #dailymemes #memesdaily #memestuff #memesmalaysia #memeliterario #memedrama #wallstreetstyle #chinaeconomy #wallstreetbarbers #socialeconomy";
  }
  if (out.reddit == "funny") {
    var posttype = "Funny";
    var Hash = "#funny #memes #meme #funnymemes #lol #dankmemes #comedy #fun #love #memesdaily #follow #like #humor #funnyvideos #instagram #tiktok #instagood #lmao #dank #jokes #cute #explorepage #dailymemes #viral #laugh #edgymemes #bhfyp #memepage #funnymeme #offensivememes";
  }
  if (out.reddit == "comedymemes") {
    var posttype = "Comedy";
    var Hash = "#comedymemes #memes #comedy #funnymemes #comedyvideos #memesdaily #funny #meme #dankmemes #funnyvideos #comedyclub #tamilmemes #fun #jokes #telugumemes #trending #comedyvideo #memepage #follow #instagram #lol #funnyshit #comedycentral #comedyposts #dailymemes #comedyshow #memestagram #love #tiktok #funnymeme";
  }
  if (out.reddit == "okbuddyretard") {
    var posttype = "Daft";
    var Hash = "#okbuddyretard #memes #dankmemes #offensivememes #funnymemes #edgymemes #shitpost #meme #bruhmoment #ironicmemes #arabfunny #dank #shitposting #cursedmemes #irony #funny #jetfuelcantmeltsteelbeams #stcenturyhumor #goodmemes #redditmemes #memesdaily #cancerousmemes #vibecheck #offensive #lol #twohomieskissingeachothergoodnight #shitposts #cursedimages #bigchungus #epicgamermoment";
  }
  if (out.reddit == "wholesomememes") {
    var posttype = "Wholesome";
    var Hash = "#wholesomememes #memes #dankmemes #memesdaily #meme #wholesome #funnymemes #offensivememes #edgymemes #funny #stolenmemes #dailymemes #cutememes #memestagram #love #lovememes #dank #spicymemes #explorepage #deepfriedmemes #cute #cancerousmemes #wholesomememe #darkmemes #wholesomegfmemes #tiktok #goodmemes #softmemes #dankmemesdaily #memepage";
  }else{
    var posttype = "Funny"
    var Hash = "#wholesomememes #memes #dankmemes #memesdaily #meme #wholesome #funnymemes #offensivememes #edgymemes #funny #stolenmemes #dailymemes #cutememes #memestagram #love #lovememes #dank #spicymemes #explorepage #deepfriedmemes #cute #cancerousmemes #wholesomememe #darkmemes #wholesomegfmemes #tiktok #goodmemes #softmemes #dankmemesdaily #memepage";

  }
  var caption = "\n" + posttype + " " +"memes! " + out.emoji + "\nLike & Share❤️\nFollow for the next Post🤝\n\n**IGNORE THESE **\n " + Hash + " ";
  
  // Upload photos and get media IDs

  const mediaIds = await Bluebird.map(photoPaths, async (photoPath) => {
    try {
        var caption = randomPost+ out.emoji+out.emoji+"\n" + posttype + " " +"memes! " + out.emoji + "\nLike & Share❤️\nFollow for the next Post🤝\n\n**IGNORE THESE **\n " + Hash + " ";

      const upload = await ig.publish.photo({
        file: await fs.readFileAsync(photoPath),
        caption: caption,
      });

      console.log("Media uploaded with media ID:", upload.media.pk);
      return upload.media.pk;
    } catch (error) {
      console.error("Error uploading media:", error);
      return null;
    }
  });

  console.log("Media IDs:", mediaIds);
})();
  
}

// Upload()

const myInterval = setInterval(getMemes, 5000);
