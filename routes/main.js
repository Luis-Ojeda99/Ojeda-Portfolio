const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const { response } = require('express')
const ProjectController = require('../controllers/ProjectController')
const { route } = require('./page')

router.get('/', (request, response) => {
    const data = request.context // {page:..., global:...}

    const projectController = new ProjectController()
    projectController.get()
    .then(projects => {
        data['projects'] = projects
        response.render('index', data)
    })
    .catch(err => {
        response.send('Something went wrong. ' + err.message)
    })

})

router.get('/project/:slug', (request, response) => {
    const data = request.context
    const projectSlug = request.params.slug 

    const projectController = new ProjectController()
    projectController.get({slug:projectSlug})
    .then(projects => {
        if (projects.length == 0){
            throw new Error('Project could not be found.')
            return
        }

        const project = projects[0]
        data['project'] = project
        response.render('project', data)
    })
    .catch(err => {
        response.send('Something went wrong. ' + err.message)
    })
})

module.exports = router
