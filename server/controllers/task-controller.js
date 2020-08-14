const { Task, User, Category } = require('../models')

class TaskControl {
    static create (req, res, next) {
        let { title, description, category, priority, due_date } = req.body
        let { id } = req.userData
        Task.create({
            UserId: id,
            title,
            description,
            category,
            priority,
            due_date
        })
        .then(data => {
            res.status(201).json({
                UserId: data.UserId,
                title: data.title, 
                description: data.description,
                category: data.category,
                priority: data.priority,
                due_date: data.due_date
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err: err.errors})
            next(err)
        })
    }

    static show (req, res, next) {
        let { organization } = req.userData
        Task.findAll({include: User})
        .then(datas => {
            let arr = []
            datas.forEach(task => {
                if(task.User.organization === organization) arr.push({
                    id: task.id,
                    UserId: task.UserId,
                    title: task.title,
                    description: task.description,
                    category: task.category,
                    priority: task.priority,
                    due_date: task.due_date
                })
            });
            res.status(200).json({tasks: arr})
        })
        .catch(err => {
            res.status(500).json({err: err.errors})
            console.log(err)
            // next(err)
        })
    }

    static update (req, res, next) {
        let { id } = req.params
        let { title, description, category, priority, due_date } = req.body
        Task.update({ 
            title, 
            description, 
            category, 
            priority, 
            due_date 
        }, {where: {
            id,
        }})
        .then(data => {
            res.status(200).json({msg: 'Success Edit Data'})
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static delete (req, res, next) {
        let { id } = req.params
        Task.destroy({where: {id}})
        .then(data => {
            res.status(200).json({msg: 'Delete Success!!!'})
        })
        .catch(err => {
            next(err)
        })
    }

    static getCategory (req, res, next) {
        let tasks = []
        Category.findAll({
            where: {
                organization: process.env.ORG_ALL
            }
        })
        .then(data => {
            tasks = data
            return Category.findAll({
                where: {
                    organization: req.userData.organization
                }
            })
        })
        .then(datas => {
            datas.forEach(data => {
                task.push(data)
            })
            res.status(200).json({categories: tasks})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TaskControl