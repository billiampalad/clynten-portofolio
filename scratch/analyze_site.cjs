const https = require('https');

https.get('https://www.meermohsin.me/assets/index-BXnpqJiu.js', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // find asset urls with .obj, .glb, .gltf, shaders
    const modelUrls = data.match(/["'][^"']+\.(glb|gltf|obj|hdr|mp3|wav|mp4|webm)["']/gi) || [];
    console.log('Model & Media Assets:', [...new Set(modelUrls)]);

    // check roman statue viewer
    const statueIdx = data.indexOf('roman-statue');
    if (statueIdx !== -1) {
      console.log('Statue code snippet:', data.slice(Math.max(0, statueIdx - 100), statueIdx + 300));
    }

    // check fluid canvas
    const fluidIdx = data.indexOf('fluid2');
    if (fluidIdx !== -1) {
      console.log('Fluid code snippet:', data.slice(Math.max(0, fluidIdx - 100), fluidIdx + 300));
    }
  });
});
