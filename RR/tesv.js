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
  if (out.reddit == "cars") {
    var posttype = "Broooooooooom!";
    var Hash = "#cars #car #carsofinstagram #carporn #bmw #auto #carlifestyle #s #carphotography #photography #supercars #ford #jdm #carswithoutlimits #automotive #mercedes #audi #porsche #ferrari #turbo #instacar #f #m #luxury #v #r #racing #supercar #instacars #toyota";
  }else
  if (out.reddit == "Cartalk") {
    var posttype = "Car Talk";
    var Hash = "#cartalk #cars #racing #boxchevy #amaniforged #bigrims #kandypaint #burnouts #caprice #buick #texastanktv #gbody #impala #cutlass #podcast #customcars #chevelle #montecarlo #carlifestyle #mtw #bigblock #lsswap #donk #candypaint #donuts #forgiato #c #shortbed #carporn #s";
  }else
  if (out.reddit == "carporn") {
    var posttype = "Isn't she a beauty?";
    var Hash = "#carporn #carsofinstagram #cars #car #carphotography #carlifestyle #carswithoutlimits #bmw #instacar #s #jdm #cargram #supercars #v #turbo #photography #instacars #porsche #supercar #mk #r #audi #carspotting #m #ferrari #e #carlovers #ford #stance #carstagram";
  }else
  if (out.reddit == "whatisthiscar") {
    var posttype = "Can you tell what car this is?";
    var Hash = "#cars #car #carsofinstagram #carporn #bmw #auto #carlifestyle #s #carphotography #photography #supercars #ford #jdm #carswithoutlimits #automotive #mercedes #audi #porsche #ferrari #turbo #instacar #f #m #luxury #v #r #racing #supercar #instacars #toyota";
  }else
  if (out.reddit == "projectcar") {
    var posttype = "Zero 2 Hero";
    var Hash = "#projectcar #jdm #mk #e #project #cars #carsofinstagram #turbo #s #racecar #car #v #builtnotbought #mx #carporn #z #ford #honda #drift #bmw #nissan #miata #stance #r #vw #b #toyota #classiccars #g #gt";
  }else
  if (out.reddit == "funny") {
    var posttype = "Funny";
    var Hash = "#funny #memes #meme #funnymemes #lol #dankmemes #comedy #fun #love #memesdaily #follow #like #humor #funnyvideos #instagram #tiktok #instagood #lmao #dank #jokes #cute #explorepage #dailymemes #viral #laugh #edgymemes #bhfyp #memepage #funnymeme #offensivememes";
  }else
  if (out.reddit == "spotted") {
    var posttype = "Another sick spot!";
    var Hash = "#carmeet #cars #jdm #carsofinstagram #carshow #car #carphotography #carporn #photography #gta #carmeets #stance #carlifestyle #carsandcoffee #bmw #turbo #r #e #v #nissan #s #ford #drift #mk #carspotting #honda #porsche #m #toyota #carswithoutlimits";
  }else
  if (out.reddit == "AwesomeCarMods") {
    var posttype = "Another BEAST MOD!";
    var Hash = "#carmods #cars #carsofinstagram #car #carporn #mods #jdm #modifiedcars #carlifestyle #subaru #mk #subie #modified #carphotography #carswithoutlimits #bmw #custom #ford #s #carculture #cargram #wrx #subiegang #automotive #auto #audi #vxr #c #turbo #racecar";
  }else
  if (out.reddit == "Autocross") {
    var posttype = "Autocross";
    var Hash = "#autocross #autox #racecar #racing #scca #mx #becauseracecar #drift #z #miata #c #motorsport #carsofinstagram #rallycross #jdm #rally #cars #s #camaro #mazda #roadster #subaru #race #turbo #v #protouring #ford #honda #mustang #trackcar";
  }else{
    var posttype = "Cars >>>"
    var Hash = "#cars #car #carsofinstagram #carporn #bmw #auto #carlifestyle #s #carphotography #photography #supercars #ford #jdm #carswithoutlimits #automotive #mercedes #audi #porsche #ferrari #turbo #instacar #f #m #luxury #v #r #racing #supercar #instacars #toyota";


  }
  var caption = "\n" + posttype + " "+ out.emoji + "\nLike & Share❤️\nFollow for the next Post🤝\n\n**IGNORE THESE **\n " + Hash + " ";
 
 
 // Upload photos and get media IDs


 const mediaIds = await Bluebird.map(photoPaths, async (photoPath) => {
  try {
      var caption = out.cap+ out.emoji+out.emoji+"\n" + posttype + out.emoji + "\nLike & Share❤️\nFollow for the next Post🤝\n\n**IGNORE THESE **\n " + Hash + " ";



    const vt = [1080,1080]
    const { getVideoDurationInSeconds } = require('get-video-duration');
    getVideoDurationInSeconds('./Finder/meme.mp4').then(async(duration) => {
    console.log(duration)
  



    const video = await  ig.publish.video({

        file: await fs.readFileAsync("./Finder/meme.mp4"),
        size: vt,
        caption: "lol"


    });

})



    // console.log("Media uploaded with media ID:", upload.media.pk);
   
   
        //   await ig.media.like({
        //       mediaId: upload.media.pk,
        //       moduleInfo: { module_name: "profile" },
        //   });





}
     
catch (error) {
    console.error("Error uploading media:", error);
    return null;
  }
});








})();



