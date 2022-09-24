package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/service"
)

// CreateExperience is the resolver for the createExperience field.
func (r *mutationResolver) CreateExperience(ctx context.Context, userID string, title string, employmentType string, companyName string, location string, startDate string, endDate *string) (interface{}, error) {
	return service.CreateExperience(ctx, userID, title, employmentType, companyName, location, startDate, *endDate)
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, experienceID string, title string, employmentType string, companyName string, location string, startDate string, endDate *string) (interface{}, error) {
	return service.UpdateExperience(ctx, experienceID, title, employmentType, companyName, location, startDate, *endDate)
}

// DeleteExperience is the resolver for the deleteExperience field.
func (r *mutationResolver) DeleteExperience(ctx context.Context, userID string, experienceID string) (interface{}, error) {
	return service.DeleteExperience(ctx, userID, experienceID)
}

// GetExperience is the resolver for the getExperience field.
func (r *queryResolver) GetExperience(ctx context.Context, id string) (interface{}, error) {
	var experience model.Experience
	err := r.DB.Model(experience).Where("id = ?", id).Take(&experience).Error
	if err != nil {
		return nil, err
	}
	return &experience, nil
}
