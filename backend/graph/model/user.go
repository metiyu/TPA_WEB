package model

import "github.com/lib/pq"

type User struct {
	ID              string         `json:"id" gorm:"primaryKey"`
	Name            string         `json:"name"`
	Email           string         `json:"email"`
	Password        string         `json:"password"`
	Validate        bool           `json:"validate"`
	Work            string         `json:"work"`
	Education       string         `json:"education"`
	Region          string         `json:"region"`
	FollowedUser    pq.StringArray `json:"followed_user" gorm:"type:text[]"`
	RequestConnect  pq.StringArray `json:"request_connect" gorm:"type:text[]"`
	ConnectedUser   pq.StringArray `json:"connected_user" gorm:"type:text[]"`
	PhotoProfile    string         `json:"photo_profile"`
	BackgroundPhoto string         `json:"background_photo"`
}
