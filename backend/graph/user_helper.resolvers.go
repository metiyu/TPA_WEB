package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/google/uuid"
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
