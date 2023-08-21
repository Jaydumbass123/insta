const { IgApiClient, PostsInsightsFeed } = require('instagram-private-api');
const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));


// Read the config.txt file
const configFile = fs.readFileSync('./config.txt', 'utf-8');


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




(async () => {
  // Create an instance of the Instagram Private API client
  const ig = new IgApiClient();


  // Replace with your Instagram credentials
  ig.state.generateDevice(username);


  // Replace with your Instagram login credentials
  await ig.account.login(username, password);


  // Array of file paths to your photos
  const photoPaths = [`./Finder/meme.jpg`];


  // Read caption from a text file
  var out = require("./out.json");
  if (out.reddit == "memes") {
    var posttype = "Dank memes ";
    var Hash = "#dankmemes #memes #meme #memesdaily #funnymemes #funny #dank #edgymemes #offensivememes #lol #dankmeme #dailymemes #memepage #lmao #memestagram #follow #humor #comedy #bhfyp #lmfao😂😂😂😭 #offensivememes💦👀💯😂😂💎🔥😤💦👌💯😂🙏😂😂💎💎🔥😤💦👀👀";
  }
  else if (out.reddit == "dankmemes") {
    var posttype = "Dank memes";
    var Hash = "#dankmemes #memes #meme #memesdaily #funnymemes #funny #dank #edgymemes #offensivememes #lol #dankmeme #dailymemes #memepage #lmao #memestagram #follow #humor #comedy #bhfyp #lmfao😂😂😂😭 #offensivememes💦👀💯😂😂💎🔥😤💦👌💯😂🙏😂😂💎💎🔥😤💦👀👀";
  }
  else if (out.reddit == "me_irl") {
    var posttype = "Me IRL memes";
    var Hash = "#meirl #memes #dankmemes #offensivememes #funnymemes #memesdaily #ol #dailymemes #redditmemes #dankmemesdaily #spicymemes #irl #shitpost #me #memez #meme #dailydoseofmemes #memesfunny #pewdiepie #facebookmemes #pewdiepiememes #memesdrop #weeklymemes #lwiay #yiay #jacksfilms #dailymemesdrop #memesdailydrop #rarememes #instagramemes";
  }
 else if (out.reddit == "2meirl4meirl") {
    var posttype = "Me IRL memes";
    var Hash = "#meirl #memes #dankmemes #offensivememes #funnymemes #memesdaily #ol #dailymemes #redditmemes #dankmemesdaily #spicymemes #irl #shitpost #me #memez #meme #dailydoseofmemes #memesfunny #pewdiepie #facebookmemes #pewdiepiememes #memesdrop #weeklymemes #lwiay #yiay #jacksfilms #dailymemesdrop #memesdailydrop #rarememes #instagramemes";
  }
 else if (out.reddit == "MemeEconomy") {
    var posttype = "Economy memes";
    var Hash = "#memeeconomy #meme #memes #blackeconomy #o #dankmemes #resourcebasedeconomy #memesteti #creativeeconomy #globaleconomy #worldeconomy #circulareconomy #economyclass #greeneconomy #politicaleconomy #gifteconomy #useconomy #sharingeconomy #economyofstyle #memesforhomies #dailymemes #memesdaily #memestuff #memesmalaysia #memeliterario #memedrama #wallstreetstyle #chinaeconomy #wallstreetbarbers #socialeconomy";
  }
 else if (out.reddit == "funny") {
    var posttype = "Funny memes";
    var Hash = "#funny #memes #meme #funnymemes #lol #dankmemes #comedy #fun #love #memesdaily #follow #like #humor #funnyvideos #instagram #tiktok #instagood #lmao #dank #jokes #cute #explorepage #dailymemes #viral #laugh #edgymemes #bhfyp #memepage #funnymeme #offensivememes";
  }
 else if (out.reddit == "comedymemes") {
    var posttype = "Comedy memes";
    var Hash = "#comedymemes #memes #comedy #funnymemes #comedyvideos #memesdaily #funny #meme #dankmemes #funnyvideos #comedyclub #tamilmemes #fun #jokes #telugumemes #trending #comedyvideo #memepage #follow #instagram #lol #funnyshit #comedycentral #comedyposts #dailymemes #comedyshow #memestagram #love #tiktok #funnymeme";
  }
 else if (out.reddit == "okbuddyretard") {
    var posttype = "Daft memes";
    var Hash = "#okbuddyretard #memes #dankmemes #offensivememes #funnymemes #edgymemes #shitpost #meme #bruhmoment #ironicmemes #arabfunny #dank #shitposting #cursedmemes #irony #funny #jetfuelcantmeltsteelbeams #stcenturyhumor #goodmemes #redditmemes #memesdaily #cancerousmemes #vibecheck #offensive #lol #twohomieskissingeachothergoodnight #shitposts #cursedimages #bigchungus #epicgamermoment";
  }
 else if (out.reddit == "wholesomememes") {
    var posttype = "Wholesome memes";
    var Hash = "#wholesomememes #memes #dankmemes #memesdaily #meme #wholesome #funnymemes #offensivememes #edgymemes #funny #stolenmemes #dailymemes #cutememes #memestagram #love #lovememes #dank #spicymemes #explorepage #deepfriedmemes #cute #cancerousmemes #wholesomememe #darkmemes #wholesomegfmemes #tiktok #goodmemes #softmemes #dankmemesdaily #memepage";
  }else{
    var posttype = "Funny memes"
    var Hash = "#wholesomememes #memes #dankmemes #memesdaily #meme #wholesome #funnymemes #offensivememes #edgymemes #funny #stolenmemes #dailymemes #cutememes #memestagram #love #lovememes #dank #spicymemes #explorepage #deepfriedmemes #cute #cancerousmemes #wholesomememe #darkmemes #wholesomegfmemes #tiktok #goodmemes #softmemes #dankmemesdaily #memepage";

  }
  var caption = "\n" + posttype + " "+ out.emoji + "\nLike & Share❤️\nFollow for the next Post🤝\n\n**IGNORE THESE **\n " + Hash + " ";
 
 
 // Upload photos and get media IDs


 const mediaIds = await Bluebird.map(photoPaths, async (photoPath) => {
  try {
      var caption = out.cap+ out.emoji+"\n" + posttype + out.emoji + "\nLike & Share❤️\nFollow for the next Post🤝\n\n**IGNORE THESE **\n " + Hash + " ";


    const upload = await ig.publish.photo({
      file: await fs.readFileAsync(photoPath),
      caption: caption,
    });


    console.log("Media uploaded with media ID:", upload.media.pk);
   
   
          await ig.media.like({
              mediaId: upload.media.pk,
              moduleInfo: { module_name: "profile" },
          });




// // Initialize postedIds array
// let postedIds = [];


// // Function to save posted IDs to posts_id.json
// function savePostedId(postId) {
//   try {
//     // Read existing posted IDs if the file exists
//     if (fs.existsSync('./posts_id.json')) {
//       const data = fs.readFileSync('./posts_id.json', 'utf8');
//       postedIds = JSON.parse(data);
//     }
//   } catch (err) {
//     console.error('Error reading posts_id.json:', err);
//   }


//   // Add the new postId to the array
//   postedIds.push(postId);


//   try {
//     // Write the updated array back to the file
//     fs.writeFileSync('./posts_id.json', JSON.stringify(postedIds), 'utf8');
//     console.log('Posted IDs saved to posts_id.json');
//   } catch (err) {
//     console.error('Error writing posts_id.json:', err);
//   }
// }


// // Replace 'your_media_id_here' with the actual media ID
// const uploadMediaId = upload.media.pk
// savePostedId(uploadMediaId);


// const da = await ig.user.getIdByUsername("dumbass_kingg");
// const feed = await ig.feed.user(da).items();


// function getRandomItemFromArray(array) {
//   const randomIndex = Math.floor(Math.random() * array.length);
//   return array[randomIndex];
// }


// const randomPost = getRandomItemFromArray(feed);
// const likersResponse = await ig.media.likers(randomPost.pk);


// const likers = likersResponse.users;


// for (const liker of likers) {
//   await ig.friendship.create(liker.pk)
// }





const da = await ig.user.getIdByUsername(username);
const feed = await ig.feed.user(da).items();


function getRandomItemFromArray(array) {
const randomIndex = Math.floor(Math.random() * array.length);
return array[randomIndex];
}

const options = ["t","t"]

if(getRandomItemFromArray(options) === "t"){

const randomPost = getRandomItemFromArray(feed);
const likersResponse = await ig.media.likers(randomPost.pk);


const likers = likersResponse.users;


for (const liker of likers) {
const friendshipStatus = await ig.friendship.show(liker.pk);

if (!friendshipStatus.following) {
  // Send a message to the liker asking to follow
  const messages = "Hey there! Follow us for more amazing content|Thanks for liking our posts! Don't miss out, hit that follow button|👋 Hey, how about giving us a follow? You won't regret it|Thanks for the love! Join our community by hitting that follow button|Hey, cool to see you liking our posts! Follow us for more awesome stuff|Appreciate the support! Give us a follow to stay connected|Liking what you see? Follow us for more exciting content|Your likes mean a lot to us! Follow for more amazing content!";
  const text = messages.split("|");
  const message = text[Math.floor(Math.random() * text.length)];
  const thread = ig.entity.directThread([liker.pk]);
  await thread.broadcastText(message);  }
  console.log("Messages Sent!")
}
}else if(getRandomItemFromArray(options) === "f"){
  console.log("Messaging random followers!")
  

const followerResponse = ig.feed.accountFollowers(da)


const followerList = followerResponse.items()

if(followerResponse > 20){
for (const followers of followerList){ 

  // Send a message to the liker asking to follow
  const messages = "Hi! Hope you’re doing well! Check out my latest posts and let me know what you think.| Hey there! Just wanted to check in with you and see how you’re doing. Don’t forget to check out my new posts.| Hello! Hope everything is going great for you. Remember to take a look at my recent posts and share your thoughts.| Hi! How’s everything going? I’ve been posting new content and would love to hear what you think.| Hey! Hope you’re having a great day. Just wanted to invite you to check out my new posts and let me know your feedback.";
  const text = messages.split("|")
  const message = text[Math.floor(Math.random() * text.length)];
  const thread = ig.entity.directThread([followers.pk]);
  await thread.broadcastText(message);  
  console.log("Messages Sent!")

}}else{



const randomFollowers = [];

for (let i = 0; i < 20; i++) {
  const index = Math.floor(Math.random() * followerList.length);
  const follower = followerList.splice(index, 1)[0];
  randomFollowers.push(follower);
}

for (const follower of randomFollowers) {
  // Send a message to the follower asking to follow
  const messages = "Hi! Hope you’re doing well! Check out my latest posts and let me know what you think.| Hey there! Just wanted to check in with you and see how you’re doing. Don’t forget to check out my new posts.| Hello! Hope everything is going great for you. Remember to take a look at my recent posts and share your thoughts.| Hi! How’s everything going? I’ve been posting new content and would love to hear what you think.| Hey! Hope you’re having a great day. Just wanted to invite you to check out my new posts and let me know your feedback.|";
  const text = messages.split("|");
  const message = text[Math.floor(Math.random() * text.length)];
  const thread = ig.entity.directThread([follower.pk]);
  await thread.broadcastText(message);
}

console.log("Messages Sent!");



}
}
// else{

//   const followerResponse = await ig.feed.accountFollowers(da)


//   const followerList = followerResponse.users;

//   const randomFollowers = [];

//   for (let i = 0; i < 20; i++) {
//     const index = Math.floor(Math.random() * followerList.length);
//     const follower = followerList.splice(index, 1)[0];
//     console.log(follower)
//     randomFollowers.push(follower);
//   }
  


//   // Send a message to the liker asking to follow
//   const messages = "Check out this post!|What do you think of this?|Any thoughts?|Hope you like this!| Like it if you want more like this.| Carsss>>>";
//   const text = messages.split("|")

//   const message = text[Math.floor(Math.random() * text.length)];
//   await ig.media.comment({mediaId: upload.media.pk, text: message + randomFollowers})
//   console.log("Comment Sent!")





// }


         


}
     
catch (error) {
    console.error("Error uploading media:", error);
    return null;
  }
});








})();



