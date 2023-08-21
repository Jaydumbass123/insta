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



// Read the JSON data from the file
fs.readFile('posts_id.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Split the comma-separated string into an array of IDs
    const IDArray = jsonData.map(id => id.replace(/"/g, '').split(','));

    // Now you can use the IDArray in a forEach loop
    IDArray.forEach(async(ID) => {
        const info = await ig.media.info(ID);

        if(info.items[0].like_count < 25){
        await ig.media.delete({
                mediaId: ID,
                mediaType: "PHOTO",
            });

            console.log(ID + "Had less than 25 Likes and was deleted!")
            

        }

        // Your code to process each ID goes here
    });
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
  }
});




  

})();