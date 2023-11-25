const datastore = require('../../db/mainDB');

const { getTaipeiNowStr } = require('../utils/index');

const TABLE_NAME = 'User';

exports.AUTHENTICATION_METHOD = {
    LINE: 'line',
    GOOGLE: 'google'
};

exports.getUserByToken = ({ token, fields = '*' }) =>
    datastore
        .select(fields)
        .from('User')
        .where('token', token);

exports.getUserByUserId = ({ userId , fields = '*' }) =>
    datastore
        .select(fields)
        .from('User')
        .where('userId', userId);

exports.insert = async data =>
    datastore
        .insert(
            Object.assign(data, {
                updated_time: getTaipeiNowStr('YYYY-MM-DD HH:mm:ss')
            }),
            ['id']
        )
        .into(TABLE_NAME);

exports.updateByUserId = async ({ userId, data }) =>
    datastore
        .update(data)
        .from(TABLE_NAME)
        .where('userId', userId);

exports.deleteByUserId = async ({ userId, data }) =>
    datastore
        .del()
        .from(TABLE_NAME)
        .where('userId', userId);