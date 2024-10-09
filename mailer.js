const nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

/**
 * mail configuration method
*/
exports.transporter = nodemailer.createTransport(smtpTransport({
    service: process.env.MAILER_SERVICE,
    host: process.env.MAILER_HOST,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }

    // host: 'smtp-mail.outlook.com',
    // port: 587,
    // auth: {
    //     user: process.env.MAILER_USER,
    //     pass: process.env.MAILER_PASSWORD
    // }
}));

/*
 * user account forgot password mail subject
*/
exports.sendAppointmentDetailsSubject = "VetSoftware - Appointment Scheduled";


const ejs = require("ejs");
const sgMail = require('@sendgrid/mail')
const { sendAppointmentDetailsSubject } = require('../subject/registration/subject');
// TODO: manage mail subject folder structure 

/**
 * send email method
 * @param req 
 * @param res  
 * @returns 
*/
exports.sendDoctorMeetingDetails = async (mailData, callback) => {
    // const mailSendArr = [];
    // const mailSendErrArr = [];

    if(mailData.doctor_data){
        await ejs.renderFile("src/views/mailer/appointmentMeetingDoctor.mailer.ejs", mailData.doctor_data, function (err, data) {
            if (err) {
                callback(err, { error: true });
            } else {
                const msg = {
                    to: mailData.doctor_data.doctor_email,
                    from: process.env.MAILER_USER,
                    subject: sendAppointmentDetailsSubject,
                    html: data
                }
                sgMail.setApiKey(process.env.MAILER_API_KEY)
                sgMail.send(msg, function (err, info) {
                     
                });
            }
        });
    }
}

exports.sendPatientMeetingDetails = async (mailData, callback) => {
    if(mailData.patient_data){
        await ejs.renderFile("src/views/mailer/appointmentMeetingPatient.mailer.ejs", mailData.patient_data, function (err, data) {
            if (err) {
                callback(err, { error: true });
            } else {
                const msg = {
                    to: mailData.patient_data.patient_email,
                    from: process.env.MAILER_USER,
                    subject: sendAppointmentDetailsSubject,
                    html: data
                }
                sgMail.setApiKey(process.env.MAILER_API_KEY)
                sgMail.send(msg, function (err, info) {
                    if (err) { 
                        callback(err, { error: true });
                    } else {
                        callback(err, { error: false, message: "mail has been sent successfully" });
                    }
                });
            }
        });
    }

    if(mailData.patient_data_now){
        await ejs.renderFile("src/views/mailer/appointmentMeetingNowPatient.mailer.ejs", mailData.patient_data_now, function (err, data) {
            if (err) {
                callback(err, { error: true });
            } else {
                const msg = {
                    to: mailData.patient_data_now.patient_email,
                    from: process.env.MAILER_USER,
                    subject: sendAppointmentDetailsSubject,
                    html: data
                }
                sgMail.setApiKey(process.env.MAILER_API_KEY)
                sgMail.send(msg, function (err, info) {
                    if (err) { 
                        callback(err, { error: true });
                    } else {
                        callback(err, { error: false, message: "mail has been sent successfully" });
                    }
                });
            }
        });
    }

    

}

/**
*  service/controller file
*/

import emailer from './emailer';

var mailData = {
                header: backendAppURI + "photos/images/profile-created-header.png",
                user_email: item.email,
                name: req.name,
                app_name: process.env.APP_NAME,
                reset_password_url: `${process.env.FRONT_URL}/reset-password/${updatedData.passwordtoken}`,
                subject: "Account Activated!",
            }

            await emailer.sendPatientMeetingDetails(mailData);
	

/**
*  email template
*/

<!DOCTYPE html
	PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="format-detection" content="telephone=no">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=9; IE=8; IE=7; IE=EDGE">
	<title>Refer Accepted</title>
	<style type="text/css">
		* {
			box-sizing: border-box;
		}

		body {
			padding: 0;
			margin: 0;
			background-color: #eee;
			font-family: 'arial', sans-serif;
			font-size: 14px;
			color: #333333;
			line-height: normal;
		}

		img {
			max-width: 100%;
			height: auto;
			border: 0;
		}

		table {
			border-collapse: collapse;
			mso-table-lspace: 0pt;
			mso-table-rspace: 0pt;
		}

		/* table {
			border: 1px solid black !important;
		} */

		/* table th,
		td {
			border: 1px solid black !important;
		} */
	</style>
