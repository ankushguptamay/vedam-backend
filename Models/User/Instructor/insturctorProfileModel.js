module.exports = (sequelize, DataTypes) => {
    const InstructorProfile = sequelize.define("instructorProfiles", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        originalName: {
            type: DataTypes.STRING
        },
        path: {
            type: DataTypes.STRING(1234)
        },
        fileName: {
            type: DataTypes.STRING(1234)
        },
        approvalStatusByAdmin: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Pending', 'Approved', 'Rejected']]
            },
            defaultValue: 'Pending'
        }
    }, {
        paranoid: true
    })
    return InstructorProfile;
}

// ForiegnKey
// instructorId