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

// RegisterByGoogle is the resolver for the registerByGoogle field.
func (r *mutationResolver) RegisterByGoogle(ctx context.Context, email string, emailVerified bool, name string, id string, picture string) (interface{}, error) {
	return service.UserRegisterByGoogle(ctx, email, emailVerified, name, id, picture)
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

// ResetPassword is the resolver for the resetPassword field.
func (r *mutationResolver) ResetPassword(ctx context.Context, id string, newPass string) (interface{}, error) {
	return service.ResetPassword(ctx, id, newPass)
}

// FollowUser is the resolver for the followUser field.
func (r *mutationResolver) FollowUser(ctx context.Context, id string, followedID string) (interface{}, error) {
	return service.FollowUser(ctx, id, followedID)
}

// UnfollowUser is the resolver for the unfollowUser field.
func (r *mutationResolver) UnfollowUser(ctx context.Context, id string, unfollowedID string) (interface{}, error) {
	return service.UnfollowUser(ctx, id, unfollowedID)
}

// SendConnectRequest is the resolver for the sendConnectRequest field.
func (r *mutationResolver) SendConnectRequest(ctx context.Context, id string, requestedID string, message *string) (interface{}, error) {
	return service.SendConnectRequest(ctx, id, requestedID, *message)
}

// AcceptConnectRequest is the resolver for the acceptConnectRequest field.
func (r *mutationResolver) AcceptConnectRequest(ctx context.Context, id string, acceptedID string) (interface{}, error) {
	return service.AcceptConnectRequest(ctx, id, acceptedID)
}

// IgnoreConnectRequest is the resolver for the ignoreConnectRequest field.
func (r *mutationResolver) IgnoreConnectRequest(ctx context.Context, id string, ignoredID string) (interface{}, error) {
	return service.IgnoreConnectRequest(ctx, id, ignoredID)
}

// UnconnectUser is the resolver for the unconnectUser field.
func (r *mutationResolver) UnconnectUser(ctx context.Context, id string, unconnectedID string) (interface{}, error) {
	return service.UnconnectUser(ctx, id, unconnectedID)
}

// ViewUserProfile is the resolver for the viewUserProfile field.
func (r *mutationResolver) ViewUserProfile(ctx context.Context, id string, userProfileID string) (interface{}, error) {
	return service.ViewUserProfile(ctx, id, userProfileID)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (interface{}, error) {
	return service.UserGetByID(ctx, id)
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented"))
}

// Protected is the resolver for the protected field.
func (r *queryResolver) Protected(ctx context.Context) (string, error) {
	panic(fmt.Errorf("not implemented"))
}

// UserYouMightKnow is the resolver for the userYouMightKnow field.
func (r *queryResolver) UserYouMightKnow(ctx context.Context, id string) (interface{}, error) {
	return service.UserYouMightKnow(ctx, id)
}

// GetUserByEmail is the resolver for the getUserByEmail field.
func (r *queryResolver) GetUserByEmail(ctx context.Context, email string) (interface{}, error) {
	return service.GetUserByEmail(ctx, email)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) LoginByGoogle(ctx context.Context, email string, emailVerified bool, name string, id string, picture string) (interface{}, error) {
	panic(fmt.Errorf("not implemented"))
}
func (r *mutationResolver) UserYouMightKnow(ctx context.Context, id string) (interface{}, error) {
	return service.UserYouMightKnow(ctx, id)
}
