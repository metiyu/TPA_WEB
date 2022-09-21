package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"sort"
	"time"

	"github.com/google/uuid"
	database "github.com/metiyu/gqlgen-linkhedin/config"
	"github.com/metiyu/gqlgen-linkhedin/graph/generated"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
)

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, id string, userID string, caption string, photoURL *string, videoURL *string) (interface{}, error) {
	var emptyArrString []string
	post := model.Post{
		ID:        id,
		UserID:    userID,
		Caption:   caption,
		PhotoURL:  *photoURL,
		VideoURL:  *videoURL,
		Likes:     emptyArrString,
		Comments:  emptyArrString,
		Sends:     emptyArrString,
		CreatedAt: time.Now(),
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
		ID:        commentID,
		UserID:    commenterID,
		PostID:    postID,
		Comment:   comment,
		Likes:     emptyArrString,
		Reply:     emptyArrString,
		CreatedAt: time.Now(),
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

// ReplyComment is the resolver for the replyComment field.
func (r *mutationResolver) ReplyComment(ctx context.Context, postID string, userCommentID string, commentID string, commenterID string, comment string) (interface{}, error) {
	id := uuid.NewString()

	var emptyArrString []string
	replyModel := &model.Reply{
		ID:            id,
		UserID:        commenterID,
		PostID:        postID,
		Comment:       comment,
		Likes:         emptyArrString,
		Reply:         emptyArrString,
		CreatedAt:     time.Now(),
		ReplyToUserID: userCommentID,
	}
	if err := r.DB.Model(replyModel).Create(&replyModel).Error; err != nil {
		return nil, err
	}

	commentModel, err := service.GetCommentByID(ctx, commentID)
	if err != nil {
		return nil, err
	}
	commentModel.Reply = append(commentModel.Reply, id)

	return commentModel, r.DB.Where("id = ?", commentID).Save(commentModel).Error
}

// CreateJobs is the resolver for the createJobs field.
func (r *mutationResolver) CreateJobs(ctx context.Context, creatorID string, position string, company string, location string) (interface{}, error) {
	id := uuid.NewString()
	jobs := model.Jobs{
		ID:        id,
		CreatorID: creatorID,
		Position:  position,
		Company:   company,
		Location:  location,
		CreatedAt: time.Now(),
	}
	err := r.DB.Create(&jobs).Error
	if err != nil {
		return nil, err
	}
	return jobs, nil
}

// Likes is the resolver for the Likes field.
func (r *postResolver) Likes(ctx context.Context, obj *model.Post) ([]string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Comments is the resolver for the Comments field.
func (r *postResolver) Comments(ctx context.Context, obj *model.Post) ([]string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Sends is the resolver for the Sends field.
func (r *postResolver) Sends(ctx context.Context, obj *model.Post) ([]string, error) {
	panic(fmt.Errorf("not implemented"))
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
	if err := db.Limit(limit).Offset(offset).Find(&selfPosts, "user_id = ?", id).Order("created_at DESC").Error; err != nil {
		return nil, err
	}

	userNow, err := service.UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	var connectedPosts []*model.Post
	var alreadyConnect []string
	if len(userNow.ConnectedUser) > 0 {
		for i := 0; i < len(userNow.ConnectedUser); i++ {
			alreadyConnect = append(alreadyConnect, userNow.ConnectedUser[i])
			if err := db.Limit(limit).Offset(offset).Find(&connectedPosts, "user_id = ?", userNow.ConnectedUser[i]).Order("created_at DESC").Error; err != nil {
				return nil, err
			}
		}
	}

	var followedPosts []*model.Post
	if len(userNow.FollowedUser) > 0 {
		if len(alreadyConnect) > 0 {
			for j := 0; j < len(userNow.FollowedUser); j++ {
				if alreadyConnect[j] != userNow.FollowedUser[j] {
					if err := db.Limit(limit).Offset(offset).Find(&followedPosts, "user_id = ?", userNow.FollowedUser[j]).Order("created_at DESC").Error; err != nil {
						return nil, err
					}
				}
			}
		}
		for j := 0; j < len(userNow.FollowedUser); j++ {
			if err := db.Limit(limit).Offset(offset).Find(&followedPosts, "user_id = ?", userNow.FollowedUser[j]).Order("created_at DESC").Error; err != nil {
				return nil, err
			}
		}
	}

	var posts []*model.Post
	posts = append(posts, selfPosts...)
	posts = append(posts, connectedPosts...)
	posts = append(posts, followedPosts...)

	sort.SliceStable(posts, func(i, j int) bool {
		return posts[i].CreatedAt.Unix() > posts[j].CreatedAt.Unix()
	})

	return posts, nil
}

// GetComment is the resolver for the getComment field.
func (r *queryResolver) GetComment(ctx context.Context, postID string, limit int, offset int) (interface{}, error) {
	var comments []*model.Comment
	if err := r.DB.Limit(limit).Offset(offset).Find(&comments, "post_id = ?", postID).Order("created_at DESC").Error; err != nil {
		return nil, err
	}
	sort.SliceStable(comments, func(i, j int) bool {
		return comments[i].CreatedAt.Unix() > comments[j].CreatedAt.Unix()
	})
	return comments, nil
}

// GetCommentByID is the resolver for the getCommentById field.
func (r *queryResolver) GetCommentByID(ctx context.Context, id string) (interface{}, error) {
	return service.GetCommentByID(ctx, id)
}

// GetJobs is the resolver for the getJobs field.
func (r *queryResolver) GetJobs(ctx context.Context) (interface{}, error) {
	var jobs []*model.Jobs
	if err := r.DB.Find(&jobs).Order("created_at DESC").Error; err != nil {
		return nil, err
	}
	sort.SliceStable(jobs, func(i, j int) bool {
		return jobs[i].CreatedAt.Unix() > jobs[j].CreatedAt.Unix()
	})
	return jobs, nil
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }
