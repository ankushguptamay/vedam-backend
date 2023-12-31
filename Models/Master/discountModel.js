module.exports = (sequelize, DataTypes) => {
    const Discount = sequelize.define("discounts", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        discountTitle: {
            type: DataTypes.STRING
        },
        discountNumber: {
            type: DataTypes.TEXT
        },
        discountInPercent: {
            type: DataTypes.STRING
        },
        createrId: {
            type: DataTypes.STRING
        },
        approvalStatusByAdmin: {
            type: DataTypes.STRING,
            validate: {
                isIn: [['Pending', 'Approved', 'Rejected']]
            },
            defaultValue: 'Pending'
        },
        validTill: {
            type: DataTypes.STRING
        }
    }, {
        paranoid: true
    })
    return Discount;
}

// ForiegnKey
// createrId