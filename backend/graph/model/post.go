package model

import (
	"time"

	"github.com/lib/pq"
)

type Post struct {
	ID        string         `json:"id" gorm:"primaryKey"`
	UserID    string         `json:"userId"`
	Caption   string         `json:"caption"`
	PhotoURL  string         `json:"photo_url"`
	VideoURL  string         `json:"video_url"`
	Likes     pq.StringArray `json:"likes" gorm:"type:text[]"`
	Comments  pq.StringArray `json:"comments" gorm:"type:text[]"`
	Sends     pq.StringArray `json:"sends" gorm:"type:text[]"`
	CreatedAt time.Time      `json:"created_at" gorm:"type:timestamp"`
}

type Comment struct {
	ID        string         `json:"id" gorm:"primaryKey"`
	UserID    string         `json:"userId"`
	PostID    string         `json:"postId"`
	Comment   string         `json:"comment"`
	Likes     pq.StringArray `json:"likes" gorm:"type:text[]"`
	Reply     pq.StringArray `json:"reply" gorm:"type:text[]"`
	CreatedAt time.Time      `json:"created_at" gorm:"type:timestamp"`
}

type Reply struct {
	ID            string         `json:"id" gorm:"primaryKey"`
	UserID        string         `json:"userId"`
	PostID        string         `json:"postId"`
	Comment       string         `json:"comment"`
	Likes         pq.StringArray `json:"likes" gorm:"type:text[]"`
	Reply         pq.StringArray `json:"reply" gorm:"type:text[]"`
	CreatedAt     time.Time      `json:"created_at" gorm:"type:timestamp"`
	ReplyToUserID string         `json:"replyToUserId"`
}

type Jobs struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	CreatorID string    `json:"creatorId"`
	Position  string    `json:"position"`
	Company   string    `json:"company"`
	Location  string    `json:"location"`
	CreatedAt time.Time `json:"created_at" gorm:"type:timestamp"`
}
