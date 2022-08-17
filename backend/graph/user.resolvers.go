package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/metiyu/gqlgen-linkhedin/graph/generated"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
)

// Register is the resolver for the register field.
func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (interface{}, error) {
	panic(fmt.Errorf("not implemented"))
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	panic(fmt.Errorf("not implemented"))
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// ProfilePhotoURL is the resolver for the profile_photo_url field.
func (r *userResolver) ProfilePhotoURL(ctx context.Context, obj *model.User) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

// BgPhotoURL is the resolver for the bg_photo_url field.
func (r *userResolver) BgPhotoURL(ctx context.Context, obj *model.User) (*string, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
