package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"strings"

	"github.com/google/uuid"
	"github.com/metiyu/gqlgen-linkhedin/graph/generated"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
)

// CreateLink is the resolver for the createLink field.
func (r *mutationResolver) CreateLink(ctx context.Context, userID string) (string, error) {
	id := uuid.NewString()
	link := &model.ActivationLink{
		ID:     id,
		UserID: userID,
		Link:   "http://127.0.0.1:5173/" + id,
	}

	err := r.DB.Create(link).Error
	if err != nil {
		return "Error", err
	}
	return "Success", nil
}

// CreateCode is the resolver for the createCode field.
func (r *mutationResolver) CreateCode(ctx context.Context, email string) (*model.ForgetCode, error) {
	id := uuid.NewString()
	user, err := service.GetUserByEmail(ctx, email)

	if user == nil {
		return nil, err
	}

	code := &model.ForgetCode{
		ID:     id,
		UserID: user.ID,
		Code:   service.EncodeToString(6),
	}

	if r.DB.Create(code).Error != nil {
		return nil, err
	}

	service.SendEmail(email, code.Code, "forget")

	return code, nil
}

// GetLink is the resolver for the getLink field.
func (r *queryResolver) GetLink(ctx context.Context, id string) (*model.ActivationLink, error) {
	model := new(model.ActivationLink)
	return model, r.DB.First(model, "id = ?", id).Error
}

// GetCode is the resolver for the getCode field.
func (r *queryResolver) GetCode(ctx context.Context, id string) (*model.ForgetCode, error) {
	model := new(model.ForgetCode)
	return model, r.DB.First(model, "id = ?", id).Error
}

// Search is the resolver for the search field.
func (r *queryResolver) Search(ctx context.Context, keyword string, limit int, offset int) (interface{}, error) {
	search := new(model.Search)

	users, err := service.GetUsersByName(ctx, keyword, limit, offset)
	if err != nil {
		return nil, err
	}
	search.Users = users

	if posts, err := service.GetPostsByName(ctx, keyword, limit, offset); err != nil {
		return nil, err
	} else {
		search.Posts = posts
	}

	return search, nil
}

// SearchConnectedUser is the resolver for the searchConnectedUser field.
func (r *queryResolver) SearchConnectedUser(ctx context.Context, id string, keyword string) (interface{}, error) {
	if keyword == "" {
		keyword = "%"
	}

	var users []*model.User
	if err := r.DB.Find(&users, "LOWER(name) like ?", "%"+strings.ToLower(keyword)+"%").Error; err != nil {
		return nil, err
	}
	userNow, err := service.UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	var connectedUsers []*model.User
	if len(userNow.ConnectedUser) > 0 && len(users) > 0 {
		for i := 0; i < len(users); i++ {
			for j := 0; j < len(userNow.ConnectedUser); j++ {
				if users[i].ID == userNow.ConnectedUser[j] {
					connectedUsers = append(connectedUsers, users[i])
				}
			}
		}
	}

	return connectedUsers, nil
}

// Users is the resolver for the users field.
func (r *searchResolver) Users(ctx context.Context, obj *model.Search) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Posts is the resolver for the posts field.
func (r *searchResolver) Posts(ctx context.Context, obj *model.Search) ([]*model.Post, error) {
	panic(fmt.Errorf("not implemented"))
}

// Search returns generated.SearchResolver implementation.
func (r *Resolver) Search() generated.SearchResolver { return &searchResolver{r} }

type searchResolver struct{ *Resolver }
