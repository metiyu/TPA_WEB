package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
)

// CreateEducation is the resolver for the createEducation field.
func (r *mutationResolver) CreateEducation(ctx context.Context, userID string, school string, degree *string, startDate string, endDate string) (interface{}, error) {
	return service.CreateEducation(ctx, userID, school, *degree, startDate, endDate)
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, educationID string, school string, degree *string, startDate string, endDate string) (interface{}, error) {
	return service.UpdateEducation(ctx, educationID, school, *degree, startDate, endDate)
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, userID string, educationID string) (interface{}, error) {
	return service.DeleteEducation(ctx, userID, educationID)
}

// GetEducation is the resolver for the getEducation field.
func (r *queryResolver) GetEducation(ctx context.Context, id string) (interface{}, error) {
	var education model.Education
	err := r.DB.Model(education).Where("id = ?", id).Take(&education).Error
	if err != nil {
		return nil, err
	}
	return &education, nil
}

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *mutationResolver) Create(ctx context.Context, userID string, school string, degree *string, startDate string, endDate string) (interface{}, error) {
	return service.CreateEducation(ctx, userID, school, *degree, startDate, endDate)
}
func (r *mutationResolver) Update(ctx context.Context, educationID string, school string, degree *string, startDate string, endDate string) (interface{}, error) {
	return service.UpdateEducation(ctx, educationID, school, *degree, startDate, endDate)
}
func (r *mutationResolver) Delete(ctx context.Context, userID string, educationID string) (interface{}, error) {
	return service.DeleteEducation(ctx, userID, educationID)
}
