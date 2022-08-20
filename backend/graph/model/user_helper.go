package model

type ActivationLink struct {
	ID     string `json:"id" gorm:"primaryKey"`
	UserID string `json:"userId"`
	Link   string `json:"link"`
}

type ForgetCode struct {
	ID     string `json:"id" gorm:"primaryKey"`
	UserID string `json:"userId"`
	Code   string `json:"code"`
}
