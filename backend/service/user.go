package service

import (
	"context"
	"strings"

	"github.com/google/uuid"
	"github.com/metiyu/gqlgen-linkhedin/config"
	"github.com/metiyu/gqlgen-linkhedin/graph/model"
	"github.com/metiyu/gqlgen-linkhedin/tools"
)

func CreateUser(ctx context.Context, newUser model.NewUser) (*model.User, error) {
	db := database.GetDB()
	newUser.Password = tools.HashPassword(newUser.Password)
	var emptyArrString []string
	user := model.User{
		ID:             uuid.NewString(),
		Name:           newUser.Name,
		Email:          strings.ToLower(newUser.Email),
		Password:       newUser.Password,
		Validate:       false,
		Work:           "",
		Region:         "",
		PhotoProfile:   "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service.png",
		RequestConnect: emptyArrString,
		FollowedUser:   emptyArrString,
		ConnectedUser:  emptyArrString,
	}
	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	err := db.Model(user).Where("id = ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, err
}

func UpdateUser(ctx context.Context, id string, name string, work string, education string, region string, profileURL string, backgroundURL string) (interface{}, error) {
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil {
		return nil, err
	}
	token, err := JwtGenerate(ctx, id)
	if err != nil {
		return nil, err
	}
	model.Name = name
	model.Work = work
	model.Education = education
	model.Region = region
	model.PhotoProfile = profileURL
	model.BackgroundPhoto = backgroundURL

	return map[string]interface{}{
		"id":               model.ID,
		"name":             model.Name,
		"email":            model.Email,
		"validate":         model.Validate,
		"work":             model.Work,
		"education":        model.Education,
		"region":           model.Region,
		"photo_profile":    model.PhotoProfile,
		"photo_background": model.BackgroundPhoto,
		"request_connect":  model.RequestConnect,
		"followed_user":    model.FollowedUser,
		"connected_user":   model.ConnectedUser,
		"token":            token,
	}, db.Where("id = ?", id).Save(model).Error
	// return model, token, db.Where("id = ?", id).Save(model).Error
}
