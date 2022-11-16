var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/fetchProjects", function (req, res, next) {
  const project = {
    project_title: 'My First Project',
    project_description: 'This is a sample project description. Do you like it?',
    project_link: '/',
  };
  const project2 = {
    project_title: 'My Second Project',
    project_description: 'This is a sample second project description. Do you like it?',
    project_link: '/',
  };

  let projects = [project, project2];

  for (let i = 0; i < 5000; i++) {
    let project = {
      project_title: 'For loop project',
      project_description: 'This is a sample for loop project description. Do you like it?',
      project_link: '/',
    };

    projects.push(project);
  }

  res.send(JSON.stringify({projects: projects}));
});

module.exports = router;