</head>

<body text="#000" link="#0033FF" vlink="#0033FF" alink="#0033FF" marginheight="0" marginwidth="0" bgcolor="#e6e6e6"
	style="background-color:#e6e6e6; color:#000;">
	<table border="0" cellpadding="0" cellspacing="0" width="100%"
		style="background:#fff;width:600px;margin:40px auto;border:1px solid #eee;border-collapse:collapse"
		align="center">
		<tbody>
			<tr class="header-block">
				<td>
					<img src="<%=blue_header_logo%>" alt="Header">
				</td>
			</tr>
			<tr class="welcome-block">
				<td>
					<table border="0" cellpadding="0" cellspacing="0" width="100%"
						style="width:100%; border-collapse:collapse;">
						<tbody>
							<tr>
								<td width="50" style="width:50px;">
									&nbsp;
								</td>
								<td>
									<table border="0" cellpadding="0" cellspacing="0" width="100%"
										style="width:100%; border-collapse:collapse;">
										<tbody>
											<tr>
												<td style="text-align: center;">
													<img src="<%=check_star_logo%>" alt="check">
												</td>
											</tr>
											<tr>
												<td height="15" style="line-height: 15px; height: 15px;">
													&nbsp;
												</td>
											</tr>
											<tr>
												<td style="text-align: center; font-size: 22px; font-weight: bold;">
													Hi <%=referred_by_clinic%>,
												</td>
											</tr>
											<tr>
												<td height="20" style="line-height: 20px; height: 20px;">
													&nbsp;
												</td>
											</tr>
											<tr>
												<td
													style="text-align: center; font-size:16px; line-height: 28px; color: #444;">
													Your refer request has been accepted.
												</td>
											</tr>
											<tr>
												<td height="28" style="line-height: 28px; height: 28px;">
													&nbsp;
												</td>
											</tr>
										</tbody>
									</table>
								</td>
								<td width="50" style="width:50px;">
									&nbsp;
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr class="inner-block">
				<td>
					<table border="0" cellpadding="0" cellspacing="0" width="100%"
						style="width:100%; border-collapse:collapse;">
						<tbody>
							<tr>
								<td width="50" style="width:50px;">
									&nbsp;
								</td>
								<td>
									<table border="0" cellpadding="0" cellspacing="0" width="100%"
										style="width:100%; border-collapse:collapse;">

										<tr>
											<td height="45" style="height: 45px;">&nbsp;</td>
										</tr>
										<tr>
											<td>
												<table border="0" cellpadding="0" cellspacing="0" width="100%"
													style="width:100%; border-collapse:collapse;">
													<tbody>
														<tr>
															<td width="48" style="width: 48px;">
																<img src="<%=petCell%>" alt="Date">
															</td>
															<td>
																<span
																	style="display: block; font-size: 11px; color: #444; line-height: 18px;">
																	Pet Name</span>
																<span style="display: block;"><%=pet_name%></span>
															</td>
															<td width="35" style="width: 35px;">&nbsp;</td>
															<td width="48" style="width: 48px;">
																<img src="<%=userCell%>" alt="Email">
															</td>
															<td>
																<span
																	style="display: block; font-size: 11px; color: #444; line-height: 18px;">Clinic Name</span>
																<span
																	style="display: block;"><%=clinic_name%></span>
															</td>
														</tr>  
														<tr>
															<td colspan="5" height="24" style="height: 24px;">
																&nbsp;
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
										<tr>
											<td height="35" style="height: 35px;">&nbsp;</td>
										</tr>
									</table>
								</td>
								<td width="50" style="width:50px;">
									&nbsp;
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
			<tr class="footer">
				<td bgcolor="#ECF0FF"
					style="text-align: center; line-height: 42px; background-color: #ECF0FF; font-size: 11px;">
					&copy; 2022 All rights reserved by VetRecor, Inc.
				</td>
			</tr>
		</tbody>
	</table>
</body>

</html>

