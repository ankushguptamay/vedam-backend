module.exports = (sequelize, DataTypes) => {
    const Course_Discount_Junctions = sequelize.define("Course_Discount_Junctions", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        createrId: {
            type: DataTypes.STRING
        },
        validTill: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
    return Course_Discount_Junctions;
}

// Foriegnkey
// courseId
// discountId