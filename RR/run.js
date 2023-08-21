const { exec } = require('child_process');

// Array of the two script options
const scriptOptions = ['image.js', 'image.js'];

// Randomly choose one script from the options
const randomScript = scriptOptions[Math.floor(Math.random() * scriptOptions.length)];

// Execute the randomly chosen script
console.log(`Running ${randomScript}...`);
const childProcess = exec(`cd ./Finder && node ${randomScript}`);

// Handle the output of the first script if needed
childProcess.stdout.on('data', (data) => {
  console.log(`Output from ${randomScript}: ${data}`);
});

childProcess.stderr.on('data', (data) => {
  console.error(`Error from ${randomScript}: ${data}`);
});

childProcess.on('close', (code) => {
  if (code === 0) {
    console.log(`${randomScript} completed successfully.`);
    // Now, run the second script (script2.js)
    console.log('Running script2.js...');
    exec('node test.js', (error, stdout, stderr) => {
      if (error) {
        console.error('Error running script2.js:', error);
      } else {
        console.log('script2.js completed successfully.');
      }
    });
  } else {
    console.error(`${randomScript} exited with an error (code ${code}).`);
  }
});
