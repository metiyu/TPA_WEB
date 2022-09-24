package model

import "github.com/lib/pq"

type User struct {
	ID                    string         `json:"id" gorm:"primaryKey"`
	Name                  string         `json:"name"`
	Email                 string         `json:"email"`
	Password              string         `json:"password"`
	Validate              bool           `json:"validate"`
	Work                  string         `json:"work"`
	Education             string         `json:"education"`
	Region                string         `json:"region"`
	FollowedUser          pq.StringArray `json:"followed_user" gorm:"type:text[]"`
	RequestConnect        pq.StringArray `json:"request_connect" gorm:"type:text[]"`
	RequestConnectMessage pq.StringArray `json:"request_connect_message" gorm:"type:text[]"`
	ConnectedUser         pq.StringArray `json:"connected_user" gorm:"type:text[]"`
	PendingRequest        pq.StringArray `json:"pending_request" gorm:"type:text[]"`
	ProfileViewer         pq.StringArray `json:"profile_viewer" gorm:"type:text[]"`
	PhotoProfile          string         `json:"photo_profile"`
	BackgroundPhoto       string         `json:"background_photo"`
	Educations            pq.StringArray `json:"educations" gorm:"type:text[]"`
	Experiences           pq.StringArray `json:"experiences" gorm:"type:text[]"`
}

type Education struct {
	ID          string `json:"id"`
	School      string   `json:"school"`
	Degree      string   `json:"degree"`
	StartDate   string   `json:"startDate" gorm:"embedded"`
	EndDate     string   `json:"endDate" gorm:"embedded"`
}

type Experience struct {
	ID             string `json:"id"`
	Title          string  `json:"title"`
	EmploymentType string  `json:"employmentType"`
	CompanyName    string  `json:"companyName"`
	Location       string  `json:"location" gorm:"embedded"`
	StartDate      string  `json:"startDate" gorm:"embedded"`
	EndDate        string  `json:"endDate" gorm:"embedded"`
}
