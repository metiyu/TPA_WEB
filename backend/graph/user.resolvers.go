package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/metiyu/gqlgen-linkhedin/graph/generated"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
)

// Register is the resolver for the register field.
func (r *mutationResolver) Register(ctx context.Context, input model.NewUser) (interface{}, error) {
	return service.UserRegister(ctx, input)
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, email string, password string) (interface{}, error) {
	return service.UserLogin(ctx, email, password)
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, name string, work string, education string, region string, profileURL string, backgroundURL string) (interface{}, error) {
	return service.UpdateUser(ctx, id, name, work, education, region, profileURL, backgroundURL)
}

// ActivateUser is the resolver for the activateUser field.
func (r *mutationResolver) ActivateUser(ctx context.Context, id string) (interface{}, error) {
	return service.ActivateUser(ctx, id)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Protected is the resolver for the protected field.
func (r *queryResolver) Protected(ctx context.Context) (string, error) {
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

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) UpdateProfilePhoto(ctx context.Context, id string, name string, work string, region string, profileURL string, backgroundURL string) (interface{}, error) {
	panic(fmt.Errorf("not implemented"))
}
