const dbConfig = require('../Config/db.Config.js');

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
const queryInterface = sequelize.getQueryInterface();
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Admin
db.admin = require('./Admin/adminModel.js')(sequelize, Sequelize);

// Course
db.course_Discount_Junction = require('./Course/Course_Discount_JunctionModel.js')(sequelize, Sequelize);
db.courseContent = require('./Course/courseContentModel.js')(sequelize, Sequelize);
db.courseAndContentFile = require('./Course/courseAndContentFileModel.js')(sequelize, Sequelize);
db.course = require('./Course/courseModel.js')(sequelize, Sequelize);

// Master
db.discount = require('./Master/discountModel.js')(sequelize, Sequelize);

// Employee
db.instructor = require('./User/Instructor/instructorModel.js')(sequelize, Sequelize);

// Student
db.student = require('./User/Student/studentModel.js')(sequelize, Sequelize);

// Course's Association with course content
db.course.hasMany(db.courseContent, { foreignKey: 'courseId', as: 'contents' });
db.courseContent.belongsTo(db.course, { foreignKey: 'courseId', as: 'course' });

// Course's Association with discount
db.course.hasMany(db.course_Discount_Junction, { foreignKey: 'courseId', as: 'course_Discount_Junction' });
db.course_Discount_Junction.belongsTo(db.course, { foreignKey: 'courseId', as: 'course' });

db.discount.hasMany(db.course_Discount_Junction, { foreignKey: 'discountId', as: 'course_Discount_Junction' });
db.course_Discount_Junction.belongsTo(db.discount, { foreignKey: 'discountId', as: 'discount' });

// Course's Association with file
db.course.hasMany(db.courseAndContentFile, { foreignKey: 'courseId', as: 'files' });

// Content's Association with file
db.courseContent.hasMany(db.courseAndContentFile, { foreignKey: 'contentId', as: 'files' });

// This many to many relation auto deleteing table after create it.......?
// db.leadProfile.belongsToMany(
//     db.userInformation, {
//     through: "lead_To_User",
//     foreignKey: "leadProfileCode",
//     otherKey: "userInformationCode",
//     targetKey: "userCode",
//     sourceKey: "leadCode",
//     as: 'users'
// }
// );
// db.userInformation.belongsToMany(
//     db.leadProfile, {
//     through: "lead_To_User",
//     foreignKey: "userInformationCode",
//     otherKey: 'leadProfileCode',
//     targetKey: "leadCode",
//     sourceKey: "userCode",
//     as: "leads"
// }
// );

module.exports = db;
