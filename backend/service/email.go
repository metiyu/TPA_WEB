package service

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func SendEmail(userEmail string, link string, tipe string) {
	msg := gomail.NewMessage()
	msg.SetHeader("From", "linkHEdin <noreply.linkhedin@gmail.com>")
	msg.SetHeader("To", userEmail)
	if tipe == "activation"{
		msg.SetHeader("Subject", "LinkHEdIn Registration Confirmation")
		msg.SetBody("text/html", fmt.Sprintf("<div>Thanks for registering!</div><div>Please complete your account activation in <a href=%s>here</a></div>", link))
	} else if tipe == "forget" {
		msg.SetHeader("Subject", "LinkHEdIn Reset Password Request")
		msg.SetBody("text/html", fmt.Sprintf("<div><div>We received a request to reset the password on your LinkHEdIn Account.</div><div>%s</div><div>Enter this code to complete the reset.</div></div>", link))
	}
	
	n := gomail.NewDialer("smtp.gmail.com", 587, "noreply.linkhedin@gmail.com", "olypzmqlrgqapaxs")

	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		panic(err)
	}
}
