package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/metiyu/gqlgen-linkhedin/graph/generated"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
	"github.com/samber/lo"
)

// Search is the resolver for the search field.
func (r *queryResolver) Search(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	var search *model.Search
	search = &model.Search{}

	users, err := service.GetUsersByName(ctx, keyword, limit, offset)
	if err != nil {
		return nil, err
	}
	search.Users = users

	return search, nil
}

// Users is the resolver for the users field.
func (r *searchResolver) Users(ctx context.Context, obj *model.Search) ([]*model.User, error) {
	userIds := lo.Map(obj.Users, func(x *model.User, _ int) string {
		return x.ID
	})

	var users []*model.User
	if err := r.DB.Find(&users, userIds).Error; err != nil {
		return nil, err
	}
	return users, nil
}

// Search returns generated.SearchResolver implementation.
func (r *Resolver) Search() generated.SearchResolver { return &searchResolver{r} }

type searchResolver struct{ *Resolver }
