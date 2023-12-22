const { Model, DataTypes } =require('sequelize');
var sequelize =require('../libs/db.js');
var bcrypt =require( "bcrypt");

class Users extends Model {
    validPassword(password) {
		const isValid = bcrypt.compareSync(password, this.password);

		console.log([this.name, password, this.password, isValid]);

        return isValid;
    }
}

Users.init({
	id: {
		type: DataTypes.BIGINT.UNSIGNED,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
        validate: {
            len: [2,255],
            is: new RegExp('[a-zA-ZА-ЯёЁ\s]+', 'i')
        },
		allowNull: false,
        unique: true
	},
    token: {
		type: DataTypes.STRING
	},
	balance: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
        defaultValue: 0
	},
    password: {
		type: DataTypes.STRING,
        allowNull: false
	},
	ip: {
		type: DataTypes.STRING,
		allowNull: true
	},
	is_banned: {
		type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
	}
}, {
    /*defaultScope: {
        attributes: { exclude: ['password'] }
    },*/
    scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        }
    },
	timestamps: true,
	sequelize: sequelize,
	paranoid: false,
	tableName: 'users'
})

module.exports = Users;
