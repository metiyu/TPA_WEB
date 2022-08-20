package service

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func SendEmail(userEmail string, link string) {
	msg := gomail.NewMessage()
	msg.SetHeader("From", "linkHEdin <linkhedin.gm@gmail.com>")
	msg.SetHeader("To", userEmail)
	msg.SetHeader("Subject", "LinkHEdIn Registration Confirmation")
	msg.SetBody("text/html", fmt.Sprintf("<div>Thanks for registering!</div><div>Please complete your account activation in <a href=%s>here</a></div>", link))

	n := gomail.NewDialer("smtp.gmail.com", 587, "linkhedin.gm@gmail.com", "lrtcqflvzlvdfyqu")

	// Send the email
	if err := n.DialAndSend(msg); err != nil {
		panic(err)
	}
}
