package service

import (
	"context"
	"strings"

	database "github.com/metiyu/gqlgen-linkhedin/config"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
)

func GetPostsByName(ctx context.Context, caption string, limit int, offset int) ([]*model.Post, error) {
	db := database.GetDB()
	if caption == "" {
		caption = "%"
	}

	var posts []*model.Post
	if err := db.Limit(limit).Offset(offset).Find(&posts, "LOWER(caption) like ?", "%"+strings.ToLower(caption)+"%").Error; err != nil {
		return nil, err
	}
	return posts, nil
}

func GetPostByID(ctx context.Context, id string)(*model.Post, error){
	db := database.GetDB()
	var post model.Post
	err := db.Model(post).Where("id = ?", id).Take(&post).Error
	if err != nil {
		return nil, err
	}
	return &post, nil
}

func GetCommentByID(ctx context.Context, id string)(*model.Comment, error){
	db := database.GetDB()
	var comment model.Comment
	err := db.Model(comment).Where("id = ?", id).Take(&comment).Error
	if err != nil {
		return nil, err
	}
	return &comment, nil
}

func GetCommentsFromPost(ctx context.Context, postId string)([]*model.Comment, error){
	post, err := GetPostByID(ctx, postId)
	if err != nil {
		return nil, err
	}
	var comments []*model.Comment
	for i := 0; i < len(post.Comments); i++ {
		comment, err := GetCommentByID(ctx, post.Comments[i])
		if err != nil {
			return nil, err
		}
		comments = append(comments, comment)
	}
	return comments, nil
}