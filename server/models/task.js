'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: 'UserId'})
    }
  };
  Task.init({
    UserId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    priority: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isLessThanToday(value) {
          let today = new Date()
          let yesterday = new Date(today)
          yesterday = yesterday.setDate(yesterday.getDate()-1)
          if(value < yesterday || value == '' || value == null)
          throw new Error('Due Date must be today or more')
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (task, opt) => {
        if(task.title === '') task.title = 'Unnamed'
        if(task.priority === '') task.priority = 'lowest'
      },
      beforeValidate: (task, opt) => {
        if(task.due_date === '') {
          let today = new Date()
          let tomorrow = new Date(today)
          tomorrow = tomorrow.setDate(tomorrow.getDate()+1)
          task.due_date = tomorrow
        }
      }
    },
    sequelize,
    modelName: 'Task',
  });
  return Task;
};