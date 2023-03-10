const express = require('express');
const https = require('https');

const app = express();

const options = {
  headers: {
    'user-agent': 'Android Vinebre Software'
  },
  rejectUnauthorized: false
};

app.get('/tilfaz', (req, res) => {
  const s = req.query.s || 'default value';
  https.get('https://config.e-droid.net/srv/config.php?v=132&vname=1.0&idapp=1869597&idusu=0&cod_g=&gp=0&am=0&idl=en&pa_env=1&pa=US&pn=com.dramalive23&fus=010100000000&aid=c64821ef3b477efc', options, (response) => {
    let data = '';
    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      const delimiter = '[s18108355_url=';
      const sValue = 'some_s_value';
      const first_step = data.includes(delimiter) ? data.split(delimiter) : [];
      const second_step = first_step.length > 1 ? first_step[1].split('][') : [];
      const user = second_step.length > 0 ? second_step[0] : '';
      const a = user.replace('/266', s);

      // Set the response header to the URL
      res.location(a);
      res.sendStatus(302); // Send redirect response
    });
  }).on('error', (error) => {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' }); // Send error response
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
