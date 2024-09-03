const Couple = require('../models/coupleModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.registerCouple = async ({ first_name, last_name, username, email, phone_number, password }) => {
    try {
        const usernameExists = await Couple.findOne({ where: { username } });
        if (usernameExists) {
            return { status: 409, message: { message: 'Username already exists' } };
        }

        const emailExists = await Couple.findOne({ where: { email } });
        if (emailExists) {
            return { status: 409, message: { message: 'Email already exists' } };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newCouple = await Couple.create({
            first_name,
            last_name,
            username,
            email,
            phone_number,
            password: hashedPassword,
        });
        return { status: 201, message: { message: 'Couple registered successfully', data: newCouple } };
    } catch (error) {
        throw error;
    }
};

exports.getAllCouples = async () => {
    try {
        const couples = await Couple.findAll();
        return { status: 200, message: { Total: couples.length, message: 'Couples retrieved successfully', data: couples } };
    } catch (error) {
        throw error;
    }
};

exports.getCoupleById = async (id) => {
    try {
        const couple = await Couple.findByPk(id);
        if (!couple) {
            return { status: 404, message: { message: 'Couple data not found' } };
        }
        return { status: 200, message: { message: 'Couple data retrieved successfully', data: couple } };
    } catch (error) {
        throw error;
    }
};

exports.loginCouple = async ({ username, phone_number, password }) => {
    const loginId = username || phone_number;
    try {
        const couple = await Couple.findOne({
            where: {
                [username ? 'username' : 'phone_number']: loginId
            }
        });
        if (!couple) {
            return { status: 404, message: { message: 'User not found' } };
        }

        const isMatch = await bcrypt.compare(password, couple.password);
        if (!isMatch) {
            return { status: 401, message: { message: 'Invalid credentials' } };
        }

        const token = jwt.sign({ id: couple.id }, 'your_secret_key', { expiresIn: '1h' });
        return { status: 200, message: { message: 'Logged in successfully', token } };
    } catch (error) {
        throw error;
    }
};

exports.updateCouple = async ({ id, first_name, last_name, email, phone_number }) => {
    try {
        const couple = await Couple.findByPk(id);
        if (!couple) {
            return { status: 404, message: { message: 'Couple data not found' } };
        }

        couple.first_name = first_name || couple.first_name;
        couple.last_name = last_name || couple.last_name;
        couple.email = email || couple.email;
        couple.phone_number = phone_number || couple.phone_number;

        await couple.save();
        return { status: 200, message: { message: 'Couple data updated successfully', data: couple } };
    } catch (error) {
        throw error;
    }
};

exports.deleteCouple = async (id) => {
    try {
        const couple = await Couple.findByPk(id);
        if (!couple) {
            return { status: 404, message: { message: 'Couple data not found' } };
        }

        await couple.destroy();
        return { status: 200, message: { message: 'Couple data deleted successfully' } };
    } catch (error) {
        throw error;
    }
};
