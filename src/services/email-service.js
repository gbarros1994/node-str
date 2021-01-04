'use strict';
const { sendgridKey } = require('../config');
var config = require('../config');
var sandgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {
  sendgridKey.send({
    to: to,
    from: 'gersonalifer@hotmail.com',
    subject: subject,
    html: body
  });
}