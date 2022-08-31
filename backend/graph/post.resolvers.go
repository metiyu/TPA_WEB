package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/google/uuid"
	database "github.com/metiyu/gqlgen-linkhedin/config"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
)

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, id string, userID string, caption string, photoURL *string, videoURL *string) (interface{}, error) {
	var emptyArrString []string
	post := model.Post{
		ID:       id,
		UserID:   userID,
		Caption:  caption,
		PhotoURL: *photoURL,
		VideoURL: *videoURL,
		Likes:    emptyArrString,
		Comments: emptyArrString,
		Sends:    emptyArrString,
	}
	err := r.DB.Create(&post).Error
	if err != nil {
		return nil, err
	}
	return post, nil
}

// LikePost is the resolver for the likePost field.
func (r *mutationResolver) LikePost(ctx context.Context, id string, likerID string) (interface{}, error) {
	model, err := service.GetPostByID(ctx, id)
	if err != nil {
		return nil, err
	}
	model.Likes = append(model.Likes, likerID)

	return model, r.DB.Where("id = ?", id).Save(model).Error
}

// UnlikePost is the resolver for the unlikePost field.
func (r *mutationResolver) UnlikePost(ctx context.Context, id string, unlikerID string) (interface{}, error) {
	model, err := service.GetPostByID(ctx, id)
	if err != nil {
		return nil, err
	}
	model.Likes = service.RemoveElementFromArray(model.Likes, unlikerID)
	return model, r.DB.Where("id = ?", id).Save(model).Error
}

// CommentPost is the resolver for the commentPost field.
func (r *mutationResolver) CommentPost(ctx context.Context, postID string, commenterID string, comment string) (interface{}, error) {
	var emptyArrString []string
	commentID := uuid.NewString()
	model := &model.Comment{
		ID:      commentID,
		UserID:  commenterID,
		Comment: comment,
		Likes:   emptyArrString,
		Reply:   emptyArrString,
	}
	if err := r.DB.Model(model).Create(&model).Error; err != nil {
		return nil, err
	}

	post, err := service.GetPostByID(ctx, postID)
	if err != nil {
		return nil, err
	}
	post.Comments = append(post.Comments, commentID)
	return post, r.DB.Where("id = ?", postID).Save(post).Error
}

// LikeComment is the resolver for the likeComment field.
func (r *mutationResolver) LikeComment(ctx context.Context, commentID string, likerID string) (interface{}, error) {
	model, err := service.GetCommentByID(ctx, commentID)
	if err != nil {
		return nil, err
	}
	model.Likes = append(model.Likes, likerID)

	return model, r.DB.Where("id = ?", commentID).Save(model).Error
}

// UnlikeComment is the resolver for the unlikeComment field.
func (r *mutationResolver) UnlikeComment(ctx context.Context, commentID string, unlikerID string) (interface{}, error) {
	model, err := service.GetCommentByID(ctx, commentID)
	if err != nil {
		return nil, err
	}
	model.Likes = service.RemoveElementFromArray(model.Likes, unlikerID)
	return model, r.DB.Where("id = ?", commentID).Save(model).Error
}

// GenerateID is the resolver for the generateID field.
func (r *queryResolver) GenerateID(ctx context.Context) (interface{}, error) {
	id := uuid.NewString()
	return id, nil
}

// GetPosts is the resolver for the getPosts field.
func (r *queryResolver) GetPosts(ctx context.Context, id string, limit int, offset int) (interface{}, error) {
	db := database.GetDB()

	var selfPosts []*model.Post
	if err := db.Limit(limit).Offset(offset).Find(&selfPosts, "user_id = ?", id).Error; err != nil {
		return nil, err
	}

	userNow, err := service.UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	var connectedPosts []*model.Post
	var alreadyConnect []string
	for i := 0; i < len(userNow.ConnectedUser); i++ {
		alreadyConnect = append(alreadyConnect, userNow.ConnectedUser[i])
		if err := db.Limit(limit).Offset(offset).Find(&connectedPosts, "user_id = ?", userNow.ConnectedUser[i]).Error; err != nil {
			return nil, err
		}
	}
	var followedPosts []*model.Post
	for j := 0; j < len(userNow.FollowedUser); j++ {
		if alreadyConnect[j] != userNow.FollowedUser[j] {
			if err := db.Limit(limit).Offset(offset).Find(&followedPosts, "user_id = ?", userNow.FollowedUser[j]).Error; err != nil {
				return nil, err
			}
		}
	}
	var posts []*model.Post
	posts = append(posts, selfPosts...)
	posts = append(posts, connectedPosts...)
	posts = append(posts, followedPosts...)
	return posts, nil
}

// GetComment is the resolver for the getComment field.
func (r *queryResolver) GetComment(ctx context.Context, postID string) (interface{}, error) {
	post, err := service.GetPostByID(ctx, postID)
	if err != nil {
		return nil, err
	}
	var comments []*model.Comment
	for i := 0; i < len(post.Comments); i++ {
		comment, err := service.GetCommentByID(ctx, post.Comments[i])
		if err != nil {
			return nil, err
		}
		comments = append(comments, comment)
	}
	return comments, nil
}
